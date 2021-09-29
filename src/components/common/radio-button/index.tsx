import * as React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton, Toolbar, ThemeContext } from "react-native-material-ui";
import Container from "../container";

type RadioProps = {
  radioProps: RadioButton["props"];
  onToolbarClick: () => void;
};

export default function RadioButtonComponent(props: RadioProps) {
  return (
      <Container>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => props.onToolbarClick()}
          centerElement="Radio button"
        />
        <View style={styles.container}>
          <RadioButton {...props.radioProps} />
        </View>
      </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
});
