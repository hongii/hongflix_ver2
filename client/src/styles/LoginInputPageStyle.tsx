import styled from "styled-components";
interface Props {
  backgroundImage?: string;
}

export const LoginContainer = styled.div<Props>`
  min-height: 100vh;
  background-image: url(${(props) => props.backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const Logo = styled.div<Props>`
  position: absolute;
  z-index: 100;
  width: 120px;
  height: 70px;
  margin-right: auto;
  margin-left: 2.5rem;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${(props) => props.backgroundImage});
`;

export const SignUpBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

export const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 370px;
  min-height: 500px;

  background: rgba(0, 0, 0, 0.8);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem;
`;

export const Title = styled.h2`
  color: #ececec;
  font-size: 2.2rem;
  margin-bottom: 1.8rem;
  font-weight: 400;
`;

export const Input = styled.input`
  font-size: 18px;
  padding: 0.8rem;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  background: #333;
  opacity: 0.9;
  color: #ececec;

  &::placeholder {
    color: #888;
    opacity: 0.9;
    font-size: 0.9rem;
  }
`;

export const SubmitBtn = styled.button`
  font-size: 18px;
  padding: 0.8rem;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgb(229, 9, 20);
  color: #ececec;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  opacity: 1;
  cursor: pointer;
`;

export const SignUpLinkComment = styled.div`
  color: #737373;
`;

export const SignUpLink = styled.span`
  color: #ececec;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    border-bottom: 1px solid #ececec;
  }
`;
