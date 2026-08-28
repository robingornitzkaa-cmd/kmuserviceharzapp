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
        String nextMeeting = call.getString("nextMeeting", "");
        int unreadMailsCount = call.getInt("unreadMailsCount", 0);

        // Konfigurations-Flags
        boolean showNotes = call.getBoolean("showNotes", true);
        boolean showTodos = call.getBoolean("showTodos", true);
        boolean showCrm = call.getBoolean("showCrm", true);
        boolean showStreak = call.getBoolean("showStreak", true);
        boolean showMeeting = call.getBoolean("showMeeting", true);
        boolean showDailyGoal = call.getBoolean("showDailyGoal", true);
        int todoLimit = call.getInt("todoLimit", 3);
        String theme = call.getString("theme", "glassmorphic");
        int bgAlpha = call.getInt("bgAlpha", 85);
        String tapAction = call.getString("tapAction", "dashboard");
        
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
        editor.putString("nextMeeting", nextMeeting);
        editor.putInt("unreadMailsCount", unreadMailsCount);

        // Speichern der Konfiguration
        editor.putBoolean("showNotes", showNotes);
        editor.putBoolean("showTodos", showTodos);
        editor.putBoolean("showCrm", showCrm);
        editor.putBoolean("showStreak", showStreak);
        editor.putBoolean("showMeeting", showMeeting);
        editor.putBoolean("showDailyGoal", showDailyGoal);
        editor.putInt("todoLimit", todoLimit);
        editor.putString("theme", theme);
        editor.putInt("bgAlpha", bgAlpha);
        editor.putString("tapAction", tapAction);

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
