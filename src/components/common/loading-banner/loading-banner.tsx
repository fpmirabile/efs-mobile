import * as React from "react";
import { StyleSheet, Image } from "react-native";

type ImageProps = {
  style?: Image["props"]["style"];
};

export default function LoadingBanner(props: ImageProps) {
  return (
    <Image
      source={require("../../../../assets/images/loading.gif")}
      style={[styles.loadingBanner, props.style]}
      resizeMode="stretch"
    />
  );
}

const styles = StyleSheet.create({
  loadingBanner: {
    height: 35,
    width: 35,
  },
});
