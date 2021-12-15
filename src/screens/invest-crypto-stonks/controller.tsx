import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import investApi, {
  Investment,
  MyInvestment,
  ViewChart,
} from "../../api/models/invest";
import { transformToViewChart } from "../../helper/chart-helper";
import InvestView, { ViewValue as Value } from "./view";

export interface PropTypes extends BasicStackComponentProps {
  myInvestments?: MyInvestment;
  userCoins: number;
  reloadUserInvestments: () => void;
}

interface StateType {
  isLoading: boolean;
  value: Value;
}

class Controller extends React.PureComponent<PropTypes, StateType> {
  state: StateType = {
    isLoading: true,
    value: {
      currentStonk: companyLogos[0],
      data: [],
      chartType: "candle",
      companiesStonks: companyLogos,
      isBuySellOpen: false,
      showBuyButton: false,
      todayPerformance: "",
      winLoseQty: 0,
      isSellLoading: false,
    },
  };

  getStonkValues = async (nextStonk?: string): Promise<ViewChart[]> => {
    const {
      value: { currentStonk: currentStock },
    } = this.state;

    const stonkOptionsInfo = await investApi.getStonk(
      nextStonk ? nextStonk : currentStock.code
    );
    return transformToViewChart(stonkOptionsInfo);
  };

  getInvestment = async (stonkCode: string): Promise<Investment | null> => {
    const myInvestments = await investApi.myInvestments();
    const investments = myInvestments?.inversiones;
    const currentInvestmet = investments?.find(
      (i) => i.codigo.toLowerCase() === stonkCode.toLowerCase()
    );

    return currentInvestmet ? currentInvestmet : null;
  };

  async componentDidMount() {
    const {
      value: { currentStonk: currentStock },
    } = this.state;

    const currentStonkData = await this.getStonkValues();
    if (!currentStonkData.length) {
      return;
    }

    const investment = await this.getInvestment(currentStock.code);
    this.setState({
      isLoading: false,
      value: {
        ...this.state.value,
        data: currentStonkData,
        showBuyButton: !investment?.rendimiento,
        todayPerformance: investment?.rendimiento ?? "",
        winLoseQty:
          (investment?.total || 0) - (investment?.inversionInicial || 0),
      },
    });
  }

  handleClickOnStonks = async (nextStonk: string) => {
    const nextSelectedStonk = companyLogos.find((i) => i.code === nextStonk);
    if (!nextSelectedStonk) {
      return;
    }

    this.setState({
      isLoading: true,
    });

    const currentStonkData = await this.getStonkValues(nextSelectedStonk.code);
    const investment = await this.getInvestment(nextStonk);
    this.setState({
      isLoading: false,
      value: {
        ...this.state.value,
        currentStonk: nextSelectedStonk,
        data: currentStonkData,
        showBuyButton: !investment?.rendimiento,
        todayPerformance: investment?.rendimiento ?? "",
        winLoseQty:
          (investment?.total || 0) - (investment?.inversionInicial || 0),
      },
    });
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

  handleEnterOrder = async (coins: number) => {
    const {
      value: { currentStonk: currentStock },
    } = this.state;
    const { navigation, userCoins } = this.props;

    try {
      await investApi.invest(currentStock.code, coins);
      const myInvest = await this.getInvestment(currentStock.code);
      const currentCoins = userCoins - coins;
      navigation.setParams({ userCoins: currentCoins });
      this.setState({
        isLoading: false,
        value: {
          ...this.state.value,
          isBuySellOpen: false,
          showBuyButton: !myInvest?.rendimiento,
          todayPerformance: myInvest?.rendimiento ?? "",
          winLoseQty:
            (myInvest?.total || 0) - (myInvest?.inversionInicial || 0),
        },
      });
    } catch {}
  };

  handleSellEverything = async () => {
    const {
      value: { currentStonk },
    } = this.state;
    const { reloadUserInvestments, navigation } = this.props;
    const stonkCode = currentStonk.code;

    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        isSellLoading: true,
      },
    });

    try {
      const sellResponse = await investApi.sell(stonkCode);
      if (sellResponse) {
        reloadUserInvestments();
        this.setState((state) => {
          const currentCoins = sellResponse.total;
          navigation.setParams({ userCoins: currentCoins });
          return {
            ...state,
            value: {
              ...state.value,
              showBuyButton: true,
              todayPerformance: "",
              winLoseQty: 0,
              isSellLoading: false,
            },
          };
        });
      }
    } catch {
      console.log("couldn't sell " + stonkCode);
      this.setState({
        ...this.state,
        value: {
          ...this.state.value,
          isSellLoading: false,
        },
      });
    }
  };

  render() {
    const { value, isLoading } = this.state;
    const { userCoins } = this.props;
    return (
      <InvestView
        value={value}
        userCoins={userCoins}
        onBuyPress={this.handleOpenBuySellModal}
        onSellPress={this.handleOpenBuySellModal}
        onBuySellDone={this.handleBuySellDone}
        onGraphChange={this.handleGraphChange}
        onTapStonk={this.handleClickOnStonks}
        onEnterOrder={this.handleEnterOrder}
        isLoading={isLoading}
        onSellEverything={this.handleSellEverything}
      />
    );
  }
}

export default Controller;

const companyLogos = [
  {
    id: 1,
    code: "AAPL",
    enableImg: require("../../../assets/images/temp/invest-logos/icon-apple.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/Apple.png"),
    name: "Apple",
  },
  {
    id: 2,
    code: "GOLD",
    enableImg: require("../../../assets/images/temp/invest-logos/icon-barrick.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/Gold.png"),
    name: "Oro",
  },
  {
    id: 3,
    code: "BTC-USD",
    enableImg: require("../../../assets/images/temp/invest-logos/icon-btc.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/BTC.png"),
    name: "Bitcoin",
  },
  {
    id: 4,
    code: "ETH-USD",
    enableImg: require("../../../assets/images/temp/invest-logos/icon-eth.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/ETH.png"),
    name: "ETH",
  },
  {
    id: 5,
    code: "MCD",
    enableImg: require("../../../assets/images/temp/invest-logos/icon-mc.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/MC.png"),
    name: "McDonalds",
  },
  {
    id: 6,
    code: "TSLA",
    enableImg: require("../../../assets/images/temp/invest-logos/icon-tesla.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/Tesla.png"),
    name: "Tesla",
  },
  {
    id: 7,
    code: "WMT",
    enableImg: require("../../../assets/images/temp/invest-logos/icon-walt.png"),
    disableImg: require("../../../assets/images/temp/disabled-logos/wallmart.png"),
    name: "Waltmart",
  },
  // {
  //   id: 8,
  //   code: "AMDC",
  //   enableImg: require("../../../assets/images/temp/invest-logos/icon-amd.png"),
  //   disableImg: require("../../../assets/images/temp/disabled-logos/amd.png"),
  //   name: "AMD",
  // },
];
