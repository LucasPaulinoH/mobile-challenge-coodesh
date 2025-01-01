import { useState } from "react";

import { SelectedWordContext } from ".";

const SelectedWordContextProvider = ({ children }: any) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  return (
    <SelectedWordContext.Provider value={{ selectedWord, setSelectedWord }}>
      {children}
    </SelectedWordContext.Provider>
  );
};

export default SelectedWordContextProvider;
