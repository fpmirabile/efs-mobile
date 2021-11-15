/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Reel } from './src/api/models/reels';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined;
  Register: undefined;
  Home: NavigatorScreenParams<RootTabParamList> | undefined;
  Profile: undefined;
  Video: { reelId: number, sectionReels: Reel[] };
  StonksAndCrypto: undefined;
  TermsAndConditions: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Reels: undefined;
  Simulador: undefined;
  Favoritos: undefined;
  Configuracion: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export interface BasicStackComponentProps extends NativeStackScreenProps<RootStackParamList> {}
