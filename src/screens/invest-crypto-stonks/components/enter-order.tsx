import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import Input from "../../../components/common/input/input";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";
import ButtonWithLoading from "../../../components/common/button-with-loading/button-with-loading";

interface PropTypes {
  isVisible: boolean;
  currentCoins: number;
  onCloseModal: () => void;
  onEnterOrder: (coins: number) => void;
}

export default function EnterOrder(props: PropTypes) {
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [buyQuantity, setBuyQuantity] = React.useState<number | undefined>(
    undefined
  );

  const handleInputChanged = (text: string) => {
    const textAsNumber = Number(text);
    if (!text.length || isNaN(textAsNumber)) {
      setEnableButton(false);
      setBuyQuantity(undefined);
      return;
    }

    if (props.currentCoins < textAsNumber) {
      setBuyQuantity(Number(text));
      setEnableButton(false);
      return;
    }

    // Validate coins quantity
    setBuyQuantity(Number(text));
    setEnableButton(true);
  };

  const applyInvestment = () => {
    setIsLoading(true);
    if (!buyQuantity) {
      setIsLoading(false);
      return;
    }

    props.onEnterOrder(buyQuantity);
  };

  React.useEffect(() => {
    setIsLoading(false);
  }, [props.isVisible])

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
          </Text>
        </View>
        <View style={styles.inputContainerParent}>
          <Input
            viewStyles={styles.inputView}
            inputStyles={{ flex: 1 }}
            placeholder="Dinero a invertir"
            keyboardType="numeric"
            onChangeText={handleInputChanged}
            value={buyQuantity?.toString()}
          />
        </View>
        <View>
          <ButtonWithLoading
            isLoading={isLoading}
            onPress={applyInvestment}
            style={{
              container: enableButton
                ? styles.buttonContainer
                : [styles.buttonContainer, styles.disabledButton],
              text: enableButton
                ? [styles.buttonText]
                : [styles.buttonText, styles.disabledTextButton],
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
    elevation: 5,
  },
  titleContainer: {
    justifyContent: 'center',
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
  disabledButton: {
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.transparent,
  },
  disabledTextButton: {
    color: Colors.gray,
  },
});
