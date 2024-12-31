import { createContext, Dispatch, SetStateAction } from "react";

interface SelectedWordContextType {
  selectedWord: string | null;
  setSelectedWord: Dispatch<SetStateAction<string | null>>;
}

export const SelectedWordContext = createContext<SelectedWordContextType>({
  selectedWord: "Hello",
  setSelectedWord: () => {},
} as SelectedWordContextType);
