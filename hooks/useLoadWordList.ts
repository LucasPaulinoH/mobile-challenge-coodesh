import { useEffect, useMemo, useState } from "react";

import wordsDictionary from "../utils/words_dictionary.json";

const useLoadWordList = () => {
  const [wordList, setWordlist] = useState<string[]>([]);

  // useEffect(() => {
  //   setWordlist(Object.keys(wordsDictionary).splice(0, 1000));
  // }, []);

  return useMemo(() => wordList, [wordList]);
};

export default useLoadWordList;
