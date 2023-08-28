import React, { FormEvent, useEffect, useState } from "react";
import * as S from "../../styles/LoginInputPageStyle";
import { useLocation, useNavigate } from "react-router-dom";
import InputGroup from "../../components/InputGroup";
import axios from "../../api/axiosBackend";

import { useDispatch } from "react-redux";
import { userActions, userAuthActions } from "../../store/index";

const LoginInputPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [apiCatchCnt, setApiCatchCnt] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      const { params: userEmail } = location.state as { params: string };
      setEmail(userEmail);
    }
  }, [location.state]);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      // console.log("login response:", response);

      if (response.status === 200) {
        dispatch(userActions.login(response.data));
        dispatch(userAuthActions.login());
        // console.log(user);
        navigate("/");
      }
    } catch (error: any) {
      console.log("login error", error);
      setApiCatchCnt((prev) => prev + 1);
      setErrors(error.response?.data || {});
    }
  };

  return (
    <S.LoginContainer
      backgroundImage={
        "https://assets.nflxext.com/ffe/siteui/vlv3/6c884f48-f7d8-4a59-9d25-b7c138813aee/41bb0af1-f2f8-41fa-965c-1770e8062a0a/KR-ko-20230807-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      }
    >
      <S.Logo
        backgroundImage={
          "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        }
        onClick={() => {
          navigate("/blind");
        }}
      />
      <S.SignUpBoxWrapper>
        <S.LoginBox>
          <S.LoginForm onSubmit={onSubmitHandler}>
            <S.Title>로그인</S.Title>
            <InputGroup
              apiCatchCnt={apiCatchCnt}
              value={email}
              setValue={setEmail}
              error={errors.email}
              placeholder="이메일 주소를 입력하세요."
            />
            <InputGroup
              apiCatchCnt={apiCatchCnt}
              type="password"
              value={password}
              setValue={setPassword}
              error={errors.password}
              placeholder="비밀번호를 입력하세요."
            />
            <S.SubmitBtn>로그인</S.SubmitBtn>
            <S.SignUpLinkComment>
              회원이 아니신가요?
              <S.SignUpLink
                onClick={() => {
                  navigate("/signup");
                }}
              >
                지금 바로 가입하세요!
              </S.SignUpLink>
            </S.SignUpLinkComment>
          </S.LoginForm>
        </S.LoginBox>
      </S.SignUpBoxWrapper>
    </S.LoginContainer>
  );
};

export default LoginInputPage;
