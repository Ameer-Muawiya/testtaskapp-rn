import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation';
import { StackParamList } from './src/navigation/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ThemeProvider from './src/components/navigation/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './src/features/store';

LogBox.ignoreAllLogs();

export const navigationRef =
  React.createRef<NavigationContainerRef<StackParamList>>();

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
                <Provider store={store}>
        <ThemeProvider>
          {theme => {
            return (
              <NavigationContainer ref={navigationRef} theme={theme}>
                <RootNavigator />
                <FlashMessage position="top" />
              </NavigationContainer>
            );
          }}
        </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
      </GestureHandlerRootView>
  );
};

export default App;
