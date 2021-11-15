import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import InvestView, { CandleStickChartData } from "./view";

export interface PropTypes extends BasicStackComponentProps {}

interface StateType {
  isBuySellOpen: boolean;
}

class Controller extends React.PureComponent<PropTypes, StateType> {
  state: StateType = {
    isBuySellOpen: false,
  };

  handleOpenBuySellModal = () => {
    this.setState({
      isBuySellOpen: true,
    });
  };

  handleCloseBuySellModal = () => {
    const { isBuySellOpen } = this.state;
    if (!isBuySellOpen) {
      return;
    }

    this.setState({
      isBuySellOpen: false,
    });
  };

  handleBuySellDone = () => {
    this.handleCloseBuySellModal();
  };

  render() {
    const { isBuySellOpen } = this.state;
    return (
      <InvestView
        onBuyPress={this.handleOpenBuySellModal}
        onSellPress={this.handleOpenBuySellModal}
        isBuySellModalOpen={isBuySellOpen}
        onBuySellDone={this.handleBuySellDone}
        data={data}
        companiesStonks={companyLogos}
        isLoading={false}
      />
    );
  }
}

export default Controller;

const companyLogos = [
  {
    id: 1,
    image: require("../../../assets/images/temp/invest-logos/icon-amd.png"),
    name: "AMD",
    isSelected: false,
  },
  {
    id: 2,
    image: require("../../../assets/images/temp/invest-logos/icon-apple.png"),
    name: "Apple",
    isSelected: false,
  },
  {
    id: 3,
    image: require("../../../assets/images/temp/invest-logos/icon-barrick.png"),
    name: "Barrick",
    isSelected: false,
  },
  {
    id: 4,
    image: require("../../../assets/images/temp/invest-logos/icon-btc.png"),
    name: "Bitcoin",
    isSelected: true,
  },
  {
    id: 5,
    image: require("../../../assets/images/temp/invest-logos/icon-eth.png"),
    name: "ETH",
    isSelected: false,
  },
  {
    id: 6,
    image: require("../../../assets/images/temp/invest-logos/icon-mc.png"),
    name: "McDonalds",
    isSelected: false,
  },
  {
    id: 7,
    image: require("../../../assets/images/temp/invest-logos/icon-tesla.png"),
    name: "Tesla",
    isSelected: false,
  },
  {
    id: 8,
    image: require("../../../assets/images/temp/invest-logos/icon-walt.png"),
    name: "Walt Disney",
    isSelected: false,
  },
];

const data: CandleStickChartData[] = [
  {
    x: 1625945400000,
    open: 33575.25,
    high: 33600.52,
    low: 33475.12,
    close: 33520.11,
  },
  {
    x: 1625946300000,
    open: 33545.25,
    high: 33560.52,
    low: 33510.12,
    close: 33520.11,
  },
  {
    x: 1625947200000,
    open: 33510.25,
    high: 33515.52,
    low: 33250.12,
    close: 33250.11,
  },
  {
    x: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
];
