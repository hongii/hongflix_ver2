import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 90px 40px 3rem;
  border-top: 1px solid rgb(25, 25, 25);
  width: 100%;
  position: relative;
  z-index: 100;

  @media (min-width: 1200px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export const FooterContent = styled.div`
  flex: 1 1 auto;
`;

export const FooterLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 3rem;
`;

export const FooterLinkTitle = styled.div`
  color: gray;
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 30px;

  @media (min-width: 900px) {
    margin-bottom: 45px;
  }
`;

export const FooterLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const FooterLink = styled.a`
  color: gray;
  font-size: 14px;
  width: 40%;
  margin-bottom: 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 900px) {
    width: 23%;
    margin-bottom: 25px;
  }
`;

export const FooterDescContainer = styled.div`
  margin-top: 20px;
`;

export const FooterDescRights = styled.h2`
  font-size: 15px;
  color: white;
  text-align: center;
  padding-right: 3rem;
`;
