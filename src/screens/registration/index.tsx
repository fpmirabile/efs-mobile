import * as React from "react";
import {} from "react-native";
import { Props as RegisterProps } from "./controller";
import RegisterController from "./controller";
import userApi from "../../api/models/user";

export default function RegisterModule(props: RegisterProps) {
  return <RegisterController {...props} onUserRegister={userApi.register} />;
}