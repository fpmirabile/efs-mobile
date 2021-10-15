import * as React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ColorValue,
  KeyboardTypeOptions,
  Text,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TargetedEvent,
} from "react-native";

interface Props {
  inputStyles?: TextInput["props"]["style"];
  viewStyles?: View["props"]["style"];
  errorStyles?: Text["props"]["style"];
  placeholderColor?: ColorValue;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  onChangeText?: (text: string) => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  errorText?: string;
  showError?: boolean;
}

export default function Input(props: Props) {
  const placeholderColor = props.placeholderColor || "#000";
  const inputStyles: StyleProp<TextStyle> = [styles.input, props.inputStyles];
  if (props.showError) {
    inputStyles.push(styles.inputError);
  }

  return (
    <View>
      <View style={[styles.container, props.viewStyles]}>
        <TextInput
          style={inputStyles}
          placeholderTextColor={placeholderColor}
          {...props}
        />
      </View>
      {props.showError && (
        <Text style={[styles.errorText, props.errorStyles]}>{props.errorText}</Text>
      )}
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
  inputError: {
    borderColor: "#ED2939",
  },
  errorText: {
    fontSize: 10,
    lineHeight: 14,
    color: "#ED2939",
  },
});
