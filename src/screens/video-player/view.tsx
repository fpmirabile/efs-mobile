import * as React from "react";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import Colors from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../components/common/button";

export interface Value {
  isPlaying: boolean;
  videoUri: string;
}

interface Props {
  videoRef: React.MutableRefObject<Video>;
  onLike: () => void;
  onThumbUpPress: () => void;
  onThumbDownPress: () => void;
  onNextPress: () => void;
  onPlayPressed: () => void;
  value: Value;
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
  onLike,
  onThumbUpPress,
  onThumbDownPress,
  onNextPress,
  onPlayPressed,
  value,
}: Props) {
  return (
    <View style={styles.page}>
      <VideoPlayer
        videoProps={{
          ref: videoRef,
          source: {
            uri: value.videoUri || "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          },
          resizeMode: Video.RESIZE_MODE_STRETCH,
        }}
        slider={{
          thumbTintColor: Colors.orange,
          minimumTrackTintColor: Colors.white,
          maximumTrackTintColor: Colors.white,
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
      <View style={styles.videoButtonContainer}>
        <View style={styles.likeAndThumbContainer}>
          <TouchableOpacity onPress={onThumbUpPress}>
            <Image
              style={styles.icon}
              source={require("../../../assets/images/misc/thumb_up.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onThumbDownPress}>
            <Image
              style={[styles.icon, styles.thumbDown]}
              source={require("../../../assets/images/misc/thumb_up.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onLike}>
            <Image
              style={styles.icon}
              source={require("../../../assets/images/misc/likes.png")}
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
        {value.isPlaying && pauseButton(styles.pauseSmallButton, onPlayPressed)}
        {!value.isPlaying && playButton(styles.playIcon, onPlayPressed)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  thumbDown: {
    transform: [
      {
        rotateX: "180deg",
      },
    ],
    marginTop: 5,
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
});
