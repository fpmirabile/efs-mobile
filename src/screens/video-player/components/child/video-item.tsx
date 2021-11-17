import * as React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Reel } from "../../../../api/models/reels";
import Colors from "../../../../constants/colors";
import Fonts from "../../../../constants/fonts";
import LoadingBanner from "../../../../components/common/loading-banner/loading-banner";

interface Props {
  onPressedVideo: (reelId: number) => void;
  item: Reel;
}

export default function (props: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const onVideoPress = () => {
    props.onPressedVideo(props.item.reelId);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableWithoutFeedback onPress={onVideoPress}>
        <View style={styles.elementsContainer}>
          <ImageBackground
            source={{
              uri: props.item.imagen,
            }}
            onLoadStart={startLoading}
            onLoadEnd={endLoading}
            style={styles.imageBackground}
          >
            {isLoading && (
              <View style={styles.loadingView}>
                <LoadingBanner />
              </View>
            )}
            {!isLoading && (
              <View style={styles.container}>
                <View style={styles.durationContainer}>
                  <LinearGradient
                    colors={["rgba(22,2,102,0.8)", "transparent"]}
                    style={styles.topGradient}
                  >
                    <Text style={styles.videoDuration}>
                      {props.item.duracion}
                    </Text>
                  </LinearGradient>
                </View>
                <View style={styles.videoTitleContainer}>
                  <LinearGradient
                    // Background Linear Gradient
                    colors={["transparent", "rgba(22,2,102,0.8)"]}
                    style={styles.bottomGradient}
                  >
                    <Text style={styles.videoTitle}>{props.item.titulo}</Text>
                  </LinearGradient>
                </View>
              </View>
            )}
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.blue,
    marginRight: 8,
  },
  elementsContainer: {
    height: 244,
    width: 157,
    flexDirection: "column",
  },
  topGradient: {
    padding: 7,
    width: "100%",
    alignItems: "flex-end",
  },
  bottomGradient: {
    padding: 15,
    width: '100%',
    paddingBottom: 25
  },
  durationContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: '100%'
  },
  videoDuration: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.white,
  },
  imageBackground: {
    flex: 1,
  },
  videoTitleContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flex: 1,
    width: '100%',
  },
  videoTitle: {
    fontFamily: Fonts.redhatRegular,
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
});
