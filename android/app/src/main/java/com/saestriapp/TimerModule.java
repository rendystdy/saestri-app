package com.saestriapp;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class TimerModule extends ReactContextBaseJavaModule {
  TimerModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "TimerModule";
  }

  @ReactMethod
  public void createTimerModuleEvent() {
      Log.d("CalendarModule", "Create event called with name: timer");
  }
}