import React, { FormEvent, useState, useEffect } from "react";
import * as S from "../../styles/SignUpPageStyle";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axiosBackend";
import InputGroup from "../../components/InputGroup";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [apiCatchCnt, setApiCatchCnt] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/signup`,
        {
          email,
          password,
          username,
        }
      );
      // console.log("sign up response:", response);
      if (response.status === 200) {
        setErrors({});
        window.alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    } catch (error: any) {
      console.log("sign up error", error);
      setApiCatchCnt((prev) => prev + 1);
      setErrors(error.response?.data || {});
    }
  };

  return (
    <S.SignUpContainer
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
        <S.SignUpBox>
          <S.SignUpForm onSubmit={onSubmitHandler}>
            <S.Title>회원가입</S.Title>

            <InputGroup
              apiCatchCnt={apiCatchCnt}
              error={errors.username}
              value={username}
              setValue={setUsername}
              placeholder={"이름을 입력하세요."}
            />
            <InputGroup
              apiCatchCnt={apiCatchCnt}
              error={errors.email}
              value={email}
              setValue={setEmail}
              placeholder={"이메일 주소를 입력하세요."}
            />
            <InputGroup
              apiCatchCnt={apiCatchCnt}
              type="password"
              error={errors.password}
              value={password}
              setValue={setPassword}
              placeholder={"비밀번호를 입력하세요."}
            />
            <S.SubmitBtn aria-label="sign up button">가입하기</S.SubmitBtn>
            <S.LoginLinkComment>
              이미 가입되어 있으신가요?
              <S.LoginLink
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인 하기
              </S.LoginLink>
            </S.LoginLinkComment>
          </S.SignUpForm>
        </S.SignUpBox>
      </S.SignUpBoxWrapper>
    </S.SignUpContainer>
  );
};

export default SignUpPage;
