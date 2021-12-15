import * as React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";

interface PropTypes {
  isSelected: boolean;
  enableImg: any;
  disableImg: any;
  name: string;
  code: string;
  onPress: (nextStonk: string) => void;
}

export default function StonkIcons({
  isSelected,
  disableImg,
  code,
  enableImg,
  name,
  onPress,
}: PropTypes) {
  const onTap = () => {
    onPress(code);
  };

  return (
    <TouchableOpacity
      onPress={onTap}
      style={[
        styles.logoContainer,
        isSelected ? styles.selectedLogo : undefined,
      ]}
    >
      <Image
        source={isSelected ? enableImg : disableImg}
        style={isSelected ? undefined : styles.noSelectedLogo}
      />
      <Text style={styles.logoName}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedLogo: {
    elevation: 2,
    shadowColor: Colors.blue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  noSelectedLogo: {
    // tintColor: Colors.disabledGray,
  },
  logoName: {
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.1,
    textTransform: "uppercase",
  },
});
