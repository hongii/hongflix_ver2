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

export const Header = styled.header`
  position: absolute;
  top: 10px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.div<Props>`
  margin-left: 2.5rem;
  min-width: 120px;
  height: 70px;
  margin-right: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${(props) => props.backgroundImage});
`;

export const LoginBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginBtn = styled.button`
  padding: 5px 12px;
  background-color: rgb(229, 9, 20);
  color: #ececec;
  margin-right: 2.5rem;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
`;

export const Gradient = styled.div`
  z-index: 1;
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

export const LoginSection = styled.section`
  position: absolute;
  top: 38%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

export const Comment = styled.div`
  font-size: 2.2rem;
  color: #ececec;
  margin-bottom: 1rem;
  font-weight: bold;
  word-break: keep-all;
`;

export const SmallComment = styled(Comment)`
  font-size: 1.2rem;
  margin-top: 10px;
  font-weight: normal;
`;

export const StartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;
export const LoginInput = styled.input`
  font-size: 18px;
  color: #ececec;
  max-width: 400px;
  line-height: 1.5rem;
  padding: 1rem;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 10px;
  background: rgba(22, 22, 22, 0.7);
  border: 1px solid rgba(128, 128, 128, 0.7);
  flex-grow: 1;

  &::placeholder {
    color: #ececec;
    opacity: 0.6;
  }
`;

export const StartBtn = styled.button`
  background-color: rgb(229, 9, 20);
  color: #ececec;
  border-radius: 5px;
  font-size: 18px;
  height: 3.5rem;
  padding: 1rem;
  margin-top: 10px;
  white-space: nowrap;
  text-align: center;
  white-space: nowrap;
`;
