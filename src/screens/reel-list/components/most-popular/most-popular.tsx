import * as React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ViewStyle,
  TextStyle,
  Text,
  Image,
} from "react-native";
import { Icon } from "react-native-material-ui";

interface Props {
  backgroundImageStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onImageLoadError: () => string;
}

interface ItemProps {
  item: any;
  // imageUri: string;
  // title: string;
  // likesQuantity: string;
  index: number;
}

export default (props: Props) => (itemProps: ItemProps) => {
  return (
    <ImageBackground
      imageStyle={styles.image}
      source={{ uri: itemProps.item.imageUri }}
      style={[styles.imageBackground, props.backgroundImageStyle]}
      onError={props.onImageLoadError}
    >
      <View style={[styles.textContainer, props.textContainerStyle]}>
        <Text style={[styles.popularText, props.titleStyle]}>
          {itemProps.item.title}
        </Text>
        <View style={styles.likesContainer}>
          <Image
            source={require("../../../../../assets/images/misc/thumb_up.png")}
            style={styles.likeIcon}
          />
          <Text style={styles.popularText}>{itemProps.item.likesQuantity}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageBackground: {
    flex: 1,
    height: 146,
    width: 276,
    justifyContent: "flex-end",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "rgba(22, 2, 102, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 11,
  },
  popularText: {
    lineHeight: 16,
    fontSize: 14,
    letterSpacing: 0.1,
    color: "#FFFFFF",
    maxWidth: 156,
  },
  likesContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  likeIcon: {
    height: 24,
    width: 24,
    tintColor: "#FFFFFF",
    marginBottom: 4,
  },
});
