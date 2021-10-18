import * as React from "react";
import { StyleSheet } from "react-native";
import { TextStyle, ViewStyle } from "react-native-material-ui";
import Button from "../../../../components/common/button";

interface Props {
  currentIndex?: number;
  onPressedItem: (index: number) => () => void;
}

interface ItemProps {
  item: any;
  index: number;
}

export default (props: Props) => (itemProps: ItemProps) => {
  const containerStyles: ViewStyle = [styles.filterButtonContainer];
  const buttonStyles: TextStyle = [styles.filterButton];
  if (props.currentIndex === itemProps.index) {
    containerStyles.push(styles.filterButtonContainerSelected);
    buttonStyles.push(styles.filterButtonSelected);
  }

  return (
    <Button
      text={itemProps.item.name}
      style={{
        container: containerStyles,
        text: styles.filterButton,
      }}
      onPress={props.onPressedItem(itemProps.index)}
    />
  );
};

const styles = StyleSheet.create({
  filterButtonContainer: {
    minHeight: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 8,
    shadowOpacity: 0.14,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  filterButton: {
    color: "#FF6035",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginHorizontal: 9,
    textTransform: "capitalize",
  },
  filterButtonSelected: {
    color: "#FFFFFF",
  },
  filterButtonContainerSelected: {
    backgroundColor: "#160266",
  },
});
