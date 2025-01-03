import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { GiSoundWaves } from "react-icons/gi";
import { IoIosPlay } from "react-icons/io";
import styled from "styled-components/native";
import { DEFAULT_BUTTON_DIMENSIONS } from "utils/stringUtils";

import IconButton from "./buttons/IconButton";

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer = (props: AudioPlayerProps) => {
  const { url } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSeek = (e: any) => {
    audioRef!.current!.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const togglePlay = () => {
    audioRef?.current?.play();
    setIsPlaying(true);
  };

  const handleAudioEnding = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime!);
    setDuration(audioRef.current?.duration!);
  };

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current?.addEventListener("ended", handleAudioEnding);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current?.removeEventListener("ended", handleAudioEnding);
    };
  }, []);

  return (
    <AudioPlayerContainer>
      {!isPlaying ? (
        <IconButton
          onPress={togglePlay}
          icon={
            <IoIosPlay
              style={{
                width: DEFAULT_BUTTON_DIMENSIONS,
                height: DEFAULT_BUTTON_DIMENSIONS,
              }}
            />
          }
        />
      ) : (
        <GiSoundWaves
          style={{
            width: DEFAULT_BUTTON_DIMENSIONS,
            height: DEFAULT_BUTTON_DIMENSIONS,
          }}
        />
      )}

      <SliderContainer>
        <Slider
          style={{ height: 10, width: "100%" }}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={handleSeek}
          thumbTintColor="#000"
        />
      </SliderContainer>
      <audio src={url} ref={audioRef} />
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;

const AudioPlayerContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 400px;
  width: 100%;
  margin: 0;
`;

const SliderContainer = styled.View`
  width: 89%;
  max-width: 400px;
`;
