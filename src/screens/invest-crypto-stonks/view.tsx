import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
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
import { ViewChart } from "../../api/models/invest";
import ButtonWithLoading from "../../components/common/button-with-loading/button-with-loading";

interface PropTypes {
  isLoading: boolean;
  userCoins: number;
  value: ViewValue;
  onBuyPress: () => void;
  onSellPress: () => void;
  onBuySellDone: () => void;
  onGraphChange: () => void;
  onTapStonk: (nextStonk: string) => void;
  onEnterOrder: (coins: number) => void;
  onSellEverything: () => void;
}

export interface ViewValue {
  currentStonk: CompanyStonks;
  chartType: "candle" | "line";
  data: ViewChart[];
  companiesStonks: CompanyStonks[];
  isBuySellOpen: boolean;
  showBuyButton: boolean;
  todayPerformance: string;
  winLoseQty: number;
  isSellLoading: boolean;
}

export interface CompanyStonks {
  id: number;
  code: string;
  enableImg: any;
  disableImg: any;
  name: string;
}

const StonkItem =
  (props: PropTypes) =>
  ({ item }: { item: CompanyStonks }) => {
    return (
      <StonkList
        key={item.id}
        isSelected={item.code === props.value.currentStonk.code}
        enableImg={item.enableImg}
        disableImg={item.disableImg}
        name={item.name}
        code={item.code}
        onPress={props.onTapStonk}
      />
    );
  };

const winOrLoseStyle = (performance: string) => {
  return performance && performance.includes && performance?.includes("-")
    ? styles.lose
    : styles.win;
};

const winOrLoseBackground = (performance: string) => {
  return performance && performance.includes && performance?.includes("-")
    ? styles.loseBackground
    : styles.winBackground;
};

export default function InvestView(props: PropTypes) {
  const data = props.value.data;
  const todayData = data[data.length - 1];
  const stonkPrice = Number(todayData?.close || 0).toFixed(2);
  const investmentTitle: string = props.value.todayPerformance?.includes("-")
    ? "Perdida"
    : "Ganancia";
  const winLoseQuantity = props.value.winLoseQty.toFixed(2).replace("-", "");
  const stonkTodayPerformance = todayData?.variacion || "0";
  return (
    <LoadingPage isLoading={props.isLoading}>
      <PageWithScroll>
        <StatusBar hidden />
        <View style={styles.stonkTypeContainer}>
          <FlatList
            data={props.value.companiesStonks}
            renderItem={StonkItem(props)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.flatListContainer}
          />
        </View>
        <View style={styles.graphContainer}>
          <View style={styles.costsTextsContainer}>
            <Text style={styles.costText}>
              1 {props.value.currentStonk.name.toUpperCase()} = ${stonkPrice}
            </Text>
            {!!props.value.todayPerformance && (
              <Text
                style={[
                  styles.todayCostText,
                  winOrLoseStyle(props.value.todayPerformance),
                ]}
              >
                {investmentTitle.toUpperCase()} ${winLoseQuantity} /{" "}
                {`${!props.value.todayPerformance?.includes("-") ? "+" : ""}${
                  props.value.todayPerformance
                }`}
                %
              </Text>
            )}
            {props.value.showBuyButton && (
              <Text
                style={[
                  styles.todayCostText,
                  winOrLoseStyle(stonkTodayPerformance),
                ]}
              >
                HOY {stonkTodayPerformance}%
              </Text>
            )}
          </View>
          <View>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 15 }}
              padding={{
                left: 20,
                right: 60,
                top: 30,
                bottom: 40,
              }}
              height={330}
              scale={{ x: "time" }}
              containerComponent={<VictoryZoomContainer downsample />}
            >
              <VictoryAxis
                tickFormat={(t: Date) => `${t.getDate()}/${t.getMonth() + 1}`}
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
                <VictoryLine interpolation="natural" data={props.value.data} />
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
          {props.value.showBuyButton && (
            <View style={styles.buySellContainer}>
              <Button
                text={`Comprar ${stonkPrice}`}
                style={{
                  container: styles.buyButtonContainer,
                  text: styles.BuyButtonText,
                }}
                onPress={props.onBuyPress}
              />
            </View>
          )}
          {!props.value.showBuyButton && (
            <View style={styles.alreadyBoughtView}>
              <Button
                text="Stop Lose"
                icon={
                  <Image
                    source={require("../../../assets/images/simulator/stroke.png")}
                    style={styles.stopLoseIcon}
                  />
                }
                style={{
                  container: [
                    styles.buyButtonContainer,
                    styles.stopLoseButtonContainer,
                  ],
                  text: styles.BuyButtonText,
                }}
                upperCase
                onPress={() => {}}
              />
              <ButtonWithLoading
                text="Vender"
                style={{
                  container: [
                    styles.sellButtonContainer,
                    winOrLoseBackground(props.value.todayPerformance),
                  ],
                  text: styles.sellButtonText,
                }}
                onPress={props.onSellEverything}
                isLoading={props.value.isSellLoading}
              />
            </View>
          )}
        </View>
        <EnterOrder
          currentCoins={props.userCoins}
          isVisible={props.value.isBuySellOpen}
          onCloseModal={props.onBuySellDone}
          onEnterOrder={props.onEnterOrder}
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
    maxWidth: 60,
  },
  graphButton: {},
  buySellContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    marginBottom: 16,
  },
  BuyButtonText: {
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
  alreadyBoughtView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  sellButtonContainer: {
    backgroundColor: Colors.secondaryLightBlue,
    borderRadius: 4,
    minWidth: 222,
    height: 59,
    marginLeft: 9,
  },
  sellButtonText: {
    color: Colors.white,
    letterSpacing: 1.25,
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },
  stopLoseButtonContainer: {
    width: 93,
  },
  stopLoseIcon: {
    height: 24,
    width: 24,
    tintColor: Colors.white,
    marginRight: 5,
  },
  lose: {
    color: Colors.red,
  },
  win: {
    color: Colors.lightGreen,
  },
  winBackground: {
    backgroundColor: Colors.lightGreen,
  },
  loseBackground: {
    backgroundColor: Colors.red,
  },
});
