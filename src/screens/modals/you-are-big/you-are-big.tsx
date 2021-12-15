import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";

interface PropTypes {
  username: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function YouAreBigModal({
  isVisible,
  onClose,
  username,
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
          <Text style={styles.title}>¡Es hora de continuar creciendo!</Text>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require("../../../../assets/images/misc/close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../../../assets/images/modals/jump.png")}
          style={styles.centerImage}
        />
        <Text style={styles.description}>
          Hola <Text style={styles.bold}>{username}</Text>, desde EFS creemos
          que te encontras listo/a para iniciarte en el mundo real de las
          finanzas. Te recomendamos los siguientes brokers:
        </Text>
        <View style={styles.brokersContainer}>
          <Image
            source={require("../../../../assets/images/modals/broker1.png")}
            style={styles.broker}
          />
          <Image
            source={require("../../../../assets/images/modals/broker2.png")}
            style={styles.broker}
          />
        </View>
        <Text style={styles.recommendLetter}>
          Esto es una recomendación en base al scoring obtenido en la
          plataforma. Podrás continuar utilizando FCS
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 19,
  },
  title: {
    fontFamily: Fonts.redhatRegular,
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: .18,
    fontWeight: 'bold',
    color: Colors.blue,
  },
  closeIcon: {
    width: 14,
    height: 14,
    marginTop: 6,
    marginRight: 6
  },
  centerImage: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.redhatRegular,
    color: Colors.blue,
  },
  bold: {
    fontWeight: 'bold',
  },
  brokersContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 8
  },
  broker: {
    marginVertical: 3
  },
  recommendLetter: {
    color: Colors.lightGray,
    fontSize: 12,
    fontFamily: Fonts.redhatRegular,
    lineHeight: 16,
    letterSpacing: .4,
    textAlign: 'center'
  },
});
