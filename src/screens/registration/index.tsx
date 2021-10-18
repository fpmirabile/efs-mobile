import * as React from "react";
import RegisterController, { Props as RegisterProps } from "./controller";
import userApi from "../../api/models/user";

export default function RegisterModule(props: RegisterProps) {
  return <RegisterController {...props} onUserRegister={userApi.register} />;
}
