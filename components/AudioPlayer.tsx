import * as Speech from "expo-speech";
import React, { useState } from "react";
import { GiSoundWaves } from "react-icons/gi";
import { IoIosPlay } from "react-icons/io";
import styled from "styled-components/native";

import IconButton from "./buttons/IconButton";

const ICON_DIMENSIONS = "50px";

interface AudioPlayerProps {
  text: string;
}

const AudioPlayer = (props: AudioPlayerProps) => {
  const { text } = props;

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(true);
    Speech.speak(text, {
      language: "en-US",
      onDone: () => setIsPlaying(false),
    });
  };

  return (
    <AudioPlayerContainer>
      {isPlaying ? (
        <GiSoundWaves style={IconStyles} color="#b1b1b1" />
      ) : (
        <IconButton
          icon={<IoIosPlay style={IconStyles} />}
          onPress={togglePlay}
        />
      )}
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

const IconStyles = {
  width: ICON_DIMENSIONS,
  height: ICON_DIMENSIONS,
};
