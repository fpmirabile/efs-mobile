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
import { ReelPopular } from "../../../../../api/models/reels";
import LoadingBanner from "../../../../../components/common/loading-banner/loading-banner";
import Colors from "../../../../../constants/colors";
import Fonts from "../../../../../constants/fonts";

interface Props {
  backgroundImageStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onImageLoadError: () => string;
  onPressVideo: (reelId: number) => void;
  item: ReelPopular;
}

export default function (props: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const onReelPress = () => {
    props.onPressVideo(props.item.reelId);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onReelPress}>
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
          <View style={[styles.textContainer, props.textContainerStyle]}>
            <LinearGradient
              colors={["rgba(22,2,102,0.8)", "transparent"]}
              style={styles.gradient}
            >
              <Text style={[styles.popularText, props.titleStyle]}>
                {props.item.titulo}
              </Text>
              <View style={styles.likesContainer}>
                <Image
                  source={require("../../../../../../assets/images/misc/thumb_up.png")}
                  style={styles.likeIcon}
                />
                <Text style={styles.popularText}>
                  {props.item.cantidadLikes}
                </Text>
              </View>
            </LinearGradient>
          </View>
        )}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageBackground: {
    height: 146,
    width: 276,
    justifyContent: "flex-end",
    borderRadius: 8,
    marginRight: 8,
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-end'
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  popularText: {
    lineHeight: 16,
    fontSize: 14,
    letterSpacing: 0.1,
    color: Colors.white,
    maxWidth: 156,
    fontFamily: Fonts.redhatRegular,
    alignSelf: 'center',
  },
  likesContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  likeIcon: {
    height: 24,
    width: 24,
    tintColor: Colors.white,
    marginBottom: 4,
  },
});
