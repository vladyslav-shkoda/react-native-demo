#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BaeModule, NSObject)
RCT_EXTERN_METHOD(openPicker :(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(initializeSDK)
@end
