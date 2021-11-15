import * as React from "react";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";

type ImageProps = {
  style?: Image["props"]["style"];
  image?: ImageSourcePropType;
};

export default function LoadingBanner(props: ImageProps) {
  return (
    <Image
      source={
        props.image
          ? props.image
          : require("../../../../assets/images/loading.gif")
      }
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
