import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BasicStackComponentProps } from "../../../types";
import BlueTitle from "../../components/common/blue-title/blue-title";
import Button from "../../components/common/button";
import Input from "../../components/common/input/input";
import WhiteBackgroundView from "../../components/common/white-background-view/white-background-view";

export default function Register({ navigation }: BasicStackComponentProps) {
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const buttonContainerStyles = buttonDisabled
    ? [styles.registerButtonContainer]
    : [styles.registerButtonContainer, styles.registerButtonContainerEnabled];
  const buttonTextStyles = buttonDisabled
    ? [styles.registerButtonText]
    : [styles.registerButtonText, styles.registerButtonTextEnabled];

  return (
    <View style={styles.view}>
      <BlueTitle
        titleText="Registro de usuario"
        viewStyles={styles.titleContainer}
      />
      <Text style={styles.subtitle}>
        Registrate en Educación Fianciera Simple y aprendé a potenciar tus
        ingresos de forma rápida e inteligente.
      </Text>
      <WhiteBackgroundView viewStyles={styles.registerBox}>
        <Input
          placeholder="Email"
          viewStyles={styles.inputContainer}
          keyboardType="email-address"
        />
        <Input
          placeholder="Nombre y apellido"
          viewStyles={styles.inputContainer}
        />
        <Input
          placeholder="Edad"
          keyboardType="number-pad"
          viewStyles={styles.inputContainer}
        />
        <Input placeholder="Sexo" viewStyles={styles.inputContainer} />
        <Input
          placeholder="Contraseña"
          viewStyles={styles.inputContainer}
          secureTextEntry
        />
        <Input
          placeholder="Confirmar contraseña"
          secureTextEntry
          viewStyles={styles.inputContainer}
        />
      </WhiteBackgroundView>
      <View style={styles.termsAndCondsContainer}>
        <Text style={styles.termsAndCondsTitle}>
          *Al registrarse, usted acepta nuestros
        </Text>
        <Button
          style={{
            container: styles.termsAndCondButtonContainer,
            text: styles.termsAndCondButtonText,
          }}
          text="Términos y condiciones"
        />
      </View>
      <Button
        disabled={buttonDisabled}
        text="Registrarse"
        style={{
          container: buttonContainerStyles,
          text: buttonTextStyles,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  titleContainer: {
    marginHorizontal: 23,
    marginBottom: 16,
  },
  subtitle: {
    marginHorizontal: 16,
    maxWidth: 328,
    fontSize: 16,
    lineHeight: 26,
    color: "#3F4751",
    marginBottom: 9,
  },
  registerBox: {
    marginLeft: 24,
    marginRight: 39,
    paddingVertical: 7,
    paddingHorizontal: 8,
    alignSelf: "stretch",
  },
  inputContainer: {
    marginVertical: 7,
    marginHorizontal: 8,
    borderColor: "#e0e0e0",
  },
  termsAndCondsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  termsAndCondsTitle: {
    color: '#667180',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.4
  },
  termsAndCondButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 12
  },
  termsAndCondButtonText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#FF6035',
    textTransform: 'lowercase'
  },
  registerButtonContainer: {
    borderWidth: 1,
    borderColor: "#667180",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    marginRight: 39,
    alignSelf: "stretch",
  },
  registerButtonText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    color: "#667180",
  },
  registerButtonTextEnabled: {
    color: "#FFFFFF",
  },
  registerButtonContainerEnabled: {
    backgroundColor: "#160266",
  },
});
