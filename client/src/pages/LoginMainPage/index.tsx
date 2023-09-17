import React, { useState } from "react";
import * as S from "../../styles/LoginMainPageStyle";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";
import axios from "../../api/axiosBackend";

const LoginMainPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const clickHandler = async () => {
    try {
      if (email !== "") {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/findUser`,
          { email }
        );
        if (response.data.success) {
          navigate("/login", { state: { params: email } });
        } else {
          navigate("/signup", { state: { params: email } });
        }
      }
    } catch (error) {
      console.log("start error: ", error);
    }
  };

  const onKeyDownEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && email !== "") {
      clickHandler();
    }
  };

  return (
    <>
      <S.LoginContainer
        backgroundImage={
          "https://assets.nflxext.com/ffe/siteui/vlv3/6c884f48-f7d8-4a59-9d25-b7c138813aee/41bb0af1-f2f8-41fa-965c-1770e8062a0a/KR-ko-20230807-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        }
      >
        <S.Header>
          <S.Logo
            backgroundImage={
              "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            }
          />
          <S.LoginBtnContainer>
            <S.LoginBtn
              onClick={() => {
                navigate("/login");
                setEmail("");
              }}
            >
              <div>로그인</div>
            </S.LoginBtn>
          </S.LoginBtnContainer>
        </S.Header>
        <S.Gradient />

        <S.LoginSection>
          <S.Comment>보고 싶은 영화를 마음껏 검색해보세요😊</S.Comment>
          <S.SmallComment>
            시작할 준비가 되셨나요? 이제 이메일 주소를 입력하여 우리의 회원이
            되어보세요.
          </S.SmallComment>
          <S.StartContainer>
            <S.LoginInput
              placeholder="가입할 이메일 주소를 입력하세요."
              onChange={changeHandler}
              onKeyDown={onKeyDownEnter}
            />
            <S.StartBtn onClick={clickHandler}>
              {`시작하기 `}
              <FaChevronRight />
            </S.StartBtn>
          </S.StartContainer>
        </S.LoginSection>
      </S.LoginContainer>
    </>
  );
};

export default LoginMainPage;
