import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Audio } from "expo-av";

type BouContextType = {
  sound: Audio.Sound | null;
  setSound: React.Dispatch<React.SetStateAction<Audio.Sound | null>>;
};

export const BouContext = createContext<BouContextType | null>(null);

type BouProviderProps = {
  children: ReactNode;
};

const BouProvider = ({ children }: BouProviderProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const contextValues: BouContextType = {
    sound,
    setSound,
  };

  return (
    <BouContext.Provider value={contextValues}>{children}</BouContext.Provider>
  );
};

export default BouProvider;
