import * as React from "react";
import { View, Image, StyleSheet } from "react-native";
import Colors from "./src/constants/colors";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./assets/images/logo/logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    height: 232,
    width: 232
  },
});
