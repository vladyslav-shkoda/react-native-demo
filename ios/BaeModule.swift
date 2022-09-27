import UIKit
import kyc_sdk
import MobileCoreServices
import UniformTypeIdentifiers
import Foundation
import WebKit


@objc(BaeModule)
class BaeModule:      NSObject, FilePickerDelegate {
  var resolve:RCTPromiseResolveBlock?
  var reject:RCTPromiseRejectBlock?
  
  func filePickerSuccess(_ controller: kyc_sdk.FilePicker, _ urls: [URL]) {
    resolve?(urls[0].absoluteString)
  }
  
  func filePickerFailed(_ controller: kyc_sdk.FilePicker, error: kyc_sdk.BaeError) {
    print(error.message)
    reject?("", error.message, error)
  }
  
  func filePickerUploadingStarted(_ controller: kyc_sdk.FilePicker) {
    
  }
  
  
  private let URL_PATH = "https://bl4-dev-02.baelab.net/api/BAF3E974-52AA-7598-FF04-56945EF93500/48EE4790-8AEF-FEA5-FFB6-202374C61700"
  static var kyc:Onboarding?
  
  @objc func openPicker(_ resolve: @escaping RCTPromiseResolveBlock,_ reject: @escaping RCTPromiseRejectBlock) {
    self.resolve = resolve
    self.reject = reject
    initUploader()
  }
  
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc func initializeSDK() {
    if let url = Bundle.main.url(forResource: "iengine", withExtension: "lic") {
      do {
        let license = try Data(contentsOf: url)
        BaeModule.kyc = Onboarding(license:license, baseURL: URL(string: URL_PATH)!)
        BaeModule.kyc!.initialize()
        print("initialize")
      } catch {
        print("Failed to initialize sdk")
        return
      }
    }
  }
  
  private func initUploader() {
    DispatchQueue.main.async {
      let controller = self.getPickerController()
      controller.delegate = self
      UIApplication.shared.keyWindow?.rootViewController?.present(controller, animated: true)
    }
  }
  
  private func getPickerController() -> FilePicker {
    if #available(iOS 14, *) {
      return FilePicker(documentTypes: [UTType.image])
    } else {
      return FilePicker(documentTypes: [kUTTypePDF as String])
    }
  }
}
