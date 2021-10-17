import * as React from "react";
import { StyleSheet } from "react-native";
import PageWithScroll from "../../components/common/page-with-scroll/page-with-scroll";
import SectionReel from "./components/section/section";

interface Props {}

export default function ReelsView({}: Props) {
  return (
    <PageWithScroll title="Reels" viewStyles={styles.page}>
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
    marginHorizontal: 16
  }
});
