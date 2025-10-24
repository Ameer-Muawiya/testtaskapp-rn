import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {IconProps} from 'react-native-vector-icons/Icon';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../hooks/useTheme';

const PrimaryInput = ({
  leftIconProps,
  containerStyle,
  innerPlaceholder,
  errorMessage,
  loading,
  renderRightItem,
  innerContainerStyle,
  ...props
}: TextInputProps & {
  leftIconProps?: IconProps;
  containerStyle?: ViewStyle;
  innerPlaceholder?: string;
  errorMessage?: string;
  loading?: boolean;
  renderRightItem?: () => React.JSX.Element | undefined;
  innerContainerStyle?:ViewStyle
}) => {
  const {colors, fonts} = useTheme();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isEntrySecure, setIsEntrySecure] = useState<boolean | undefined>(
    props.secureTextEntry,
  );

  // variables
  const isError = !!errorMessage?.length;

  return (
    <>
      <View style={[{marginTop: 10}, containerStyle]}>
        <View
          style={[{
            // marginTop: 15,
            borderRadius: 10,
            backgroundColor: colors.card,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: isFocused
              ? isError
                ? 'red'
                : colors.primary
              : colors.border,
            flexDirection: 'row',
            alignItems: 'center',
          },innerContainerStyle]}>
          {leftIconProps?.name && (
            <FontAwesome
              size={20}
              color={colors.text}
              {...leftIconProps}
              style={[{marginRight: 10}, leftIconProps.style]}
            />
          )}
          <TextInput
            placeholderTextColor={colors.placeholder}
            {...props}
            placeholder={isFocused ? innerPlaceholder || '' : props.placeholder}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            secureTextEntry={isEntrySecure}
            style={[
              {
                marginRight: 10,
                fontSize: 15,
                flex: 1,
                color: colors.text,
                ...fonts.regular,
                ...(!props.multiline && {
                  height: 50,
                }),
              },
              props.style,
            ]}
          />
          {props.secureTextEntry && (
            <FontAwesome
              size={20}
              color={colors.text}
              name={isEntrySecure ? 'eye-slash' : 'eye'}
              onPress={() => {
                setIsEntrySecure(val => !val);
              }}
            />
          )}
          {/* {isFocused || props.value?.length ? (
          <>
            <Text
              style={{
                backgroundColor: colors.card,
                padding: 1,
                borderRadius: 1,
                position: 'absolute',
                top: -8.5,
                left: 15,
                fontSize: 11,
                color: isFocused
                  ? isError
                    ? 'red'
                    : colors.primary
                  : colors.text,
                ...fonts.medium,
              }}>
              {props.placeholder}
            </Text>
          </>
        ) : null} */}
          {loading && (
            <ActivityIndicator animating={loading} color={colors.primary} />
          )}
          {renderRightItem && renderRightItem()}
        </View>
        {isError && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Feather
              name="info"
              size={18}
              color="red"
              style={{
                marginRight: 5,
              }}
            />
            <Text
              style={{
                fontSize: 11,
                color: 'red',
                ...fonts.regular,
              }}>
              {errorMessage}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default PrimaryInput;
