import wordsDictionary from "@/utils/words_dictionary.json";
import { useEffect, useState } from "react";

const useLoadWordList = () => {
  const [wordList, setWordlist] = useState<string[]>([]);

  useEffect(() => {
    const wordList = Object.keys(wordsDictionary);
    setWordlist(wordList);
  }, []);

  return wordList;
};

export default useLoadWordList;
