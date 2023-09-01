import React, { useState, useEffect, useCallback } from "react";
import * as S from "../../styles/BannerStyle";
import { TbAlertCircle } from "react-icons/tb";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { MovieResults } from "../../api/responseMovie";
import axios from "../../api/axios";
import axiosBE from "../../api/axiosBackend";
import Youtube from "../../components/Youtube";
import { userActions } from "../../slices/userSlice";
import { userAuthActions } from "../../slices/userAuthSlice";
import { useDispatch } from "react-redux";

const PlayMoviePage = () => {
  let { movieId } = useParams();
  let [movie, setMovie] = useState<MovieResults | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      const { data: movieDetail } = await axios.get(`/movie/${movieId}`, {
        params: { append_to_response: "videos" },
      });
      setMovie(movieDetail);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        await axiosBE.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/checkAcessToken`
        );
      } catch (error: any) {
        if (error.response.status === 401) {
          try {
            const resRefresh = await axiosBE.post(
              `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/refreshToken`
            );
            if (resRefresh.status === 201) {
              console.log(resRefresh.data.success);
              dispatch(userActions.refreshAccessTk(resRefresh.data));
            }
          } catch (error: any) {
            dispatch(userAuthActions.logout());
            dispatch(userActions.logout());
          }
        } else {
          dispatch(userAuthActions.logout());
          dispatch(userActions.logout());
        }
      }
    };
    checkAccessToken();
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <S.Container>
      <S.HomeContainer>
        <BiArrowBack
          onClick={() => {
            navigate(-1);
          }}
          style={{
            backgroundColor: "rgba(74, 74, 74, 1)",
            borderRadius: "50%",
            position: "absolute",
            top: "0.8rem",
            left: "0.5rem",
            marginTop: "0.2rem",
            width: "40px",
            height: "40px",
            color: "#ececec",
            zIndex: "1000",
            fontSize: "2.3rem",
            cursor: "pointer",
          }}
        />
        {movie?.videos?.results.length === 0 ? (
          <S.NoVideo>
            <TbAlertCircle
              style={{
                color: "#666",
                fontSize: "calc(1.1rem + 0.5vw)",
                paddingRight: "0.5rem",
              }}
            />
            <S.Text>재생 가능한 영상이 없습니다.</S.Text>
          </S.NoVideo>
        ) : (
          <Youtube
            movieSelected={movie as MovieResults}
            height="100%"
            width="100%"
          />
        )}
      </S.HomeContainer>
    </S.Container>
  );
};

export default PlayMoviePage;
