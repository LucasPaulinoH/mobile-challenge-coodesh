import { Meanings } from "types/meanings";

export const formatWordPhoneticText = (phonetic: string) =>
  phonetic?.replaceAll("/", "");

const formatWordMeaningText = (text: string) => text;

export const handleShowMeaningsString = (meanings: Meanings[]): string[] => {
  const formattedMeaningStrings: string[] = [];

  if (meanings)
    meanings.forEach((meaning) => {
      formattedMeaningStrings.push(
        formatWordMeaningText(
          `${meaning.partOfSpeech} - ${meaning.definitions[0].definition}`,
        ),
      );
    });

  return formattedMeaningStrings;
};
