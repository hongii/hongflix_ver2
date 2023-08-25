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

export const Section = styled.section`
  position: absolute;
  top: 30%;
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
  font-size: calc(2.6rem + 0.7vw);
  color: #ececec;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

export const SmallComment = styled(Comment)`
  font-size: calc(1.3rem + 0.5vw);
  margin-top: 10px;
  font-weight: normal;
  line-height: 1.4;
`;

export const StartBtn = styled.button`
  background-color: rgb(229, 9, 20);
  color: #ececec;
  border-radius: 5px;
  font-size: calc(0.8rem + 0.5vw);
  height: 3.5rem;
  padding: 1rem;
  margin-top: 10px;
  white-space: nowrap;
  text-align: center;
  white-space: nowrap;
`;

export const ErrorCode = styled.div`
  font-size: calc(1.35rem + 0.5vw);
  margin-top: 7rem;
  font-weight: normal;
  color: #ececec;
`;
