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
import Fonts from "../../../constants/fonts";

interface Props {
  titleStyles?: Text["props"]["style"];
  amountStyles?: Text["props"]["style"];
  viewStyles?: View["props"]["style"];
  iconStyles?: Image["props"]["style"];
  title: string;
  value: string;
  icon: ImageSourcePropType;
}

export default function Indicator(props: Props) {
  return (
    <View style={[styles.container, props.viewStyles]}>
      <View style={styles.iconContainer}>
        <Image
          resizeMode={ResizeMode.CONTAIN}
          source={props.icon}
          style={[styles.icon, props.iconStyles]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, props.titleStyles]}>{props.title}</Text>
        <Text style={[styles.amount, props.amountStyles]}>{props.value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 16,
  },
  icon: {
    height: 19,
    width: 22,
    tintColor: Colors.orange,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.blue,
    fontFamily: Fonts.redhatRegular,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  amount: {
    color: Colors.lightGray,
    fontFamily: Fonts.redhatRegular,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
});
