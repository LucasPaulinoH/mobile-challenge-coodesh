import WordList from "components/WordList";
import { useGetFavoriteWords } from "hooks/useGetFavoriteWords";
import { useGetWordsHistory } from "hooks/useGetWordsHistory";
import useLoadWordList from "hooks/useLoadWordList";
import useStats from "hooks/useStats";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import { WordListMode } from "types/wordListMode";
import { FIREBASE_AUTH } from "utils/firebaseConfig";

export default function Home() {
  const { currentUser } = FIREBASE_AUTH;

  const { setStats } = useStats();

  const wordList = useLoadWordList();
  const favoriteWordIndexes = useGetFavoriteWords(currentUser?.uid!);
  const wordsHistoryIndexes = useGetWordsHistory(currentUser?.uid!);

  const [selectedTab, setSelectedTab] = useState(0);

  const [search, setSearch] = useState("");

  const handleChangeTab = (index: number) => setSelectedTab(index);

  useEffect(() => {
    if (favoriteWordIndexes && wordsHistoryIndexes)
      setStats({
        selectedWordIndex: null,
        favoriteWordIndexes,
        historyIndexes: wordsHistoryIndexes,
      });
  }, [favoriteWordIndexes, wordsHistoryIndexes]);

  const renderWordList = (
    <>
      <WordList words={wordList} search={search} mode={WordListMode.ALL} />
    </>
  );

  const renderHistoryList = (
    <>
      <WordList words={wordList} search={search} mode={WordListMode.HISTORY} />
    </>
  );

  const renderFavoritesList = (
    <>
      <WordList
        words={wordList}
        search={search}
        mode={WordListMode.FAVORITES}
      />
    </>
  );

  return (
    <Container>
      <Text>{currentUser?.email?.split("@")[0]}</Text>
      <Button
        title="Logout"
        onPress={() => {
          FIREBASE_AUTH.signOut();
        }}
      />
      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={(newText) => setSearch(newText)}
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
