import * as React from "react";
import VideoPlayerController, { PropsTypes as VideoPlayerProps } from "./controller";

export default function VideoPlayerModule(props: VideoPlayerProps) {
  return <VideoPlayerController {...props} />;
}
