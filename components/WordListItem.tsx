import { Button, Text } from "react-native";

interface WordListItemProps {
  word: string;
  onPress: () => void;
}

const WordListItem = (props: WordListItemProps) => {
  const { word, onPress } = props;
  return <Button onPress={onPress} title={word} />;
};

export default WordListItem;
