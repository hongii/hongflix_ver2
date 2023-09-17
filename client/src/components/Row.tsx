import React, { useCallback, useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import type { MovieResults } from "../api/responseMovie";
import * as S from "../styles/RowStyle";
import { fetchMovieVideo } from "../services/fetchMovieVideo";

/* import Swiper core and required modules */
import { Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

/* Import Swiper styles */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Props {
  title: string;
  id: string;
  fetchURL: string;
  isLargeRow?: boolean;
}

const Row = ({ title, id, fetchURL, isLargeRow }: Props) => {
  let [movies, setMovies] = useState<Array<MovieResults>>([]);
  let [modalOpen, setModalOpen] = useState<boolean>(false);
  let [movieSelected, setMovieSelected] = useState<MovieResults | null>(null);

  const fetchMovieData = useCallback(async () => {
    try {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      // console.log(request.data.results)
    } catch (error) {
      console.log(error);
    }
  }, [fetchURL]);

  const movieClickHandler = async (movie: MovieResults) => {
    if (id !== "OG" && movie.media_type !== "tv") {
      await fetchMovieVideo(movie.id.toString(), setMovieSelected);
    } else {
      setMovieSelected(movie);
    }
    setModalOpen(true);
  };

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  return (
    <S.RowContainer>
      <S.SubTitle>{title}</S.SubTitle>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        loop={true} //슬라이드 끝까지 도달한 경우, 다시 맨처음 요소를 보일지 말지
        spaceBetween={0} // <SwiperSlide> 아이템 사이의 간격
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          //breakpoints는 화면크기에 따라 보여질 영화갯수와 슬라이드 버튼 한번에 몇개씩 넘어갈지 설정
          1580: { slidesPerView: 7, slidesPerGroup: 7 },
          1200: { slidesPerView: 6, slidesPerGroup: 6 },
          980: { slidesPerView: 5, slidesPerGroup: 5 },
          630: { slidesPerView: 4, slidesPerGroup: 4 },
          0: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {movies.map((movie: MovieResults) => {
          if (movie.backdrop_path && movie.poster_path) {
            return (
              <SwiperSlide key={movie.id} className="MySwiper">
                <S.RowPoster
                  isLargeRow={isLargeRow}
                  src={`https://image.tmdb.org/t/p/w300
								${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.title}
                  onClick={() => {
                    movieClickHandler(movie as MovieResults);
                  }}
                />
              </SwiperSlide>
            );
          } else {
            return null;
          }
        })}
      </Swiper>

      {modalOpen && (
        <MovieModal
          rowID={id}
          movieSelected={movieSelected as MovieResults}
          setModalOpen={setModalOpen}
        />
      )}
    </S.RowContainer>
  );
};
export default Row;
