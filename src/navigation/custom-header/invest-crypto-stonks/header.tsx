import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";
import { formatNumberToLocaleString } from "../../../helper/string";

interface Props extends NativeStackHeaderProps {
}

interface Route {
  params: {userCoins: number};
}

export default function InvestViewHeader(props: Props) {
  const userCoins = props.route.params && (props.route as Route).params.userCoins || 0
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={require("../../../../assets/images/misc/back.png")}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.coinsContainer}>
        <Image source={require('../../../../assets/images/efs-coin.png')} style={styles.efsCoinImage} />
        <View style={styles.efsCoinContainer}>
          <Text style={styles.efsCoinAmount}>{formatNumberToLocaleString(userCoins)}</Text>
          <Text style={styles.efsCoinTitle}>FCS coins</Text>
        </View>
      </View>
      <View style={{width: 50}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: 'center',
    alignItems: "center",
  },
  backContainer: {
    marginLeft: 6,
    marginVertical: 18,
  },
  backButton: {
    height: 24,
    width: 32,
    tintColor: Colors.blue,
  },
  coinsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  efsCoinContainer: {
    marginLeft: 6
  },
  efsCoinImage: {
    height: 40,
    width: 32,
  },
  efsCoinAmount: {
    fontFamily: Fonts.redhatRegular,
    fontWeight: 'bold',
    color: Colors.orange,
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0.18
  },
  efsCoinTitle: {
    fontFamily: Fonts.redhatRegular,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.1,
    marginLeft: 5
  }
});
