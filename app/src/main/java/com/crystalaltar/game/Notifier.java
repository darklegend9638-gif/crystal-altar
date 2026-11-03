package com.crystalaltar.game;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

/** Системные уведомления-напоминания (локальные, без сервера): планируются через AlarmManager. */
public final class Notifier {
    static final String CHANNEL = "reminders";
    private static final String PREFS = "notif";

    private Notifier() {}

    static void ensureChannel(Context c) {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null && nm.getNotificationChannel(CHANNEL) == null) {
                NotificationChannel ch = new NotificationChannel(CHANNEL,
                    "Напоминания / Reminders", NotificationManager.IMPORTANCE_DEFAULT);
                ch.setDescription("Ежедневная награда и серия заходов");
                nm.createNotificationChannel(ch);
            }
        }
    }

    static boolean allowed(Context c) {
        if (Build.VERSION.SDK_INT >= 33
                && c.checkSelfPermission("android.permission.POST_NOTIFICATIONS") != PackageManager.PERMISSION_GRANTED) {
            return false;
        }
        return NotificationManagerCompat.from(c).areNotificationsEnabled();
    }

    private static PendingIntent alarmIntent(Context c, int id, String title, String text) {
        Intent i = new Intent(c, NotifyReceiver.class);
        i.putExtra("id", id);
        i.putExtra("title", title);
        i.putExtra("text", text);
        return PendingIntent.getBroadcast(c, id, i,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static void schedule(Context c, int id, long when, String title, String text) {
        try {
            if (title == null || title.isEmpty() || when <= System.currentTimeMillis()) {
                cancel(c, id);
                return;
            }
            SharedPreferences sp = c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            sp.edit().putString("n" + id, when + "\n" + title + "\n" + (text == null ? "" : text)).apply();

            AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
            if (am != null) {
                am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, when, alarmIntent(c, id, title, text));
            }
        } catch (Throwable ignored) {
        }
    }

    static void cancel(Context c, int id) {
        try {
            c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().remove("n" + id).apply();
            AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
            if (am != null) {
                am.cancel(alarmIntent(c, id, "", ""));
            }
        } catch (Throwable ignored) {
        }
    }

    /** После перезагрузки телефона: восстановить ещё не сработавшие напоминания. */
    static void rescheduleAll(Context c) {
        SharedPreferences sp = c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        for (int id = 1; id <= 9; id++) {
            String v = sp.getString("n" + id, null);
            if (v == null) continue;
            String[] p = v.split("\n", 3);
            try {
                schedule(c, id, Long.parseLong(p[0]), p.length > 1 ? p[1] : "", p.length > 2 ? p[2] : "");
            } catch (Throwable ignored) {
            }
        }
    }

    static void show(Context c, int id, String title, String text) {
        if (!allowed(c)) return;
        ensureChannel(c);

        Intent open = new Intent(c, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pi = PendingIntent.getActivity(c, 100 + id, open,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.Builder b = new NotificationCompat.Builder(c, CHANNEL)
            .setSmallIcon(R.drawable.ic_stat)
            .setContentTitle(title)
            .setContentText(text)
            .setStyle(new NotificationCompat.BigTextStyle().bigText(text))
            .setColor(0xFF7C3AED)
            .setAutoCancel(true)
            .setContentIntent(pi)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        try {
            NotificationManagerCompat.from(c).notify(id, b.build());
        } catch (SecurityException ignored) {
        }
        c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().remove("n" + id).apply();
    }
}
