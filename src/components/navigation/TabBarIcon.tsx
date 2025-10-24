import React from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TabBarIcon = ({
  name,
  color,
  focused,
  size,
}: {
  name:string
  focused: boolean;
  color: string;
  size: number;
}) => {
  return (
    <MaterialIcons name={name} size={size} color={color} />
  );
};

export default TabBarIcon;
