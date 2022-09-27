import React from 'react';
import {RCBackScannerManager} from '../nativeView';
import {Scanner} from './Scanner';

export const BackScanner = props => {
  return (
    <Scanner
      nativeName="RCTBackScanner"
      Element={RCBackScannerManager}
      onSuccess={event => {
        props.navigation.navigate('Selfie');
      }}
    />
  );
};
