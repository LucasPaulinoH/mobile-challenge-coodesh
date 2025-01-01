import { useNavigation } from "@react-navigation/native";
import { SelectedWordContext } from "context/SelectedWord";
import useLoadWordList from "hooks/useLoadWordList";
import useSelectedWord from "hooks/useSelectedWord";
import { useContext, useState } from "react";
import { Button, View, Text, VirtualizedList } from "react-native";
import styled from "styled-components/native";
import { FIREBASE_AUTH } from "utils/firebaseConfig";

export default function Home() {
  const { currentUser } = FIREBASE_AUTH;

  const { navigate } = useNavigation();

  const wordList = useLoadWordList();

  const { setSelectedWord } = useSelectedWord();

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChangeTab = (index: number) => setSelectedTab(index);

  const renderWordList = (
    <VirtualizedList
      initialNumToRender={10}
      data={wordList}
      renderItem={({ item }) => (
        <Button
          title={String(item)}
          onPress={() => {
            setSelectedWord(String(item));
            navigate("WordDetails");
          }}
        />
      )}
      getItemCount={(data) => data.length}
      getItem={(data, index) => data[index]}
      keyExtractor={(_, index) => index.toString()}
      windowSize={10}
    />
  );
  const renderHistoryList = <View />;
  const renderFavoritesList = <View />;

  return (
    <Container>
      <Text>{currentUser?.email?.split("@")[0]}</Text>
      <Button
        title="Logout"
        onPress={() => {
          FIREBASE_AUTH.signOut();
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
