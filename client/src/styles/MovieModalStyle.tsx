import styled from "styled-components";

interface Props {
  isClosed: boolean;
}

export const Presentation = styled.div`
  z-index: 2000;
  position: absolute;
`;

export const WrapperModal = styled.div`
  /* modal창을 가운데에 두기 위한 container역할 */
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 / 71%);
  -webkit-tap-highlight-color: transparent;
  padding: 2rem 0;

  /* modal창을 가운데로 배치 */
  display: flex;
  justify-content: center;

  @media screen and (max-height: 768px) {
    padding: 0;
  }
`;

export const Modal = styled.div<Props>`
  position: relative;
  width: 800px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: #111;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 8px;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
    visibility: hidden;
  }

  .modal__closed {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 1000;
    color: white;
    font-size: 35px;
  }

  /* animation 효과 */
  animation: ${(props) => (props.isClosed ? "fadeOut" : "fadeIn")} 400ms;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.5);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }

    to {
      opacity: 0;
      transform: scale(0.5);
    }
  }

  @media screen and (max-height: 768px) {
    overflow-y: scroll !important;
  }
`;

export const PosterImg = styled.img`
  width: 100%;
  height: auto;
`;

export const Content = styled.div`
  padding: 40px;
  color: white;
`;

export const Title = styled.p`
  font-size: calc(1.68rem + 0.55vw);
  margin-top: 25px;
  margin-bottom: 12px;
`;

export const Details = styled.div`
  font-weight: 600;
  font-size: calc(0.55rem + 0.55vw);

  @media screen and (max-height: 768px) {
    font-size: 16px;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: calc(0.55rem + 0.55vw);
  font-weight: bold;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  margin-right: 0.8rem;
  margin-bottom: 10px;
  text-align: center;
  white-space: nowrap;
`;

export const PlayButton = styled(Button)`
  background-color: white;
  text-align: center;

  &:hover {
    color: #000;
    background-color: rgba(170, 170, 170, 0.9);
    transition: all 0.2s;
  }
`;

export const ButtonIcon = styled.span`
  text-align: center;
  margin-right: 8px;
  padding-bottom: 3px;
`;

export const UserPer = styled.span`
  color: #46d369;
`;

export const Date = styled.span`
  margin-left: 20px;
  margin-right: 20px;
  color: #ececec;
  opacity: 0.9;
`;

export const Runtime = styled.span`
  color: #ececec;
  opacity: 0.9;
  margin-top: 5px;
`;

export const Genre = styled.div`
  color: #bcbcbc;
  margin-top: 6px;
  margin-bottom: 15px;
  opacity: 0.75;
`;

export const GenreItem = styled.span`
  color: #bcbcbc;
  margin-bottom: 15px;
`;

export const Overview = styled.p`
  line-height: 1.4;
  font-weight: normal;

  @media screen and (max-height: 768px) {
    font-size: 16px;
  }
`;
