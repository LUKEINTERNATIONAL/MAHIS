import ApiClient from "./api_client";
import Url from "@/utils/Url";
import useSWRV from "swrv";
import { AuthVariable } from "./auth_service";
import { find, isEmpty } from "lodash";

export class IncompleteEntityError extends Error {
    entity: any;
    constructor(message: string, entity: any) {
        super(`ENTITY Error: ${message}`);
        this.entity = entity;
    }
}

export class RecordConflictError extends Error {
    errors: any;
    constructor(message: string, errors: any) {
        super(message);
        this.errors = errors;
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(`RECORD NOT FOUND: ${message}`);
    }
}

export class BadRequestError extends Error {
    errors: any;
    constructor(message: string, errors: any) {
        super(message);
        this.errors = errors;
    }
}

class ApiServiceError extends Error {
    constructor(message: string) {
        super(`API SERVICE_ERROR: ${message}`);
    }
}

class ApiError extends Error {
    constructor(message: string) {
        super(`API ERROR: ${message}`);
    }
}

export class Service {
    static ajxGet(url: string, params = {}) {
        return ApiClient.get(`${url}?${Url.parameterizeObjToString(params)}`);
    }

    static async getText(url: string) {
        const req = await ApiClient.get(url);
        if (req && req.ok) return req?.text();
    }

    static getJsonSWR(url: string, params = {} as Record<string, any>) {
        const transformedUrl = `${url}?${Url.parameterizeObjToString(params)}`;
        const { data, error } = useSWRV(transformedUrl, (key) => {
            return this.getJson(key);
        });
        return data;
    }

    static async getJson(url: string, params = {} as Record<string, any>) {
        const transformedUrl = `${url}?${Url.parameterizeObjToString(params)}`;
        return this.jsonResponseHandler(ApiClient.get(transformedUrl));
    }

    static async postJson(url: string, data: any) {
        return this.jsonResponseHandler(ApiClient.post(url, data));
    }

    static putJson(url: string, data: Record<string, any>) {
        return this.jsonResponseHandler(ApiClient.put(url, data));
    }

    static async void(url: string, reason: Record<string, string>) {
        return this.jsonResponseHandler(ApiClient.remove(url, reason));
    }
    static async delete(url: string, data: any) {
        return this.jsonResponseHandler(ApiClient.remove(url, data));
    }

    static async getThirdpartyApps() {
        return JSON.parse((await ApiClient.getConfig()).thirdpartyapps);
    }

    private static async jsonResponseHandler(request: Promise<any>) {
        const response = await request;
        if (response) {
            if ([200, 201].includes(response.status)) {
                return response?.json();
            }

            if (response.status === 400) {
                const { errors } = await response?.json();
                throw new BadRequestError(response.statusText, errors);
            }

            if (response.status === 404) {
                const { errors } = await response?.json();
                return errors;
            }

            if (response.status === 422) {
                const { errors, entity } = await response?.json();
                throw new IncompleteEntityError(errors, entity);
            }
            if (response.status === 502) {
                const { errors } = await response?.json();
                throw new ApiServiceError(errors || "Getway Error");
            }
            if (response.status === 409) {
                const { errors } = await response?.json();
                throw new RecordConflictError(response.statusText, errors);
            }
            if (response.status === 500) {
                throw new ApiError("An internal server errror has occured");
            }
        }
    }

    static async getApiDate() {
        const req = await this.getJson("current_time");
        if (req) {
            return req.date;
        }
    }

    static getApiVersion() {
        return localStorage.getItem("APIVersion") || "-";
    }

    static getUserID(): null | number {
        const userID = localStorage.getItem("userID");
        return userID ? parseInt(userID) : null;
    }

    static getUserLocation() {
        return localStorage.getItem("userLocation");
    }

    static getLocationName() {
        return localStorage.getItem("locationName");
    }

    static getSessionDate() {
        return localStorage.getItem("sessionDate") || "";
    }

    static getCachedApiDate() {
        return localStorage.getItem("apiDate");
    }

    static async setSessionDate(sessionDate: string) {
        const apiDate = await this.getApiDate();
        if (apiDate) {
            localStorage.setItem("apiDate", apiDate);
            localStorage.setItem("sessionDate", sessionDate);
            return;
        }
        throw "Unable to set api date";
    }

    static async resetSessionDate() {
        const apiDate = await this.getApiDate();
        if (apiDate) {
            localStorage.removeItem("apiDate");
            localStorage.setItem("sessionDate", apiDate);
            return;
        }
        throw "Unable to reset session date";
    }

    static isBDE() {
        const apiDate = localStorage.getItem("apiDate");
        const sessionDate = localStorage.getItem("sessionDate");
        return apiDate && apiDate != sessionDate;
    }

    static getSiteUUID() {
        return localStorage.siteUUID || "";
    }

    static getProgramName() {
        let app: any = localStorage.getItem("app");
        app = JSON.parse(app);

        if ("applicationName" in app) return app.applicationName;

        return "";
    }

    static getSuspendedProgram() {
        return localStorage.getItem("suspendedApp") || "";
    }

    static getProgramID() {
        let app: any = localStorage.getItem("app");
        app = JSON.parse(app);

        if ("programID" in app) return app.programID;

        return "";
    }

    static getUserRoles() {
        const roles = localStorage.getItem("userRoles");
        const roleObj = roles ? JSON.parse(roles) : [];
        return roleObj[0].role;
    }

    static getUserName() {
        return localStorage.username;
    }

    static getCoreVersion() {
        return localStorage.getItem(AuthVariable.CORE_VERSION) || "-";
    }

    static getAppVersion() {
        return localStorage.getItem(AuthVariable.CORE_VERSION) || "-";
    }

    static getFullVersion() {
        return `${this.getCoreVersion()} / ${this.getApiVersion()}`;
    }

    static delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
}
