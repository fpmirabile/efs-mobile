import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ViewStyle,
  TextStyle,
  Text,
  Image,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Reel } from "../../../../../api/models/reels";
import LoadingBanner from "../../../../../components/common/loading-banner/loading-banner";
import Colors from "../../../../../constants/colors";
import Fonts from "../../../../../constants/fonts";

interface Props {
  backgroundImageStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onImageLoadError: () => string;
  onPressVideo: (reelId: number) => void;
  item: Reel;
}

export default function (props: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const onPressVideo = () => {
    props.onPressVideo(props.item.reelId);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onPressVideo}>
      <ImageBackground
        imageStyle={styles.image}
        source={{
          uri: props.item.imagen,
        }}
        onLoadStart={startLoading}
        onLoadEnd={endLoading}
        style={[styles.imageBackground, props.backgroundImageStyle]}
        onError={props.onImageLoadError}
      >
        {isLoading && (
          <View style={styles.loadingView}>
            <LoadingBanner />
          </View>
        )}
        {!isLoading && (
          <View style={styles.container}>
            <View style={styles.continerTop}>
              <Image
                style={styles.coinsImg}
                source={require("../../../../../../assets/images/misc/coin.png")}
              />
              <Text style={styles.textFCSCoin}>
                {!props.item.coins ? "25" : props.item.coins}
              </Text>
            </View>
            <View style={styles.containerButtom}>
              <View style={[styles.textContainer, props.textContainerStyle]}>
                <LinearGradient
                  colors={["rgba(22,2,102,0.8)", "transparent"]}
                  style={styles.gradient}
                >
                  <Text style={[styles.title, props.titleStyle]}>
                    {props.item.titulo}
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  continerTop: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: 'row',
    marginLeft: 4,
    marginTop: 4,
  },
  containerButtom: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: 139,
    width: 140,
    justifyContent: "flex-end",
    marginRight: 8,
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },
  title: {
    lineHeight: 16,
    fontSize: 12,
    letterSpacing: 0.4,
    color: Colors.white,
    fontFamily: Fonts.redhatRegular,
    fontWeight: "bold",
  },
  coinsImg: {
    width: 18,
    height: 22,
    marginRight: 4
  },
  textFCSCoin: {
    color: Colors.blue,
    fontWeight: "bold",
    fontFamily: Fonts.redhatRegular,
  },
});
