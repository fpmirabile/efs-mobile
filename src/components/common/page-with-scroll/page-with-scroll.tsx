import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import PageTitle, { Props as PageTitleProps } from "../page-title/page-title";

interface Props {
  scrollViewStyles?: ScrollView["props"]["style"];
  scrollViewContainerStyles?: ScrollView['props']['contentContainerStyle'];
  viewStyles?: View["props"]["style"];
  title?: string;
  titleStyles?: {
    container?: PageTitleProps["containerStyle"];
    title?: PageTitleProps["titleStyle"];
  };
  children: React.ReactNode;
}

export default function PageWithScroll(props: Props) {
  return (
    <ScrollView contentContainerStyle={props.scrollViewContainerStyles} style={[styles.scrollView, props.scrollViewStyles]}>
      <View style={[styles.containerView, props.viewStyles]}>
        {props.title && <PageTitle title={props.title} titleStyle={[props.titleStyles?.title]} />}
        {props.children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F6FB",
  },
  scrollViewContentContainer: {
    flex: 1,
  },
  containerView: {
    flex: 1,
    flexDirection: "column",
  },
});
