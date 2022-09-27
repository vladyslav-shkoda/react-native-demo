import React from 'react';
import {RCSelfieScannerManager} from '../nativeView';
import {Scanner} from './Scanner';

export const SelfieScanner = props => {
  return (
    <Scanner
      nativeName="RCTSelfie"
      Element={RCSelfieScannerManager}
      onSuccess={event => {
        props.navigation.navigate('ScanResults', event.nativeEvent.res);
      }}
    />
  );
};
