import React, {useEffect, useRef} from 'react';
import {UIManager, findNodeHandle} from 'react-native';
import {requireNativeComponent} from 'react-native';

export const RCTFrontScannerManager = requireNativeComponent(
  'RCTFrontScannerManager',
);

const createFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    UIManager.RCTFrontScannerManager.Commands.create.toString(),
    [viewId],
  );

export const FrontScanner = props => {
  const ref = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  return <RCTFrontScannerManager ref={ref} {...props} />;
};
