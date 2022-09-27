import kyc_sdk
@objc (RCTFrontScannerManager)
public class RCTFrontScannerManager: RCTViewManager {
  var _view:FrontView!
  public override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  public override func view() -> UIView! {
    self._view = FrontView()
    return self._view
  }
  
  @objc func restart(_ node: NSNumber){
    DispatchQueue.main.async {
      self._view.controller?.restart()
    }
  }
  
  class FrontView: UIView, DocumentScanFrontViewControllerDelegate {
    
    public var controller:DocumentScanFrontViewController?
    @objc public var onSuccess: RCTBubblingEventBlock?
    @objc public var onFailed: RCTBubblingEventBlock?
    func documentScanFrontSuccess(_ controller: kyc_sdk.DocumentScanFrontViewController) {
      onSuccess?([:])
    }
    
    func documentScanFrontFailed(_ controller: kyc_sdk.DocumentScanFrontViewController, _ error: kyc_sdk.BaeError) {
      onFailed?(["message": error.message])
    }
    
    override init(frame: CGRect) {
      super.init(frame: frame)
    }
    
    required init?(coder aDecoder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
      super.layoutSubviews()
      self.controller = DocumentScanFrontViewController()
      controller!.view.frame = frame
      controller!.delegate = self
      addSubview(controller!.view)
    }
  }
}
