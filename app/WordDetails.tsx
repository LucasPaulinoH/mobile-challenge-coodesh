import { useFetchWordDefinition } from "@/hooks/useFetchWordDefinition";
import {
  formatWordPhoneticText,
  handleShowMeaningsString,
} from "@/utils/stringUtils";
import { View, Text } from "react-native";

const WordDetails = () => {
  const { wordDefinition } = useFetchWordDefinition();
  let meanings: string[] = [];

  if (wordDefinition) {
    console.log(wordDefinition);
    meanings = handleShowMeaningsString(wordDefinition?.meanings!);
  }

  return (
    <View>
      {wordDefinition ? (
        <View>
          <Text>
            <h1>{wordDefinition?.word}</h1>
            <h2>{formatWordPhoneticText(wordDefinition?.phonetics[1].text)}</h2>
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
      ) : null}
    </View>
  );
};

export default WordDetails;
