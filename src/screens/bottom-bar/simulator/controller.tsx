import * as React from "react";
import { BasicStackComponentProps } from "../../../../types";
import View from "./simulator-view";

export interface PropTypes extends BasicStackComponentProps {}

interface StateType {}

class SimulatorController extends React.PureComponent<PropTypes, StateType> {
  handleStonksAndCryptoPress = () => {
    const { navigation } = this.props;
    navigation.push("StonksAndCrypto");
  };

  render() {
    return (
      <View
        userName="Mabel"
        onStonksAndCryptoPress={this.handleStonksAndCryptoPress}
        performance={"+0,64%"}
      />
    );
  }
}

export default SimulatorController;
