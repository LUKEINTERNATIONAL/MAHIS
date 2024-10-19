import { addYears, startOfYear, addDays, getYear, format } from 'date-fns';

interface Holiday {
    name: string;
    getDate: (year: number) => Date;
}

interface FormattedHoliday {
    name: string;
    date: string;
}
export interface Config {
    host: string;
    port: string;
    protocol: string;
    thirdpartyapps: string;
    otherApps: Array<any>;
    baseURL: string;
    [key: string]: any;
}

export function areFieldsValid(propertiesArray: any[]) {
    let foundInvalidEntry = false;

    propertiesArray.forEach((property) => {
        if (property.skip_validation) {
            return true;
        }
        const value = property.dataValue?.value;

        if (value === "" || value === undefined) {
            property.show_error.value = true;
            foundInvalidEntry = true;
        } else {
            if (property.type === "text" && !isInputTextValid(value)) {
                property.show_error.value = true;
                foundInvalidEntry = true;
            } else if (property.type === "alphanumeric" && !isInputValid(value)) {
                property.show_error.value = true;
                foundInvalidEntry = true;
            } else {
                property.show_error.value = false;
            }
        }
    });

    return !foundInvalidEntry;
}

export function isInputTextValid(txt: string): boolean {
    const trimmedText = txt.trim();
    const regex = /^[a-zA-Z\s\t]{2,}$/; // Minimum 2 characters
    return regex.test(trimmedText);
}

export function isInputValid(txt: string): boolean {
    const trimmedText = txt.trim();
    const regex = /^[a-zA-Z0-9\s\t]{2,}$/; // Minimum 2 characters
    return regex.test(trimmedText);
}

export function isPasswordValid(txt: string): boolean {
    const trimmedText = txt.trim();
    const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=*!-])[a-zA-Z0-9@#$%^&+=*!-]{8,}$/;
    return regex.test(trimmedText);
}

export function getFieldsValuesObj(properties_array: any[]) {
    let resultObject: { [key: string]: any } = {}; // Define an index signature for dynamic property names

    properties_array.forEach((property: any) => {
        resultObject[property.property_name] = property.dataValue.value; // Assuming each property has a 'property_name' and a 'value'
    });
    return resultObject;
}

export function combineArrays<T>(...arrays: T[][]): T[] {
    return arrays.reduce((combinedArray, array) => combinedArray.concat(array), []);
}

export function isSameDate(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

let baseURL = getBaseURl();
if (baseURL.length > 0) {
    baseURL = "/" + baseURL;
}

const configPaths = [`${baseURL}/config.json`];

export async function getFileConfig2(): Promise<Config> {
    for (const path of configPaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Unable to retrieve configuration file from ${path}`);
            }
            const { apiURL, apiPort, apiProtocol, appConf, baseURL, apps, thirdpartyApps, platformProfiles, otherApps, websockerURL } =
                await response.json();
            localStorage.setItem("apiURL", apiURL);
            localStorage.setItem("apiPort", apiPort);
            localStorage.setItem("apiProtocol", apiProtocol);
            localStorage.setItem("appConf", JSON.stringify(appConf));
            localStorage.setItem("apps", JSON.stringify(apps));
            // localStorage.setItem("app", JSON.stringify({ programID: 29, applicationName: "PATIENT REGISTRATION PROGRAM" }));
            localStorage.setItem("thirdpartyApps", JSON.stringify(thirdpartyApps));
            localStorage.setItem("platformProfiles", JSON.stringify(platformProfiles));
            localStorage.setItem("otherApps", JSON.stringify(otherApps));
            localStorage.setItem("websockerURL", JSON.stringify(websockerURL));
            return {
                host: apiURL,
                port: apiPort,
                protocol: apiProtocol,
                thirdpartyapps: thirdpartyApps,
                otherApps,
                baseURL: baseURL,
            };
        } catch (e) {
            console.error(`Error reading config from ${path}:`, e);
            if (path === configPaths[configPaths.length - 1]) {
                throw new Error("All API Configuration file attempts failed. Please check console log for more details");
            }
        }
    }

    // This line should never be reached due to the throw in the loop,
    // but TypeScript requires a return statement here
    throw new Error("Unexpected error occurred");
}

async function readConfigValueAsync(): Promise<Config> {
    for (const path of configPaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Unable to retrieve configuration file from ${path}`);
            }
            const { baseURL } = await response.json();
            return baseURL;
        } catch (e) {
            console.error(`Error reading config from ${path}:`, e);
            if (path === configPaths[configPaths.length - 1]) {
                throw new Error("All API Configuration file attempts failed. Please check console log for more details");
            }
        }
    }
    // This line should never be reached due to the throw in the loop,
    // but TypeScript requires a return statement here
    throw new Error("Unexpected error occurred");
}

