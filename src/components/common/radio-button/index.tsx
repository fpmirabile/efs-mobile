import * as React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton } from "react-native-material-ui";
import Container from "../container";

type RadioProps =  RadioButton["props"];
 

export default function RadioButtonComponent(props: RadioProps) {
  return <RadioButton {...props} />
}


