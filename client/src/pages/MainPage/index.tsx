import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";
import { useDispatch } from "react-redux";
import { checkAccessToken } from "../../services/checkTokenApi";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAccessToken(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        id="OG"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" id="TN" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchURL={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchURL={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchURL={requests.fetchComedyMovies}
      />
      <Row
        title="Horror Movies"
        id="HM"
        fetchURL={requests.fetchHorrorMovies}
      />
      <Row
        title="Romance Movies"
        id="TM"
        fetchURL={requests.fetchRomanceMovies}
      />
      <Row
        title="Documentaries"
        id="DM"
        fetchURL={requests.fetchDocumentaries}
      />
    </div>
  );
};
export default MainPage;
