import * as React from "react";
import { StyleSheet } from "react-native";
import Slider from "../../components/common/carousel/carousel";
import PageWithScroll from "../../components/common/page-with-scroll/page-with-scroll";
import FilterItem from "./components/filter-item/filter-item";
import SectionReel from "./components/section/section";

interface Props {
  currentIndex?: number;
  onFilterScrollEnd: () => void;
}

const filters = [
  {
    id: '1',
    name: "principiantes",
  },
  {
    id: '2',
    name: "fci",
  },
  {
    id: '3',
    name: "Acciones",
  },
  {
    id: '4',
    name: "Ahorro",
  },
];

export default function ReelsView({currentIndex, onFilterScrollEnd}: Props) {
  return (
    <PageWithScroll title="Reels" viewStyles={styles.page}>
      <Slider
        data={filters}
        onRenderItem={FilterItem({ currentIndex })}
        onKeyExtractor={(item: any, index: number) => item.id}
        separatorWidth={15}
        itemWidth={150}
        onScrollEnd={onFilterScrollEnd}
      />
      <SectionReel title="Los más populares">

      </SectionReel>
      <SectionReel title="Tasas de interés">

      </SectionReel>
      <SectionReel title="Costo financiero">

      </SectionReel>
    </PageWithScroll>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: 59, // 35px tiene la topbar, asi que 35+24 = 59
    marginHorizontal: 16,
  }
});
