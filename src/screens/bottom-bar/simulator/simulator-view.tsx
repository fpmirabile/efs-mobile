import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Indicator from "../../../components/common/indicator/indicator";
import PageWithScroll from "../../../components/common/page-with-scroll/page-with-scroll";
import TextButtonWithIcon from "../../../components/common/text-button-with-icon/text-button-with-icon";
import WhiteBackgroundView from "../../../components/common/white-background-view/white-background-view";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";

interface PropTypes {
  userName: string;
  onStonksAndCryptoPress: () => void;
  performance: string;
}

export default function SimulatorView(props: PropTypes) {
  const performanceAmountStyles = props.performance.includes("+")
    ? styles.goodPerformance
    : styles.badPerformance;

  return (
    <PageWithScroll
      title="Simulador"
      scrollViewContainerStyles={styles.scrollContentView}
      titleStyles={{
        container: styles.pageTitleContainer,
      }}
      viewStyles={styles.pageContainer}
    >
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          <Text style={styles.subtitleUserName}>{props.userName}</Text>, aquí
          podrás utilizar las FCS coins que fuiste ganando al ver reels{" "}
        </Text>
      </View>
      <WhiteBackgroundView viewStyles={styles.whiteBackgroundContainer}>
        <View style={styles.indicatorContainer}>
          <View style={styles.indicatorRow}>
            <Indicator
              title="Valor de portfolio"
              viewStyles={styles.indicatorView}
              value="$1000,43"
              icon={require("../../../../assets/images/simulator/maletin.png")}
            />
            <Indicator
              title="Dinero disponible"
              viewStyles={styles.indicatorView}
              value="$9000,43"
              icon={require("../../../../assets/images/simulator/money.png")}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.indicatorRow}>
            <Indicator
              title="Rendimiento"
              viewStyles={styles.indicatorView}
              amountStyles={performanceAmountStyles}
              value={props.performance}
              icon={require("../../../../assets/images/simulator/stroke.png")}
            />
            <Indicator
              title="Clasificación"
              viewStyles={styles.indicatorView}
              value="15° Lugar"
              icon={require("../../../../assets/images/simulator/ranking.png")}
            />
          </View>
        </View>
      </WhiteBackgroundView>
      <View style={styles.actionButtonContainer}>
        <View style={styles.buttonsAlignmentContainer}>
          <TextButtonWithIcon
            text="Invertir en Acciones / Criptomonedas"
            icon={require("../../../../assets/images/simulator/stroke.png")}
            textStyle={styles.simulatorTextButton}
            iconStyles={styles.simulatorIcon}
            viewStyles={styles.simulatorTextButtonContainer}
            onPress={props.onStonksAndCryptoPress}
          />
          <TextButtonWithIcon
            text="Simulador de plazo fijo"
            icon={require("../../../../assets/images/simulator/bank.png")}
            textStyle={styles.simulatorTextButton}
            iconStyles={styles.simulatorIcon}
            viewStyles={styles.simulatorTextButtonContainer}
          />
          <TextButtonWithIcon
            text="Simulador de Fondo Comun de Inversion"
            icon={require("../../../../assets/images/simulator/invest.png")}
            textStyle={styles.simulatorTextButton}
            iconStyles={styles.simulatorIcon}
            viewStyles={styles.simulatorTextButtonContainer}
          />
        </View>
      </View>
      <View style={styles.inviteButtonContainer}>
        <TextButtonWithIcon
          text="Invita un amigo y gana 500 FCS coins"
          icon={require("../../../../assets/images/efs-coin.png")}
          textStyle={styles.inviteAFriendButton}
        />
      </View>
    </PageWithScroll>
  );
}

const styles = StyleSheet.create({
  scrollContentView: {
    flex: 1,
  },
  pageContainer: {
    marginVertical: 18,
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
  pageTitleContainer: {
    alignSelf: "flex-start",
  },
  subtitleContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  subtitleUserName: {
    fontFamily: Fonts.redhatRegular,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  subtitle: {
    fontFamily: Fonts.redhatRegular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  whiteBackgroundContainer: {
    marginHorizontal: 8,
    marginBottom: 24,
  },
  indicatorContainer: {
    flexDirection: "row",
  },
  indicatorRow: {
    marginTop: 15,
    marginLeft: 8,
    marginRight: 5,
  },
  indicatorView: {
    marginBottom: 16,
  },
  goodPerformance: {
    color: Colors.lightGreen,
  },
  badPerformance: {
    color: Colors.red,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: Colors.almostWhite,
    height: "90%",
    width: 0,
    marginVertical: 8,
    marginHorizontal: 8,
    alignSelf: "center",
  },
  actionButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    flex: 1,
  },
  buttonsAlignmentContainer: {
    alignItems: "flex-start",
    flex: 1,
  },
  simulatorTextButtonContainer: {
    marginVertical: 16,
  },
  simulatorTextButton: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: Colors.lightGray,
    width: 200,
  },
  simulatorIcon: {
    tintColor: Colors.orange,
  },
  inviteButtonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    marginBottom: 8,
  },
  inviteAFriendButton: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.blue,
    color: Colors.blue,
  },
  inviteAFriendButtonIcon: {
    height: 20,
    width: 20,
  },
});
