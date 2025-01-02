import useCustomNavigation from "hooks/useCustomNavigation";
import useSelectedWord from "hooks/useSelectedWord";
import useStats from "hooks/useStats";
import { Button, VirtualizedList } from "react-native";
import { firestoreServices } from "services/firestoreServices";
import { WordListMode } from "types/wordListMode";
import { FIREBASE_AUTH } from "utils/firebaseConfig";

interface WordListProps {
  words: string[];
  search: string;
  mode: WordListMode;
}

const WordList = (props: WordListProps) => {
  const { words, search, mode } = props;
  const { stats } = useStats();

  const handleWordFilter = () => {
    switch (mode) {
      case WordListMode.ALL:
        return words;
      case WordListMode.HISTORY:
        return words
          .filter((_, index) => (stats?.historyIndexes || []).includes(index))
          .filter((word) => word.toLowerCase()?.includes(search.toLowerCase()));
      case WordListMode.FAVORITES:
        return words.filter((_, index) =>
          (stats?.favoriteWordIndexes || []).includes(index),
        );
      default:
        return [];
    }
  };

  const filteredWords = handleWordFilter().filter((word) =>
    word.toLowerCase()?.includes(search.toLowerCase()),
  );

  return (
    <VirtualizedList
      data={filteredWords}
      initialNumToRender={10}
      renderItem={({ item }) => (
        <WordListItem
          word={String(item)}
          selectedWordIndex={words.indexOf(item as string)}
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
  selectedWordIndex: number;
}

const WordListItem = (props: WordListItemProps) => {
  const { navigate } = useCustomNavigation();

  const { setSelectedWord } = useSelectedWord();

  const { word, selectedWordIndex } = props;
  const { currentUser } = FIREBASE_AUTH;
  const { stats, setStats } = useStats();

  const handleWordClick = () => {
    setSelectedWord(word);

    setStats((previousStats) => ({
      ...(previousStats || { historyIndexes: [], favoriteWordIndexes: [] }),
      selectedWordIndex,
    }));

    if (!stats?.historyIndexes!.includes(selectedWordIndex)) {
      stats?.historyIndexes!.push(selectedWordIndex!)!;
      firestoreServices.updateWordHistory(
        currentUser?.uid!,
        stats?.historyIndexes!,
      );
    }

    navigate("WordDetails");
  };

  return <Button title={word} onPress={handleWordClick} />;
};
