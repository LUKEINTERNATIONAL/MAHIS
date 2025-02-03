const { app, BrowserWindow } = require("electron");
const path = require("path");
const { exec } = require("child_process");

let serverProcess;

function startServer() {
    serverProcess = exec("node server.cjs", (err, stdout, stderr) => {
        if (err) {
            console.error(`Server error: ${err}`);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            nodeIntegration: true,
        },
    });

    // Wait a bit to let the server start
    setTimeout(() => {
        win.loadURL("http://localhost:8080");
    }, 2000);
}

app.whenReady().then(() => {
    startServer(); // Start Express server
    createWindow();
});

app.on("window-all-closed", () => {
    if (serverProcess) serverProcess.kill(); // Stop server on exit
    if (process.platform !== "darwin") app.quit();
});
