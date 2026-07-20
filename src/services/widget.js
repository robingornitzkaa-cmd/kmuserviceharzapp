import { Capacitor } from '@capacitor/core';

export const updateAndroidWidget = (dashNotes, dashTodos) => {
  if (Capacitor.isNativePlatform()) {
    try {
      if (window.WidgetBridge && typeof window.WidgetBridge.updateWidgetData === 'function') {
        window.WidgetBridge.updateWidgetData({
          notes: dashNotes,
          todos: JSON.stringify(dashTodos)
        });
      }
    } catch (e) {
      console.error("Widget update failed", e);
    }
  }
};
