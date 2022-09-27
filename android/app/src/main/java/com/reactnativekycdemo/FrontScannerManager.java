package com.reactnativekycdemo;

import android.graphics.Bitmap;
import android.os.Handler;
import android.os.Looper;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentContainerView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;

import kyc.BaeError;
import kyc.ob.DocumentScanFrontFragment;

public class FrontScannerManager extends ViewGroupManager<FrameLayout> {
    public static final String REACT_CLASS = "RCTFrontScanner";
    ReactApplicationContext mCallerContext;

    public FrontScannerManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = root.findViewById(reactNativeViewId);
        setupLayout(parentView);
        DocumentScanFrontFragment documentFrontFragment = DocumentScanFrontFragment.newInstance();
        documentFrontFragment.setDocumentScanListener(new DocumentScanFrontFragment.DocumentScanListener() {
            @Override
            public void onDocumentScanFrontSuccess(Bitmap bitmap) {
                mCallerContext
                        .getJSModule(RCTEventEmitter.class)
                        .receiveEvent(reactNativeViewId, "onSuccess", null);
            }

            @Override
            public void onDocumentScanFrontFailed(BaeError baeError) {
                WritableMap event = Arguments.createMap();
                event.putString("message", baeError.getMessage());
                mCallerContext
                        .getJSModule(RCTEventEmitter.class)
                        .receiveEvent(reactNativeViewId, "onFailed", event);

                Handler handler = new Handler(Looper.getMainLooper());
                handler.post(() -> {
                    FragmentActivity activity = (FragmentActivity) mCallerContext.getCurrentActivity();
                    activity.getSupportFragmentManager()
                            .beginTransaction()
                            .remove(documentFrontFragment)
                            .commit();
                    createFragment(root, reactNativeViewId);
                });
            }

            @Override
            public void onNoCameraPermission() {
                WritableMap event = Arguments.createMap();
                event.putString("message", "No Camera Permission");
                mCallerContext
                        .getJSModule(RCTEventEmitter.class)
                        .receiveEvent(reactNativeViewId, "onFailed", event);
            }
        });
        FragmentActivity activity = (FragmentActivity) mCallerContext.getCurrentActivity();
        activity.getSupportFragmentManager()
                .beginTransaction()
                .add(reactNativeViewId, documentFrontFragment)
                .commit();
    }

    public void setupLayout(View view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                manuallyLayoutChildren(view);
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

    public void manuallyLayoutChildren(View view) {
        view.measure(
                View.MeasureSpec.makeMeasureSpec(view.getWidth(), View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(view.getHeight(), View.MeasureSpec.EXACTLY));
        view.layout(0, 0, view.getWidth(), view.getHeight());
    }

    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put(
                        "onSuccess",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onSuccess")
                        )
                )
                .put(
                        "onFailed",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onFailed")
                        )
                )
                .build();
    }

    @NonNull
    @Override
    protected FrameLayout createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        FragmentContainerView layout = new FragmentContainerView(themedReactContext);
        layout.addOnAttachStateChangeListener(new View.OnAttachStateChangeListener() {
            @Override
            public void onViewAttachedToWindow(@NonNull View view) {
                createFragment((FrameLayout) view, view.getId());
            }

            @Override
            public void onViewDetachedFromWindow(@NonNull View view) {
            }
        });
        return layout;
    }
}

