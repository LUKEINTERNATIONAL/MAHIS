import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.mohmw.MaHIS",
    appName: "MaHIS",
    webDir: "dist",
    bundledWebRuntime: false,
    server: {
        androidScheme: "http",
        cleartext: true,
    },
};

export default config;
