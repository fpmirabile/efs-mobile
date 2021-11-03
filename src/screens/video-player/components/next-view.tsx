import * as React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Reel } from "../../../api/models/reels";
import Colors from "../../../constants/colors";
import VideoItem from "./child/video-item";

interface NextProps {
  nextVideos: Reel[];
  groupTitle: string;
  onPressedVideo: (reelId: number) => void;
}

export default function NextView({
  nextVideos,
  onPressedVideo,
  groupTitle,
}: NextProps) {
  return (
    <View style={styles.containerView}>
      <Text style={styles.title}>{groupTitle}</Text>
      <View style={styles.underline} />
      <FlatList
        style={styles.flatList}
        data={nextVideos}
        renderItem={VideoItem({ onPressedVideo })}
        keyExtractor={(item: Reel) => item.reelId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    position: "absolute",
    bottom: 8,
    marginHorizontal: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white,
    marginBottom: 8,
  },
  underline: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  flatList: {
    flex: 1,
  },
});
