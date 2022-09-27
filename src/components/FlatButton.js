import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export const FlatButton = ({onPress, children, style, disabled = false}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, {opacity: disabled ? 0.5 : 1}, style]}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    height: 40,
    maxHeight: 40,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: 'white',
  },
});
