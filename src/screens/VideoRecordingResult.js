import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {FlatButton} from '../components/FlatButton';
import {notifyMessage} from '../utils';

export const VideoRecordingResult = ({navigation, route}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.textWrapper}>
        <Text style={styles.text}>{route.params}</Text>
      </ScrollView>
      <View style={styles.buttons}>
        <FlatButton
          onPress={() => {
            Clipboard.setString(route.params);
            notifyMessage('Link copied to clipboard');
          }}>
          Copy link
        </FlatButton>
        <FlatButton
          onPress={() => {
            navigation.pop(1);
          }}>
          Restart
        </FlatButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {flex: 1, paddingBottom: 30},
  textWrapper: {flex: 1, padding: 10},
  text: {color: 'black'},
  buttons: {flexDirection: 'row'},
});
