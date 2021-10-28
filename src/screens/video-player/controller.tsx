import { Video } from "expo-av";
import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import VideoView, { Value as ViewValue } from "./view";

export interface PropsTypes extends BasicStackComponentProps {}

interface StateType {
  value: ViewValue;
}

class VideoPlayerController extends React.PureComponent<PropsTypes, StateType> {
  videoRef: React.RefObject<Video> = React.createRef();
  state: StateType = {
    value: {
      isPlaying: false,
      videoUri: '',
    },
  };

  handleLike = () => {};
  handleThumbUpPress = () => {};
  handleThumbDownPress = () => {};
  handleNextPress = () => {};

  handlePlayPressed = () => {
    const {
      value: { isPlaying },
    } = this.state;

    if (!isPlaying) {
      this.videoRef.current?.playAsync();
    } else {
      this.videoRef.current?.pauseAsync();
    }

    this.setState((prevState) => {
      return {
        value: {
          ...prevState.value,
          isPlaying: !prevState.value.isPlaying,
        },
      };
    });
  };

  render() {
    const { value } = this.state;
    return (
      <VideoView
        videoRef={this.videoRef as React.MutableRefObject<Video>}
        value={value}
        onLike={this.handleLike}
        onNextPress={this.handleNextPress}
        onPlayPressed={this.handlePlayPressed}
        onThumbDownPress={this.handleThumbDownPress}
        onThumbUpPress={this.handleThumbUpPress}
      />
    );
  }
}

export default VideoPlayerController;
