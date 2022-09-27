import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {findNodeHandle, Platform, StyleSheet, UIManager} from 'react-native';
import {notifyMessage} from '../utils';

export const Scanner = ({nativeName, onSuccess, Element}) => {
  const ref = useRef(null);
  const navigation = useNavigation();
  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      const unsubscribe = navigation.addListener('focus', () => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(ref.current),
          UIManager.getViewManagerConfig(nativeName).Commands.restart,
          [],
        );
      });
      return unsubscribe;
    }
  }, [nativeName, navigation]);
  return (
    <Element
      ref={ref}
      onSuccess={onSuccess}
      onFailed={event => {
        notifyMessage(event.nativeEvent.message);
      }}
      style={styles.wrapper}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});
