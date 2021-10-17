import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

export interface Props {
  containerStyle?: View["props"]["style"];
  titleStyle?: Text["props"]["style"];
  title: string;
  children: React.ReactNode;
}

export default function SectionReel(props: Props) {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={[styles.title, props.titleStyle]}>
        {props.title}
      </Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: '#160266',
    fontWeight: 'bold'
  }
});
