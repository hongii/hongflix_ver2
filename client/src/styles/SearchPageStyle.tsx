import styled from "styled-components";

/* 찾는 영화 정보가 없는 경우 */
export const NoResults = styled.section`
  width: 100%;
  min-height: 64vh;
  text-align: center;
  padding-top: 120px;
  padding-right: 2vw;
  padding-left: 2vw;
  margin-bottom: 30px;
  color: #c5c5c5;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NoResultsText = styled.div`
  white-space: nowrap;
`;

/* 찾는 영화 정보가 있는 경우 */
export const SearchContainer = styled.section`
  width: 100%;
  min-height: 64vh;
  padding-top: 120px;
  padding-right: 3vw;
  padding-left: 3vw;
  margin-bottom: 30px;
`;

export const MovieItemsContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, auto));
  grid-template-rows: repeat(auto-fill, minmax(auto, auto));
  column-gap: 1%;
  row-gap: 4vw;
`;

export const ColumnPoster = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform ease-in 0.3s 0.2s;
  -webkit-transition: transform ease-in 0.3s;
  overflow: hidden;
  background-color: rgba(90, 90, 90, 0.3);
  border-radius: 5px;
  color: #ececec;
  font-weight: bold;
  text-align: center;
  word-break: keep-all;

  &:hover {
    transform: scale(1.2);
    background-color: rgba(90, 90, 90, 1);
    // .movieImg {
    //   border-bottom-left-radius: 0px;
    //   border-bottom-right-radius: 0px;
    // }
    // .title {
    //   animation: visibleTitle 1s;
    //   opacity: 1;
    // }
  }
`;

export const MoviePoster = styled.img`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const Title = styled.div`
  padding: 10px 5px 10px 5px;
  font-weight: bold;
  color: #c5c5c5;
  width: 100%;
  font-size: 15px;
  text-align: center;
  word-break: keep-all;
`;
