import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import Colors from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../components/common/button";
import NextView from "./components/next-view";
import { Reel } from "../../api/models/reels";
import { StatusBar } from "expo-status-bar";
import LoadingPage from "../../components/common/loading-page/loading-page";

export interface Value {
  isPlaying: boolean;
  videoUri: string;
  liked: boolean;
  favorite: boolean;
  showNextScreen: boolean;
  nextVideos: Reel[];
  groupTitle: string;
  isLoading: boolean;
}

interface Props {
  videoRef: React.MutableRefObject<Video>;
  onFavorite: (favorite: boolean) => void;
  onThumbUpPress: () => void;
  onThumbDownPress: () => void;
  onNextPress: () => void;
  onCloseNextVideos: () => void;
  onPlayPressed: () => void;
  value: Value;
  onNextVideoPress: (reelId: number) => void;
}

function playButton(styles?: Image["props"]["style"], onPress?: () => void) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles}
        source={require("../../../assets/images/video-player/play.png")}
      />
    </TouchableOpacity>
  );
}

function pauseButton(styles?: Image["props"]["style"], onPress?: () => void) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles}
        source={require("../../../assets/images/video-player/stop.png")}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

export default function ReelsView({
  videoRef,
  onFavorite,
  onThumbUpPress,
  onThumbDownPress,
  onNextPress,
  onPlayPressed,
  value,
  onNextVideoPress,
  onCloseNextVideos,
}: Props) {
  const onFavoritePress = () => {
    onFavorite(!value.favorite);
  };

  return (
    <LoadingPage
      loadingPageStyles={styles.loadingPage}
      isLoading={value.isLoading}
    >
      <View style={styles.page}>
        <StatusBar hidden />
        <VideoPlayer
          videoProps={{
            ref: videoRef,
            source: {
              uri: value.videoUri,
            },
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            shouldPlay: value.isPlaying,
          }}
          slider={{
            thumbTintColor: Colors.orange,
            minimumTrackTintColor: Colors.white,
            maximumTrackTintColor: Colors.white,
            visible: true,
            style: {
              marginHorizontal: 35,
              marginBottom: 16,
            },
          }}
          timeVisible={false}
          fullscreen={{
            visible: false,
          }}
          icon={{
            play: playButton(styles.centerButton, onPlayPressed),
            pause: pauseButton(styles.centerButton, onPlayPressed),
          }}
          style={{
            controlsBackgroundColor: Colors.gray,
          }}
        />
        {!value.showNextScreen && (
          <View>
            <View style={styles.videoButtonContainer}>
              <View style={styles.likeAndThumbContainer}>
                <TouchableOpacity onPress={onThumbUpPress}>
                  <Image
                    style={styles.icon}
                    resizeMode={ResizeMode.CONTAIN}
                    source={
                      value.liked
                        ? require("../../../assets/images/misc/thumb_up_fill.png")
                        : require("../../../assets/images/misc/thumb_up.png")
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onThumbDownPress}>
                  <Image
                    style={[styles.icon, styles.thumbDown]}
                    resizeMode={ResizeMode.CONTAIN}
                    source={
                      !value.liked
                        ? require("../../../assets/images/misc/thumb_down_fill.png")
                        : require("../../../assets/images/misc/thumb_down.png")
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onFavoritePress}>
                  <Image
                    style={styles.icon}
                    resizeMode={ResizeMode.CONTAIN}
                    source={
                      value.favorite
                        ? require("../../../assets/images/misc/likes.png")
                        : require("../../../assets/images/misc/like_fill.png")
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.nextContainer}>
                <Button
                  style={{
                    container: styles.nextButtonContainer,
                    text: styles.nextButton,
                  }}
                  icon={
                    <Image
                      style={styles.nextButtonIcon}
                      source={require("../../../assets/images/misc/caret.png")}
                    />
                  }
                  text="A continuación"
                  upperCase={false}
                  onPress={onNextPress}
                />
              </View>
            </View>
            <View style={styles.playContainer}>
              {value.isPlaying &&
                pauseButton(styles.pauseSmallButton, onPlayPressed)}
              {!value.isPlaying && playButton(styles.playIcon, onPlayPressed)}
            </View>
          </View>
        )}
        {value.showNextScreen && (
          <NextView
            groupTitle={value.groupTitle}
            nextVideos={value.nextVideos}
            onPressedVideo={onNextVideoPress}
            onCloseNextVideos={onCloseNextVideos}
          />
        )}
      </View>
    </LoadingPage>
  );
}

const styles = StyleSheet.create({
  loadingPage: {
    backgroundColor: Colors.black,
  },
  page: {
    height: "100%",
    width: "100%",
  },
  videoButtonContainer: {
    position: "absolute",
    bottom: 75,
    left: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  likeAndThumbContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nextContainer: {
    alignItems: "flex-start",
    flex: 1,
    marginRight: 16,
  },
  nextButtonContainer: {
    borderWidth: 1,
    borderColor: Colors.white,
    height: 31,
  },
  nextButtonIcon: {
    width: 20,
    height: 20,
    paddingRight: 8,
  },
  nextButton: {
    color: Colors.white,
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: Colors.white,
    marginRight: 15,
  },
  playContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  playIcon: {
    tintColor: Colors.white,
    width: 20,
    height: 20,
  },
  pauseSmallButton: {
    tintColor: Colors.white,
    width: 20,
    height: 20,
  },
  centerButton: {
    width: 125,
    height: 125,
  },
  thumbDown: {
    marginTop: 8
  }
});
