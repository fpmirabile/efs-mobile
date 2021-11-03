import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../constants/colors";

interface Props {
  containerStyle: View["props"]["style"];
  textStyle?: Text["props"]["style"];
  text: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function TextButton(props: Props) {
  return (
    <View style={[styles.container, props.containerStyle]}>
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
    fontWeight: "700",
    fontFamily: 'redhatdisplay-regular'
  },
});
