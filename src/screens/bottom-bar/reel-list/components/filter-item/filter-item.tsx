import * as React from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import { TextStyle, ViewStyle } from "react-native-material-ui";
import { Grupo } from "../../../../../api/models/reels";
import Button from "../../../../../components/common/button";
import Colors from "../../../../../constants/colors";

interface Props {
  currentIndex?: number;
  onPressedItem: (index: number) => () => void;
}

export default (props: Props): ListRenderItem<Grupo> => ({ item, index }) => {
  const containerStyles: ViewStyle = [styles.filterButtonContainer];
  const buttonStyles: TextStyle = [styles.filterButton];
  if (props.currentIndex === index) {
    containerStyles.push(styles.filterButtonContainerSelected);
    buttonStyles.push(styles.filterButtonSelected);
  }

  return (
    <Button
      text={item.titulo}
      style={{
        container: containerStyles,
        text: buttonStyles,
      }}
      onPress={props.onPressedItem(index)}
    />
  );
};

const styles = StyleSheet.create({
  filterButtonContainer: {
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowRadius: 8,
    shadowOpacity: 0.14,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginRight: 8,
  },
  filterButton: {
    color: Colors.orange,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginHorizontal: 9,
    textTransform: "capitalize",
    fontFamily: 'redhatdisplay-regular',
    fontWeight: '700'
  },
  filterButtonSelected: {
    color: Colors.white,
  },
  filterButtonContainerSelected: {
    backgroundColor: Colors.blue,
  },
});