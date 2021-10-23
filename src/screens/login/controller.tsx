import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import { LoginToken } from "../../api/models/user";
import { setSession } from "../../api/session";
import { isValidEmail, isValidPassword } from "../../util/validator";
import LoginView from "./login";

export interface Props extends BasicStackComponentProps {
  onLoginUser: (email: string, password: string) => Promise<LoginToken>;
}

export interface Value {
  email: string;
  invalidEmail: boolean;
  password: string;
  invalidPassword: boolean;
}

interface State {
  value: Value;
  loading: boolean;
  invalidCredentials: boolean;
}

class LoginController extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    invalidCredentials: false,
    value: {
      email: "",
      invalidEmail: false,
      password: "",
      invalidPassword: false,
    },
  };

  handleCleanErrorState = () => {
    this.setState((state) => {
      return {
        value: {
          ...state.value,
          invalidPassword: false,
          invalidEmail: false,
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
        const { invalidEmail, invalidPassword } = this.state.value;
        this.setState((state) => {
          return {
            value: {
              ...state.value,
              registerButtonEnabled: !invalidEmail && !invalidPassword,
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

    if (!isValidPassword(value.password)) {
      validForm = false;
      this.handleSetErrorToField("invalidPassword");
    }

    if (validForm) {
      this.handleCleanErrorState();
    }

    return validForm;
  };

  handleFieldChange = (field: keyof Value, newValue: string) => {
    this.setState((state) => {
      return {
        invalidCredentials: false,
        value: {
          ...state.value,
          [field]: newValue,
        },
      };
    });
  };

  handleLoginPress = async () => {
    const { value } = this.state;
    if (!value.email || !value.password) {
      return;
    }

    if (this.handleFormValidation()) {
      const { navigation, onLoginUser } = this.props;
      this.setState({
        loading: true,
        invalidCredentials: false,
      });
      try {
        const { value } = this.state;
        const token = await onLoginUser(value.email, value.password);
        if (!token) {
          this.setState({
            invalidCredentials: true,
          });
          return;
        }

        setSession({ jwt: token.token, refresh: token.refreshToken });
        navigation.navigate("Home"); // TODO: Move to correct page
      } catch (exception) {
        // TODO: We need to handle an error here
        console.log(exception);
        navigation.navigate("NotFound");
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  };

  handleBlurField = (field: keyof Value) => {
    // TODO: Refactor...
    const { value } = this.state;
    switch (field) {
      case "email":
        this.handleSetErrorToField("invalidEmail", !isValidEmail(value.email));
        break;
      case "password":
        this.handleSetErrorToField(
          "invalidPassword",
          !isValidPassword(value.password)
        );
        break;
    }
  };

  handleRegisterPress = () => {
    const { navigation } = this.props;
    navigation.navigate("Register");
  };

  render() {
    const { value, loading, invalidCredentials } = this.state;
    return (
      <LoginView
        onFieldChange={this.handleFieldChange}
        onLoginPress={this.handleLoginPress}
        onRegisterPress={this.handleRegisterPress}
        onBlurField={this.handleBlurField}
        isLoading={loading}
        value={value}
        invalidCredentials={invalidCredentials}
      />
    );
  }
}

export default LoginController;
