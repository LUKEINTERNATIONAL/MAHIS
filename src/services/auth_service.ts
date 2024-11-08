import { Role } from "@/interfaces/role";
import ApiClient from "./api_client";
import HisDate from "@/utils/Date";
import PACK_CONF from "../../package.json";
import { useUserStore } from "@/stores/userStore";
import * as CryptoJS from "crypto-js";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
export class InvalidAPIVersionError extends Error {
    message: string;
    constructor(version: string) {
        super();
        // this.message = `Your current API Version of "${version}" does not meet "${PACK_CONF['min-api-version']}". Contact administrator to update your API Version`
        this.message = ``;
    }
}

export class InvalidCredentialsError extends Error {
    message: string;
    constructor() {
        super();
        this.message = "Invalid username/password";
    }
}

export enum AuthVariable {
    CORE_VERSION = "core_version",
}

export class AuthService {
    username: string;
    userID: number;
    roles: Role[];
    token: string;
    programs: any;
    sessionDate: string;
    systemVersion: string;
    coreVersion: string;
    locationID: string;
    constructor() {
        this.token = "";
        this.username = "";
        this.locationID = "";
        this.roles = [];
        this.programs = [];
        this.userID = -1;
        this.sessionDate = "";
        this.systemVersion = "";
        this.coreVersion = "";
    }

    setUsername(username: string) {
        this.username = username;
    }

    async loadConfig() {
        localStorage.setItem(AuthVariable.CORE_VERSION, this.getHeadVersion());
        return ApiClient.getFileConfig();
    }

    async login(password: string) {
        try {
            const response = await this.requestLogin(password);
            if (response) {
                const {
                    authorization: { token, user, expiry_time },
                } = response;
                this.token = token;
                this.roles = user.roles;
                this.programs = user.programs;
                this.userID = user.user_id;
                this.locationID = user.location_id;
                this.sessionDate = await this.getSystemDate();
                this.systemVersion = await this.getApiVersion();
                this.coreVersion = this.getHeadVersion();
                const user_store = useUserStore();
                user_store.setUser(user);

                // Store login info for offline use
                this.storeOfflineLoginInfo(this.username, password, token, expiry_time);
                this.startSession();
            } else {
                throw "Unable to login on remote server";
            }
        } catch (error) {
            // If online login fails, try offline login
            if (error == "Unable to login on remote server") {
                if (await this.offlineLogin(this.username, password)) {
                    console.log("Offline login successful");
                } else {
                    throw "Unable to login offline";
                }
            } else {
                throw error;
            }
        }
    }

    private storeOfflineLoginInfo(username: string, password: string, token: string, expiryTime: string) {
        const offlineLoginInfo = {
            username,
            passwordHash: this.hashPassword(password),
            token,
            expiryTime,
        };
        localStorage.setItem("offlineLoginInfo", JSON.stringify(offlineLoginInfo));
    }

    private hashPassword(password: string): string {
        return CryptoJS.SHA256(password).toString();
    }

    async offlineLogin(username: string, password: string): Promise<boolean> {
        const offlineLoginInfoString = localStorage.getItem("offlineLoginInfo");
        if (!offlineLoginInfoString) {
            toastDanger("No offline login details available.");
            return false;
        }

        const offlineLoginInfo = JSON.parse(offlineLoginInfoString);
        if (
            offlineLoginInfo.username !== username ||
            offlineLoginInfo.passwordHash !== this.hashPassword(password) ||
            new Date(offlineLoginInfo.expiryTime) < new Date()
        ) {
            toastDanger("Failed to log in offline: incorrect username or password, or the token has expired.");
            return false;
        }

        // Set session data from stored info
        this.token = offlineLoginInfo.token;
        // You might want to set other properties like roles, programs, etc. here
        // if you decide to store them for offline use

        return true;
    }

