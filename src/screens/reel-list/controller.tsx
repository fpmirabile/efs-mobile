import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import ReelsView from "./view";

export interface Props extends BasicStackComponentProps {}

interface State {}

class ReelsController extends React.PureComponent<Props, State> {
  state: State = {};

  render() {
    const {} = this.state;
    return <ReelsView />;
  }
}

export default ReelsController;
