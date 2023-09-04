import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import type { MovieResults } from "../api/responseMovie";

interface Props {
  isModal?: boolean;
  setVideoPlay?: (type: boolean) => void;
  movieSelected: MovieResults;
  width: string;
  height: string;
}

const Youtube = ({
  isModal = false,
  setVideoPlay,
  movieSelected,
  width,
  height,
}: Props) => {
  const onPlayerError: YouTubeProps["onError"] = (event) => {
    console.log("Error Number:", event.data);
    if (
      setVideoPlay &&
      (+event.data === 2 ||
        +event.data === 5 ||
        +event.data === 100 ||
        +event.data === 101 ||
        +event.data === 150)
    ) {
      setVideoPlay(false);
    }
  };

  /* 자동 재생 기능(영상이 끝난 후, 다시 영상 재생) 구현 */
  const onPlayerEnd: YouTubeProps["onEnd"] = (event) => {
    event.target.playVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 1,
      mute: 0,
      modestbranding: 1,
      rel: 0,
      loop: 1,
    },
  };

  return (
    <YouTube
      className={`${!isModal && "youtube"}`}
      style={{
        height: !isModal ? "100%" : "auto",
        width: !isModal ? "100%" : "auto",
      }}
      videoId={movieSelected?.videos?.results[0]?.key}
      opts={opts}
      onError={onPlayerError}
      onEnd={onPlayerEnd}
    />
  );
};

export default Youtube;
