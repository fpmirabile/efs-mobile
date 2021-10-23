import * as React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ViewStyle,
  TextStyle,
  Text,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Reel } from "../../../../api/models/reels";

interface Props {
  backgroundImageStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onImageLoadError: () => string;
  onPressVideo: () => void;
}

interface ItemProps {
  item: Reel;
  index: number;
}

export default (props: Props) => (itemProps: ItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPressVideo}>
      <ImageBackground
        imageStyle={styles.image}
        source={{
          uri:
            itemProps.item.imageUri ||
            "https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg",
        }}
        style={[styles.imageBackground, props.backgroundImageStyle]}
        onError={props.onImageLoadError}
      >
        <View style={[styles.textContainer, props.textContainerStyle]}>
          <Text style={[styles.title, props.titleStyle]}>
            {itemProps.item.titulo}
          </Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
    height: 139,
    width: 140,
    justifyContent: "flex-end",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#C4C4C4",
    paddingHorizontal: 8,
    paddingVertical: 11,
  },
  title: {
    lineHeight: 16,
    fontSize: 12,
    letterSpacing: 0.4,
    color: "#000000",
  },
});
