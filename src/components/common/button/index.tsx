import * as React from "react";
import { Button as MaterialButton } from "react-native-material-ui";

type ButtonProps = MaterialButton["props"];

export default function Button(props: ButtonProps) {
  return <MaterialButton {...props} />;
}
