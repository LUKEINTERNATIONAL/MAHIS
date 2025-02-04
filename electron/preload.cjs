const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
    example: () => console.log("Hello from Electron Preload!"),
});
