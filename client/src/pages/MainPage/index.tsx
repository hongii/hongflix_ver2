import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";
import axios from "../../api/axiosBackend";
import { useDispatch } from "react-redux";
import { userActions } from "../../slices/userSlice";
import { userAuthActions } from "../../slices/userAuthSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/checkAcessToken`
        );
      } catch (error: any) {
        if (error.response.status === 401) {
          try {
            const resRefresh = await axios.post(
              `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/refreshToken`
            );
            if (resRefresh.status === 201) {
              console.log(resRefresh.data.success);
              dispatch(userActions.refreshAccessTk(resRefresh.data));
            }
          } catch (error) {
            dispatch(userAuthActions.logout());
            dispatch(userActions.logout());
          }
        } else {
          window.alert(
            "로그인 인증 기간이 만료되었습니다. 로그인을 다시 진행해주세요."
          );
          dispatch(userAuthActions.logout());
          dispatch(userActions.logout());
        }
      }
    };
    checkAccessToken();
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
