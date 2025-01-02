import useCustomNavigation from "hooks/useCustomNavigation";
import { useFetchWordDefinition } from "hooks/useFetchWordDefinition";
import React from "react";
import { Button, View, Text } from "react-native";
import {
  formatWordPhoneticText,
  handleShowMeaningsString,
} from "utils/stringUtils";

const WordDetails = () => {
  const { navigate } = useCustomNavigation();

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
        </View>
      ) : (
        <View>
          <Text>
            <h1>Invalid word</h1>
          </Text>
        </View>
      )}
      <Button title="" />
    </View>
  );
};

export default WordDetails;
