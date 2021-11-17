import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { FlatList } from "react-native-gesture-handler";
import { Reel } from "../../../api/models/reels";
import Colors from "../../../constants/colors";
import VideoItem from "./child/video-item";

interface NextProps {
  nextVideos: Reel[];
  groupTitle: string;
  onPressedVideo: (reelId: number) => void;
  onCloseNextVideos: () => void;
}

export default function NextView({
  nextVideos,
  onPressedVideo,
  onCloseNextVideos,
  groupTitle,
}: NextProps) {
  return (
    <Modal style={styles.modal} isVisible onBackdropPress={onCloseNextVideos}>
      <View style={styles.containerView}>
        <Text style={styles.title}>{groupTitle}</Text>
        <View style={styles.underline} />
        <FlatList
          style={styles.flatList}
          data={nextVideos}
          renderItem={({ item }) => (
            <VideoItem onPressedVideo={onPressedVideo} item={item} />
          )}
          keyExtractor={(item: Reel) => item.reelId.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
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
