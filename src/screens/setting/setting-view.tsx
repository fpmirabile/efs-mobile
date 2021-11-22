import React from "react";
import { Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";
import LoadingBanner from "../../components/common/loading-banner/loading-banner";

interface Props {
    isLoading: boolean;
}

export default function RenderSetting({
    isLoading,
  }: Props): JSX.Element {
    if (isLoading) {
      return (
        <View style={styles.loadingPage}>
          <LoadingBanner style={styles.loadingBanner} />
        </View>
      );
    }
  
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
              <View style={styles.continerTitle}>
                <Text style={styles.title}>
                  Configuración
                </Text>
              </View>
              <View style={styles.itemsContainer}>
                <Image
                 style={styles.icon}
                 source={require("../../../assets/images/setting/myprofile.png")}
                />
                <Text style={styles.subtitle}>Mi perfil</Text>
              </View>
              <View style={styles.itemsContainer}>
                <Image
                 style={styles.icon}
                 source={require("../../../assets/images/setting/notifications.png")}
                />
                <Text style={styles.subtitle}>Notificaciones</Text>
              </View>
              <View style={styles.itemsContainer}>
                <Image
                 style={styles.icon}
                 source={require("../../../assets/images/setting/profile.png")}
                />
                <Text style={styles.subtitle}>Evaluación de perfil</Text>
              </View>
              <View style={styles.itemsContainer}>
                <Image
                 style={styles.icon}
                 source={require("../../../assets/images/efs-coin.png")}
                />
                <Text style={styles.subtitle}>Tienda FCS</Text>
              </View>
              <View style={styles.containerLogo} >
                <Image
                 style={styles.logo}
                 source={require("../../../assets/images/setting/settingLogo.png")}
                />
              </View>
        </View>
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    scrollView: {
      width: "100%",
      height: "100%",
      marginTop: 15,
    },
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
      fontFamily: "redhatdisplay-regular",
    },
    continerTitle:{ 
      flex:1,
      margin: 30 
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
    icon:{
        width: 18.2,
        height: 21,
        color: Colors.blue
    },
    logo:{ 
        width:282.05,
         height:189 
        },
    containerLogo:{ 
        flex:1,
        flexDirection:"column",
        alignSelf:"center",
        marginTop: 79
    }
    
  });
  