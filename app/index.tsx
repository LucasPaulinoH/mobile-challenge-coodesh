import { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import useLoadWordList from "@/hooks/useLoadWordList";
import WordList from "@/components/WordList";

export default function HomeScreen() {
  const wordList = useLoadWordList();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleChangeTab = (index: number) => setSelectedTab(index);

  const renderWordList = <WordList data={wordList} onItemPress={() => {}} />;
  const renderHistoryList = <View></View>;
  const renderFavoritesList = <View></View>;

  return (
    <Container>
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
