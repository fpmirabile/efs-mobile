import * as React from "react";
import {
  StyleSheet,
  ImageSourcePropType,
  View,
  StyleProp,
  ImageStyle,
} from "react-native";
import LoadingBanner from "../loading-banner/loading-banner";

interface PropTypes {
  image?: ImageSourcePropType;
  loadingPageStyles?: View["props"]["style"];
  loadingBannerStyles?: StyleProp<ImageStyle>;
  isLoading: boolean;
  children: JSX.Element;
}

export default function LoadingPage(props: PropTypes) {
  if (props.isLoading) {
    return (
      <View style={[styles.loadingPage, props.loadingPageStyles]}>
        <LoadingBanner
          image={props.image}
          style={[styles.loadingBanner, props.loadingBannerStyles]}
        />
      </View>
    );
  }

  return props.children;
}

const styles = StyleSheet.create({
  loadingPage: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingBanner: {
    width: 150,
    height: 150,
  }
});
