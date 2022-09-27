import React, {useEffect} from 'react';
import {NativeModules, View, StyleSheet, Platform} from 'react-native';
import {doAfterPermission} from '../utils';
import {FlatButton} from '../components/FlatButton';

export function HomeScreen({navigation}) {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      NativeModules.BaeModule.initializeSDK();
    }
  }, []);
  return (
    <View style={styles.wrapper}>
      <FlatButton
        style={styles.upload}
        onPress={() => {
          navigation.navigate('Uploader');
        }}>
        Upload Documents
      </FlatButton>

      <FlatButton
        style={styles.scan}
        onPress={() => {
          doAfterPermission().then(() => {
            navigation.navigate('Front');
          });
        }}>
        Scan documents
      </FlatButton>

      <FlatButton
        onPress={() => {
          doAfterPermission().then(() => {
            navigation.navigate('VideoView');
          });
        }}>
        Record video
      </FlatButton>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1, paddingHorizontal: 40},
  upload: {marginBottom: 20, marginTop: 30},
  scan: {marginBottom: 20},
});
