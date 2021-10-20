import * as React from "react";
import Carousel from "react-native-anchor-carousel";
import { BasicStackComponentProps } from "../../../types";
import { Grupo, Reel } from "../../api/models/reels";
import ReelsView from "./view";

export interface Props extends BasicStackComponentProps {
  onGetGroups: () => Promise<Grupo[]>;
  onGetReelsByGroup: (groupId: number) => Promise<Reel[]>;
  onGetPopularReels: (groupId: number) => Promise<Reel[]>;
  onFavoriteReel: (reelId: number) => Promise<void>;
  onLikeReel: (reelId: number, liked: boolean) => Promise<void>;
}

interface State {
  currentIndex: number;
  filterGroups: Grupo[];
  popularReels: Reel[];
  reels: Reel[];
}

class ReelsController extends React.PureComponent<Props, State> {
  carouselRef = React.createRef<Carousel>();

  state: State = {
    currentIndex: 0,
    filterGroups: [],
    popularReels: [],
    reels: [],
  };

  componentDidMount() {

  }

  handleChangedIndex = (index: number) => {};

  handleFilterScrollEnd = (data: any, index: number) => {
    if (isNaN(index)) {
      return;
    }

    this.setState({
      currentIndex: index,
    });
    this.handleChangedIndex(index);
  };

  handleItemPress = (index: number) => () => {
    this.carouselRef.current?.scrollToIndex(index);
    this.handleChangedIndex(index);
  };

  render() {
    const { currentIndex } = this.state;
    return (
      <ReelsView
        filterCarouselRef={this.carouselRef}
        currentIndex={currentIndex}
        onFilterScrollEnd={this.handleFilterScrollEnd}
        onPressedItem={this.handleItemPress}
        onImageLoadError={() => {
          return "";
        }}
      />
    );
  }
}

export default ReelsController;
