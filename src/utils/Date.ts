import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const STANDARD_DATE_FORMAT = "YYYY-MM-DD";
const DISPLAY_DATE_FORMAT = "DD MMM, YYYY";
const SHORT_DATE_FORMAT = "DD MMM";

function calculateAge(birthdate: any, currentdate: any) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date(currentdate);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function getCurrentDateTimeWithOffset(timezoneString: string = dayjs.tz.guess()): string {
    return dayjs().tz(timezoneString).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
}
function calculateDisplayAge(dateOfBirth: string, currentDate: string = new Date().toISOString()): string {
    const today: Date = new Date(currentDate);
    const birthDate: Date = new Date(dateOfBirth);

    if (isNaN(today.getTime()) || isNaN(birthDate.getTime())) {
        throw new Error("Invalid date format. Please use YYYY-MM-DD.");
    }

    if (birthDate > today) {
        throw new Error("Birth date cannot be in the future.");
    }

    const diffTime: number = today.getTime() - birthDate.getTime();
    const diffDays: number = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    } else if (diffDays < 30) {
        const weeks: number = Math.floor(diffDays / 7);
        return `${weeks} week${weeks !== 1 ? "s" : ""}`;
    } else if (diffDays < 365) {
        const months: number = Math.floor(diffDays / 30.44); // Average days in a month
        return `${months} month${months !== 1 ? "s" : ""}`;
    } else {
        const years: number = Math.floor(diffDays / 365.25); // Account for leap years
        return `${years} year${years !== 1 ? "s" : ""}`;
    }
}

function ageInMonths(startDateStr: string) {
    const startDate = new Date(startDateStr);
    const endDate = new Date();

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
}

function getBirthdateAge(date: any) {
    return calculateAge(date, currentDate()) + " yrs (" + toStandardHisDisplayFormat(date) + ")";
}
function sessionDate() {
    return localStorage.getItem("sessionDate") || dayjs().format(STANDARD_DATE_FORMAT);
}

function currentDisplayDate() {
    return dayjs().format(DISPLAY_DATE_FORMAT);
}

function currentDate() {
    return dayjs().format(STANDARD_DATE_FORMAT);
}

function dateDiffInDays(date1: string, date2: string) {
    return dayjs(date1).diff(date2, "days");
}

function getAgeInYears(date: string | Date): number {
    return dayjs().diff(date, "years");
}
function getAgeInFloatYears(date: string | Date, currentD = currentDate()): number {
    const now = dayjs(currentD);
    const birthDate = dayjs(date);
    const ageInYears = now.diff(birthDate, "days") / 365.25;
    return parseFloat(ageInYears.toFixed(3));
}
function toStandardHisTimeFormat(date: string | Date) {
    return dayjs(date).format("HH:mm");
}

function toStandardHisDisplayFormat(date: string | Date): string {
    const fdate = dayjs(date).format(DISPLAY_DATE_FORMAT);
    if (fdate.match(/invalid/i)) return "";
    return fdate;
}

function toStandardHisShortFormat(date: string | Date): string {
    const fdate = dayjs(date).format(SHORT_DATE_FORMAT);
    if (fdate.match(/invalid/i)) return "";
    return fdate;
}

function toStandardHisFormat(date: string | Date): string {
    const fdate = dayjs(date).format(STANDARD_DATE_FORMAT);
    if (fdate.match(/invalid/i)) return "";
    return fdate;
}

function estimateDateFromAge(age: number): string {
    const date = dayjs(sessionDate()).subtract(age, "years");
    return date.format(STANDARD_DATE_FORMAT);
}

function getYearFromAge(age: number) {
    return dayjs(sessionDate()).subtract(age, "years").year();
}

function getYear(date: string) {
    return dayjs(date).year();
}
function getMonth(date: string) {
    return dayjs(date).format("MMM");
}
function getDay(date: string) {
    return dayjs(date).date();
}
function add(date: string, unit: any, value: number) {
    return dayjs(date).add(value, unit);
}
function subtract(date: string, unit: any, value: number) {
    return dayjs(date).subtract(value, unit);
}

function getCurrentYear() {
    return dayjs().year();
}

function getDateBeforeByDays(date: string, days: number) {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() - days);
    return toStandardHisFormat(dateObj);
}

/**
 * Get Year of specified age in years
 * @param age
 * @returns
 */
function getYearOfAge(ageInYears: number): number {
    const [year] = estimateDateFromAge(ageInYears).split("-");
    return parseInt(year);
}

function stitchDate(year: number | string, month = -1 as number | string, day = -1 as number | string) {
    let fmonth = month.toString();
    let fday = day.toString();
    let fyear = year;
    const unknown = (d: number | string) => d.toString().match(/Unknown/i);

    if (parseInt(fyear.toString()) < 1900) {
        fyear = "1900";
    }

    if (!month || unknown(month)) {
        fmonth = "07";
    }

    if (!day || unknown(day)) {
        fday = "15";
    }

    return toStandardHisFormat(`${fyear}-${fmonth}-${fday}`);
}

function todayDateFormatted() {
    return dayjs().tz("Africa/Harare").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
}

function calculateTimeDifference(timestamp: any) {
    const currentTime = dayjs();
    const startTime = dayjs(timestamp);
    const duration = currentTime.diff(startTime);

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, ${minutes} minutes`;
}

export default {
    sessionDate,
    currentDate,
    getYearOfAge,
    getYear,
    dateDiffInDays,
    getAgeInYears,
    toStandardHisTimeFormat,
    toStandardHisDisplayFormat,
    toStandardHisShortFormat,
    currentDisplayDate,
    stitchDate,
    toStandardHisFormat,
    estimateDateFromAge,
    getYearFromAge,
    getCurrentYear,
    getDateBeforeByDays,
    getMonth,
    getDay,
    add,
    subtract,
    calculateAge,
    calculateDisplayAge,
    getBirthdateAge,
    ageInMonths,
    getAgeInFloatYears,
    todayDateFormatted,
    calculateTimeDifference,
    getCurrentDateTimeWithOffset,
};
