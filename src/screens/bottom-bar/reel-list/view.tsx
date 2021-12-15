import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import PageWithScroll from "../../../components/common/page-with-scroll/page-with-scroll";
import FilterItem from "./components/filter-item/filter-item";
import MostPopularItem from "./components/most-popular/most-popular";
import VideoItem from "./components/video-item/video-item";
import SectionReel from "./components/section/section";
import { Grupo, Reel, ReelPopular, Seccion } from "../../../api/models/reels";
import LoadingPage from "../../../components/common/loading-page/loading-page";
import BuyModuleModal from "../../modals/buy-module/buy-module";

interface Props {
  showModal: boolean;
  userName: string;
  pretendedSectionName: string;
  onCloseModal: () => void;
  currentIndex: number;
  onFilterScrollEnd: (data: any, index: number) => void;
  onPressedItem: (index: number) => () => void;
  onPressVideo: (reelId: number) => void;
  onImageLoadError: () => string;
  filters: Grupo[];
  popularReels: ReelPopular[];
  seccionReels: Seccion[];
  filterRef: React.LegacyRef<FlatList>;
  isLoading: boolean;
  coins: string;
}

const sectionItem =
  ({
    onImageLoadError,
    onPressVideo,
  }: {
    onImageLoadError: Props["onImageLoadError"];
    onPressVideo: Props["onPressVideo"];
  }) =>
  ({ item }: { item: Reel }) =>
    (
      <VideoItem
        onImageLoadError={onImageLoadError}
        onPressVideo={onPressVideo}
        item={item}
        key={item.reelId}
      />
    );

const renderSection = (
  sectionReels: Seccion[],
  {
    onImageLoadError,
    onPressVideo,
  }: {
    onImageLoadError: Props["onImageLoadError"];
    onPressVideo: Props["onPressVideo"];
  }
) => {
  if (!sectionReels) {
    return null;
  }

  return sectionReels.map((seccion) => {
    return (
      <SectionReel
        title={seccion.titulo}
        containerStyle={styles.sectionContainer}
        key={seccion.seccionId}
      >
        <FlatList
          data={seccion.reels}
          keyExtractor={(item) => item.reelId.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={sectionItem({ onImageLoadError, onPressVideo })}
        />
      </SectionReel>
    );
  });
};

const filterItem =
  ({
    currentIndex,
    onPressedItem,
  }: {
    currentIndex: number;
    onPressedItem: (index: number) => () => void;
  }) =>
  ({ item, index }: { item: Grupo; index: number }) =>
    (
      <FilterItem
        onPressedItem={onPressedItem}
        index={index}
        isActive={index === currentIndex}
        item={item}
        key={item.grupoId}
      />
    );

const mostPopular =
  ({
    onImageLoadError,
    onPressVideo,
  }: {
    onImageLoadError: Props["onImageLoadError"];
    onPressVideo: Props["onPressVideo"];
  }) =>
  ({ item }: { item: ReelPopular }) =>
    (
      <MostPopularItem
        onImageLoadError={onImageLoadError}
        onPressVideo={onPressVideo}
        item={item}
      />
    );

export default function ReelsView({
  showModal,
  onCloseModal,
  userName,
  pretendedSectionName,
  currentIndex,
  onPressedItem,
  onPressVideo,
  onImageLoadError,
  filters,
  seccionReels,
  popularReels,
  filterRef,
  isLoading,
  coins,
}: Props) {
  return (
    <LoadingPage isLoading={isLoading}>
      <PageWithScroll
        title="Reels"
        coins={coins}
        viewStyles={styles.page}
        titleStyles={{ title: styles.title }}
      >
        <FlatList
          ref={filterRef}
          data={filters}
          keyExtractor={(item) => item.grupoId.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={filterItem({ currentIndex, onPressedItem })}
        />
        {popularReels.length && (
          <SectionReel
            title="Los más populares"
            containerStyle={styles.sectionContainer}
          >
            <FlatList
              data={popularReels}
              keyExtractor={(item) => item.reelId.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={mostPopular({ onImageLoadError, onPressVideo })}
            />
          </SectionReel>
        )}
        {renderSection(seccionReels, { onImageLoadError, onPressVideo })}
        <BuyModuleModal
          isVisible={showModal}
          sectionName={pretendedSectionName}
          userName={userName}
          onClose={onCloseModal}
        />
      </PageWithScroll>
    </LoadingPage>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  title: {
    marginBottom: 0,
  },
  sectionContainer: {
    marginVertical: 6,
  },
});
