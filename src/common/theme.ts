import { Theme as NavTheme } from '@react-navigation/native';
import { ImageRequireSource } from 'react-native';
import { IS_ANDROID } from './constants';

type FontStyle = {
  fontFamily: string;
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

type Shadow = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;

  // for android dark mode
  borderWidth?: number;
  borderColor?: string;
};

type TextShadow = {
  textShadowColor: string;
  textShadowOffset: { width: number; height: number };
  textShadowRadius: number;
};

function getShadow(elevation: number, showBorder?: boolean): Shadow {
  const shadowOpacity = Math.min(0.1 + elevation * 0.03, 0.5); // Clamp to 0.5 max
  const shadowRadius = Math.round(0.5 + elevation * 0.8 * 100) / 100; // Rounded to 2 decimals
  const height = Math.floor(elevation * 1);

  return {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height,
    },
    shadowOpacity,
    shadowRadius,
    elevation,
    ...(showBorder && {
      borderColor: 'white',
      borderWidth: 1,
    }),
  };
}

export type Theme = {
  dark: boolean;
  colors: NavTheme['colors'] & {
    invertText: string;
    secondary: string;
    placeholder: string;
    caption: string;
    shadow_1x: Shadow; // 5
    textShadow_1x: TextShadow;
    getShadow: (elevation: number) => Shadow;
    modalBackground: string;
    tertiary: string;
    black: string;
  };
  fonts: NavTheme['fonts'] & {
    extraBold: FontStyle;
    semiBold: FontStyle;
    light: FontStyle;
    extraLight: FontStyle;
    thin: FontStyle;
  };
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    textShadow_1x: {
      textShadowColor: '#000',
      textShadowOffset: { width: 0.5, height: 0.5 },
      textShadowRadius: 1,
    },
    tertiary: '#FF8A83',
    caption: '#85858A',
    modalBackground: '#00000020',
    invertText: '#FFFFFF',
    primary: '#2464C0',
    secondary: '#DDE1F0',
    background: '#F2F2F6',
    text: '#102D43',
    black: '#000000',
    card: '#FFFFFF',
    border: '#C6C6C8',
    notification: '',
    placeholder: '#929292',
    shadow_1x: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    getShadow,
  },
  fonts: {
    heavy: {
      fontFamily: 'ProductSans-Black',
      fontWeight: '900',
    },
    extraBold: {
      fontFamily: '',
      fontWeight: '800',
    },
    bold: {
      fontFamily: 'ProductSans-Bold',
      fontWeight: '700',
    },
    semiBold: {
      fontFamily: '',
      fontWeight: '600',
    },
    medium: {
      fontFamily: 'ProductSans-Medium',
      fontWeight: '500',
    },
    regular: {
      fontFamily: 'ProductSans-Regular',
      fontWeight: '400',
    },
    light: {
      fontFamily: 'ProductSans-Light',
      fontWeight: '300',
    },
    extraLight: {
      fontFamily: '',
      fontWeight: '200',
    },
    thin: {
      fontFamily: 'ProductSans-Thin',
      fontWeight: '100',
    },
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    textShadow_1x: {
      textShadowColor: '#ffffff',
      textShadowOffset: { width: 0.5, height: 0.5 },
      textShadowRadius: 1,
    },
    tertiary: '#FF8A83',
    caption: '#929292',
    modalBackground: '#ffffff20',
    invertText: '#000000',
    primary: '#404D77',
    secondary: '#5B637E',
    background: '#1D2437',
    text: '#FFFFFF',
    card: '#272D42',
    border: '#646D89',
    notification: '',
    placeholder: '#686C7B',
    black: '#000000',

    shadow_1x: {
      shadowColor: '#ffffff',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    getShadow: elevation => {
      return getShadow(elevation, IS_ANDROID);
    },
  },
  fonts: {
    heavy: {
      fontFamily: '',
      fontWeight: '900',
    },
    extraBold: {
      fontFamily: 'Montserrat-ExtraBold',
      fontWeight: '800',
    },
    bold: {
      fontFamily: 'Montserrat-Bold',
      fontWeight: '700',
    },
    semiBold: {
      fontFamily: 'Montserrat-SemiBold',
      fontWeight: '600',
    },
    medium: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: '500',
    },
    regular: {
      fontFamily: 'Montserrat-Regular',
      fontWeight: '400',
    },
    light: {
      fontFamily: 'Montserrat-Light',
      fontWeight: '300',
    },
    extraLight: {
      fontFamily: '',
      fontWeight: '200',
    },
    thin: {
      fontFamily: '',
      fontWeight: '100',
    },
  },
};
