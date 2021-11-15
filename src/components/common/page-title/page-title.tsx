import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";

export interface Props {
  containerStyle?: View["props"]["style"];
  titleStyle?: Text["props"]["style"];
  title: string;
}

export default function PageTitle(props: Props) {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: Colors.blue,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: 'bold',
    fontFamily: Fonts.redhatRegular
  },
});
