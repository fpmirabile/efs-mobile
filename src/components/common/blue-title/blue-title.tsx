import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

type BlueTitleProps = {
  viewStyles?: View["props"]["style"];
  textStyles?: Text["props"]["style"];
  titleText: string;
};

export default function BlueTitle(props: BlueTitleProps) {
  return (
    <View style={[styles.view, props.viewStyles]}>
      <Text style={[styles.title, props.textStyles]}>{props.titleText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    textAlign: 'center',
    color: '#160266'
  }
});