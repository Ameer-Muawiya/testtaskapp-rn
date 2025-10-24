import React from 'react';
import { Theme } from '../../common/theme';
import { useTheme } from '../../hooks/useTheme';

const ThemeProvider = ({
  children,
}: {
  children: (theme: Theme) => React.JSX.Element;
}) => {
  const theme = useTheme();

  return children(theme);
};

export default ThemeProvider;
