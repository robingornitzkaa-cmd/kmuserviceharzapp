package de.kmuserviceharz.app;

import android.content.Context;
import android.content.SharedPreferences;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Intent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "WidgetBridge")
public class WidgetBridgePlugin extends Plugin {

    @PluginMethod
    public void updateWidgetData(PluginCall call) {
        String notes = call.getString("notes", "");
        String todosJson = call.getString("todos", "[]");
        int leadsCount = call.getInt("leadsCount", 0);
        int wonCount = call.getInt("wonCount", 0);
        int followUpsToday = call.getInt("followUpsToday", 0);
        int streak = call.getInt("streak", 0);
        String dailyGoal = call.getString("dailyGoal", "");
        
        Context context = getContext();
        SharedPreferences sharedPref = context.getSharedPreferences("WidgetPrefs", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("notes", notes);
        editor.putString("todos", todosJson);
        editor.putInt("leadsCount", leadsCount);
        editor.putInt("wonCount", wonCount);
        editor.putInt("followUpsToday", followUpsToday);
        editor.putInt("streak", streak);
        editor.putString("dailyGoal", dailyGoal);
        editor.putLong("lastSync", System.currentTimeMillis());
        editor.apply();
        
        AppWidgetManager manager = AppWidgetManager.getInstance(context);

        // 1. Broadcast All-in-One Widget
        sendUpdateBroadcast(context, manager, MyWidgetProvider.class);

        // 2. Broadcast To-Do Widget
        sendUpdateBroadcast(context, manager, TodoWidgetProvider.class);

        // 3. Broadcast CRM Widget
        sendUpdateBroadcast(context, manager, CrmWidgetProvider.class);

        // 4. Broadcast Quick-Capture Widget
        sendUpdateBroadcast(context, manager, QuickCaptureWidgetProvider.class);
        
        JSObject ret = new JSObject();
        ret.put("success", true);
        call.resolve(ret);
    }

    private void sendUpdateBroadcast(Context context, AppWidgetManager manager, Class<?> providerClass) {
        try {
            ComponentName component = new ComponentName(context, providerClass);
            int[] ids = manager.getAppWidgetIds(component);
            if (ids != null && ids.length > 0) {
                Intent intent = new Intent(context, providerClass);
                intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
                context.sendBroadcast(intent);
            }
        } catch (Exception e) {
            // Ignorieren falls Widget nicht aktiv platziert ist
        }
    }
}
