import { Image, Text, TouchableOpacity, View } from "react-native";
import SoundOn from "../assets/images/sound_on.png";
import SoundOff from "../assets/images/sound_off.png";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import song from "../assets/song.mp3";

type BouContextType = {
  sound: Audio.Sound | null;
  setSound: React.Dispatch<React.SetStateAction<Audio.Sound | null>>;
};

export default function Song({ sound, setSound }: BouContextType) {
  {
    const [isSongPlaying, setIsSongPlaying] = useState(true);
    const handlePlay = async () => {
      if (sound) {
        await sound.stopAsync(); // Stop the sound first
        await sound.playAsync(); // Then play the sound
      } else {
        playSound();
      }
    };

    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(song as any, {
        shouldPlay: true,
        isLooping: true,
      });
      setSound(sound);
    }

    useEffect(() => {
      handlePlay();
    }, []);

    const handleSongPress = async () => {
      setIsSongPlaying(!isSongPlaying);
      if (sound) {
        const status = await sound.getStatusAsync();
        if ((status as any).isPlaying) {
          await sound.pauseAsync(); // Stop the sound first
        } else {
          await sound.playAsync(); // Then play the sound
        }
      }
    };

    return (
      <TouchableOpacity onPress={handleSongPress}>
        <Image
          source={isSongPlaying ? SoundOn : (SoundOff as any)}
          style={{ maxHeight: 70, resizeMode: "contain" }}
        ></Image>
      </TouchableOpacity>
    );
  }
}
