import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import styled from "styled-components/native";
import useLoadWordList from "@/hooks/useLoadWordList";
import WordList from "@/components/WordList";
import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import { useCustomNavigation } from "@/hooks/useNavigation";
import { useGetFavoriteWords } from "@/hooks/useGetFavoriteWords";
import { useGetWordsHistory } from "@/hooks/useGetWordsHistory";

export default function HomeScreen() {
  const { navigate } = useCustomNavigation();

  const { currentUser } = FIREBASE_AUTH;
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const wordList = useLoadWordList();
  const favoriteWordIndexes = useGetFavoriteWords(currentUser?.uid!);
  const wordsHistoryIndexes = useGetWordsHistory(currentUser?.uid!);

  const handleChangeTab = (index: number) => setSelectedTab(index);

  const renderWordList = (
    <View>
      <WordList data={wordList} />
    </View>
  );

  const renderHistoryList = (
    <View>
      <WordList
        data={wordList.filter((_, index) =>
          wordsHistoryIndexes.includes(index)
        )}
      />
    </View>
  );
  const renderFavoritesList = (
    <View>
      <WordList
        data={wordList.filter((_, index) =>
          favoriteWordIndexes.includes(index)
        )}
      />
    </View>
  );

  return (
    <Container>
      <Text>{currentUser?.email?.split("@")[0]}</Text>
      <Button
        title="Logout"
        onPress={() => {
          FIREBASE_AUTH.signOut();
          navigate("index");
        }}
      />
      <Tabs>
        <Tab title="Word list" onPress={() => handleChangeTab(0)} />
        <Tab title="History" onPress={() => handleChangeTab(1)} />
        <Tab title="Favorites" onPress={() => handleChangeTab(2)} />
      </Tabs>

      {selectedTab === 0
        ? renderWordList
        : selectedTab === 1
        ? renderHistoryList
        : renderFavoritesList}
    </Container>
  );
}

const Container = styled.View`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tabs = styled.View`
  display: flex;
  flex-direction: row;
`;

const Tab = styled.Button``;
