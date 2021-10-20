import * as React from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";
import { Value } from "./controller";
import Button from "../../components/common/button";
import WhiteBackgroundView from "../../components/common/white-background-view/white-background-view";
import Input from "../../components/common/input/input";
import { TextStyle, ViewStyle } from "react-native-material-ui";

interface Props {
  onFieldChange: (key: keyof Value, newValue: string) => void;
  onLoginPress: () => void;
  onRegisterPress: () => void;
  onBlurField: (key: keyof Value) => void;
  isLoading: boolean;
  value: Value;
}

export default function Login({
  onFieldChange,
  onLoginPress,
  onRegisterPress,
  onBlurField,
  isLoading,
  value,
}: Props) {
  const buttonContainerStyles: ViewStyle = [styles.loginButtonContainer];
  const buttonTextStyles: TextStyle = [styles.loginButtonText];
  if (value.email && value.password) {
    buttonContainerStyles.push(styles.loginButtonContainerEnabled);
    buttonTextStyles.push(styles.loginButtonTextEnabled);
  }

  const fieldChanged = (field: keyof Value) => (text: string) => {
    onFieldChange(field, text);
  };

  const blurField = (field: keyof Value) => () => {
    onBlurField(field);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresá</Text>
      <WhiteBackgroundView viewStyles={styles.whiteBackgroundContainer}>
        <Input
          onBlur={blurField("email")}
          onChangeText={fieldChanged("email")}
          disabled={isLoading}
          placeholder="Email"
          value={value.email}
          showError={value.invalidEmail}
          viewStyles={styles.inputContainer}
          inputStyles={styles.input}
          errorText="El mail ingresado no es correcto."
          errorStyles={styles.inputError}
        />
        <Input
          onBlur={blurField("password")}
          onChangeText={fieldChanged("password")}
          disabled={isLoading}
          placeholder="Contraseña"
          secureTextEntry
          value={value.password}
          showError={value.invalidPassword}
          inputStyles={styles.input}
          viewStyles={styles.inputContainer}
          errorText="Debe completar el campo password para ingresar."
          errorStyles={styles.inputError}
        />
        <Button
          text="¿Olvidaste tu contraseña?"
          style={{
            container: styles.forgotPasswordContainer,
            text: styles.forgotPasswordText,
          }}
        />
        <Button
          text={isLoading ? "Ingresando..." : "Ingresar"}
          style={{
            container: buttonContainerStyles,
            text: buttonTextStyles,
          }}
          onPress={onLoginPress}
          disabled={value.invalidEmail || value.invalidPassword}
        />
        <View style={styles.separator} />
        <Button
          text="Google"
          style={{
            container: styles.googleSSOButtonContainer,
            text: styles.googleSSOButtonText,
          }}
          icon={
            <Image source={require("../../../assets/images/misc/google.png")} />
          }
        />
      </WhiteBackgroundView>
      <View style={styles.bottomContainer}>
        <View style={styles.noAccountContainer}>
          <Text style={styles.noAccountText}>¿No tenés cuenta?</Text>
          <Button
            text="Registrate"
            style={{
              container: styles.noAccountButtonContainer,
              text: styles.noAccountButtonText,
            }}
            onPress={onRegisterPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "bold",
    color: "#160266",
    marginVertical: 75,
  },
  whiteBackgroundContainer: {
    paddingHorizontal: 17,
    paddingVertical: 24,
    marginHorizontal: 24,
    alignSelf: "stretch",
  },
  inputContainer: {
    marginBottom: 8,
  },
  inputError: {
    marginBottom: 4,
  },
  input: {
    paddingHorizontal: 16,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-start",
    marginLeft: 0,
    paddingLeft: 0,
  },
  forgotPasswordText: {
    color: "#FF6035",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    textTransform: "capitalize",
    fontWeight: 'bold'
  },
  loginButtonContainer: {
    borderWidth: 1,
    borderColor: "#667180",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  loginButtonText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    color: "#667180",
  },
  loginButtonTextEnabled: {
    color: "#FFFFFF",
  },
  loginButtonContainerEnabled: {
    backgroundColor: "#160266",
  },
  separator: {
    borderTopWidth: 1,
    borderColor: "#979797",
    marginTop: 24,
    marginBottom: 16,
  },
  googleSSOButtonContainer: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  googleSSOButtonText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    color: "#667180",
    marginHorizontal: 16,
  },
  bottomContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: "row",
    flex: 1,
  },
  noAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  noAccountText: {
    color: '#160266',
    letterSpacing: 0.1,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  noAccountButtonContainer: {
    paddingLeft: 5,
  },
  noAccountButtonText: {
    color: '#FF6035',
    fontSize:14,
    lineHeight: 24,
    letterSpacing: 0.1,
    textTransform: 'capitalize'
  },
});
