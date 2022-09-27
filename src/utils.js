import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';

export function notifyMessage(msg) {
  Toast.show({
    type: 'success',
    text1: msg,
  });
}

export function doAfterPermission() {
  return new Promise((resolve, reject) => {
    check(PERMISSIONS[Platform.OS.toUpperCase()].CAMERA).then(result => {
      switch (result) {
        case RESULTS.DENIED:
          request(PERMISSIONS[Platform.OS.toUpperCase()].CAMERA).then(
            result => {
              switch (result) {
                case RESULTS.GRANTED:
                  return resolve();
                case RESULTS.UNAVAILABLE:
                case RESULTS.DENIED:
                case RESULTS.LIMITED:
                case RESULTS.BLOCKED:
                  notifyMessage('Camera permission has to be granted');
              }
            },
          );
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.GRANTED:
          return resolve();
        case RESULTS.UNAVAILABLE:
        case RESULTS.LIMITED:
        case RESULTS.BLOCKED:
          notifyMessage('Camera permission has to be granted');
      }
    });
  });
}
