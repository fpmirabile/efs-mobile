import * as React from "react";
import { FlatList } from "react-native";
import { BasicStackComponentProps } from "../../../../types";
import { Grupo, Reel, ReelPopular, Seccion } from "../../../api/models/reels";
import ReelsView from "./view";

export interface Props extends BasicStackComponentProps {
  onGetGroups: () => Promise<Grupo[]>;
  onGetReelsByGroup: (groupId: number) => Promise<Seccion[]>;
  onGetPopularReels: (groupId: number) => Promise<ReelPopular[]>;
  onFavoriteReel: (reelId: number) => Promise<void>;
  onLikeReel: (reelId: number, liked: boolean) => Promise<void>;
}

interface State {
  isLoading: boolean;
  currentIndex: number;
  filterGroups: Grupo[];
  popularReels: ReelPopular[];
  reels: Seccion[];
}

class ReelsController extends React.PureComponent<Props, State> {
  filterRef: React.RefObject<FlatList<Grupo>> = React.createRef();
  state: State = {
    isLoading: true,
    currentIndex: 0,
    filterGroups: [],
    popularReels: [],
    reels: [],
  };

  async componentDidMount() {
    const { onGetGroups, onGetPopularReels, onGetReelsByGroup } = this.props;
    const { currentIndex } = this.state;

    try {
      const allFilters = await onGetGroups();
      if (allFilters && allFilters.length) {
        const currentFilter = allFilters[currentIndex];
        if (!currentFilter) {
          return;
        }

        const popularReels = await onGetPopularReels(currentFilter.grupoId);
        const reels = await onGetReelsByGroup(currentFilter.grupoId);
        this.setState({
          reels,
          popularReels,
          filterGroups: allFilters,
          isLoading: false,
        });
      }
    } catch (exception) {
      // TODO: Set an error message or page.
      console.log(exception);
    }
  }

  handleFilterChanged = async (index: number) => {
    this.setState({
      isLoading: true,
    });

    const { filterGroups } = this.state;
    const { onGetReelsByGroup } = this.props;
    const groupReels = await onGetReelsByGroup(filterGroups[index].grupoId);

    this.setState({
      currentIndex: index,
      reels: groupReels,
      isLoading: false,
    });
  };

  handleFilterScrollEnd = (data: any, index: number) => {
    if (isNaN(index)) {
      return;
    }

    this.handleFilterChanged(index);
  };

  handleItemPress = (index: number) => () => {
    this.filterRef.current?.scrollToIndex({ index, animated: true });
    this.handleFilterChanged(index);
  };

  handlePressVideo = (reelId: number) => {
    const { navigation } = this.props;
    const { reels, popularReels } = this.state;
    const isPopularReel = popularReels.find((popu) => popu.reelId === reelId);
    let sectionReels: Reel[] = [];
    if (isPopularReel) {
      sectionReels = popularReels;
    } else {
      const sectionIndex = reels.findIndex((section) =>
        section.reels.some((reel) => reel.reelId === reelId)
      );
      sectionReels = reels[sectionIndex].reels;
    }

    navigation.navigate("Video", {
      reelId,
      sectionReels,
    });
  };

  render() {
    const { currentIndex, filterGroups, reels, popularReels, isLoading } =
      this.state;
    return (
      <ReelsView
        filterRef={this.filterRef}
        currentIndex={currentIndex}
        onFilterScrollEnd={this.handleFilterScrollEnd}
        onPressedItem={this.handleItemPress}
        onPressVideo={this.handlePressVideo}
        onImageLoadError={() => {
          return "";
        }}
        filters={filterGroups}
        seccionReels={reels}
        popularReels={popularReels}
        isLoading={isLoading}
      />
    );
  }
}

export default ReelsController;
