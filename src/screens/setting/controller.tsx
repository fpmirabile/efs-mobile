import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import RenderSetting from "./setting-view";

export interface Props extends BasicStackComponentProps {
    // onLoginUser: (email: string, password: string) => Promise<LoginToken>;
  }
  interface State {
    isLoading: boolean;
  }

  class SettingController extends React.PureComponent<Props, State> { 
    state: State = {
        isLoading:false
    };
    render() {
        const {
          isLoading
        } = this.state;
        return (
          <RenderSetting
            isLoading={isLoading}
          />
        );
      }

  };
  export default SettingController;