import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Video } from 'expo-av';

interface Props {
  videoRef: React.LegacyRef<Video>;
}

export default function ReelsView({
  videoRef,
}: Props) {
  return (
      <View style={styles.page}>
        <Video
          ref={videoRef}
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          resizeMode="stretch"
          useNativeControls
          style={styles.videoPlayer}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%'
  },
  videoPlayer: {
    width: '100%',
    height: '100%'
  }
});
