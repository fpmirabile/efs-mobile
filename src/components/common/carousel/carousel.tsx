import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Carousel from "react-native-anchor-carousel";

interface Props {
  data: Array<any>;
  onRenderItem: (item: { item: any, index: number }) => JSX.Element;
  onKeyExtractor: (item: any, index: number) => string;
  itemWidth?: number;
  separatorWidth?: number;
  inActiveScale?: number;
  inActiveOpacity?: number;
  containerWidth?: number;
  carouselStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  ref?: React.MutableRefObject<null>;
  onScrollEnd?: () => void;
}

export default function Slider(props: Props) {
  return (
    <View style={[props.containerStyle]}>
      <Carousel
        renderItem={props.onRenderItem}
        keyExtractor={props.onKeyExtractor}
        style={props.carouselStyle}
        {...props}
      />
    </View>
  );
}
