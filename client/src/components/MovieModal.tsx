import React, { useRef, useState, useEffect } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import type { MovieResults } from "../api/responseMovie";
import { useNavigate } from "react-router-dom";
import Youtube from "./Youtube";
import { IoIosCloseCircle } from "@react-icons/all-files/io/IoIosCloseCircle";
import * as S from "../styles/MovieModalStyle";

interface Props {
  movieSelected: MovieResults;
  setModalOpen: (type: boolean) => void;
  rowID?: string;
}

const MovieModal = ({ movieSelected, setModalOpen, rowID }: Props) => {
  let ref = useRef<HTMLDivElement>(null); // "modal"이라는 클래스가 있는 DOM객체를 포함하는지 판별하기 위한 객체
  const [isVideoPlay, setVideoPlay] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  useOnClickOutside(ref, setIsOpen); // 모달창 외부를 클릭했는지 판별

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isOpen) {
      timer = setTimeout(() => {
        setModalOpen(false);
      }, 300);
    }
    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [isOpen, setModalOpen]);

  return (
    <S.Presentation>
      <S.WrapperModal>
        <S.Modal isClosed={!isOpen} ref={ref}>
          <IoIosCloseCircle
            className="modal__closed"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          {movieSelected.media_type === "tv" ||
          movieSelected?.videos?.results.length === 0 ||
          movieSelected?.videos === undefined ||
          rowID === "OG" ? (
            <S.PosterImg
              src={`https://image.tmdb.org/t/p/original${movieSelected.backdrop_path}`}
              alt="modal__poster--img"
            />
          ) : isVideoPlay ? (
            <Youtube
              isModal={true}
              setVideoPlay={setVideoPlay}
              movieSelected={movieSelected}
              width="100%"
              height="450"
            />
          ) : (
            <S.PosterImg
              src={`https://image.tmdb.org/t/p/original${movieSelected.backdrop_path}`}
              alt="modal__poster--img"
            />
          )}

          <S.Content>
            <S.Details>
              {movieSelected?.videos?.results[0] && (
                <S.PlayButton
                  aria-label="play button"
                  onClick={() => {
                    navigate(`/playmovie/${movieSelected.id}`);
                  }}
                >
                  <S.ButtonIcon>▶</S.ButtonIcon>
                  <div>재생</div>
                </S.PlayButton>
              )}
              <S.UserPer>
                {Math.round(movieSelected.vote_average * 10)}% 일치
              </S.UserPer>

              <S.Date>
                {movieSelected.release_date
                  ? `개봉일: ${movieSelected.release_date}`
                  : `개봉일: ${movieSelected.first_air_date}`}
              </S.Date>

              <S.Runtime>
                {movieSelected.runtime &&
                  `상영시간: ${movieSelected.runtime}분 `}
              </S.Runtime>
              {movieSelected.genres?.length > 0 && (
                <S.Genre>
                  <S.GenreItem>장르: </S.GenreItem>
                  {movieSelected.genres.map((movie, i) => {
                    return i === movieSelected.genres.length - 1 ? (
                      <S.GenreItem key={movie.id}>{movie.name}</S.GenreItem>
                    ) : (
                      <S.GenreItem
                        key={movie.id}
                      >{`${movie.name}, `}</S.GenreItem>
                    );
                  })}
                </S.Genre>
              )}
              <S.Title>
                {movieSelected.title ? movieSelected.title : movieSelected.name}
              </S.Title>

              <S.Overview>{movieSelected.overview}</S.Overview>
            </S.Details>
          </S.Content>
        </S.Modal>
      </S.WrapperModal>
    </S.Presentation>
  );
};
export default MovieModal;
