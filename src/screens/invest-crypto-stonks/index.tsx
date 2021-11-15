import * as React from "react";
import Controller, { PropTypes as ControllerProps } from "./controller";

interface PropTypes extends ControllerProps {}

export default function InvestCryptoStonksModule(props: PropTypes) {
  return <Controller {...props} />;
}
