package de.kmuserviceharz.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

public class QuickCaptureWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        SharedPreferences sharedPref = context.getSharedPreferences("WidgetPrefs", Context.MODE_PRIVATE);
        String notes = sharedPref.getString("notes", "🎙️ Tippe hier zum sofortigen Diktieren oder Erfassen einer Sprach-Notiz.");
        if (notes.trim().isEmpty()) {
            notes = "🎙️ Tippe hier zum sofortigen Diktieren oder Erfassen einer Sprach-Notiz.";
        }

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_quick_capture_layout);
        views.setTextViewText(R.id.widget_qc_notes_preview, notes);

        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context, 0, intent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_qc_container, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
