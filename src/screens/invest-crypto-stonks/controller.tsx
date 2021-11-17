import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import InvestView, {
  CandleStickChartData,
  LineChartData,
  ViewValue as Value,
} from "./view";

export interface PropTypes extends BasicStackComponentProps {}

interface StateType {
  value: Value;
}

class Controller extends React.PureComponent<PropTypes, StateType> {
  state: StateType = {
    value: {
      lineData: lineChartData,
      data: data,
      chartType: "candle",
      companiesStonks: companyLogos,
      isBuySellOpen: false,
    },
  };

  handleOpenBuySellModal = () => {
    this.setState({
      value: {
        ...this.state.value,
        isBuySellOpen: true,
      },
    });
  };

  handleCloseBuySellModal = () => {
    const {
      value: { isBuySellOpen },
    } = this.state;
    if (!isBuySellOpen) {
      return;
    }

    this.setState({
      value: {
        ...this.state.value,
        isBuySellOpen: false,
      },
    });
  };

  handleGraphChange = () => {
    const {
      value: { chartType },
    } = this.state;
    const nextChart: Value["chartType"] =
      chartType === "candle" ? "line" : "candle";

    this.setState({
      value: {
        ...this.state.value,
        chartType: nextChart,
      },
    });
  };

  handleBuySellDone = () => {
    this.handleCloseBuySellModal();
  };

  render() {
    const { value } = this.state;
    return (
      <InvestView
        value={value}
        onBuyPress={this.handleOpenBuySellModal}
        onSellPress={this.handleOpenBuySellModal}
        onBuySellDone={this.handleBuySellDone}
        onGraphChange={this.handleGraphChange}
        isLoading={false}
      />
    );
  }
}

export default Controller;

const companyLogos = [
  {
    id: 1,
    enableImg: require("../../../assets/images/temp/invest-logos/icon-amd.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/amd.png"),
    name: "AMD",
    isSelected: false,
  },
  {
    id: 2,
    enableImg: require("../../../assets/images/temp/invest-logos/icon-apple.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/Apple.png"),
    name: "Apple",
    isSelected: false,
  },
  {
    id: 3,
    enableImg: require("../../../assets/images/temp/invest-logos/icon-barrick.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/Gold.png"),
    name: "Barrick",
    isSelected: false,
  },
  {
    id: 4,
    enableImg: require("../../../assets/images/temp/invest-logos/icon-btc.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/BTC.png"),
    name: "Bitcoin",
    isSelected: true,
  },
  {
    id: 5,
    enableImg: require("../../../assets/images/temp/invest-logos/icon-eth.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/ETH.png"),
    name: "ETH",
    isSelected: false,
  },
  {
    id: 6,
    enableImg: require("../../../assets/images/temp/invest-logos/icon-mc.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/MC.png"),
    name: "McDonalds",
    isSelected: false,
  },
  {
    id: 7,
    enableImg: require("../../../assets/images/temp/invest-logos/icon-tesla.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/Tesla.png"),
    name: "Tesla",
    isSelected: false,
  },
  {
    id: 8,
    enableImg: require("../../../assets/images/temp/invest-logos/icon-walt.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/wallmart.png"),
    name: "Waltmart",
    isSelected: false,
  },
];

const data: CandleStickChartData[] = [
  // {
  //   x: 1625529600000,
  //   open: 33575.25,
  //   high: 33600.52,
  //   low: 33475.12,
  //   close: 33520.11,
  // },
  {
    x: 1625616000000,
    open: 33545.25,
    high: 33560.52,
    low: 33510.12,
    close: 33520.11,
  },
  {
    x: 1625702400000,
    open: 33510.25,
    high: 33515.52,
    low: 33250.12,
    close: 33250.11,
  },
  {
    x: 1625788800000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
  {
    x: 1625875200000,
    open: 34215.25,
    high: 33430.52,
    low: 31215.12,
    close: 33420.11,
  },
  {
    x: 1625961600000,
    open: 38215.25,
    high: 41430.52,
    low: 31215.12,
    close: 40420.11,
  },
];

const lineChartData: LineChartData[] = [
  { x: 1625616000000, y: 33520 },
  { x: 1625702400000, y: 33250 },
  { x: 1625788800000, y: 33215 },
  { x: 1625875200000, y: 33420 },
  { x: 1625961600000, y: 40420 },
];
