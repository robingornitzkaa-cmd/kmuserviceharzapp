package de.kmuserviceharz.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

public class CrmWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        SharedPreferences sharedPref = context.getSharedPreferences("WidgetPrefs", Context.MODE_PRIVATE);
        int leadsCount = sharedPref.getInt("leadsCount", 518);
        int wonCount = sharedPref.getInt("wonCount", 0);
        int followUpsToday = sharedPref.getInt("followUpsToday", 0);

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_crm_layout);
        views.setTextViewText(R.id.widget_crm_total_badge, leadsCount + " Betriebe");
        views.setTextViewText(R.id.widget_crm_followups_val, String.valueOf(followUpsToday));
        views.setTextViewText(R.id.widget_crm_won_val, String.valueOf(wonCount));

        if (followUpsToday > 0) {
            views.setTextViewText(R.id.widget_crm_status_note, "📞 " + followUpsToday + " Wiedervorlage(n) heute fällig! Jetzt anrufen.");
        } else {
            views.setTextViewText(R.id.widget_crm_status_note, "⚡ Tippe hier, um die B2B-Lead-Pipeline zu öffnen.");
        }

        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context, 0, intent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_crm_container, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
