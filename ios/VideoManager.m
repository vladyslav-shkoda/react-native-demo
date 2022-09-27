#import <React/RCTViewManager.h>
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(RCTVideoManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFailed, RCTBubblingEventBlock)
@end
