import cookie from "cookie";
import bcrypt from "bcryptjs";
import { Router, Request, Response } from "express";
import User from "../entities/User";
import { isEmpty, validate } from "class-validator";
import jwt from "jsonwebtoken";

const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

/* sign up api */
const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    let errors: any = {};

    // 입력받은 이메일이 이미 저장되어 있는지(사용중인) 확인
    const userEmail = await User.findOneBy({ email });

    // 이미 가입된 유저 이메일이라면 errors 객체에 error msg넣음
    if (userEmail) errors.email = "이미 가입된 이메일 주소입니다.";

    // error가 발생한 경우 error정보를 response로 return
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = new User();
    user.email = email;
    user.password = password;
    user.username = username;
    user.refreshToken = "";

    // user객체의 유효성 검증
    errors = await validate(user);
    console.log(errors);
    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    } // 상태코드 400은 client error

    // 유효성 검증을 통과한 객체라면, user정보를 users 테이블에 저장
    await user.save();
    const { password: pw, refreshToken, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error }); // 상태코드 500은 server error
  }
};

/* login api */
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let errors: any = {};
    if (isEmpty(email)) errors.email = "가입한 이메일 주소를 입력해주세요.";
    if (isEmpty(password)) errors.password = "비밀번호를 입력해주세요";
    if (
      Object.keys(errors).includes("email") &&
      Object.keys(errors).includes("password")
    ) {
      return res.status(400).json(errors);
    } else if (
      Object.keys(errors).includes("email") &&
      !Object.keys(errors).includes("password")
    ) {
      return res.status(400).json(errors);
    }

    const user = await User.findOneBy({ email });
    // 등록되어 있지 않은 유저 이메일이라면 errors 객체에 error msg넣음
    if (!user) {
      return res.status(404).json({
        email: "가입되지 않은 이메일 주소입니다.",
      });
    }

    // 가입된 유저라면, 유저가 입력한 비밀번호와 db에 저장된 비밀번호를 비교
    const userPasswordMatch = await bcrypt.compare(password, user.password);
    // 저장된 비밀번호와 입력받은 비밀번호가 다르다면 error
    if (!userPasswordMatch) {
      return res.status(401).json({ password: "비밀번호가 틀렸습니다." });
    }

    // 비밀번호가 일치한다면 access token과 refresh token 생성
    const accessTokenExp = Math.floor(Date.now() / 1000) + 15 * 60; // 유효기간 15분
    const accessToken = jwt.sign(
      { email, exp: accessTokenExp },
      process.env.JWT_ACCESS_SECRET
    );

    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14; // 유효기간 14일  60 * 60 * 24 * 14
    const refreshToken = jwt.sign(
      { email, exp: refreshTokenExp },
      process.env.JWT_REFRESH_SECRET
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.set("Set-Cookie", [
      cookie.serialize("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      }),
      cookie.serialize("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      }),
    ]);

    const {
      password: pw,
      refreshToken: refresh_tk,
      ...userWithoutPassword
    } = user;
    return res.status(200).json({ userWithoutPassword, accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

/* logout api */
const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const { email }: any = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
      const user = await User.findOneBy({ email });
      if (user) {
        user.refreshToken = "";
        await user.save();
      }
    }

    res.set("Set-Cookie", [
      cookie.serialize("accessToken", "", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
      }),
      cookie.serialize("refreshToken", "", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
      }),
    ]);
    return res.status(200).json("Logout Success");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error }); // 상태코드 500은 server error
  }
};

/* findUser api */
const findUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // 입력받은 이메일이 이미 저장되어 있는지(사용중인) 확인
    const userEmail = await User.findOneBy({ email });

    // 이미 가입된 유저 이메일이라면 성공
    if (userEmail) return res.status(200).json({ success: true });

    return res.json({ success: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error }); // 상태코드 500은 server error
  }
};

/* access token의 유효성 판단하는 api */
const checkAcessToken = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(404).json({ error: "Accees token does not exist." });
    }

    // access token의 유효성 및 만료기한 검증
    const { email, exp }: any = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET
    );

    const user = await User.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid access token" });
    }

    return res.status(200).json({ success: " Valid access token" });
  } catch (error) {
    console.error(error.name);
    if (error.name === "TokenExpiredError") {
      // Access Token이 만료된 경우
      return res.status(401).json({ error: "Access token is expired" });
    } else if (error.name === "JsonWebTokenError") {
      // Access Token이 유효하지 않은 경우
      return res.status(400).json({ error: "Invalid access token" });
    } else {
      return res.status(500).json(error);
    }
  }
};

/* access token이 만료된 경우, access token과 refresh token 둘다 재발급해주는 api */
const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(404).json({ error: "Refresh token does not exist." });
    }

    // db에 저장된 refresh token정보와 다른 경우 404에러(탈취된 토큰에 대한 재발급 요청 무시)
    const user = await User.findOneBy({ refreshToken });
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ error: "Incorrect : Invalid refresh token" });
    }

    // refresh token의 유효성 및 만료기한 검증
    const { email, exp }: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // refresh token의 유효성 검증 통과 -> access token과 refresh token 재발급
    const accessTokenExp = Math.floor(Date.now() / 1000) + 15 * 60;
    const newAccessToken = jwt.sign(
      { email, exp: accessTokenExp },
      process.env.JWT_ACCESS_SECRET
    );

    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14;
    const newRefreshToken = jwt.sign(
      { email, exp: refreshTokenExp },
      process.env.JWT_REFRESH_SECRET
    );

    //db에 새롭게 발급받은 refresh token 정보 갱신
    user.refreshToken = newRefreshToken;
    await user.save();

    res.set("Set-Cookie", [
      cookie.serialize("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      }),
      cookie.serialize("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      }),
    ]);

    return res
      .status(201)
      .json({ success: "Success: refresh token", accessToken: newAccessToken });
  } catch (error) {
    console.error(error.name);
    if (error.name === "TokenExpiredError") {
      // Refresh Token이 만료된 경우
      return res.status(401).json({ error: "Refresh token is expired" });
    } else if (error.name === "JsonWebTokenError") {
      // Refresh Token이 유효하지 않은 경우
      return res.status(400).json({ error: "Invalid refresh token" });
    } else {
      return res.status(500).json(error);
    }
  }
};

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/findUser", findUser);
router.post("/checkAcessToken", checkAcessToken);
router.post("/refreshToken", refreshToken);

export default router;
