import * as Speech from "expo-speech";
import React, { useState } from "react";
import { Icon } from "react-native-eva-icons";
import styled from "styled-components/native";

import IconButton from "./buttons/IconButton";

const ICON_DIMENSIONS = 50;

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
        <Icon
          name="volume-up-outline"
          width={ICON_DIMENSIONS}
          height={ICON_DIMENSIONS}
          fill="rgba(0,0,0,0.5)"
        />
      ) : (
        <IconButton
          icon={
            <Icon
              name="play-circle-outline"
              width={ICON_DIMENSIONS}
              height={ICON_DIMENSIONS}
            />
          }
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
