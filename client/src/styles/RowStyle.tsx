import styled from "styled-components";

interface Props {
  isLargeRow?: boolean;
}

export const RowContainer = styled.section`
  margin-left: 20px;
  margin-bottom: 20px;
  color: white;

  .MySwiper {
    padding: 1.2rem 0.5rem;
    z-index: 2;
  }
  /* Swiper 모듈 자체 className을 사용해서 custom css적용 */
  .swiper-pagination {
    /* !important는 덮어쓰기할때 사용 */
    text-align: right !important;
  }

  .swiper-pagination-bullet {
    background: gray !important;
    opacity: 1 !important;
  }

  .swiper-pagination-bullet-active {
    background: white !important;
  }

  .swiper-button-prev {
    color: white !important;
  }

  .swiper-button-next {
    color: white !important;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.3rem !important;
    font-weight: 600 !important;
  }
`;

export const SubTitle = styled.h2`
  padding-left: 10px;
`;

export const RowPoster = styled.img<Props>`
  object-fit: cover;
  width: 100%;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 8px;
  max-height: ${(props) => (props.isLargeRow ? "320px" : "144px")};

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 1200px) {
    max-height: ${(props) => (props.isLargeRow ? "360px" : "160px")};
  }

  @media screen and (max-width: 768px) {
    max-height: ${(props) => (props.isLargeRow ? "280px" : "100px")};
  }
`;
