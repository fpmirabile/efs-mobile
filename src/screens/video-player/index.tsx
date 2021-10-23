import * as React from "react";
import VideoPlayerController, { Props as VideoPlayerProps } from "./controller";

export default function VideoPlayerModule(props: VideoPlayerProps) {
  return <VideoPlayerController {...props} />;
}
