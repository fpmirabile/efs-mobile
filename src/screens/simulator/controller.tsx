import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import View from "./simulator-view";

export interface PropTypes extends BasicStackComponentProps {}

interface StateType {}

class SimulatorController extends React.PureComponent<PropTypes, StateType> {
  render() {
    return <View userName="Mabel" />;
  }
}

export default SimulatorController;
