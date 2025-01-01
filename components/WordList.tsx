import useCustomNavigation from "hooks/useCustomNavigation";
import useSelectedWord from "hooks/useSelectedWord";
import useStats from "hooks/useStats";
import { Button, VirtualizedList } from "react-native";

interface WordListProps {
  words: string[];
  search: string;
}

const WordList = (props: WordListProps) => {
  const { words, search } = props;

  const filteredWords = words!.filter((word) =>
    word.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <VirtualizedList
      data={filteredWords}
      initialNumToRender={10}
      renderItem={({ item }) => (
        <WordListItem
          word={String(item)}
          index={words.indexOf(item as string)}
        />
      )}
      getItemCount={(data) => data.length}
      getItem={(data, index) => data[index]}
      keyExtractor={(_, index) => index.toString()}
      windowSize={10}
    />
  );
};

export default WordList;

interface WordListItemProps {
  word: string;
  index: number;
}

const WordListItem = (props: WordListItemProps) => {
  const { navigate } = useCustomNavigation();

  const { word, index } = props;

  const { setSelectedWord } = useSelectedWord();
  const { setStats } = useStats();

  return (
    <Button
      title={word}
      onPress={() => {
        setStats((previousStats) => ({
          ...(previousStats || { historyIndexes: [], favoriteWordIndexes: [] }),
          selectedWordIndex: index,
        }));
        setSelectedWord(word);
        navigate("WordDetails");
      }}
    />
  );
};
