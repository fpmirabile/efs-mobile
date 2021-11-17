import * as React from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import { TextStyle, ViewStyle } from "react-native-material-ui";
import { Grupo } from "../../../../../api/models/reels";
import Button from "../../../../../components/common/button";
import Colors from "../../../../../constants/colors";
import Fonts from "../../../../../constants/fonts";

interface Props {
  onPressedItem: (index: number) => () => void;
  item: Grupo;
  isActive: boolean;
  index: number;
}

export default function (props: Props) {
  const containerStyles: ViewStyle = [styles.filterButtonContainer];
  const buttonStyles: TextStyle = [styles.filterButton];
  if (props.isActive) {
    containerStyles.push(styles.filterButtonContainerSelected);
    buttonStyles.push(styles.filterButtonSelected);
  }

  return (
    <Button
      text={props.item.titulo}
      style={{
        container: containerStyles,
        text: buttonStyles,
      }}
      onPress={props.onPressedItem(props.index)}
    />
  );
}

const styles = StyleSheet.create({
  filterButtonContainer: {
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.14,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginRight: 8,
    marginBottom: 8
  },
  filterButton: {
    color: Colors.orange,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginHorizontal: 9,
    textTransform: "capitalize",
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
  },
  filterButtonSelected: {
    color: Colors.white,
  },
  filterButtonContainerSelected: {
    backgroundColor: Colors.blue,
  },
});
