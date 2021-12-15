import * as React from "react";
import { BasicStackComponentProps } from "../../../../types";
import { User } from "../../../api/models/user";
import View from "./simulator-view";

export interface PropTypes extends BasicStackComponentProps {
  currentUser?: User;
}

interface StateType {
  showReferModal: boolean;
  showYouAreBigModal: boolean;
}

class SimulatorController extends React.PureComponent<PropTypes, StateType> {
  state: StateType = {
    showReferModal: false,
    showYouAreBigModal: false,
  };

  handleReferModalToggle = () => {
    this.setState((currentState) => {
      return {
        ...currentState,
        showReferModal: !currentState.showReferModal,
      }
    });
  }

  handleYouAreBigModal = () => {
    this.setState((currentState) => {
      return {
        ...currentState,
        showYouAreBigModal: !currentState.showYouAreBigModal,
      }
    })
  }

  handleStonksAndCryptoPress = () => {
    const { navigation, currentUser } = this.props;
    navigation.push("StonksAndCrypto", { userCoins: currentUser?.monedas ?? 0 });
  };

  render() {
    const { currentUser } = this.props;
    const { showReferModal, showYouAreBigModal } = this.state;
    if (!currentUser) {
      return null;
    }

    const name = currentUser.nombre.split(" ")[0];
    return (
      <View
        userName={name}
        userSimulatorInformation={currentUser.simulatorData}
        onStonksAndCryptoPress={this.handleStonksAndCryptoPress}
        showReferModal={showReferModal}
        onReferModalClose={this.handleReferModalToggle}
        onReferModalOpen={this.handleReferModalToggle}
        showYouAreBigModal={showYouAreBigModal}
        onCloseYouAreBigModal={this.handleYouAreBigModal}
        onOpenYouAreBigModal={this.handleYouAreBigModal}
      />
    );
  }
}

export default SimulatorController;
