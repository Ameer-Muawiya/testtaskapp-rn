import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IS_ANDROID } from '../common/constants';
import { useTheme } from '../hooks/useTheme';
import BottomTabStack from './BottomTabStack';
import { RouteName, StackParamList } from './types';

export const Stack = createNativeStackNavigator<StackParamList>();
export const BottomTab = createBottomTabNavigator<StackParamList>();

const RootNavigator = () => {
  const { dark ,colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...(IS_ANDROID && {
          statusBarStyle: dark ? 'dark' : 'light',
        }),
      }}
    >
      <Stack.Screen
        name={RouteName.BottomTabStack}
        component={BottomTabStack}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
