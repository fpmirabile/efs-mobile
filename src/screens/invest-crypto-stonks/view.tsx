import * as React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import {
  VictoryChart,
  VictoryCandlestick,
  VictoryTheme,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryLine,
} from "victory-native";
import Button from "../../components/common/button";
import PageWithScroll from "../../components/common/page-with-scroll/page-with-scroll";
import StonkList from "./components/stonk-list";
import Colors from "../../constants/colors";
import Fonts from "../../constants/fonts";
import LoadingPage from "../../components/common/loading-page/loading-page";
import EnterOrder from "./components/enter-order";
import { StatusBar } from "expo-status-bar";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface PropTypes {
  isLoading: boolean;
  value: ViewValue;
  onBuyPress: () => void;
  onSellPress: () => void;
  onBuySellDone: () => void;
  onGraphChange: () => void;
}

export interface ViewValue {
  chartType: "candle" | "line";
  data: CandleStickChartData[];
  lineData: LineChartData[];
  companiesStonks: CompanyStonks[];
  isBuySellOpen: boolean;
}

export interface LineChartData {
  x: number;
  y: number;
  label?: string;
  symbol?: string;
  fill?: string;
  opacity?: number;
}

export interface CandleStickChartData {
  x: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CompanyStonks {
  id: number;
  enableImg: any;
  disableImg: any;
  name: string;
  isSelected: boolean;
}

export default function InvestView(props: PropTypes) {
  return (
    <LoadingPage isLoading={props.isLoading}>
      <PageWithScroll scrollViewContainerStyles={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={styles.stonkTypeContainer}>
          <FlatList
            data={props.value.companiesStonks}
            renderItem={StonkList({})}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.flatListContainer}
          />
        </View>
        <View style={styles.graphContainer}>
          <View style={styles.costsTextsContainer}>
            <Text style={styles.costText}>1 BITCOIN = 60614.73</Text>
            <Text style={styles.todayCostText}>HOY -2.58%</Text>
          </View>
          <View>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 25 }}
              padding={{
                left: 0,
                right: 60,
                top: 30,
                bottom: 40,
              }}
              height={404}
              scale={{ x: "time" }}
              containerComponent={
                <VictoryZoomContainer
                  allowZoom={false}
                  zoomDomain={{
                    x: [props.value.data[0].x, props.value.data[4].x],
                    y: [30000, props.value.data[4].close],
                  }}
                />
              }
            >
              <VictoryAxis
                tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}
              />
              <VictoryAxis dependentAxis orientation="right" />
              {props.value.chartType === "candle" && (
                <VictoryCandlestick
                  candleColors={{
                    positive: Colors.lightGreen,
                    negative: Colors.red,
                  }}
                  data={props.value.data}
                />
              )}
              {props.value.chartType === "line" && (
                <VictoryLine
                  interpolation="natural"
                  data={props.value.lineData}
                />
              )}
            </VictoryChart>
            <View style={styles.graphButtonContainer}>
              <TouchableWithoutFeedback onPress={props.onGraphChange}>
                <Image
                  source={
                    props.value.chartType === "line"
                      ? require("../../../assets/images/temp/graphs/velas.png")
                      : require("../../../assets/images/temp/graphs/lineal.png")
                  }
                  style={styles.graphButton}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.buySellContainer}>
            <Button
              text="Comprar 60614.98"
              style={{
                container: styles.buyButtonContainer,
                text: styles.sellAndBuyButtonText,
              }}
              onPress={props.onBuyPress}
            />
          </View>
        </View>
        <EnterOrder
          isVisible={props.value.isBuySellOpen}
          onCloseModal={props.onBuySellDone}
        />
      </PageWithScroll>
    </LoadingPage>
  );
}

const styles = StyleSheet.create({
  stonkTypeContainer: {
    flexDirection: "row",
  },
  flatListContainer: {
    marginTop: 1,
    marginBottom: 10,
    marginHorizontal: 6,
  },
  costsTextsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  costText: {
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
    color: Colors.blue,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  todayCostText: {
    fontFamily: Fonts.redhatRegular,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.1,
    color: Colors.secondaryOrange,
  },
  graphContainer: {
    flex: 1,
  },
  graphButtonContainer: {
    position: "relative",
    bottom: 95,
    left: 10,
    zIndex: 100,
  },
  graphButton: {},
  buySellContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    marginBottom: 16,
  },
  sellButtonContainer: {
    backgroundColor: Colors.sellRed,
    borderRadius: 4,
    minHeight: 59,
    maxWidth: 159,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 13,
  },
  sellAndBuyButtonText: {
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: Colors.white,
  },
  buyButtonContainer: {
    backgroundColor: Colors.blue,
    borderRadius: 4,
    minHeight: 59,
    justifyContent: "center",
    alignItems: "center",
  },
  sellAndBuyIcon: {
    marginRight: 16,
  },
});
