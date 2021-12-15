import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Button from "../../../components/common/button";
import Input from "../../../components/common/input/input";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";

interface PropTypes {
  isVisible: boolean;
  onClose: () => void;
}

const copyButton = () => {
  return (
    <Button
      text="Copiar"
      upperCase={false}
      style={{
        container: {
          backgroundColor: Colors.blue,
          width: 71,
          height: 36,
          borderRadius: 8,
          marginRight: 6,
        },
        text: {
          color: Colors.white,
          fontFamily: Fonts.redhatRegular,
          fontSize: 12,
          lineHeight: 24,
        },
      }}
    />
  );
};

const leftIcon = () => {
  return (
    <Image
      source={require("../../../../assets/images/misc/link.png")}
      style={{ width: 22, height: 22, marginLeft: 8 }}
    />
  );
};

export default function ReferModal({ isVisible, onClose }: PropTypes) {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={Colors.blue}
      backdropOpacity={0.65}
      hasBackdrop
      style={styles.modal}
      onBackdropPress={onClose}
    >
      <View style={styles.background}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Compartí y gana</Text>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require("../../../../assets/images/misc/close.png")}
              style={styles.modalCloseIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Compartir tu link por</Text>
        <View style={styles.socialNetworks}>
          <Image
            source={require("../../../../assets/images/social-network/Whatsapp.png")}
            style={styles.socialNetwork}
          />
          <Image
            source={require("../../../../assets/images/social-network/Facebook.png")}
            style={[styles.socialNetwork, styles.marginLeft]}
          />
          <Image
            source={require("../../../../assets/images/social-network/Twitter.png")}
            style={[styles.socialNetwork, styles.marginLeft]}
          />
        </View>
        <Text style={styles.subtitle}>O podes copiar tu link</Text>
        <View>
          <Input
            inputStyles={{
              paddingHorizontal: 0,
            }}
            value="https://efssharelink.com"
            button={copyButton()}
            leftIcon={leftIcon()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
  },
  background: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    padding: 14,
  },
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  title: {
    fontFamily: Fonts.redhatRegular,
    color: Colors.blue,
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0.18,
  },
  modalCloseIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  subtitle: {
    color: Colors.blue,
    fontFamily: Fonts.redhatRegular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginBottom: 15,
  },
  socialNetworks: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  socialNetwork: {
    width: 32,
    height: 32,
  },
  marginLeft: {
    marginLeft: 24,
  },
});
