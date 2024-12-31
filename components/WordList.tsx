import WordListItem from "./WordListItem";
import { View, VirtualizedList } from "react-native";

interface WordListProps {
  data: string[];
}

const WordList = (props: WordListProps) => {
  const { data } = props;

  return (
    <VirtualizedList
      initialNumToRender={10}
      data={data}
      renderItem={({ item }) => <WordListItem word={String(item)} />}
      getItemCount={(data) => data.length}
      getItem={(data, index) => data[index]}
      keyExtractor={(_, index) => index.toString()}
      windowSize={10}
    />
  );
};

export default WordList;
