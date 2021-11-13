import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import { LoginToken, RegisterUser } from "../../api/models/user";
import { setSession } from "../../api/session";
import {
  isValidAge,
  isValidEmail,
  isValidPassword,
  isValidSex,
} from "../../util/validator";
import RegisterView from "./register-view";

export interface Props extends BasicStackComponentProps {
  onUserRegister: (newUser: RegisterUser) => Promise<void>;
  onLoginUser: (email: string, password: string) => Promise<LoginToken>;
}

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
  loading: boolean;
}

class RegisterController extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    value: {
      email: "killua@gmail.com",
      invalidEmail: false,
      nameAndLastName: "Killua",
      invalidName: false,
      age: "18",
      invalidAge: false,
      sex: "M",
      invalidSex: false,
      password: "Kilua123*",
      invalidPassword: false,
      confirmPassword: "Kilua123*",
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

  handleRegisterPress = async () => {
    if (this.handleFormValidation()) {
      const { navigation, onUserRegister, onLoginUser } = this.props;
      this.setState({
        loading: true,
      });
      try {
        const { value } = this.state;
        const newUser: RegisterUser = {
          email: value.email,
          nombreApellido: value.nameAndLastName,
          edad: Number(value.age),
          sexo: value.sex,
          password: value.password,
        };
        await onUserRegister(newUser);
        const token = await onLoginUser(newUser.email, newUser.password);
        setSession({ jwt: token.token, refresh: token.refreshToken });
        //navigation.navigate("Home"); 
        navigation.navigate("Profile");
      } catch (exception) {
        // TODO: We need to handle an error here
        console.log(exception)
        navigation.navigate("NotFound");
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  };

  handleTermsAndConditionPress = () => {
    const { navigation } = this.props;
    navigation.navigate("TermsAndConditions");
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
    const { value, loading } = this.state;
    return (
      <RegisterView
        onFieldChange={this.handleFieldChange}
        onRegisterPress={this.handleRegisterPress}
        onTermsAndCondPress={this.handleTermsAndConditionPress}
        onBlurField={this.handleBlurField}
        isLoading={loading}
        value={value}
      />
    );
  }
}

export default RegisterController;
