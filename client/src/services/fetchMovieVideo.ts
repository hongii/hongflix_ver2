import { MovieResults } from "../api/responseMovie";
import axios from "../api/axios";

export const fetchMovieVideo = async (
  movieId: string | undefined,
  setFunc: (data: MovieResults) => void
) => {
  try {
    const { data: movieDetail } = await axios.get(`/movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    // console.log("clicked movie details : ", movieDetail);
    setFunc(movieDetail);
  } catch (error) {
    console.log(error);
  }
};
