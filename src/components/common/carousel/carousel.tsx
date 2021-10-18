import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Carousel from "react-native-anchor-carousel";

interface Props {
  data: Array<any>;
  itemWidth?: number;
  separatorWidth?: number;
  inActiveScale?: number;
  inActiveOpacity?: number;
  containerWidth?: number;
  carouselStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  carouselRef?: React.RefObject<Carousel>;
  onKeyExtractor: (item: any, index: number) => string;
  onRenderItem: (item: { item: any, index: number }) => JSX.Element;
  onScrollEnd?: (data: any, index: number) => void;
  onScrollEndDrag?: () => void;
}

export default function RightCarousel(props: Props) {
  return (
    <View style={[props.containerStyle]}>
      <Carousel
        renderItem={props.onRenderItem}
        keyExtractor={props.onKeyExtractor}
        style={props.carouselStyle}
        ref={props.carouselRef}
        {...props}
      />
    </View>
  );
}
