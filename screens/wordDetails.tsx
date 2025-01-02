import AudioPlayer from "components/AudioPlayer";
import FavoriteButton from "components/FavoriteButton";
import useCustomNavigation from "hooks/useCustomNavigation";
import { useFetchWordDefinition } from "hooks/useFetchWordDefinition";
import useStats from "hooks/useStats";
import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { searchForPhoneticAudioSource } from "utils/diverse";
import {
  formatWordPhoneticText,
  handleShowMeaningsString,
} from "utils/stringUtils";

const WordDetails = () => {
  const { navigate } = useCustomNavigation();

  const { stats } = useStats();

  const { wordDefinition } = useFetchWordDefinition();

  let meanings: string[] = [];

  if (wordDefinition)
    meanings = handleShowMeaningsString(wordDefinition?.meanings!);

  return (
    <View>
      <Button title="<" onPress={() => navigate("Home")} />
      {wordDefinition ? (
        <View>
          <Text>
            <h1>{wordDefinition?.word}</h1>

            <h2>
              {formatWordPhoneticText(wordDefinition?.phonetics[0]?.text) ||
                null}
            </h2>
            <h2>
              {formatWordPhoneticText(wordDefinition?.phonetics[1]?.text) ||
                null}
            </h2>
          </Text>

          <View>
            <Text>
              <h3>Meanings</h3>
            </Text>
            {meanings.map((meaning, index) => (
              <Text key={index}>{meaning}</Text>
            ))}
          </View>

          <AudioPlayer
            url={searchForPhoneticAudioSource(wordDefinition?.phonetics)!}
          />
        </View>
      ) : (
        <View>
          <Text>
            <h1>Invalid word</h1>
          </Text>
        </View>
      )}
      <FavoriteButton stats={stats!} />
    </View>
  );
};

export default WordDetails;
