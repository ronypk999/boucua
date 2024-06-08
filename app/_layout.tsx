import BouProvider from "@/provider/BouContext";
import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  return (
    <BouProvider>
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
      </Stack>
    </BouProvider>
  );
}
