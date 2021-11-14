import { ResizeMode } from "expo-av";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import Colors from "../../../constants/colors";
import TextButton, {
  Props as TextButtonProps,
} from "../text-button/text-button";

interface Props extends TextButtonProps {
  viewStyles?: View["props"]["style"];
  iconStyles?: Image["props"]["style"];
  icon: ImageSourcePropType;
}

export default function TextButtonWithIcon(props: Props) {
  return (
    <View style={[styles.container, props.viewStyles]}>
      <Image
        resizeMode={ResizeMode.CONTAIN}
        source={props.icon}
        style={[styles.icon, props.iconStyles]}
      />
      <TextButton {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 13,
  },
});
