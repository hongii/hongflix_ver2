import * as S from "../../styles/NotFoundPageStyle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const userAuth = useSelector(
    (state: RootState) => state.userAuth.authenticated
  );
  const clickHandler = async () => {
    if (userAuth) {
      navigate("/");
    } else {
      navigate("/blind");
    }
  };

  return (
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
      </S.Header>
      <S.Gradient />

      <S.Section>
        <S.Comment>길을 잃으셨나요?</S.Comment>
        <S.SmallComment>
          죄송합니다. 해당 페이지를 찾을 수 없습니다.
          <br />
          아래 버튼을 클릭하여 홈페이지로 이동해주세요.
        </S.SmallComment>

        <S.StartBtn
          aria-label="home button"
          onClick={clickHandler}
        >{`NETFLIX 홈 `}</S.StartBtn>
        <S.ErrorCode>오류코드 : 404 NOT FOUND</S.ErrorCode>
      </S.Section>
    </S.LoginContainer>
  );
};

export default NotFoundPage;
