import * as React from "react";
import { StyleSheet } from "react-native";
import Carousel from "react-native-anchor-carousel";
import RightCarousel from "../../components/common/carousel/carousel";
import PageWithScroll from "../../components/common/page-with-scroll/page-with-scroll";
import FilterItem from "./components/filter-item/filter-item";
import MostPopularItem from "./components/most-popular/most-popular";
import VideoItem from "./components/video-item/video-item";
import SectionReel from "./components/section/section";

interface Props {
  filterCarouselRef: React.RefObject<Carousel>;
  currentIndex: number;
  onFilterScrollEnd: (data: any, index: number) => void;
  onPressedItem: (index: number) => () => void;
  onImageLoadError: () => string;
}

const filters = [
  {
    id: "1",
    name: "principiantes",
  },
  {
    id: "2",
    name: "fci",
  },
  {
    id: "3",
    name: "Acciones",
  },
  {
    id: "4",
    name: "Ahorro",
  },
];

const popu = [
  {
    id: "1",
    imageUri:
      "https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg",
    title: "Como funcionan los plazos fijos",
    likesQuantity: "15001",
  },
  {
    id: "5",
    imageUri:
      "https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg",
    title: "Como funcionan los plazos fijos",
    likesQuantity: "15001",
  },
  {
    id: "2",
    imageUri:
      "https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg",
    title: "Como funcionan los plazos fijos",
    likesQuantity: "15001",
  },
  {
    id: "3",
    imageUri:
      "https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg",
    title: "Como funcionan los plazos fijos",
    likesQuantity: "15001",
  },
  {
    id: "4",
    imageUri:
      "https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg",
    title: "Como funcionan los plazos fijos",
    likesQuantity: "15001",
  },
];

export default function ReelsView({
  currentIndex,
  onFilterScrollEnd,
  onPressedItem,
  onImageLoadError,
  filterCarouselRef,
}: Props) {
  return (
    <PageWithScroll title="Reels" viewStyles={styles.page}>
      <RightCarousel
        carouselRef={filterCarouselRef}
        data={filters}
        onRenderItem={FilterItem({ currentIndex, onPressedItem })}
        onKeyExtractor={(item: any, _: number) => item.id}
        separatorWidth={15}
        itemWidth={150}
        onScrollEnd={onFilterScrollEnd}
      />
      <SectionReel
        title="Los más populares"
        containerStyle={styles.sectionContainer}
      >
        <RightCarousel
          data={popu}
          onRenderItem={MostPopularItem({ onImageLoadError })}
          onKeyExtractor={(item: any, _: number) => item.id}
          separatorWidth={15}
          itemWidth={276}
        />
      </SectionReel>
      <SectionReel
        title="Tasas de interés"
        containerStyle={styles.sectionContainer}
      >
        <RightCarousel
          data={popu}
          onRenderItem={VideoItem({ onImageLoadError })}
          onKeyExtractor={(item: any, _: number) => item.id}
          separatorWidth={15}
          itemWidth={140}
        />
      </SectionReel>
    </PageWithScroll>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: 59, // 35px tiene la topbar, asi que 35+24 = 59
    marginHorizontal: 16,
  },
  sectionContainer: {
    marginVertical: 12,
  },
});
