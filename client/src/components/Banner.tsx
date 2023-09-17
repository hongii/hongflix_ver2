import React, { useState, useEffect } from "react";
import requests from "../api/requests";
import axios from "../api/axios";
import type { MovieResults } from "../api/responseMovie";
import MovieModal from "./MovieModal";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/BannerStyle";
import { fetchMovieVideo } from "../services/fetchMovieVideo";

const Banner = () => {
  const [movie, setMovie] = useState<MovieResults | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    // 현재 상영중인 영화 정보들을 가져오기
    try {
      const request = await axios.get(requests.fetchNowPlaying);

      // 가져온 여러개의 영화들 중 하나의 영화 id를 랜덤으로 가져옴
      const movieId =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ].id;

      // 랜덤으로 가져온 영화의 세부정보를 가져오기(video 정보도 포함시킴)
      await fetchMovieVideo(movieId.toString(), setMovie);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.BannerHeader
      imageSrc={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
    >
      <S.Content>
        <S.Title>
          {movie?.title || movie?.name || movie?.original_title}
        </S.Title>

        <S.Buttons>
          <S.PlayButton
            aria-label="play button"
            onClick={() => {
              navigate(`/playmovie/${movie?.id}`);
            }}
          >
            <S.ButtonIcon>▶</S.ButtonIcon>
            <div>재생</div>
          </S.PlayButton>
          <S.InfoButton
            aria-label="info button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <S.ButtonIcon>ⓘ</S.ButtonIcon>
            <div>상세정보</div>
          </S.InfoButton>
        </S.Buttons>

        <S.Description>{movie?.overview}</S.Description>
      </S.Content>
      <S.FadeButton />
      {modalOpen && (
        <MovieModal
          movieSelected={movie as MovieResults}
          setModalOpen={setModalOpen}
        />
      )}
    </S.BannerHeader>
  );
};
export default Banner;
