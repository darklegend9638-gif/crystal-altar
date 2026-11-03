package com.crystalaltar.game;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class NotifyReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent i) {
        // пока игра открыта — не беспокоим
        if (MainActivity.foreground) return;
        Notifier.show(c, i.getIntExtra("id", 1), i.getStringExtra("title"), i.getStringExtra("text"));
    }
}
