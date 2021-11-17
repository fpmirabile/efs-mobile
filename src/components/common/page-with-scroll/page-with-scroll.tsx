import * as React from "react";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import Colors from "../../../constants/colors";
import PageTitle, { Props as PageTitleProps } from "../page-title/page-title";

interface Props {
  scrollViewStyles?: ScrollView["props"]["style"];
  scrollViewContainerStyles?: ScrollView["props"]["contentContainerStyle"];
  viewStyles?: View["props"]["style"];
  title?: string;
  coins?: string;
  titleStyles?: {
    container?: PageTitleProps["containerStyle"];
    title?: PageTitleProps["titleStyle"];
  };
  children: React.ReactNode;
}

export default function PageWithScroll(props: Props) {
  return (
    <ScrollView
      contentContainerStyle={props.scrollViewContainerStyles}
      style={[styles.scrollView, props.scrollViewStyles]}
    >
      <View style={[styles.containerView, props.viewStyles]}>
        <View style={styles.continerCoins}>
          {props.title && (
            <PageTitle
              title={props.title}
              titleStyle={[props.titleStyles?.title]}
            />
          )}
          {props.coins && (
             <View style={styles.marginBetween}>
              <Image
                style={styles.coinsImg}
                source={require("../../../../assets/images/misc/coin.png")}
              />
              <View style={styles.contTextCoin}>
                <Text style={styles.textNumCoin}>{props.coins}</Text>
                <Text style={styles.textFCSCoin}>FCS coins</Text>
              </View>
             </View>
          )}
        </View>
        {props.children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F6FB",
  },
  scrollViewContentContainer: {
    flex: 1,
  },
  containerView: {
    flex: 1,
    flexDirection: "column",
  },
  coinsImg: {
    width: 31.93,
    height: 39,
  },
  continerCoins: {
    flexDirection: "row",
    marginBottom: 15,
    marginRight: 16,
  },
  textNumCoin: {
    color: Colors.orange,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "redhatdisplay-regular",
  },
  textFCSCoin: {
    color: Colors.blue,
    fontWeight: "bold",
    fontFamily: "redhatdisplay-regular",
  },
   contTextCoin: {
     marginLeft: 17,
   },
   marginBetween:{
     flexDirection:"row" ,
     marginLeft:110
    }
});
