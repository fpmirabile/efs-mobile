import * as React from "react";
import LoginController, { Props as LoginProps } from "./controller";
import userApi from "../../api/models/user";
import investApi from "../../api/models/invest";
import { setSession, setUserData } from "../../api/session";

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
      const userData = await userApi.me();
      const investData = await investApi.myInvestments();
      userData.simulatorData = investData;
      setUserData(userData);
      props.navigation.navigate("Home");
    } catch (except) {
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
