import * as React from "react";
import { Image, ListRenderItem, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";
import { CompanyStonks } from "../view";

interface PropTypes {}

export default (props: PropTypes): ListRenderItem<CompanyStonks> =>
  ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={[
          styles.logoContainer,
          item.isSelected ? styles.selectedLogo : undefined,
        ]}
      >
        <Image
          source={item.image}
          style={item.isSelected ? undefined : styles.noSelectedLogo}
        />
        <Text style={styles.logoName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

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
