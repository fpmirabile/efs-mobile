import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import { isValidEmail, isValidPassword } from "../../util/validator";
import LoginView from "./login";

export interface Props extends BasicStackComponentProps {
  onLoginUser: (email: string, password: string) => Promise<void>;
  invalidCredentials: boolean;
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
}

class LoginController extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    value: {
      email: "kZoldyck@gmail.com",
      invalidEmail: false,
      password: "Kilua123*",
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
      const { onLoginUser } = this.props;
      this.setState({
        loading: true,
      });
      try {
        const { value } = this.state;
        await onLoginUser(value.email, value.password);
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
    const { value, loading } = this.state;
    const { invalidCredentials } = this.props;
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