export function getWebsockerURL() {
    const webST = localStorage.websockerURL;
    if (webST) {
        let websockerURL = removeQuotes(webST);
        return websockerURL;
    }
    return "";
}

function removeQuotes(str: string) {
    if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
        return str.substring(1, str.length - 1);
    }
    return str;
}

export function getBaseURl() {
    let fromViteConfig_BaseURL = import.meta.env.BASE_URL;
    fromViteConfig_BaseURL = fromViteConfig_BaseURL.replace("/", "");
    return fromViteConfig_BaseURL;
}

export function compareDates(currentDateStr: string, nextAppointmentDateStr: string) {
    const currentDate = new Date(currentDateStr);
    const nextAppointmentDate = new Date(nextAppointmentDateStr);
    currentDate.setHours(0, 0, 0, 0);
    nextAppointmentDate.setHours(0, 0, 0, 0);
    if (nextAppointmentDate < currentDate) {
      return false;
    }
    return true;
}

export function getGenderCode(input: string): string {
    try {
        const lowercaseInput = input.toLowerCase().trim();
  
        if (lowercaseInput === 'male') {
          return 'M';
        } else if (lowercaseInput === 'female') {
          return 'F';
        } else if (lowercaseInput === 'm') {
          return 'Male';
        } else if (lowercaseInput === 'f') {
          return 'Female';
        } else {
          return 'Invalid gender';
        }
    } catch (error) {
        return ''
    }
}

export class MalawiHolidayGenerator {
    private holidays: Holiday[] = [
        { name: "New Year's Day", getDate: (year) => new Date(year, 0, 1) },
        { name: "John Chilembwe Day", getDate: (year) => new Date(year, 0, 15) },
        { name: "Martyrs' Day", getDate: (year) => new Date(year, 2, 3) },
        { name: "Good Friday", getDate: this.getEasterDate.bind(this, -2) },
        { name: "Easter Monday", getDate: this.getEasterDate.bind(this, 1) },
        { name: "Labour Day", getDate: (year) => new Date(year, 4, 1) },
        { name: "Kamuzu Day", getDate: (year) => new Date(year, 4, 14) },
        { name: "Independence Day", getDate: (year) => new Date(year, 6, 6) },
        { name: "Mothers' Day", getDate: (year) => new Date(year, 9, 15) },
        { name: "Christmas Day", getDate: (year) => new Date(year, 11, 25) },
        { name: "Boxing Day", getDate: (year) => new Date(year, 11, 26) },
    ];

    private getEasterDate(offset: number, year: number): Date {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        
        const easterDate = new Date(year, month, day);
        return new Date(easterDate.getTime() + offset * 24 * 60 * 60 * 1000);
    }

    generateHolidayDates(): { name: string; date: Date }[] {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const endDate = addYears(today, 4);
        const holidayDates: { name: string; date: Date }[] = [];

        // Generate holiday dates for 4 years
        for (let year = getYear(today); year <= getYear(endDate); year++) {
            this.holidays.forEach(holiday => {
                const holidayDate = holiday.getDate(year);
                if (holidayDate >= today && holidayDate <= endDate) {
                    holidayDates.push({ name: holiday.name, date: holidayDate });
                }
            });
        }

        return holidayDates.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    generateFormattedHolidayDates(): FormattedHoliday[] {
        const holidayDates = this.generateHolidayDates();
        return holidayDates.map(holiday => ({
            name: holiday.name,
            date: format(holiday.date, 'yyyy-MM-dd')
        }));
    }
}