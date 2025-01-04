import { useEffect, useState } from "react";

const WORDS_DICTIONARY_LIST =
  "https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json";

const useLoadWordList = () => {
  const [wordList, setWordlist] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const loadWords = async () => {
    if (isFetching) return;

    setIsFetching(true);
    try {
      const response = await fetch(WORDS_DICTIONARY_LIST);
      const data = await response.json();

      setWordlist(Object.keys(data));
    } catch (error) {
      console.error("Error loading words:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  return { wordList, isFetching };
};

export default useLoadWordList;
