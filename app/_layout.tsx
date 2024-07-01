import BouProvider from "@/provider/BouContext";
import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { useState } from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <BouProvider>
      <StatusBar backgroundColor={"#000"} hidden={true} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="play"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="play2"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </BouProvider>
  );
}
