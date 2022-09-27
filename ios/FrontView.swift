import kyc_sdk
import UIKit
class VideoPlayerView: UIView {
  weak var videoPlayerVC: DocumentScanFrontViewController?//1
  override func didMoveToSuperview() {
    videoPlayerVC?.restart()
  }
  @objc var stringULValue: String = "" {
    didSet {
      setNeedsLayout()
    }
  }
  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  required init?(coder aDecoder: NSCoder) { fatalError("nope") }
  
  override func layoutSubviews() {//2
    super.layoutSubviews()
    if videoPlayerVC == nil {
      embed()
    } else {
      videoPlayerVC?.view.frame = bounds
    }
  }
  
  
  
  private func embed() {//3
    let vc  = DocumentScanFrontViewController()
    addSubview(vc.view)
    vc.view.frame = bounds
    self.videoPlayerVC = vc
  }
}
