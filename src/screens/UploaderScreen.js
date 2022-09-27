import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {NativeModules, Text, View, StyleSheet} from 'react-native';
import {FlatButton} from '../components/FlatButton';
import {notifyMessage} from '../utils';

export function UploaderScreen() {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(false);
  const openPicker = () => {
    setError(false);
    NativeModules.BaeModule.openPicker()
      .then(resUrl => {
        setError(false);
        setUrl(resUrl);
      })
      .catch(e => {
        notifyMessage(e.message);
        setError(true);
      });
  };

  useEffect(openPicker, []);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{error ? '' : url || 'Loading...'}</Text>
      <View style={styles.buttons}>
        <FlatButton
          disabled={!url}
          onPress={() => {
            Clipboard.setString(url);
            notifyMessage('Link copied to clipboard');
          }}>
          Copy link
        </FlatButton>

        <FlatButton onPress={openPicker}>Restart</FlatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1, justifyContent: 'space-between', padding: 20},
  text: {color: 'black'},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
