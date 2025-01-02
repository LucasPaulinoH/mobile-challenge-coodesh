import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native";

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

  const handlePlay = () => {
    audioRef?.current?.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime!);
    setDuration(audioRef.current?.duration!);
  };

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () =>
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onValueChange={handleSeek}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <audio src={url} ref={audioRef} />
      <Button title="play" onPress={handlePlay} />
    </>
  );
};

export default AudioPlayer;
