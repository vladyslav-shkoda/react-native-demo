import kyc_sdk
@objc (RCTBackScannerManager)
public class RCTBackScannerManager: RCTViewManager {
  var _view:BackView!
  public override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  public override func view() -> UIView! {
    self._view = BackView()
    return self._view
  }
  
  @objc func restart(_ node: NSNumber){
    DispatchQueue.main.async {
      self._view.controller?.restart()
    }
  }
  
  class BackView: UIView, DocumentScanBackViewControllerDelegate {
    public var controller:DocumentScanBackViewController?
    @objc public var onSuccess: RCTBubblingEventBlock?
    @objc public var onFailed: RCTBubblingEventBlock?
    func documentScanBackSuccess(_ controller: kyc_sdk.DocumentScanBackViewController) {
      onSuccess?([:])
    }
    
    func documentScanBackFailed(_ controller: kyc_sdk.DocumentScanBackViewController, _ error: kyc_sdk.BaeError) {
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
      self.controller = DocumentScanBackViewController()
      controller!.delegate = self
      controller!.view.frame = frame
      addSubview(controller!.view)
    }
  }
}
