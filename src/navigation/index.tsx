/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, ImageSourcePropType, Pressable } from "react-native";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import ModalScreen from "../screens/modal/ModalScreen";
import Login from "../screens/login/login";
import NotFoundScreen from "../screens/common/NotFoundScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Profile from "../screens/profile-test/profile";
import Register from "../screens/registration";
import Reels from "../screens/reel-list";

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
        options={{ headerShown: false }}
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
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Reels"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Reels"
        component={Reels}
        options={({ navigation }: RootTabScreenProps<"Reels">) => ({
          title: "Reels",
          tabBarIcon: ({ color }) => <TabBarIcon source={require('../../assets/images/tabs/play.png')} color={color} />,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Simulador"
        component={Reels}
        options={{
          title: "Simulador",
          tabBarIcon: ({ color }) => <TabBarIcon source={require('../../assets/images/tabs/simulador.png')} color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Favoritos"
        component={Reels}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <TabBarIcon source={require('../../assets/images/tabs/favoritos.png')} color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Configuracion"
        component={Reels}
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => <TabBarIcon source={require('../../assets/images/tabs/config.png')} color={color} />,
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  // name: React.ComponentProps<typeof FontAwesome>["name"];
  source: ImageSourcePropType,
  color: string;
}) {
  return <Image source={props.source} style={{ tintColor: props.color }} />
  // return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
