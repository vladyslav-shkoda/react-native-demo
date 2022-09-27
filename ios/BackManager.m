#import <React/RCTViewManager.h>
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(RCTBackScannerManager, RCTViewManager)
RCT_EXTERN_METHOD(restart :(nonnull NSNumber*) reactTag)
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFailed, RCTBubblingEventBlock)
@end
