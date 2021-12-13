import * as React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import Colors from "../../../constants/colors";
import Button from "../../common/button";
import PageTitle, { Props as PageTitleProps } from "../page-title/page-title";
import ButtonWithLoading from "../button-with-loading/button-with-loading";

interface Props {
  viewStyles?: View["props"]["style"];
  imageStyles?: Image["props"]["style"];
  title?: string;
  text?: string;
  img1Url?: any;
  id: number;
  onPress?: () => void;
  onTouch?: () => void;
}

export default function Onboarding({
  title,
  text,
  img1Url,
  id,
  onPress,
  onTouch,
  imageStyles,
}: Props) {
  const { width } = useWindowDimensions();
  return (
    <ScrollView style={[styles.scrollView, { width }]}>
      <View style={styles.containerView}>
        <View style={styles.containerOmit}>
          <Button
            text="Omitir"
            style={{
              text: styles.buttonOmit,
            }}
            onPress={onPress}
          />
        </View>
        <View style={styles.containerTitle}>
          {title && <PageTitle title={title} titleStyle={styles.title} />}
          <View style={styles.containerText}>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.containerImage}>
            <Image style={styles.img1} source={img1Url} />
          </View>
        </View>
      </View>
      {id==3 && (<View>
        <ButtonWithLoading text="EMPECEMOS" onPress={onTouch} />
      </View>)}
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
  },
  img1: {
    width: 290,
    height: 263,
  },
  img2: {
    width: 62,
    height: 10,
  },
  textNumCoin: {
    color: Colors.orange,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "redhatdisplay-regular",
  },
  marginBetween: {
    flexDirection: "row",
    marginLeft: 110,
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    fontFamily: "redhatdisplay-bold",
    fontStyle: "normal",
    color: Colors.blue,
  },
  containerTitle: {
    paddingTop: 25,
    paddingLeft: 23,
    paddingRight: 23,
  },
  containerText: {
    paddingTop: 16,
  },
  text: {
    fontFamily: "redhatdisplay-regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray,
  },
  buttonOmit: {
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 10,
    fontWeight: "bold",
    color: Colors.orange,
  },
  containerOmit: {
    alignItems: "flex-end",
    padding: 17,
  },
  containerImage: {
    paddingTop: 25,
    alignItems: "center",
  },
  containerImage2: {
    alignItems: "center",
    paddingTop: 69,
  },
});
