import * as React from "react";
import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import {
  VictoryChart,
  VictoryCandlestick,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import Button from "../../components/common/button";
import PageWithScroll from "../../components/common/page-with-scroll/page-with-scroll";
import StonkList from "./components/stonk-list";
import Colors from "../../constants/colors";
import Fonts from "../../constants/fonts";
import LoadingPage from "../../components/common/loading-page/loading-page";
import EnterOrder from "./components/enter-order";

interface PropTypes {
  data: CandleStickChartData[];
  companiesStonks: CompanyStonks[];
  isLoading: boolean;
  isBuySellModalOpen: boolean;

  onBuyPress: () => void;
  onSellPress: () => void;
  onBuySellDone: () => void;
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
  image: any;
  name: string;
  isSelected: boolean;
}

export default function InvestView(props: PropTypes) {
  return (
    <LoadingPage isLoading={props.isLoading}>
      <PageWithScroll viewStyles={{ flex: 1 }}>
        <View style={styles.stonkTypeContainer}>
          <FlatList
            data={props.companiesStonks}
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
              scale={{ x: "time" }}
            >
              <VictoryAxis
                tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}
              />
              <VictoryAxis dependentAxis orientation="right" />
              <VictoryCandlestick
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                data={props.data}
              />
            </VictoryChart>
          </View>
          <View style={styles.buySellContainer}>
            <Button
              text="Vender 60614.98"
              style={{
                container: styles.sellButtonContainer,
                text: styles.sellAndBuyButtonText,
              }}
              icon={
                <Image
                  style={styles.sellAndBuyIcon}
                  source={require("../../../assets/images/efs-coin.png")}
                />
              }
              onPress={props.onSellPress}
            />
            <Button
              text="Comprar 60614.98"
              style={{
                container: styles.buyButtonContainer,
                text: styles.sellAndBuyButtonText,
              }}
              icon={
                <Image
                  style={styles.sellAndBuyIcon}
                  source={require("../../../assets/images/efs-coin.png")}
                />
              }
              onPress={props.onBuyPress}
            />
          </View>
        </View>
        <EnterOrder
          isVisible={props.isBuySellModalOpen}
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
  buySellContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
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
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: Colors.white,
  },
  buyButtonContainer: {
    backgroundColor: Colors.secondaryLightBlue,
    borderRadius: 4,
    minHeight: 59,
    maxWidth: 159,
    justifyContent: "space-between",
    alignItems: "center",
  },
  sellAndBuyIcon: {
    marginRight: 16,
  },
});
