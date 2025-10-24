import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

type PrimaryButtonProps = TouchableOpacityProps & {
  title: string;
  titleStyle?: TextStyle;
  loading?: boolean;
  type?: 'outlined' | 'filled';
  loadingProps?: ActivityIndicatorProps;
  renderRight?: () => React.JSX.Element;
};

const PrimaryButton = ({
  type = 'filled',
  renderRight,
  title,
  titleStyle,
  loading,
  loadingProps,
  ...props
}: PrimaryButtonProps) => {
  const { colors, fonts } = useTheme();

  const isOutlined = type === 'outlined';

  const styles = StyleSheet.create({
    container: {
      height: 46,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 5,
      opacity: props.disabled ? 0.7 : 1,
      backgroundColor: isOutlined ? 'transparent' : colors.primary,
      ...(isOutlined && {
        borderWidth: 1,
        borderColor: colors.primary,
      }),
    },
    title: {
      color: isOutlined ? colors.primary : "white",
      fontSize: 16,
      ...fonts.semiBold,
      ...titleStyle,
    },
    loader: {
      marginRight: title ? 10 : 0,
    },
  });

  return (
    <TouchableOpacity {...props} style={[styles.container, props.style]}>
      {loading && (
        <ActivityIndicator
          animating
          color={"white"}
          style={styles.loader}
          {...loadingProps}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {renderRight && renderRight()}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
