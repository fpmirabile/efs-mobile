import * as React from "react";
import { ResizeMode } from "expo-av";
import { View, StyleSheet, Text, Image } from "react-native";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Button from "../../../components/common/button";
import Input from "../../../components/common/input/input";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";

interface PropTypes {
  isVisible: boolean;
  onCloseModal: () => void;
}

export default function EnterOrder(props: PropTypes) {
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [buySellQuantity, setBuySellQuantity] = React.useState<
    number | undefined
  >(undefined);

  const handleInputChanged = (text: string) => {
    if (!text.length || isNaN(Number(text))) {
      setEnableButton(false);
      setBuySellQuantity(undefined);
      return;
    }

    // Validate coins quantity
    setBuySellQuantity(Number(text));
    setEnableButton(true);
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={props.isVisible}
      onBackdropPress={props.onCloseModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
			backdropOpacity={0}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Ingreso de orden
            <TouchableWithoutFeedback>
              <Image
                resizeMode={ResizeMode.CONTAIN}
                style={styles.tooltip}
                source={require("../../../../assets/images/efs-coin.png")}
              />
            </TouchableWithoutFeedback>
          </Text>
        </View>
        <View style={styles.inputContainerParent}>
          <Input
            viewStyles={styles.inputView}
            placeholder="Dinero a invertir"
            keyboardType="numeric"
            onChangeText={handleInputChanged}
            value={buySellQuantity?.toString()}
          />
        </View>
        <View>
          <Button
            style={{
              container: styles.buttonContainer,
              text: styles.buttonText,
            }}
            text="Ingresar Orden"
            disabled={!enableButton}
          />
        </View>
        <View style={styles.infoMessageContainer}>
          <Text style={styles.infoMessage}>
            <Text style={styles.infoMessageTip}>Tip:</Text> Recordá que
            diversificando tus inversiones minimizarás el riesgo
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: Colors.white,
    justifyContent: "center",
		elevation: 5
  },
  titleContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
    color: Colors.blue,
    fontSize: 20,
    lineHeight: 24,
  },
  tooltip: {
    marginLeft: 8,
    height: 14,
    width: 14,
  },
  inputContainerParent: {
    marginHorizontal: 33,
  },
  inputView: {
    borderWidth: 0.3,
    borderRadius: 3.5,
  },
  buttonContainer: {
    backgroundColor: Colors.blue,
    marginVertical: 8,
    alignItems: "center",
    marginHorizontal: 33,
  },
  buttonText: {
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    color: Colors.white,
  },
  infoMessageContainer: {
    marginBottom: 12,
		marginHorizontal: 8,
  },
  infoMessage: {
    color: Colors.lightGray,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.redhatRegular,
    letterSpacing: 0.25,
    textAlign: "center",
  },
  infoMessageTip: {
    color: Colors.orange,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: "bold",
  },
});
