import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Audio } from "expo-av";
import win from "../assets/win.mp3";
import shake from "../assets/shake.mp3";

type BouContextType = {
  sound: Audio.Sound | null;
  shakeSound: Audio.Sound | null;
  winSound: Audio.Sound | null;
  setSound: React.Dispatch<React.SetStateAction<Audio.Sound | null>>;
};

export const BouContext = createContext<BouContextType | null>(null);

type BouProviderProps = {
  children: ReactNode;
};

const BouProvider = ({ children }: BouProviderProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [shakeSound, setShakeSound] = useState<Audio.Sound | null>(null);
  const [winSound, setWinSound] = useState<Audio.Sound | null>(null);

  async function loadShakeSound() {
    const { sound } = await Audio.Sound.createAsync(shake as any);
    setShakeSound(sound);
  }
  async function loadWinSound() {
    const { sound } = await Audio.Sound.createAsync(win as any);
    setWinSound(sound);
  }

  useEffect(() => {
    loadShakeSound();
    loadWinSound();
  }, []);

  const contextValues: BouContextType = {
    sound,
    setSound,
    shakeSound,
    winSound,
  };

  return (
    <BouContext.Provider value={contextValues}>{children}</BouContext.Provider>
  );
};

export default BouProvider;
