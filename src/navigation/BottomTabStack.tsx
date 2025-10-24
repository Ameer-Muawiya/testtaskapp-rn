import React from 'react';
import { BottomTab } from '.';
import { useTheme } from '../hooks/useTheme';
import Dashboard from '../screens/public/dashboard';
import MarketData from '../screens/public/marketData';
import Profile from '../screens/public/profile';
import { RouteName } from './types';
import TabBarIcon from '../components/navigation/TabBarIcon';

const BottomTabStack = () => {
  const { fonts, colors, dark } = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard:true,
        tabBarLabelStyle: {
          ...fonts.bold,
        },
      }}
    >
      <BottomTab.Screen
        name={RouteName.Dashboard}
        component={Dashboard}
        options={{ tabBarIcon: props => <TabBarIcon {...props} name='dashboard' /> }}
      />
           <BottomTab.Screen
        name={RouteName.Profile}
        component={Profile}
        options={{ tabBarIcon: props => <TabBarIcon {...props} name='man'  /> }}
      />
      <BottomTab.Screen
        name={RouteName.MarketData}
        component={MarketData}
        options={{ tabBarIcon: props => <TabBarIcon {...props} name='diamond'  /> }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStack;
