package com.reactnativekycdemo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import kyc.BaeError;
import kyc.FilePicker;
import kyc.Uploader;
import kyc.UploaderFile;


public class BaeModule extends ReactContextBaseJavaModule {
    private Promise promise;


    private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (resultCode == Activity.RESULT_OK) {

                String baseUrl = "https://bl4-dev-02.baelab.net/api/BAF3E974-52AA-7598-FF04-56945EF93500/48EE4790-8AEF-FEA5-FFB6-202374C61700";
                Uploader uploader = new Uploader(getReactApplicationContext(), baseUrl);
                uploader.addDocument(data.getData());

                uploader.uploadDocuments(new UploaderFile.UploaderCallback() {
                    @Override
                    public void onSuccess(UploaderFile uploaderFile) {
                        promise.resolve(uploaderFile.fileUrl);
                    }

                    @Override
                    public void onFailed(BaeError baeError) {
                        promise.reject(baeError.getMessage());
                    }
                });
            }
        }
    };

    BaeModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(activityEventListener);
    }



    @NonNull
    @Override
    public String getName() {
        return "BaeModule";

    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        getReactApplicationContext().removeActivityEventListener(activityEventListener);
    }


    @ReactMethod
    public void openPicker(Promise promise) {
        this.promise = promise;
        Intent intent = new Intent(getReactApplicationContext(), FilePicker.class);
        String[] mimetypes = {"image/gif", "application/pdf"};
        intent.putExtra(Intent.EXTRA_MIME_TYPES, mimetypes);
        getCurrentActivity().startActivityForResult(Intent.createChooser(intent, null), 1, Bundle.EMPTY);
    }
}
