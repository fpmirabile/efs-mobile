import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextStyle, ViewStyle } from "react-native-material-ui";
import BlueTitle from "../../components/common/blue-title/blue-title";
import Button from "../../components/common/button";
import Input from "../../components/common/input/input";
import WhiteBackgroundView from "../../components/common/white-background-view/white-background-view";
import { Value as RegisterValue } from "./controller";

interface Props {
  isLoading: boolean;
  value: RegisterValue;
  onFieldChange: (field: keyof RegisterValue, value: string) => void;
  onBlurField: (field: keyof RegisterValue) => void;
  onRegisterPress: () => void;
  onTermsAndCondPress: () => void;
}

export default function RegisterView({
  isLoading,
  value,
  onFieldChange,
  onBlurField,
  onRegisterPress,
  onTermsAndCondPress,
}: Props) {
  const buttonContainerStyles: ViewStyle = [styles.registerButtonContainer];
  const buttonTextStyles: TextStyle = [styles.registerButtonText];
  if (value.registerButtonEnabled) {
    buttonContainerStyles.push(styles.registerButtonContainerEnabled);
    buttonTextStyles.push(styles.registerButtonTextEnabled);
  }

  const fieldChanged = (field: keyof RegisterValue) => (text: string) => {
    onFieldChange(field, text);
  };

  const onSelectDropdown = (selectedItem: string) => {
    fieldChanged("sex")(selectedItem);
  };

  const blurField = (field: keyof RegisterValue) => () => {
    onBlurField(field);
  };

  return (
    <ScrollView style={styles.scrollView}>
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
            errorStyles={styles.errorText}
            keyboardType="email-address"
            value={value.email}
            onChangeText={fieldChanged("email")}
            errorText="El email ingresado no es correcto."
            showError={value.invalidEmail}
            onBlur={blurField("email")}
            disabled={isLoading}
          />
          <Input
            placeholder="Nombre y apellido"
            viewStyles={styles.inputContainer}
            errorStyles={styles.errorText}
            value={value.nameAndLastName}
            onChangeText={fieldChanged("nameAndLastName")}
            errorText="Debe completar este campo."
            showError={value.invalidName}
            onBlur={blurField("nameAndLastName")}
            disabled={isLoading}
          />
          <Input
            placeholder="Edad"
            keyboardType="number-pad"
            viewStyles={styles.inputContainer}
            errorStyles={styles.errorText}
            value={value.age}
            onChangeText={fieldChanged("age")}
            errorText="La edad ingresada no es correcta."
            showError={value.invalidAge}
            onBlur={blurField("age")}
            disabled={isLoading}
          />
          <View style={styles.dropdownContainer}>
            <Picker
              onValueChange={onSelectDropdown}
              selectedValue={value.sex}
              enabled={!isLoading}
              style={styles.dropdown}
              mode="dropdown"
              dropdownIconColor="#000000"
              itemStyle={styles.dropdownText}
            >
              <Picker.Item label="Sexo" value="" enabled={false} />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
              <Picker.Item label="No binario" value="No binario" />
            </Picker>
          </View>
          <Input
            placeholder="Contraseña"
            viewStyles={styles.inputContainer}
            errorStyles={styles.errorText}
            secureTextEntry
            value={value.password}
            onChangeText={fieldChanged("password")}
            errorText="La password no cumple con los criterios. Al menos 1 caracter especial, 1 letra mayuscula, 1 minuscula, 1 numero."
            showError={value.invalidPassword}
            onBlur={blurField("password")}
            disabled={isLoading}
          />
          <Input
            placeholder="Confirmar contraseña"
            secureTextEntry
            viewStyles={styles.inputContainer}
            errorStyles={styles.errorText}
            value={value.confirmPassword}
            onChangeText={fieldChanged("confirmPassword")}
            errorText="La password ingresada no es identica a la anterior."
            showError={value.invalidConfirmPassword}
            onBlur={blurField("confirmPassword")}
            disabled={isLoading}
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
            onPress={onTermsAndCondPress}
          />
        </View>
        <Button
          disabled={!value.registerButtonEnabled}
          text={isLoading ? "Registrando..." : "Registrarse"}
          style={{
            container: buttonContainerStyles,
            text: buttonTextStyles,
          }}
          onPress={onRegisterPress}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
    marginVertical: 35,
  },
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
  errorText: {
    marginHorizontal: 10,
  },
  termsAndCondsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  termsAndCondsTitle: {
    color: "#667180",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  termsAndCondButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 15,
    marginVertical: 1,
  },
  termsAndCondButtonText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.4,
    color: "#FF6035",
    textTransform: "lowercase",
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
  dropdownContainer: {
    borderColor: "#e0e0e0",
    borderRadius: 3.5,
    borderWidth: 0.3,
    marginHorizontal: 8,
    paddingHorizontal: 5,
  },
  dropdown: {
    width: "100%",
    height: 48,
  },
  dropdownText: {
    color: "#000000DE",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.16,
  },
});
