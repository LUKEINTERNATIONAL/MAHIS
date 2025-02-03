import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
    });

    win.loadURL(process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, "../dist/index.html")}`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
