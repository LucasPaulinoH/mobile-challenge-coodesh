import { SelectedWordContext } from "@/context/SelectedWord";
import { Link, useNavigation } from "expo-router";
import { useContext, useEffect } from "react";
import { Button, Text } from "react-native";

interface WordListItemProps {
  word: string;
}

const WordListItem = (props: WordListItemProps) => {
  const { word } = props;

  const { selectedWord, setSelectedWord } = useContext(SelectedWordContext);

  return (
    <Link href="/WordDetails">
      <Button
        onPress={() => {
          setSelectedWord(word);
        }}
        title={word}
      />
    </Link>
  );
};

export default WordListItem;
