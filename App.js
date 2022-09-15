import React, {useState} from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  requireNativeComponent,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import Clipboard from './node_modules/@react-native-clipboard/clipboard/dist/index.d';
import {FrontScanner} from './FrontScanner';

function HomeScreen({navigation}) {
  console.log(navigation);
  return (
    <View style={{flex: 1}}>
      <FlatButton
        onPress={() => {
          navigation.navigate('Uploader');
        }}>
        Upload Documents
      </FlatButton>

      <FlatButton
        onPress={() => {
          navigation.navigate('Front');
        }}>
        Scan documents
      </FlatButton>
    </View>
  );
}
const FrontScreen = () => {
  return <FrontScanner style={{flex: 1}} />;
};
function UploaderScreen() {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    NativeModules.BaeModule.openPicker().then(url => {
      setUrl(url);
    });
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'space-between', padding: 20}}>
      <Text style={{color: 'black'}}>{url || 'Loading...'}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <FlatButton
          onPress={() => {
            Clipboard.setString(url);
            ToastAndroid.show('Link copied to clipboard', 2000);
          }}>
          Copy link
        </FlatButton>

        <FlatButton
          onPress={() => {
            NativeModules.BaeModule.openPicker().then(url => {
              setUrl(url);
            });
          }}>
          Rescan
        </FlatButton>
      </View>
    </View>
  );
}
const FlatButton = ({onPress, children}) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        height: 40,
        maxHeight: 40,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
      onPress={onPress}>
      <Text style={{color: 'white'}}>{children}</Text>
    </TouchableOpacity>
  );
};

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Uploader" component={UploaderScreen} />
        <Stack.Screen name="Front" component={FrontScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
