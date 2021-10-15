import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import {
  isValidAge,
  isValidEmail,
  isValidPassword,
  isValidSex,
} from "../../util/validator";
import RegisterView from "./register-view";

export interface Props extends BasicStackComponentProps {}

export interface Value {
  email: string;
  invalidEmail: boolean;
  nameAndLastName: string;
  invalidName: boolean;
  age: string;
  invalidAge: boolean;
  sex: string;
  invalidSex: boolean;
  password: string;
  invalidPassword: boolean;
  confirmPassword: string;
  invalidConfirmPassword: boolean;
  registerButtonEnabled: boolean;
}

interface State {
  value: Value;
}

class RegisterController extends React.PureComponent<Props, State> {
  state: State = {
    value: {
      email: "",
      invalidEmail: false,
      nameAndLastName: "",
      invalidName: false,
      age: "",
      invalidAge: false,
      sex: "",
      invalidSex: false,
      password: "",
      invalidPassword: false,
      confirmPassword: "",
      invalidConfirmPassword: false,
      registerButtonEnabled: false,
    },
  };

  handleCleanErrorState = () => {
    this.setState((state) => {
      return {
        value: {
          ...state.value,
          invalidPassword: false,
          invalidAge: false,
          invalidEmail: false,
          invalidName: false,
          invalidConfirmPassword: false,
          invalidSex: false,
        },
      };
    });
  };

  handleSetErrorToField = (field: keyof Value, value?: boolean) => {
    this.setState(
      (state) => {
        return {
          value: {
            ...state.value,
            [field]: value != undefined ? value : true,
          },
        };
      },
      () => {
        const {
          invalidAge,
          invalidConfirmPassword,
          invalidEmail,
          invalidName,
          invalidPassword,
          invalidSex,
        } = this.state.value;
        this.setState((state) => {
          return {
            value: {
              ...state.value,
              registerButtonEnabled:
                !invalidAge &&
                !invalidConfirmPassword &&
                !invalidEmail &&
                !invalidName &&
                !invalidPassword &&
                !invalidSex,
            },
          };
        });
      }
    );
  };

  handleFormValidation = (): boolean => {
    const { value } = this.state;
    let validForm = true;
    if (!isValidEmail(value.email)) {
      validForm = false;
      this.handleSetErrorToField("invalidEmail");
    }

    if (!value.nameAndLastName) {
      validForm = false;
      this.handleSetErrorToField("invalidName");
    }

    if (!isValidAge(value.age)) {
      validForm = false;
      this.handleSetErrorToField("invalidAge");
    }

    if (!isValidSex(value.sex)) {
      validForm = false;
      this.handleSetErrorToField("invalidSex");
    }

    if (!isValidPassword(value.password)) {
      validForm = false;
      this.handleSetErrorToField("invalidPassword");
    }

    if (value.password !== value.confirmPassword) {
      validForm = false;
      this.handleSetErrorToField("invalidConfirmPassword");
    }

    if (validForm) {
      this.handleCleanErrorState();
    }

    return validForm;
  };

  handleFieldChange = (field: keyof Value, newValue: string) => {
    this.setState((state) => {
      return {
        value: {
          ...state.value,
          [field]: newValue,
        },
      };
    });
  };

  handleRegisterPress = () => {
    if (this.handleFormValidation()) {
      console.log("send api request");
    }
  };

  handleTermsAndConditionPress = () => {
    const { navigation } = this.props;
    navigation.push("TermsAndConditions");
  };

  handleBlurField = (field: keyof Value) => {
    // TODO: Refactor...
    const { value } = this.state;
    switch (field) {
      case "age":
        this.handleSetErrorToField("invalidAge", !isValidAge(value.age));
        break;
      case "email":
        this.handleSetErrorToField("invalidEmail", !isValidEmail(value.email));
        break;
      case "nameAndLastName":
        this.handleSetErrorToField("invalidName", !value.nameAndLastName);
        break;
      case "sex":
        this.handleSetErrorToField("invalidSex", !isValidSex(value.sex));
        break;
      case "password":
        this.handleSetErrorToField(
          "invalidPassword",
          !isValidPassword(value.password)
        );
        break;
      case "confirmPassword":
        this.handleSetErrorToField(
          "invalidConfirmPassword",
          value.password !== value.confirmPassword
        );
        break;
    }
  };

  render() {
    const { value } = this.state;
    return (
      <RegisterView
        onFieldChange={this.handleFieldChange}
        onRegisterPress={this.handleRegisterPress}
        onTermsAndCondPress={this.handleTermsAndConditionPress}
        onBlurField={this.handleBlurField}
        value={value}
      />
    );
  }
}

export default RegisterController;