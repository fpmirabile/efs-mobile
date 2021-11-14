import * as React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Reel } from "../../../../api/models/reels";
import Colors from "../../../../constants/colors";

interface Props {
  onPressedVideo: (reelId: number) => void;
}

interface ItemProps {
  item: Reel;
  index: number;
}

export default (props: Props) => (itemProps: ItemProps) => {
  const onVideoPress = () => {
    props.onPressedVideo(itemProps.item.reelId);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableHighlight onPress={onVideoPress}>
        <View style={styles.elementsContainer}>
          <ImageBackground
            source={{
              uri:
                itemProps.item.imagen ||
                "https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg",
            }}
            style={styles.imageBackground}
          >
            <View style={styles.durationContainer}>
              <Text style={styles.videoDuration}>
                {itemProps.item.duracion || "00:00"}
              </Text>
            </View>
            <View style={styles.videoTitleContainer}>
              <Text style={styles.videoTitle}>{itemProps.item.titulo}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderColor: Colors.blue,
    marginRight: 8,
  },
  elementsContainer: {
    height: 244,
    width: 157,
    flexDirection: "column",
  },
  durationContainer: {
    flex: 0.12,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  videoDuration: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.white,
  },
  imageBackground: {
    flex: 1,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  videoTitleContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 1,
  },
  videoTitle: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
});
