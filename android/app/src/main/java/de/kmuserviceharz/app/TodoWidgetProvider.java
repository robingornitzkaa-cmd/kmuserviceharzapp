package de.kmuserviceharz.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;
import org.json.JSONArray;
import org.json.JSONObject;

public class TodoWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        SharedPreferences sharedPref = context.getSharedPreferences("WidgetPrefs", Context.MODE_PRIVATE);
        String todosJson = sharedPref.getString("todos", "[]");
        String dailyGoal = sharedPref.getString("dailyGoal", "");

        StringBuilder todosBuilder = new StringBuilder();
        int activeCount = 0;
        try {
            JSONArray arr = new JSONArray(todosJson);
            for (int i = 0; i < arr.length(); i++) {
                JSONObject obj = arr.getJSONObject(i);
                boolean done = obj.optBoolean("done", false);
                String text = obj.optString("text", "");
                if (text.isEmpty()) text = obj.optString("title", "");
                
                if (!done && !text.isEmpty()) {
                    activeCount++;
                    if (activeCount <= 5) {
                        todosBuilder.append("☐ ").append(text).append("\n");
                    }
                }
            }
            if (activeCount == 0) {
                todosBuilder.append("✓ Alle Aufgaben erledigt! Starker Flow.");
            } else if (activeCount > 5) {
                todosBuilder.append("+ ").append(activeCount - 5).append(" weitere Aufgaben...");
            }
        } catch (Exception e) {
            todosBuilder.append("Keine Aufgaben gefunden.");
        }

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_todo_layout);
        views.setTextViewText(R.id.widget_todo_counter, activeCount + " offen");
        
        if (dailyGoal != null && !dailyGoal.trim().isEmpty()) {
            views.setTextViewText(R.id.widget_todo_focus_goal, "🎯 Fokus: " + dailyGoal.trim());
        } else {
            views.setTextViewText(R.id.widget_todo_focus_goal, "🎯 Fokus: Bereit für den Tag");
        }

        views.setTextViewText(R.id.widget_todo_list_text, todosBuilder.toString().trim());

        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context, 0, intent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_todo_container, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