    startSession() {
        localStorage.setItem("apiKey", this.token);
        localStorage.setItem("username", this.username);
        localStorage.setItem("userID", this.userID.toString());
        localStorage.setItem("userRoles", JSON.stringify(this.roles));
        localStorage.setItem("userPrograms", JSON.stringify(this.programs));
        localStorage.setItem("sessionDate", this.sessionDate);
        localStorage.setItem("APIVersion", this.systemVersion);
        localStorage.setItem("locationID", this.locationID);
        localStorage.setItem(AuthVariable.CORE_VERSION, this.coreVersion);
    }
    checkUserPrograms(selectedProgram: any) {
        const accessPrograms: any = localStorage.getItem("userPrograms");
        const programs = JSON.parse(accessPrograms);
        console.log("🚀 ~ AuthService ~ checkUserPrograms ~ programs:", programs);
        if (programs) return programs.some((program: any) => program.name === selectedProgram);
        else toastDanger("No user programs");
    }
    clearSession() {
        localStorage.clear();
    }

    requestLogin(password: string) {
        return this.postLogin(`auth/login`, {
            username: this.username,
            password: password,
        });
    }
    /**
     * Validates if the API version meets the minimum required version
     */
    async validateIfCorrectAPIVersion() {
        const apiVersion = await this.getApiVersion();
        // Remove the 'v' prefix if present
        const version = `${apiVersion}`.replace(/^v/, "");
        // const minimumVersion = `${PACK_CONF["min-api-version"]}`.replace(/^v/, "");
        const minimumVersion = ``;

        // Split the versions into arrays of numbers
        const versionParts = version.split(".");
        const minimumVersionParts = minimumVersion.split(".");

        // Compare each part of the version numbers
        for (let i = 0; i < Math.max(versionParts.length, minimumVersionParts.length); i++) {
            const versionPart = parseInt(versionParts[i] || "0");
            const minimumVersionPart = parseInt(minimumVersionParts[i] || "0");

            if (versionPart > minimumVersionPart) {
                return true;
            } else if (versionPart < minimumVersionPart) {
                throw new InvalidAPIVersionError(apiVersion);
            }
        }
        // All parts are equal
        return true;
    }

    async checkTimeIntegrity() {
        const serverDate = await this.getSystemDate();
        const localDate = HisDate.currentDate();
        if (!serverDate) throw "Unable to fetch server date";
        return localDate === serverDate;
    }

    initDateSync(interval = 1000) {
        setInterval(async () => {
            const date = await this.getSystemDate();
            /**
             * This condition exists to prevent overriding BDE Date
             * by checking presence of apiDate. We update ApiDate
             * if found else we update SessionDate.
             */
            if (localStorage.getItem("apiDate")) {
                localStorage.setItem("apiDate", date);
            } else {
                localStorage.setItem("sessionDate", date);
            }
        }, interval);
    }

    setActiveVersion(version: string) {
        return localStorage.setItem(AuthVariable.CORE_VERSION, version);
    }

    getActiveCoreVersion() {
        return localStorage.getItem(AuthVariable.CORE_VERSION);
    }

    getHeadVersion(): string {
        return PACK_CONF["version"];
    }

    cachingIsEnabled() {
        const val = this.getAppConf("dataCaching");
        return typeof val === "boolean" ? val : true;
    }

    versionLockingIsEnabled() {
        // const val = this.getAppConf("enableVersionLocking");
        // Version locking is enabled by default if no config isset
        // return typeof val === "boolean" ? val : true;
    }

    getAppConf(confKey: "promptFullScreenDialog" | "showUpdateNotifications" | "enableVersionLocking" | "dataCaching") {
        // const conf: any = localStorage.getItem("appConf");
        // if (conf) {
        //     try {
        //         const confObj = JSON.parse(conf);
        //         return confObj[confKey];
        //     } catch (e) {
        //         console.error(e);
        //     }
        // }
        // return null;
    }

    async getApiVersion(): Promise<string> {
        const api: any = await this.getJson("version");
        return api && api["System version"] ? api["System version"] : "-";
    }

    async getSystemDate(): Promise<string> {
        const { date } = await this.getJson("current_time");
        return date;
    }

    private async getJson(url: string) {
        const req = await ApiClient.get(url);
        if (req && req.ok) return req?.json();
    }

    private async postLogin(url: string, params: Record<string, number | string>) {
        const req = await ApiClient.post(url, params);
        if (!req) return;

        if (req.ok) {
            return req.json();
        }

        if (req.status === 401) throw new InvalidCredentialsError();
    }
}
