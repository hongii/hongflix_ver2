import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../api/axios";
import axiosBE from "../../api/axiosBackend";
import { useDebounce } from "../../hooks/useDebounce";
import { MovieResults } from "../../api/responseMovie";
import MovieModal from "../../components/MovieModal";
import * as S from "../../styles/SearchPageStyle";
import { userActions, userAuthActions } from "../../store";
import { useDispatch } from "react-redux";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Array<MovieResults>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [movieSelected, setMovieSelected] = useState<MovieResults | null>(null);
  const [searchParams] = useSearchParams();

  let searchTerm = searchParams.get("q");
  let debouncedSearchTerm = useDebounce(searchTerm as string, 500);
  const dispatch = useDispatch();

  const fetchSearchMovie = async (debouncedSearchTerm: string) => {
    try {
      const request = await axios.get(
        `/search/movie?include_adult=false&query=${debouncedSearchTerm}`
      );
      setSearchResults(request.data.results);
      // console.log("search movie results : ", request.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        await axiosBE.post("/api/auth/checkAcessToken");
      } catch (error: any) {
        if (error.response.status === 401 || error.response.status === 404) {
          try {
            const resRefresh = await axiosBE.post("/api/auth/refreshToken");
            if (resRefresh.status === 201) {
              console.log(resRefresh.data.success);
              dispatch(userActions.refreshAccessTk(resRefresh.data));
            }
          } catch (error) {
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
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const movieClickHandler = async (movie: MovieResults) => {
    try {
      await fetchMovieVideo(movie);
      // console.log("clicked movie response : ", movieSelected);
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieVideo = async (movie: MovieResults) => {
    try {
      const { data: movieDetail } = await axios.get(`/movie/${movie.id}`, {
        params: { append_to_response: "videos" },
      });
      setMovieSelected(movieDetail);
    } catch (error) {
      console.log(error);
    }
  };

  if (
    searchResults.length === 0 ||
    (searchResults.length === 1 && searchResults[0].backdrop_path === null)
  ) {
    return (
      <S.NoResults>
        <S.NoResultsText>
          <p>
            찾고자 하는 검색어 "{debouncedSearchTerm}"에 해당하는 영화가
            없습니다.
          </p>
        </S.NoResultsText>
      </S.NoResults>
    );
  } else {
    /* 찾는 영화 정보가 있는 경우*/
    return (
      <S.SearchContainer>
        <S.MovieItemsContainer>
          {searchResults.map((movie: MovieResults) => {
            if (movie.backdrop_path !== null) {
              const movieImageURL =
                "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <S.ColumnPoster
                  key={movie.id}
                  onClick={() => {
                    movieClickHandler(movie as MovieResults);
                  }}
                >
                  <S.MoviePoster src={movieImageURL} alt="no movie images" />
                  <S.Title>{movie.title}</S.Title>
                </S.ColumnPoster>
              );
            } else {
              return null;
            }
          })}
        </S.MovieItemsContainer>

        {modalOpen && (
          <MovieModal
            movieSelected={movieSelected as MovieResults}
            setModalOpen={setModalOpen}
          />
        )}
      </S.SearchContainer>
    );
  }
};

export default SearchPage;
