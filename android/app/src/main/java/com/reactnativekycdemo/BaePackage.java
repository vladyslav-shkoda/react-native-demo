package com.reactnativekycdemo;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BaePackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        ArrayList<ViewManager> list = new ArrayList<>();
        list.add(new FrontScannerManager(reactContext));
        list.add(new BackScannerManager(reactContext));
        list.add(new SelfieScannerManager(reactContext));
        list.add(new VideoManager(reactContext));
        return list;
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new BaeModule(reactContext));
        return modules;
    }

}