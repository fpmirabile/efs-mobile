import { Video } from "expo-av";
import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import VideoView from "./view";

export interface Props extends BasicStackComponentProps {}

class VideoPlayerController extends React.PureComponent<Props> {
  videoRef: React.LegacyRef<Video> = React.createRef();

  render() {
    return <VideoView videoRef={this.videoRef} />;
  }
}

export default VideoPlayerController;
