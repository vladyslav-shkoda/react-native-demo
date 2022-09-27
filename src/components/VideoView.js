import React, {useState} from 'react';
import {ActivityIndicator, View, StyleSheet, Platform} from 'react-native';
import {RCTVideoManager} from '../nativeView';
import {notifyMessage} from '../utils';

export const VideoView = props => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.wrapper}>
      <RCTVideoManager
        onSuccess={event => {
          props.navigation.navigate(
            'VideoRecordingResult',
            event.nativeEvent.url,
          );
          setLoading(false);
        }}
        onFailed={event => {
          notifyMessage(event.nativeEvent.message);
          setLoading(false);
        }}
        onLoadingStarted={() => {
          setLoading(true);
        }}
        style={styles.wrapper}
      />
      {Platform.OS === 'android' && loading && (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  indicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
