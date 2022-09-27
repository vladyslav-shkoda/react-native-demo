import React from 'react';
import {RCTFrontScannerManager} from '../nativeView';
import {Scanner} from './Scanner';

export const FrontScanner = props => {
  return (
    <Scanner
      nativeName="RCTFrontScanner"
      Element={RCTFrontScannerManager}
      onSuccess={event => {
        props.navigation.navigate('Back');
      }}
    />
  );
};
