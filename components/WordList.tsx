import WordListItem from "./WordListItem";
import { VirtualizedList } from "react-native";

interface WordListProps {
  data: string[];
  onItemPress: () => void;
}

const WordList = (props: WordListProps) => {
  const { data, onItemPress } = props;
  return (
    <VirtualizedList
      initialNumToRender={10}
      data={data}
      renderItem={({ item }) => (
        <WordListItem word={String(item)} onPress={onItemPress} />
      )}
      getItemCount={(data) => data.length}
      getItem={(data, index) => data[index]}
      keyExtractor={(_, index) => index.toString()}
      windowSize={10}
    />
  );
};

export default WordList;
