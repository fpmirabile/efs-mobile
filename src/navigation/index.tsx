/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, ImageSourcePropType, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import Colors from "../constants/colors";
import Login from "../screens/login";
import NotFoundScreen from "../screens/common/NotFoundScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Profile from "../screens/profile-test";
import Register from "../screens/registration";
import Reels from "../screens/bottom-bar/reel-list";
import Simulador from "../screens/bottom-bar/simulator";
import VideoPlayer from "../screens/video-player";
import StonksAndCrypto from "../screens/invest-crypto-stonks";
import StonksAndCryptoHeader from "./custom-header/invest-crypto-stonks/header";
import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const backButton = (onPress: () => void) => (props: HeaderBackButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Back</Text>
    </TouchableOpacity>
  );
};

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerBackButtonMenuEnabled: true,
          headerTitle: "",
          headerTintColor: Colors.black,
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Video"
        component={VideoPlayer}
        options={{
          headerBackButtonMenuEnabled: true,
          headerTitle: "",
          headerTintColor: Colors.white,
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="StonksAndCrypto"
        component={StonksAndCrypto}
        options={{
          header: (props: NativeStackHeaderProps) => {
            return <StonksAndCryptoHeader {...props} />;
          },
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Reels"
      screenOptions={{
        tabBarActiveTintColor: Colors.lightBlue,
      }}
    >
      <BottomTab.Screen
        name="Reels"
        component={Reels}
        options={({ navigation }: RootTabScreenProps<"Reels">) => ({
          title: "Reels",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              source={require("../../assets/images/tabs/play.png")}
              color={color}
            />
          ),
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Simulador"
        component={Simulador}
        options={{
          title: "Simulador",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              source={require("../../assets/images/tabs/simulador.png")}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Favoritos"
        component={Reels}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              source={require("../../assets/images/tabs/favoritos.png")}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Configuracion"
        component={Reels}
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              source={require("../../assets/images/tabs/config.png")}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { source: ImageSourcePropType; color: string }) {
  return <Image source={props.source} style={{ tintColor: props.color }} />;
}
