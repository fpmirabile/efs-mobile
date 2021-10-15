import * as React from "react";
import { View, StyleSheet } from "react-native";

type ButtonProps = View["props"];

export default function Container(props: ButtonProps) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
