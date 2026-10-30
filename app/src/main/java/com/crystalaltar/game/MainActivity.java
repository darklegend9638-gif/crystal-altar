package com.crystalaltar.game;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import android.window.OnBackInvokedCallback;
import android.window.OnBackInvokedDispatcher;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.webkit.WebViewAssetLoader;

public class MainActivity extends Activity {

    private WebView web;
    private FrameLayout root;
    private OnBackInvokedCallback backCb;
    private int renderGone = 0;

    private static final String HOST = "appassets.androidplatform.net";
    private static final String START_URL = "https://" + HOST + "/assets/index.html";
    private static final int REQ_FILE = 4101;

    // выбор файла (аватарка из галереи)
    private ValueCallback<Uri[]> fileCb;


    // =====================================================================
    //  Мост для index.html
    //  window.AndroidBridge.writeFile(...) / readFile(...)
    //  Журнал заходов лежит в Android/data/<пакет>/files
    // =====================================================================
    private class Bridge {

        /** Разрешены только sessions.json и report.txt */
        private File sessFile(String name) {
            if (!"sessions.json".equals(name) && !"report.txt".equals(name)) {
                return null;
            }

            File dir = getExternalFilesDir(null);
            if (dir == null) {
                return null;
            }

            dir.mkdirs();
            return new File(dir, name);
        }

        @JavascriptInterface
        public boolean writeFile(String name, String text) {
            try {
                File f = sessFile(name);
                if (f == null || text == null || text.length() > 2000000) {
                    return false;
                }

                File tmp = new File(f.getParentFile(), name + ".tmp");

                FileOutputStream o = new FileOutputStream(tmp);
                try {
                    o.write(text.getBytes(StandardCharsets.UTF_8));
                } finally {
                    o.close();
                }

                if (f.exists()) {
                    f.delete();
                }
                return tmp.renameTo(f);

            } catch (Exception e) {
                return false;
            }
        }

        @JavascriptInterface
        public String readFile(String name) {
            try {
                File f = sessFile(name);
                if (f == null || !f.exists() || f.length() > 2000000) {
                    return "";
                }
                return readAll(f);

            } catch (Exception e) {
                return "";
            }
        }
    }


