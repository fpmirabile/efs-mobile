import * as React from "react";
import { BasicStackComponentProps } from "../../../../types";
import SettingView from "./setting-view";

export interface Props extends BasicStackComponentProps {
}
interface State {
  isLoading: boolean;
}

class SettingController extends React.PureComponent<Props, State> {
  state: State = {
    isLoading: false,
  };

  render() {
    const { isLoading } = this.state;
    return <SettingView isLoading={isLoading} />;
  }
}

export default SettingController;
