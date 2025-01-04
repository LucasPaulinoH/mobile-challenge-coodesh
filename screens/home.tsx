import Input from "components/Input";
import Tabs from "components/Tabs";
import WordList from "components/WordList";
import IconButton from "components/buttons/IconButton";
import { useGetFavoriteWords } from "hooks/useGetFavoriteWords";
import { useGetWordsHistory } from "hooks/useGetWordsHistory";
import useLoadWordList from "hooks/useLoadWordList";
import useStats from "hooks/useStats";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-eva-icons";
import styled from "styled-components/native";
import { WordListMode } from "types/wordListMode";
import { FIREBASE_AUTH } from "utils/firebaseConfig";
import {
  DEFAULT_BUTTON_DIMENSIONS,
  getUsernameFromEmail,
} from "utils/stringUtils";

export default function Home() {
  const { currentUser } = FIREBASE_AUTH;

  const { setStats } = useStats();

  const wordList = ["Hello", "Highway", "World"];
  const { favoriteWords } = useGetFavoriteWords(currentUser?.uid!)!;
  const { wordsHistory } = useGetWordsHistory(currentUser?.uid!)!;

  const [selectedTab, setSelectedTab] = useState(0);

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    setStats(null);
    FIREBASE_AUTH.signOut();
  };

  useEffect(() => {
    setStats({
      selectedWordIndex: null,
      favoriteWordIndexes: favoriteWords,
      historyIndexes: wordsHistory,
    });
  }, [favoriteWords, wordsHistory]);

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
      <Header>
        <Username>{`Welcome, ${getUsernameFromEmail(currentUser?.email!)}!`}</Username>
        <IconButton
          onPress={handleLogout}
          icon={
            <Icon
              name="log-out-outline"
              width={DEFAULT_BUTTON_DIMENSIONS}
              height={DEFAULT_BUTTON_DIMENSIONS}
            />
          }
        />
      </Header>
      <InnerContainer>
        <Input placeholder="Search..." value={search} setValue={setSearch} />

        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === 0
          ? renderWordList
          : selectedTab === 1
            ? renderHistoryList
            : renderFavoritesList}
      </InnerContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 30px;
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  max-width: 400px;
`;

const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Username = styled.Text`
  font-weight: bold;
`;
