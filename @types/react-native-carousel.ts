declare module 'react-native-anchor-carousel' {
  import * as React from "react";
  import { View } from "react-native";

  export interface Props {
    data: Array<any>;
    style?: View["props"]["style"],
    containerWidth?: number,
    itemWidth?: number,
    itemContainerStyle?: View["props"]["style"],
    separatorWidth?: number,
    minScrollDistance?: number,
    inActiveScale?: number,
    inActiveOpacity?: number,
    inverted?: boolean,
    initialIndex?: number,
    bounces?: boolean,
    showsHorizontalScrollIndicator?: boolean,
    keyExtractor: (item: any, index: number) => string,
    renderItem: (item: { item: any, index: number }) => JSX.Element;
    onScrollEnd?: () => void,
    onScrollBeginDrag?: () => void,
    onScrollEndDrag?: () => void,
  }
  
  export default class Carousel extends React.Component<Props> {
    scrollToIndex(index: number): void;
  }
}