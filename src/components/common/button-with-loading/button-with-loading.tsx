import * as React from "react";
import { StyleSheet } from "react-native";
import { Button as MaterialButton } from "react-native-material-ui";
import LoadingBanner from "../loading-banner/loading-banner";

type ButtonWithLoadingProps = MaterialButton["props"] & {
  isLoading?: boolean;
};

export default function ButtonWithLoading(props: ButtonWithLoadingProps) {
  if (props.isLoading) {
    return <MaterialButton {...props} text="" icon={<LoadingBanner />} />;
  }

  return <MaterialButton {...props} />;
}
