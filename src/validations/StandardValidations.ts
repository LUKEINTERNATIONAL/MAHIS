import { isEmpty, isPlainObject, isArray } from "lodash";
import { getBaseURl } from "@/utils/GeneralUti";

function validateSeries(conditions: Array<any>) {
    try {
        for (const i in conditions) {
            const condition = conditions[i]();

            if (condition) return condition;
        }
    } catch (e) {
        return [e];
    }
}

type FieldValue = "string" | "number" | "boolean" | "object" | "array";

function required(value: FieldValue): null | String {
    return isEmpty(value) ? "Value is required" : null;
}

function isEstimationDate(value: any): null | String {
    if (value && (value as number) > 300) {
        return "Age estimate is too high and exceeding hard limit of 300";
    }
    if (isNaN(parseInt(value.toString()))) {
        return "Please enter a valid number";
    }
    const ageEstimateRegex = /^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;
    if (!value.toString().match(ageEstimateRegex)) {
        return "Not a valid age estimate";
    }
    return null;
}

function isFloatingPointNumber(val: any): null | string[] {
    return isPlainObject(val) && !/^[-+]?[0-9]*\.?[0-9]+$/.test(`${val?.value}`) ? ["Not a valid number"] : null;
}

function isMWPhoneNumber(val: any) {
    //Regex source: https://gist.github.com/kwalter94/1861f1f0fa192382a75a445ad70f07ec
    if(val.includes("+265")){
        val = val.replace(/\s+/g, '')
        const validation = /^(\+?265|0)(((8[89]|9[89])\d{7})|(1\d{6})|(2\d{8})|(31\d{8}))$/;
       return !isEmpty(val) && !val.match(validation) ? "Not a valid phone number" : null;
    }else{
        return null;
    }
    
}

function isMWNationalID(nationalId: any): null | string {
    const nationalIDRegex = /^(?=[a-zA-Z0-9]*$)(?=\d+[a-zA-Z]|[a-zA-Z]+\d)([a-zA-Z\d]){8}$/;
    return !isEmpty(nationalId) && !nationalId.toString().match(nationalIDRegex) ? "Not a valid Malawi National ID number" : null;
}

