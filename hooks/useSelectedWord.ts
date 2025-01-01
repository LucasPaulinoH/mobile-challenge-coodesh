import { SelectedWordContext } from "context/SelectedWord";
import { useContext } from "react";

const useSelectedWord = () => useContext(SelectedWordContext);

export default useSelectedWord;
