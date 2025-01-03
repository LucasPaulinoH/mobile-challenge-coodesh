import AudioPlayer from "components/AudioPlayer";
import FavoriteButton from "components/buttons/FavoriteButton";
import IconButton from "components/buttons/IconButton";
import useCustomNavigation from "hooks/useCustomNavigation";
import { useFetchWordDefinition } from "hooks/useFetchWordDefinition";
import useStats from "hooks/useStats";
import { IoChevronBackOutline } from "react-icons/io5";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { searchForPhoneticAudioSource } from "utils/diverse";
import {
  DEFAULT_BUTTON_DIMENSIONS,
  formatWordPhoneticText,
  handleShowMeaningsString,
} from "utils/stringUtils";

const WordDetails = () => {
  const { navigate } = useCustomNavigation();

  const { stats } = useStats();

  const { wordDefinition, isLoading } = useFetchWordDefinition();

  let meanings: string[] = [];

  if (wordDefinition)
    meanings = handleShowMeaningsString(wordDefinition?.meanings!);

  return (
    <Container>
      <BackButtonContainer>
        <IconButton
          onPress={() => navigate("Home")}
          icon={
            <IoChevronBackOutline
              style={{
                width: DEFAULT_BUTTON_DIMENSIONS,
                height: DEFAULT_BUTTON_DIMENSIONS,
              }}
            />
          }
        />
      </BackButtonContainer>
      {!isLoading ? (
        <View>
          {wordDefinition ? (
            <WordInfoContainer>
              <WordAndPhoneticsBoard>
                <Text>
                  <h1>{wordDefinition?.word}</h1>
                </Text>
                <Text>
                  <h2>
                    {`${
                      formatWordPhoneticText(
                        wordDefinition?.phonetics[0]?.text,
                      ) || ""
                    } ${
                      formatWordPhoneticText(
                        wordDefinition?.phonetics[1]?.text,
                      ) || ""
                    } `}
                  </h2>
                </Text>
              </WordAndPhoneticsBoard>

              {searchForPhoneticAudioSource(wordDefinition?.phonetics)! && (
                <AudioPlayer
                  url={searchForPhoneticAudioSource(wordDefinition?.phonetics)!}
                />
              )}

              <MeaningsContainer>
                <Text>
                  <h3>Meanings</h3>
                </Text>
                <MeaningsInnerContainer>
                  {meanings.map((meaning, index) => (
                    <Text key={index}>- {meaning}</Text>
                  ))}
                </MeaningsInnerContainer>
              </MeaningsContainer>

              <FavoriteButtonContainer>
                <FavoriteButton stats={stats!} />
              </FavoriteButtonContainer>
            </WordInfoContainer>
          ) : (
            <WordInfoContainer>
              <Text style={{ textAlign: "center" }}>
                <h1>Invalid word</h1>
                <p>Please search for a valid word to view its meaning.</p>
              </Text>
            </WordInfoContainer>
          )}
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </Container>
  );
};

export default WordDetails;

const Container = styled.View`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 50px;
`;

const BackButtonContainer = styled.View`
  align-self: flex-start;
`;

const WordInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  max-width: 400px;
`;

const WordAndPhoneticsBoard = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const MeaningsContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MeaningsInnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: justify;
`;

const FavoriteButtonContainer = styled.View`
  width: 100%;
  margin: 30px 0px;
`;
