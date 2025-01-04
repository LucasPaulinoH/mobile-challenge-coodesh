import useCustomNavigation from "hooks/useCustomNavigation";
import useSelectedWord from "hooks/useSelectedWord";
import useStats from "hooks/useStats";
import { Text, View, VirtualizedList } from "react-native";
import {
  FIRESTORE_HISTORY_COLLECTION_NAME,
  firestoreServices,
} from "services/firestoreServices";
import styled from "styled-components/native";
import { WordListMode } from "types/wordListMode";
import { FIREBASE_AUTH } from "utils/firebaseConfig";

import Loading from "./Loading";

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

  const chunkArray = (array: string[], size: number) => {
    const result = [];

    for (let i = 0; i < array.length; i += size)
      result.push(array.slice(i, i + size));

    return result;
  };

  const chunkedWords = chunkArray(filteredWords, 3);

  return (
    <VirtualizedList
      data={chunkedWords}
      initialNumToRender={250}
      renderItem={({ item }: { item: string[] }) => (
        <WordListItemRow>
          {item.map((word: string, index: number) => (
            <WordListItem
              key={index}
              word={word}
              selectedWordIndex={words.indexOf(word)}
            />
          ))}
        </WordListItemRow>
      )}
      getItemCount={(data) => data.length}
      getItem={(data, index) => data[index]}
      keyExtractor={(_, index) => index.toString()}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        chunkedWords.length > 100 ? (
          <View style={{ alignSelf: "flex-start" }}>
            <Loading />
          </View>
        ) : null
      }
      windowSize={100}
    />
  );
};

export default WordList;

const WordListItemRow = styled.View`
  flex-direction: row;
  min-width: 100%;
  margin-bottom: 10px;
  gap: 10px;
`;

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

    const updatedHistory = stats?.historyIndexes! || [];

    if (!updatedHistory.includes(selectedWordIndex)) {
      updatedHistory.push(selectedWordIndex)!;

      firestoreServices.updateCollection(
        currentUser?.uid!,
        FIRESTORE_HISTORY_COLLECTION_NAME,
        { history: updatedHistory },
      );
    }

    navigate("WordDetails");
  };

  return (
    <WordListItemContainer onPress={handleWordClick}>
      <Text>{word}</Text>
    </WordListItemContainer>
  );
};

const WordListItemContainer = styled.TouchableOpacity`
  background-color: #eee;
  padding: 10px;
  border-radius: 5px;
`;
