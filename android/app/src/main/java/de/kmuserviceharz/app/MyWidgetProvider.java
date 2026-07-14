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

public class MyWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        SharedPreferences sharedPref = context.getSharedPreferences("WidgetPrefs", Context.MODE_PRIVATE);
        String notes = sharedPref.getString("notes", "Keine Notizen vorhanden. Tippe hier, um die App zu öffnen.");
        String todosJson = sharedPref.getString("todos", "[]");

        // Format Todos
        StringBuilder todosBuilder = new StringBuilder();
        try {
            JSONArray arr = new JSONArray(todosJson);
            int count = 0;
            for (int i = 0; i < arr.length(); i++) {
                JSONObject obj = arr.getJSONObject(i);
                boolean done = obj.optBoolean("done", false);
                String text = obj.optString("text", "");
                
                if (!done) {
                    todosBuilder.append("☐ ").append(text).append("\n");
                    count++;
                }
                if (count >= 4) break; // max 4 todos on screen
            }
            if (count == 0) {
                todosBuilder.append("✓ Alle Aufgaben erledigt!");
            }
        } catch (Exception e) {
            todosBuilder.append("Keine aktiven Aufgaben.");
        }

        // Construct RemoteViews
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);
        views.setTextViewText(R.id.widget_notes_text, notes);
        views.setTextViewText(R.id.widget_todos_text, todosBuilder.toString().trim());

        // Intent to launch app when clicking widget
        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context, 0, intent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_container, pendingIntent);

        // Update widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
