import * as React from "react";
import Controller, { PropTypes as SimulatorProps } from "./controller";

export default function Simulator(props: SimulatorProps) {
  return <Controller {...props} />;
}
