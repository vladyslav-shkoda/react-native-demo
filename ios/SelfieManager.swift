import kyc_sdk
@objc (RCTSelfieManager)
public class RCTSelfieManager: RCTViewManager {
  var _view:SelfieView!
  var ob:Onboarding?
  public override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  public override func view() -> UIView! {
    self._view = SelfieView()
    return self._view
  }
  @objc func restart(_ node: NSNumber){
    DispatchQueue.main.async {
      self._view.controller?.restart()
    }
  }
  
  class SelfieView: UIView, SelfieAutoCaptureViewControllerDelegate {
    func selfieAutoCaptureSuccess(_ controller: kyc_sdk.SelfieAutoCaptureViewController) {
      BaeModule.kyc?.inspectDocument(){ res, error in
        do {
          let encoder = JSONEncoder()
          encoder.outputFormatting = .prettyPrinted
          let data = try encoder.encode(res)
          guard let jsonString = String(data: data, encoding: .utf8) else { return }
          self.onSuccess?(["res": jsonString])
        } catch {
          print("Failed to encode JSON")
        }
      }
    }
    
    func selfieAutoCaptureFailed(_ controller: kyc_sdk.SelfieAutoCaptureViewController, _ error: kyc_sdk.BaeError) {
      onFailed?(["message": error.message])
    }
    
    public var controller:SelfieAutoCaptureViewController?
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
      self.controller = SelfieAutoCaptureViewController()
      controller!.delegate = self
      controller!.view.frame = frame
      addSubview(controller!.view)
    }
  }
}
