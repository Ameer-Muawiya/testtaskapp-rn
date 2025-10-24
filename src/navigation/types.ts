import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum RouteName {
  BottomTabStack = 'BottomTabStack',
  Dashboard = 'Dashboard',
  Profile = 'Profile',
  MarketData = 'MarketData',
}

export type StackParamList = {
  BottomTabStack: undefined;
  Dashboard: undefined;
  Profile: undefined;
  MarketData: undefined;
};

type ScreenProps<T extends keyof StackParamList> = NativeStackScreenProps<
  StackParamList,
  T
>;

export type BottomTabStackProps = ScreenProps<RouteName.BottomTabStack>;
export type DashboardProps = ScreenProps<RouteName.Dashboard>;
export type ProfileProps = ScreenProps<RouteName.Profile>;
export type MarketDataProps = ScreenProps<RouteName.MarketData>;
