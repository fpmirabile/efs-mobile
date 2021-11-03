import * as React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../../constants/colors";

interface Props {
  textStyles?: Text["props"]["style"];
  errorText: string;
}

export default function ErrorText(props: Props) {
  return (
    <Text style={[styles.errorText, props.textStyles]}>{props.errorText}</Text>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.red,
    fontWeight: "500",
    fontFamily: 'redhatdisplay-regular'
  },
});