    // =====================================================================
    //  Копия assets в Android/data/<пакет>/assets
    //  (при первом запуске и после обновления)
    // =====================================================================
    private void exportAssets() {
        Thread th = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    // Android/data/<пакет>/files
                    File files = getExternalFilesDir(null);
                    if (files == null) {
                        return;
                    }

                    // Android/data/<пакет>
                    File base = files.getParentFile();
                    File out = new File(base, "assets");

                    long stamp = getPackageManager()
                        .getPackageInfo(getPackageName(), 0).lastUpdateTime;

                    File mark = new File(out, ".version");
                    if (mark.exists() && readAll(mark).trim().equals(String.valueOf(stamp))) {
                        return;
                    }

                    out.mkdirs();

                    String[] top = getAssets().list("");
                    if (top != null) {
                        for (String n : top) {
                            if (n.equals("images")
                                    || n.equals("webkit")
                                    || n.equals("sounds")
                                    || n.equals("geoid_map")) {
                                continue;
                            }
                            copyAssetTree(n, new File(out, n));
                        }
                    }

                    FileOutputStream m = new FileOutputStream(mark);
                    try {
                        m.write(String.valueOf(stamp).getBytes(StandardCharsets.UTF_8));
                    } finally {
                        m.close();
                    }

                } catch (Throwable ignored) {
                }
            }
        });

        th.setPriority(Thread.MIN_PRIORITY);
        th.start();
    }

    private void copyAssetTree(String path, File dest) throws Exception {
        String[] list = getAssets().list(path);

        if (list != null && list.length > 0) {
            // это папка
            dest.mkdirs();
            for (String n : list) {
                copyAssetTree(path + "/" + n, new File(dest, n));
            }

        } else {
            // это файл
            dest.getParentFile().mkdirs();

            InputStream in = getAssets().open(path);
            try {
                FileOutputStream o = new FileOutputStream(dest);
                try {
                    byte[] buf = new byte[16384];
                    int r;
                    while ((r = in.read(buf)) > 0) {
                        o.write(buf, 0, r);
                    }
                } finally {
                    o.close();
                }
            } finally {
                in.close();
            }
        }
    }

    private static String readAll(File f) throws Exception {
        java.io.FileInputStream in = new java.io.FileInputStream(f);
        try {
            java.io.ByteArrayOutputStream bo = new java.io.ByteArrayOutputStream();
            byte[] buf = new byte[16384];
            int r;
            while ((r = in.read(buf)) > 0) {
                bo.write(buf, 0, r);
            }
            return new String(bo.toByteArray(), StandardCharsets.UTF_8);
        } finally {
            in.close();
        }
    }


    // =====================================================================
    //  Диагностика
    //  launch.txt  - пишется при старте
    //  crash.txt   - пишется при падении
    //  Папка: Android/data/<пакет>/files
    // =====================================================================
    private void installCrashLog() {
        try {
            File d = getExternalFilesDir(null);
            if (d != null) {
                d.mkdirs();

                FileOutputStream o = new FileOutputStream(new File(d, "launch.txt"));
                try {
                    o.write(("onCreate " + new java.util.Date()).getBytes(StandardCharsets.UTF_8));
                } finally {
                    o.close();
                }
            }
        } catch (Throwable ignored) {
        }

        final Thread.UncaughtExceptionHandler prev = Thread.getDefaultUncaughtExceptionHandler();

        Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
            @Override
            public void uncaughtException(Thread t, Throwable e) {
                try {
                    File d = getExternalFilesDir(null);
                    if (d != null) {
                        d.mkdirs();

                        java.io.StringWriter sw = new java.io.StringWriter();
                        e.printStackTrace(new java.io.PrintWriter(sw));

                        FileOutputStream o = new FileOutputStream(new File(d, "crash.txt"), true);
                        try {
                            String text = "=== " + new java.util.Date()
                                + " thread=" + t.getName() + "\n"
                                + sw + "\n";
                            o.write(text.getBytes(StandardCharsets.UTF_8));
                        } finally {
                            o.close();
                        }
                    }
                } catch (Throwable ignored) {
                }

                if (prev != null) {
                    prev.uncaughtException(t, e);
                }
            }
        });
    }

    /** Пишет пойманную (не фатальную) ошибку в Android/data/<пакет>/files/crash.txt */
    private void logCrash(String where, Throwable e) {
        try {
            File d = getExternalFilesDir(null);
            if (d == null) {
                return;
            }
            d.mkdirs();

            java.io.StringWriter sw = new java.io.StringWriter();
            e.printStackTrace(new java.io.PrintWriter(sw));

            FileOutputStream o = new FileOutputStream(new File(d, "crash.txt"), true);
            try {
                String text = "=== caught @" + where + " "
                    + new java.util.Date() + "\n"
                    + sw + "\n";
                o.write(text.getBytes(StandardCharsets.UTF_8));
            } finally {
                o.close();
            }
        } catch (Throwable ignored) {
        }
    }


    // =====================================================================
    //  Запуск
    // =====================================================================
    @Override
    protected void onCreate(Bundle b) {
        // создаёт Android/data/<пакет>/files + launch.txt
        installCrashLog();

        super.onCreate(b);

        // Сохранённое состояние в WebView не передаём:
        // битое/огромное состояние было частой причиной вылета при старте
        b = null;

        root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#05060C"));
        setContentView(root);

        // --- WebView ---
        try {
            final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .setDomain(HOST)
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

            createWebView(loader, null);

        } catch (Throwable t) {
            logCrash("createWebView", t);
        }

        // --- копия assets в Android/data/<пакет>/assets (позже и в фоне) ---
        root.postDelayed(new Runnable() {
            @Override
            public void run() {
                exportAssets();
            }
        }, 5000);

        // --- отступы от системных панелей (Android 15+ рисует edge-to-edge) ---
        try {
            ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
                Insets i = insets.getInsets(
                    WindowInsetsCompat.Type.systemBars()
                        | WindowInsetsCompat.Type.displayCutout()
                        | WindowInsetsCompat.Type.ime());

                v.setPadding(i.left, i.top, i.right, i.bottom);
                return WindowInsetsCompat.CONSUMED;
            });

            androidx.core.view.WindowInsetsControllerCompat ic =
                WindowCompat.getInsetsController(getWindow(), root);

            if (ic != null) {
                ic.setAppearanceLightStatusBars(false);
                ic.setAppearanceLightNavigationBars(false);
            }

        } catch (Throwable t) {
            logCrash("insets", t);
        }

        // --- кнопка «Назад» (targetSdk 36: onBackPressed не вызывается) ---
        try {
            if (Build.VERSION.SDK_INT >= 33) {
                backCb = () -> {
                    if (web != null && web.canGoBack()) {
                        web.goBack();
                    } else {
                        finish();
                    }
                };

                getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    OnBackInvokedDispatcher.PRIORITY_DEFAULT, backCb);
            }
        } catch (Throwable t) {
            backCb = null;
            logCrash("backCb", t);
        }
    }


    // =====================================================================
    //  WebView
    // =====================================================================
    private void createWebView(final WebViewAssetLoader loader, Bundle saved) {
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#05060C"));
        root.addView(web, new FrameLayout.LayoutParams(-1, -1));

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);

        web.addJavascriptInterface(new Bridge(), "AndroidBridge");

        // <input type="file">: импорт из файла и выбор аватарки
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb,
                                             FileChooserParams params) {
                if (fileCb != null) {
                    fileCb.onReceiveValue(null);
                }
                fileCb = cb;

                try {
                    startActivityForResult(params.createIntent(), REQ_FILE);
                } catch (Exception e) {
                    fileCb = null;
                    cb.onReceiveValue(null);
                    return false;
                }
                return true;
            }
        });

        web.setWebViewClient(new WebViewClient() {

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
                WebResourceResponse res = loader.shouldInterceptRequest(r.getUrl());

                if (res == null && HOST.equals(r.getUrl().getHost())) {
                    // нет такого локального файла (например favicon) —
                    // отвечаем сразу, не идём в сеть
                    return new WebResourceResponse(
                        "text/plain", "utf-8", 404, "Not Found",
                        new java.util.HashMap<String, String>(),
                        new java.io.ByteArrayInputStream(new byte[0]));
                }
                return res;
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                if (HOST.equals(r.getUrl().getHost())) {
                    return false;
                }

                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, r.getUrl()));
                } catch (ActivityNotFoundException ignored) {
                }
                return true;
            }

            // если процесс WebView убит системой — пересоздаём (не больше 3 раз), а не падаем
            @Override
            public boolean onRenderProcessGone(WebView v, RenderProcessGoneDetail d) {
                if (web == v) {
                    root.removeView(web);
                    web.destroy();
                    web = null;

                    if (++renderGone <= 3) {
                        try {
                            createWebView(loader, null);
                        } catch (Throwable t) {
                            logCrash("recreate", t);
                        }
                    }
                }
                return true;
            }
        });

        boolean restored = false;
        if (saved != null) {
            restored = web.restoreState(saved) != null;
        }
        if (!restored) {
            web.loadUrl(START_URL);
        }
    }


    // =====================================================================
    //  Жизненный цикл
    // =====================================================================
    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);

        if (req == REQ_FILE) {
            if (fileCb != null) {
                fileCb.onReceiveValue(
                    res == RESULT_OK
                        ? WebChromeClient.FileChooserParams.parseResult(res, data)
                        : null);
                fileCb = null;
            }
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle o) {
        super.onSaveInstanceState(o);
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (web != null && web.canGoBack()) {
            web.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (web != null) {
            web.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) {
            web.onResume();
        }
    }

    @Override
    protected void onDestroy() {
        try {
            if (Build.VERSION.SDK_INT >= 33 && backCb != null) {
                getOnBackInvokedDispatcher().unregisterOnBackInvokedCallback(backCb);
            }
        } catch (Throwable ignored) {
        }

        try {
            if (web != null) {
                root.removeView(web);
                web.destroy();
                web = null;
            }
        } catch (Throwable ignored) {
        }

        super.onDestroy();
    }
}
