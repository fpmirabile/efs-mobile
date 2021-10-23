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
import ErrorText from "../error-text/error-text";

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
  disabled?: boolean;
}

export default function Input(props: Props) {
  const placeholderColor = props.placeholderColor || "#000";
  const inputStyles: StyleProp<TextStyle> = [styles.input, props.inputStyles];
  const viewStyles = [props.viewStyles];
  if (props.showError) {
    viewStyles.push(styles.inputError);
  }

  return (
    <View>
      <View style={[styles.container, viewStyles]}>
        <TextInput
          style={inputStyles}
          placeholderTextColor={placeholderColor}
          editable={!props.disabled}
          {...props}
        />
      </View>
      {props.showError && props.errorText && (
        <ErrorText textStyles={props.errorStyles} errorText={props.errorText} />
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
    borderWidth: 1,
  }
});
