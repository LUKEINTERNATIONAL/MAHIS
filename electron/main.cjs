const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve(__dirname, "preload.js"),
            nodeIntegration: true,
        },
    });

    // Ensure correct path resolution for production and development
    const startURL = app.isPackaged ? `file://${path.resolve(__dirname, "../dist/index.html")}` : "http://localhost:4000"; // Adjust for Vite

    win.loadURL(startURL);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
