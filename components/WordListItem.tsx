import { SelectedWordContext } from "@/context/SelectedWord";
import { useCustomNavigation } from "@/hooks/useNavigation";
import { useContext } from "react";
import { Button, Text } from "react-native";

interface WordListItemProps {
  word: string;
}

const WordListItem = (props: WordListItemProps) => {
  const { navigate } = useCustomNavigation();

  const { word } = props;

  const { setSelectedWord } = useContext(SelectedWordContext);

  return (
    <Button
      onPress={() => {
        setSelectedWord(word);
        navigate("WordDetails");
      }}
      title={word}
    />
  );
};

export default WordListItem;
