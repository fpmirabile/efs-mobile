import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";

export interface Props {
  buttonContainerStyle?: View["props"]["style"];
  textStyle?: Text["props"]["style"];
  text: string | JSX.Element;
  onPress?: () => void;
  disabled?: boolean;
}

export default function TextButton(props: Props) {
  return (
    <View style={[styles.container, props.buttonContainerStyle]}>
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <Text style={[styles.text, props.textStyle]}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    color: Colors.orange,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: Fonts.redhatRegular,
  },
});
