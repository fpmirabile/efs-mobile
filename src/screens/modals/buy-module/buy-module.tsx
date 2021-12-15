import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Button from "../../../components/common/button";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";

interface PropTypes {
  userName: string;
  sectionName: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function BuyModuleModal({
  isVisible,
  onClose,
  userName,
  sectionName,
}: PropTypes) {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={Colors.blue}
      backdropOpacity={0.65}
      hasBackdrop
      style={styles.modal}
      onBackdropPress={onClose}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Seccion bloqueada</Text>
          <TouchableOpacity onPress={onClose}>
            <Image
              resizeMode="contain"
              source={require("../../../../assets/images/misc/close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../../../assets/images/modals/go-up.png")}
          style={styles.image}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Hola <Text style={styles.bold}>{userName}</Text>, para acceder a
            estos reels deberás desbloquear la sección por un precio de{" "}
            <Text style={styles.bold}>2500 FCS coins</Text>.
          </Text>
          <Text style={styles.description}>
            ¿Queres desbloquear la seccion{" "}
            <Text style={styles.bold}>{sectionName}</Text>?
          </Text>
        </View>
        <Button
          text="Desbloquear"
          upperCase
          style={{ container: styles.buttonContainer, text: styles.buttonText }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
  },
  container: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    flexDirection: "column",
    padding: 14,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 24,
    color: Colors.blue,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  image: {
    height: 130,
    width: 194,
    marginBottom: 13,
    alignSelf: "center",
  },
  descriptionContainer: {
    marginBottom: 16,
    justifyContent: "center",
  },
  description: {
    color: Colors.blue,
    fontFamily: Fonts.redhatRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: Colors.blue,
    borderRadius: 4,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
  },
});
