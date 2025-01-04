import AudioPlayer from "components/AudioPlayer";
import Loading from "components/Loading";
import FavoriteButton from "components/buttons/FavoriteButton";
import IconButton from "components/buttons/IconButton";
import useCustomNavigation from "hooks/useCustomNavigation";
import { useFetchWordDefinition } from "hooks/useFetchWordDefinition";
import useStats from "hooks/useStats";
import { View, Text } from "react-native";
import { Icon } from "react-native-eva-icons";
import styled from "styled-components/native";
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
            <Icon
              name="arrow-ios-back-outline"
              width={DEFAULT_BUTTON_DIMENSIONS}
              height={DEFAULT_BUTTON_DIMENSIONS}
            />
          }
        />
      </BackButtonContainer>
      {!isLoading ? (
        <View>
          {wordDefinition ? (
            <WordInfoContainer>
              <WordAndPhoneticsBoard>
                <Text>{wordDefinition?.word}</Text>
                <Text>
                  {`${
                    formatWordPhoneticText(
                      wordDefinition?.phonetics[0]?.text,
                    ) ||
                    formatWordPhoneticText(
                      wordDefinition?.phonetics[1]?.text,
                    ) ||
                    "No phonetics found"
                  } `}
                </Text>
              </WordAndPhoneticsBoard>

              <View style={{ marginBottom: -20 }}>
                <AudioPlayer text={wordDefinition?.word!} />
              </View>

              <MeaningsContainer>
                <Text>Meanings</Text>
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
              <Text style={{ textAlign: "center" }}>Invalid word</Text>
              <Text style={{ textAlign: "center" }}>
                Please search for a valid word to view its meaning.
              </Text>
            </WordInfoContainer>
          )}
        </View>
      ) : (
        <View>
          <Loading />
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
  margin-top: 20px;
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
