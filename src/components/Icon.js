import React from 'react';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export const Icon = ({ name, size, color, style }) => {
  return (
    <FontAwesome 
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};
