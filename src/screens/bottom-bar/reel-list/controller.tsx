import * as React from "react";
import { FlatList } from "react-native";
import { BasicStackComponentProps } from "../../../../types";
import { Grupo, Reel, ReelPopular, Seccion } from "../../../api/models/reels";
import { User } from "../../../api/models/user";
import { formatNumberToLocaleString } from "../../../helper/string";
import ReelsView from "./view";

export interface Props extends BasicStackComponentProps {
  onGetGroups: () => Promise<Grupo[]>;
  onGetReelsByGroup: (groupId: number) => Promise<Seccion[]>;
  onGetPopularReels: (groupId: number) => Promise<ReelPopular[]>;
  onFavoriteReel: (reelId: number) => Promise<void>;
  onLikeReel: (reelId: number, liked: boolean) => Promise<void>;
  currentUser?: User;
}

interface State {
  isLoading: boolean;
  showRetry: boolean;
  currentIndex: number;
  filterGroups: Grupo[];
  popularReels: ReelPopular[];
  reels: Seccion[];
  showNotAvailableModal: boolean;
  nextGroupTitle: string;
}

class ReelsController extends React.PureComponent<Props, State> {
  filterRef: React.RefObject<FlatList<Grupo>> = React.createRef();
  state: State = {
    isLoading: true,
    showRetry: false,
    currentIndex: 0,
    filterGroups: [],
    popularReels: [],
    reels: [],
    showNotAvailableModal: false,
    nextGroupTitle: '',
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
          showRetry: false,
        });
      }
    } catch (exception) {
      this.showRetry(true);
    }
  }

  showRetry = (showRetry: boolean) => {
    this.setState({ isLoading: false, showRetry });
  };

  openNotAvailableGroupModal = (nextGroupTitle: string) => {
    this.setState({
      ...this.state,
      showNotAvailableModal: true,
      nextGroupTitle: nextGroupTitle,
      isLoading: false,
    });
  }

  handleFilterChanged = async (index: number) => {
    this.setState({
      isLoading: true,
    });

    const { filterGroups } = this.state;
    const { onGetReelsByGroup } = this.props;
    const nextGroup = filterGroups[index];
    try {
      const groupReels = await onGetReelsByGroup(nextGroup.grupoId);
      if (!groupReels) {
        this.openNotAvailableGroupModal(nextGroup.titulo);
        return;
      }
      this.setState({
        currentIndex: index,
        reels: groupReels,
        isLoading: false,
        showRetry: false,
      });
    } catch {
      this.openNotAvailableGroupModal(nextGroup.titulo);
    }
  };

  handleCloseAvailableModal = () => {
    this.setState({
      showNotAvailableModal: false,
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
    let groupTitle: string = "";
    if (isPopularReel) {
      sectionReels = popularReels;
      groupTitle = "Los más populares";
    } else {
      const sectionIndex = reels.findIndex((section) =>
        section.reels.some((reel) => reel.reelId === reelId)
      );
      sectionReels = reels[sectionIndex].reels;
      groupTitle = reels[sectionIndex].titulo;
    }

    navigation.navigate("Video", {
      reelId,
      sectionReels,
      groupTitle,
    });
  };

  render() {
    const {
      currentIndex,
      filterGroups,
      reels,
      popularReels,
      isLoading,
      showNotAvailableModal,
      nextGroupTitle
    } = this.state;
    const { currentUser } = this.props;
    return (
      <ReelsView
        userName={currentUser?.nombre || ''}
        pretendedSectionName={nextGroupTitle}
        showModal={showNotAvailableModal}
        onCloseModal={this.handleCloseAvailableModal}
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
        coins={formatNumberToLocaleString(currentUser?.monedas || 0)}
      />
    );
  }
}

export default ReelsController;
