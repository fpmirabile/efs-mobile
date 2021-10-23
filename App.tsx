import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./src/navigation";
import Colors from "./src/constants/colors";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar animated={true} backgroundColor={Colors.statusBarBackground} />
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
