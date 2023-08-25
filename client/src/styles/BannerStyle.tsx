import styled from "styled-components";

interface Props {
  imageSrc: string;
}

export const BannerHeader = styled.header<Props>`
  background-image: url(${(props) => props.imageSrc});
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 64vh;
  padding-left: 3rem;
  object-fit: contain;
  color: white;
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;

  @media (min-width: 1200px) {
    height: 40vmax;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 140px;
  width: 40%;
`;

export const Title = styled.h1`
  font-size: calc(1.8rem + 0.5vw);
  margin-bottom: 1rem;
`;

export const Buttons = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: calc(0.7rem + 0.6vw);
  font-weight: bold;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  margin-right: 0.8rem;
  text-align: center;
  white-space: nowrap;
`;

export const PlayButton = styled(Button)`
  background-color: #fff;
  opacity: 1;
  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.75);
    transition: all 0.2s;
  }
`;

export const ButtonIcon = styled.div`
  text-align: center;
  margin-right: 8px;
  padding-bottom: 3px;
`;

export const InfoButton = styled(Button)`
  color: #fff;
  background-color: rgba(74, 74, 74, 0.8);

  &:hover {
    transition: all 0.2s;
    background-color: rgba(74, 74, 74, 0.5);
  }
`;

export const Description = styled.div`
  font-size: calc(0.6rem + 0.6vw);
  line-height: normal;
  font-weight: 500;

  /* 여러줄로 텍스트 자르기 */
  width: 100%;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 텍스트를 자를때 원하는 단위 => 5줄, 이 이상의 길이는 ...으로 표시된다. */
  -webkit-box-orient: vertical; /* content를 가로 또는 세로로 배치할지 여부를 결정하는 속성 */
  overflow: hidden;

  @media (min-width: 1200px) {
    -webkit-line-clamp: 6;
  }
`;

export const FadeButton = styled.div`
  flex-grow: 1;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
  margin-left: -4rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
`;

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const BackBtn = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0.8rem;
  left: 0.5rem;
  margin-top: 0.1rem;

  border-radius: 50%;
  background-color: rgba(74, 74, 74, 1);
  width: 40px;
  height: 40px;
  color: white;
  z-index: 1000;
  font-size: 2.3rem;
  font-weight: bold;
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const NoVideo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(2rem + 0.5vw);
  width: 100%;
  height: 100%;
  color: #666;
`;
