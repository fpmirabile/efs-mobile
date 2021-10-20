import * as React from "react";
import LoginController, { Props as LoginProps } from "./controller";
import userApi from "../../api/models/user";

export default function RegisterModule(props: LoginProps) {
  return (
    <LoginController
      {...props}
      onLoginUser={userApi.login}
    />
  );
}
