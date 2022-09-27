import kyc_sdk
@objc (RCTVideoManager)
public class RCTVideoManager: RCTViewManager {
  var _view:VView!
  public override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  public override func view() -> UIView! {
    self._view = VView()
    return self._view
  }
  
  class VView: UIView, VideoViewControllerDelegate {
    func videoViewRecordSuccess(_ controller: kyc_sdk.VideoViewController, _ url: String) {
      onSuccess?(["url": url])
    }
    
    func videoViewRecordFailed(_ controller: kyc_sdk.VideoViewController, _ error: kyc_sdk.BaeError) {
      onFailed?(["message": error.message])
    }
    
    public var controller:VideoViewController?
    @objc public var onSuccess: RCTBubblingEventBlock?
    @objc public var onFailed: RCTBubblingEventBlock?
    override init(frame: CGRect) {
      super.init(frame: frame)
    }
    
    required init?(coder aDecoder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
      super.layoutSubviews()
      controller = VideoViewController()
      controller!.delegate = self
      controller!.view.frame = self.frame
      addSubview(controller!.view)
    }
  }
}
