import * as React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ViewStyle,
  TextStyle,
  Text,
} from "react-native";

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
        <Text style={[styles.title, props.titleStyle]}>
          {itemProps.item.title}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageBackground: {
    flex: 1,
    height: 139,
    width: 140,
    justifyContent: 'flex-end',
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#C4C4C4",
    paddingHorizontal: 8,
    paddingVertical: 11
  },
  title: {
    lineHeight: 16,
    fontSize: 12,
    letterSpacing: 0.4,
    color: "#000000"
  },
});
