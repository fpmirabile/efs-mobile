import * as React from "react";
import LoginController, { Props as LoginProps } from "./controller";
import userApi from "../../api/models/user";
import { setSession } from "../../api/session";

export default function LoginModule(props: LoginProps) {
  const [invalidCredentials, setInvalidCredentials] =
    React.useState<boolean>(false);
  const handleUserLogin = async (username: string, password: string) => {
    setInvalidCredentials(false);
    try {
      const token = await userApi.login(username, password);
      if (!token) {
        setInvalidCredentials(true);
        return;
      }

      setSession({ jwt: token.token, refresh: token.refreshToken });
      props.navigation.navigate("Home"); // TODO: Move to correct page
    } catch (except) {
      console.log(except);
      props.navigation.navigate("NotFound");
    }
  };

  return (
    <LoginController
      {...props}
      invalidCredentials={invalidCredentials}
      onLoginUser={handleUserLogin}
    />
  );
}
