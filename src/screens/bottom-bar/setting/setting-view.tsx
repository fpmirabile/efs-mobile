import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import Fonts from "../../../constants/fonts";
import PageWithScroll from "../../../components/common/page-with-scroll/page-with-scroll";
import LoadingPage from "../../../components/common/loading-page/loading-page";

interface Props {
  isLoading: boolean;
}

export default function SettingView({ isLoading }: Props) {
  return (
    <LoadingPage isLoading={isLoading}>
      <PageWithScroll>
        <View style={styles.container}>
          <View style={styles.continerTitle}>
            <Text style={styles.title}>Configuración</Text>
          </View>
          <View style={styles.itemsContainer}>
            <Image
              style={styles.icon}
              source={require("../../../../assets/images/setting/my-profile.png")}
            />
            <Text style={styles.subtitle}>Mi perfil</Text>
          </View>
          <View style={styles.itemsContainer}>
            <Image
              style={styles.icon}
              source={require("../../../../assets/images/setting/notifications.png")}
            />
            <Text style={styles.subtitle}>Notificaciones</Text>
          </View>
          <View style={styles.itemsContainer}>
            <Image
              style={styles.icon}
              source={require("../../../../assets/images/setting/profile.png")}
            />
            <Text style={styles.subtitle}>Evaluación de perfil</Text>
          </View>
          <View style={styles.itemsContainer}>
            <Image
              style={styles.icon}
              source={require("../../../../assets/images/efs-coin.png")}
            />
            <Text style={styles.subtitle}>Tienda FCS</Text>
          </View>
          <View style={styles.containerLogo}>
            <Image
              style={styles.logo}
              source={require("../../../../assets/images/setting/setting-logo.png")}
            />
          </View>
        </View>
      </PageWithScroll>
    </LoadingPage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  loadingPage: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "bold",
    color: Colors.blue,
  },
  subtitle: {
    marginHorizontal: 16,
    maxWidth: 328,
    fontSize: 16,
    lineHeight: 26,
    color: Colors.blue,
    fontWeight: "bold",
    marginBottom: 9,
    fontFamily: Fonts.redhatRegular,
  },
  continerTitle: {
    flex: 1,
    margin: 30,
  },

  itemsContainer: {
    marginLeft: 24,
    marginRight: 39,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  loadingBanner: {
    width: 150,
    height: 150,
  },
  icon: {
    width: 18.2,
    height: 21,
    color: Colors.blue,
  },
  logo: {
    width: 282.05,
    height: 189,
  },
  containerLogo: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 79,
  },
});
