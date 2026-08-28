package de.kmuserviceharz.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.View;
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
        String notes = sharedPref.getString("notes", "Keine Notizen vorhanden. Tippe hier zum Öffnen.");
        String todosJson = sharedPref.getString("todos", "[]");
        int leadsCount = sharedPref.getInt("leadsCount", 518);
        int followUpsToday = sharedPref.getInt("followUpsToday", 0);
        int streak = sharedPref.getInt("streak", 0);
        String dailyGoal = sharedPref.getString("dailyGoal", "");
        String nextMeeting = sharedPref.getString("nextMeeting", "");

        // Config Flags
        boolean showNotes = sharedPref.getBoolean("showNotes", true);
        boolean showTodos = sharedPref.getBoolean("showTodos", true);
        boolean showCrm = sharedPref.getBoolean("showCrm", true);
        boolean showStreak = sharedPref.getBoolean("showStreak", true);
        boolean showMeeting = sharedPref.getBoolean("showMeeting", true);
        boolean showDailyGoal = sharedPref.getBoolean("showDailyGoal", true);
        int todoLimit = sharedPref.getInt("todoLimit", 3);
        String tapAction = sharedPref.getString("tapAction", "dashboard");

        // Format Todos
        StringBuilder todosBuilder = new StringBuilder();
        try {
            JSONArray arr = new JSONArray(todosJson);
            int count = 0;
            for (int i = 0; i < arr.length(); i++) {
                JSONObject obj = arr.getJSONObject(i);
                boolean done = obj.optBoolean("done", false);
                String text = obj.optString("text", "");
                if (text.isEmpty()) {
                    text = obj.optString("title", "");
                }
                
                if (!done && !text.isEmpty()) {
                    todosBuilder.append("☐ ").append(text).append("\n");
                    count++;
                }
                if (count >= todoLimit) break;
            }
            if (count == 0) {
                todosBuilder.append("✓ Alle Aufgaben erledigt!");
            }
        } catch (Exception e) {
            todosBuilder.append("Keine aktiven Aufgaben.");
        }

        // Construct RemoteViews
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);
        
        // CRM Stats
        String crmStatsText = leadsCount + " Leads • " + followUpsToday + " Wiedervorlage(n) heute";
        views.setTextViewText(R.id.widget_crm_stats, crmStatsText);
        views.setViewVisibility(R.id.widget_crm_stats, showCrm ? View.VISIBLE : View.GONE);

        // Streak Badge
        views.setTextViewText(R.id.widget_streak_badge, "🔥 " + streak + "d");
        views.setViewVisibility(R.id.widget_streak_badge, showStreak ? View.VISIBLE : View.GONE);

        // Google Meeting
        if (nextMeeting != null && !nextMeeting.trim().isEmpty()) {
            views.setTextViewText(R.id.widget_meeting_text, "📅 " + nextMeeting.trim());
        } else {
            views.setTextViewText(R.id.widget_meeting_text, "📅 Kein anstehender Termin");
        }
        views.setViewVisibility(R.id.widget_meeting_text, (showMeeting && nextMeeting != null && !nextMeeting.trim().isEmpty()) ? View.VISIBLE : View.GONE);

        // Focus Goal
        if (dailyGoal != null && !dailyGoal.trim().isEmpty()) {
            views.setTextViewText(R.id.widget_goal_text, "🎯 Fokus: " + dailyGoal.trim());
        } else {
            views.setTextViewText(R.id.widget_goal_text, "🎯 Fokus: Bereit für den Tag");
        }
        views.setViewVisibility(R.id.widget_goal_text, showDailyGoal ? View.VISIBLE : View.GONE);

        // Notes & Todos Visibility
        views.setTextViewText(R.id.widget_notes_text, notes);
        views.setViewVisibility(R.id.widget_notes_text, showNotes ? View.VISIBLE : View.GONE);

        views.setTextViewText(R.id.widget_todos_text, todosBuilder.toString().trim());
        views.setViewVisibility(R.id.widget_todos_text, showTodos ? View.VISIBLE : View.GONE);

        // Intent to launch app when clicking widget
        Intent intent = new Intent(context, MainActivity.class);
        intent.putExtra("tapAction", tapAction);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context, 0, intent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_container, pendingIntent);

        // Update widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
