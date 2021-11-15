import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RightCarousel from "../../../components/common/carousel/carousel";
import PageWithScroll from "../../../components/common/page-with-scroll/page-with-scroll";
import FilterItem from "./components/filter-item/filter-item";
import MostPopularItem from "./components/most-popular/most-popular";
import VideoItem from "./components/video-item/video-item";
import SectionReel from "./components/section/section";
import { Grupo, Reel, ReelPopular, Seccion } from "../../../api/models/reels";
import LoadingBanner from "../../../components/common/loading-banner/loading-banner";
import LoadingPage from "../../../components/common/loading-page/loading-page";

interface Props {
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
}

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
        <RightCarousel
          data={seccion.reels}
          onRenderItem={VideoItem({ onImageLoadError, onPressVideo })}
          onKeyExtractor={(item: Reel, _: number) => item.reelId.toString()}
          separatorWidth={15}
          itemWidth={140}
        />
      </SectionReel>
    );
  });
};

export default function ReelsView({
  currentIndex,
  onPressedItem,
  onPressVideo,
  onImageLoadError,
  filters,
  seccionReels,
  popularReels,
  filterRef,
  isLoading,
}: Props) {
  return (
    <LoadingPage isLoading={isLoading}>
      <PageWithScroll
        title="Reels"
        viewStyles={styles.page}
        titleStyles={{ title: styles.title }}
      >
        <FlatList
          ref={filterRef}
          data={filters}
          renderItem={FilterItem({ currentIndex, onPressedItem })}
          keyExtractor={(item) => item.grupoId.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <SectionReel
          title="Los más populares"
          containerStyle={styles.sectionContainer}
        >
          <RightCarousel
            data={popularReels}
            onRenderItem={MostPopularItem({ onImageLoadError, onPressVideo })}
            onKeyExtractor={(item: ReelPopular, _: number) =>
              item.reelId.toString()
            }
            separatorWidth={15}
            itemWidth={276}
          />
        </SectionReel>
        {renderSection(seccionReels, { onImageLoadError, onPressVideo })}
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
    marginBottom: 15,
  },
  sectionContainer: {
    marginVertical: 6,
  },
});
