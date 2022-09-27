import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {FlatButton} from '../components/FlatButton';

export const ScanResult = ({navigation, route}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{route.params}</Text>
      </ScrollView>

      <View style={styles.buttons}>
        <FlatButton
          onPress={() => {
            navigation.pop(4);
          }}>
          Go Home
        </FlatButton>
        <FlatButton
          onPress={() => {
            navigation.pop(3);
          }}>
          Scan Again
        </FlatButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, paddingBottom: 30},
  scroll: {flex: 1},
  text: {color: 'black'},
  buttons: {flexDirection: 'row'},
});
