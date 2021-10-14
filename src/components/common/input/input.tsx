import * as React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ColorValue,
  KeyboardTypeOptions,
} from "react-native";

type Props = {
  inputStyles?: TextInput["props"]["style"];
  viewStyles?: View["props"]["style"];
  placeholderColor?: ColorValue;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export default function Input(props: Props) {
  const placeholderColor = props.placeholderColor || "#000";
  return (
    <View style={[styles.container, props.viewStyles]}>
      <TextInput
        style={[styles.input, props.inputStyles]}
        placeholderTextColor={placeholderColor}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.3,
    borderColor: "#000",
    borderRadius: 4,
  },
  input: {
    height: 48,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#000",
    paddingHorizontal: 16,
  },
});
