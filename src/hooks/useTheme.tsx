import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../common/theme';

export const useTheme = () => {
  const scheme = useColorScheme();
  return lightTheme
};
