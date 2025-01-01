import { useEffect, useState } from "react";

import wordsDictionary from "../utils/words_dictionary.json";

const useLoadWordList = () => {
  const [wordList, setWordlist] = useState<string[]>([]);

  useEffect(() => {
    setWordlist(Object.keys(wordsDictionary));
  }, []);

  return wordList;
};

export default useLoadWordList;