function isIPAddress(val: any) {
    const validation = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/;
    return !val || !val.value.match(validation) ? ["Not a valid IP address"] : null;
}
function isNames(value: any): null | string {
    const validation = /^(?=.{2,100}$)[a-zA-Z!]+(?:['_.\-! ][a-zA-Z]+)*$/;
    return !value || !value.match(validation) ? "Invalid name Input" : null;
}
function isName(value: any): null | string {
    const validation = /^(?=.{2,100}$)[a-z!A-Z]+(?:['_.\-!\][a-z]+[a-z!A-Z])*$/;
    return !value || !value.match(validation) ? "Invalid name Input" : null;
}
function isNameWithSlush(value: any): null | string {
    const validation = /^(?=.{2,100}$)[a-zA-Z]+(?:['_.\-\/ ][a-zA-Z]+)*$/;
    return !value || !value.match(validation) ? "Invalid name Input" : null;
}
function isNameEmpty(value: any): null | string {
    const validation = /^(?=.{2,100}$)[a-z!A-Z]+(?:['_.\-!\][a-z]+[a-z!A-Z])*$/;
    return !isEmpty(value) && !value.match(validation) ? "Invalid name Input" : null;
}
function isNamesEmpty(value: any): null | string {
    const validation = /^(?=.{2,100}$)[a-zA-Z!]+(?:['_.\-! ][a-zA-Z]+)*$/;
    return !isEmpty(value) && !value.match(validation) ? "Invalid name Input" : null;
}

function isNumber(val: any) {
    return isNaN(val) ? "Value must be a number" : null;
}
function isWholeNumber(val: any): null | string {
    // Regular expression to match only whole numbers
    const numberRegex = /^[0-9]+$/;

    if (!val || !val.match(numberRegex)) {
        return "Value must be a whole number";
    }

    return null;
}

function hasLengthRangeOf(val: any, min: number, max: number): null | Array<string> {
    const len = val ? val.label.length : 0;
    return len >= min && len <= max ? null : [`Value length not within range of ${min} - ${max}`];
}

function rangeOf(val: any, min: number, max: number): null | Array<string> {
    const value = parseInt(val.label);
    return value >= min && value <= max ? null : [`${value} not within range of ${min} - ${max}`];
}
function neitherOr(val: any): null | Array<string> {
    const allNo = val.filter((arr: any) => {
        const val = arr.value || arr.other.value;
        return val === "No";
    });
    if (allNo.length == val.length) {
        return ["All values can not be no"];
    }
    return null;
}
function anyEmpty(val: any): null | Array<string> {
    const error = ["all must be selected"];

    if (!val) return error;

    const allNo = val.filter((i: any) => i.value === "");
    return allNo.length > 0 ? error : null;
}
function notTheSame(val: any, comparison: string): null | Array<string> {
    return val === comparison ? ["Values can not be the same"] : null;
}
function checkMinMax(val: any, min: number, max: number) {
    let errorMessage = "";
    const parsedValue = parseFloat(val);

    if (parsedValue < min) {
        errorMessage = `Value entered (${val}) is less than the minimum value (${min}).`;
    } else if (parsedValue > max) {
        errorMessage = `Value entered (${val}) is greater than the maximum value (${max}).`;
    }

    return errorMessage ? errorMessage : null;
}
function isDate(value: any): null | string {
    const dateRegex = /^(0[1-9]|[12]\d|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec), \d{4}$/;

    if (!value || !value.match(dateRegex)) {
        return "Date must be in the format like '12 May, 2024'";
    }

    return null;
}
function isNotEmptyandNumber(value: any) {
    return `${value}`.match(/^-?\d+\.?\d*$/) ? null : `Invalid entry`;
}
function validateWeight(val: any) {
    return isNotEmptyandNumber(val) || checkMinMax(val, 0.5, 250.0);
}
function validateHeight(val: any) {
    return isNotEmptyandNumber(val) || checkMinMax(val, 40, 220);
}
function validateRBS(val: any) {
    return isNotEmptyandNumber(val) || checkMinMax(val, 70, 200);
}
function validateFBS(val: any) {
    return isNotEmptyandNumber(val) || checkMinMax(val, 70, 126);
}

async function validateMobilePhone(val: any, countryData: any) {
    try {
        let baseURL = getBaseURl();
        if (baseURL.length > 0) {
            baseURL = '/' + baseURL;
        }
        const response = await fetch(`${baseURL}/countryphones.json`)
        const data = await response.json();
        const country = data.countries.find((c: { iso2: string }) => c.iso2 === countryData.iso2);
        
        if (!country) {
            return "Country not found";
        }

        const sampleNumber = country.examplePhoneNumber;
        let result = !isEmpty(val) && (val.replace(/\s+/g, '').length !== sampleNumber.replace(/\s+/g, '').length) ? "Not a valid phone number" : null;
        if (result == null){ result = formatToExample(val, sampleNumber); }
        return result
    } catch (error) {
        return `Error fetching or processing data: ${error}`;
    }
}

function formatToExample(value: string, exampleNumber: string): string {
    const digits = value.replace(/\s+/g, '');
    let digitIndex = 0;

    return exampleNumber.split('').map(char => {
        if (char === ' ') return ' ';
        return digitIndex < digits.length ? digits[digitIndex++] : '';
    }).join('');
}


export default {
    validateRBS,
    validateFBS,
    validateHeight,
    validateWeight,
    isFloatingPointNumber,
    validateSeries,
    required,
    isMWPhoneNumber,
    isName,
    isNames,
    isNameEmpty,
    isNamesEmpty,
    isNumber,
    hasLengthRangeOf,
    rangeOf,
    neitherOr,
    anyEmpty,
    notTheSame,
    isIPAddress,
    isWholeNumber,
    isMWNationalID,
    isEstimationDate,
    checkMinMax,
    isDate,
    isNameWithSlush,
    validateMobilePhone
} as any;