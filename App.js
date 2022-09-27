import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Toast from 'react-native-toast-message';

import {FrontScanner} from './src/components/FrontScanner';
import {SelfieScanner} from './src/components/SelfieScanner';
import {HomeScreen} from './src/screens/HomeScreen';
import {ScanResult} from './src/screens/ScanResults';
import {UploaderScreen} from './src/screens/UploaderScreen';
import {VideoRecordingResult} from './src/screens/VideoRecordingResult';
import {VideoView} from './src/components/VideoView';
import {BackScanner} from './src/components/BackScanner';

const Stack = createNativeStackNavigator();
const getScanningScreens = () => {
  return (
    <Stack.Group
      screenOptions={{
        contentStyle: {
          backgroundColor: 'black',
        },
      }}>
      <Stack.Screen
        options={{
          title: 'Scan Front of you ID',
        }}
        name="Front"
        component={FrontScanner}
      />
      <Stack.Screen
        options={{
          title: 'Scan Back of you ID',
        }}
        name="Back"
        component={BackScanner}
      />
      <Stack.Screen
        options={{
          title: 'Please Take a selfie',
        }}
        name="Selfie"
        component={SelfieScanner}
      />
      <Stack.Screen
        options={{
          title: 'Scanning Results',
        }}
        name="ScanResults"
        component={ScanResult}
      />
    </Stack.Group>
  );
};

const getVideoFlowScreens = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Hold the button for 5 sec',
        }}
        name="VideoView"
        component={VideoView}
      />
      <Stack.Screen
        options={{
          title: 'Video Recording Results',
        }}
        name="VideoRecordingResult"
        component={VideoRecordingResult}
      />
    </>
  );
};
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerBackTitle: 'Back'}}>
          <Stack.Screen
            options={{
              title: 'React native KYC Demo',
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              title: 'Upload Results',
            }}
            name="Uploader"
            component={UploaderScreen}
          />
          {getScanningScreens()}
          {getVideoFlowScreens()}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
