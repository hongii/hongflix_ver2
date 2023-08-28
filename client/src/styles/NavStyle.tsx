import styled from "styled-components";

interface Props {
  navBlackShow?: boolean;
  backgroundImage?: string;
  isClickSearch?: boolean;
}

export const NavContainer = styled.nav<Props>`
  display: flex;
  position: fixed;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  z-index: 1000;
  padding: 0 2rem;
  transition: all 0.5s;
  transition-timing-function: ease-in;
  align-items: center;
  background-color: ${(props) => props.navBlackShow && "#111"};
`;

export const Logo = styled.div<Props>`
  margin-left: 1.3rem;
  min-width: 100px;
  height: 100%;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 2000;
  background-image: url(${(props) => props.backgroundImage});
`;

export const NavSecondary = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchForm = styled.div<Props>`
  display: flex;
  position: relative;
  margin-right: 0.5vw;
  max-width: 200px;

  @media (max-width: 430px) {
    position: fixed;
    top: 16px;
    right: 37%;
    width: 200px;
    z-index: ${(props) => (props.isClickSearch ? "3000" : "2000")};
  }
  @media (min-width: 430px) and (max-width: 515px) {
    position: fixed;
    top: 16px;
    right: 34%;
    width: 200px;
    z-index: ${(props) => (props.isClickSearch ? "3000" : "2000")};
  }
`;

export const SearchFormIcon = styled.button<Props>`
  position: absolute;
  top: 7px;
  z-index: 3000;
  cursor: pointer;
  right: 12px;
  transition: ease transform 0.8s;
  transition-delay: 40ms;
  color: #fff;
  opacity: 0.8;
  font-size: 1.5rem;
  transform: ${(props) => props.isClickSearch && "translateX(-150px)"};
`;

export const SearchFormInput = styled.input<Props>`
  flex: 1 1 auto;
  width: 0%;
  opacity: 0;
  font-size: 1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  border: solid 1.5px rgba(255, 255, 255, 0.8);
  padding: 10px 14px 10px 40px;
  transition: ease width 0.8s, ease opacity 0.8s;
  opacity: ${(props) => props.isClickSearch && "1"};
  width: ${(props) => props.isClickSearch && "100%"};
`;

export const ProfileIconImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 1rem;
`;

export const LogoutBtn = styled.button`
  padding: 5px 12px;
  background-color: rgb(229, 9, 20);
  color: #ececec;
  border-radius: 5px;
  font-size: calc(0.6rem + 0.6vw);
  cursor: pointer;
  white-space: nowrap;
`;
