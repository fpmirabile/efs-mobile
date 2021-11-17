import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Video } from "expo-av";
import reelsApi from "../../api/models/reels";
import { RootStackParamList } from "../../../types";
import VideoView, { Value as ViewValue } from "./view";

export interface PropsTypes
  extends NativeStackScreenProps<RootStackParamList, "Video"> {}

interface StateType {
  value: ViewValue;
}

class VideoPlayerController extends React.PureComponent<PropsTypes, StateType> {
  videoRef: React.RefObject<Video> = React.createRef();
  state: StateType = {
    value: {
      isPlaying: true,
      videoUri: "",
      liked: false,
      favorite: false,
      showNextScreen: false,
      nextVideos: [],
      groupTitle: "",
      isLoading: true,
    },
  };

  async componentDidMount() {
    const { route } = this.props;
    const reelId = route.params.reelId;
    const groupTitle = route.params.groupTitle;
    const nextVideos = route.params.sectionReels;
    if (!reelId) {
      // TODO: Show some error?
      return;
    }

    const videoInformation = await reelsApi.getReel(reelId);
    this.setState({
      value: {
        showNextScreen: false,
        isPlaying: true,
        videoUri: videoInformation.url,
        liked: videoInformation.liked || false,
        favorite: videoInformation.favorito || false,
        nextVideos,
        groupTitle,
        isLoading: false,
      },
    });
  }

  handleFavorite = (favorite: boolean) => {
    const {
      route: {
        params: { reelId },
      },
    } = this.props;

    reelsApi.favoriteReel(reelId);
    this.setState((prevState) => {
      return {
        value: {
          ...prevState.value,
          favorite: !prevState.value.favorite,
        },
      };
    });
  };

  handleThumbUpPress = () => {
    this.sendLikeRequest(true);
  };

  handleThumbDownPress = () => {
    this.sendLikeRequest(false);
  };

  handleNextPress = () => {
    this.setState((prevState) => {
      return {
        value: {
          ...prevState.value,
          showNextScreen: !prevState.value.showNextScreen,
        },
      };
    }, () => {
      // this.handlePlayPressed();
    });

  };

  sendLikeRequest = (like: boolean) => {
    const {
      route: {
        params: { reelId },
      },
    } = this.props;

    reelsApi.likeReel(reelId, like);

    this.setState((prevState) => {
      return {
        value: {
          ...prevState.value,
          liked: !prevState.value.liked,
        },
      };
    });
  };

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
          showNextScreen: false,
        },
      };
    });
  };

  handleNextVideoPress = (reelId: number) => {};

  render() {
    const { value } = this.state;
    return (
      <VideoView
        videoRef={this.videoRef as React.MutableRefObject<Video>}
        value={value}
        onFavorite={this.handleFavorite}
        onNextPress={this.handleNextPress}
        onPlayPressed={this.handlePlayPressed}
        onThumbDownPress={this.handleThumbDownPress}
        onThumbUpPress={this.handleThumbUpPress}
        onNextVideoPress={this.handleNextVideoPress}
        onCloseNextVideos={this.handleNextPress}
      />
    );
  }
}

export default VideoPlayerController;
