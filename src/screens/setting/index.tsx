import * as React from "react";
import SettingController, { Props as SettingProps } from "./controller";


export default function SettingModule(props: SettingProps) {
  return (
    <SettingController
      {...props}
    />
  );
}
