import { isEmpty, isPlainObject } from "lodash";

function required(value: any): boolean {
    return value !== null && value !== undefined && value !== "";
}

function isNumber(val: any): boolean {
    return !isNaN(parseFloat(val)) && isFinite(val);
}

function checkMinMax(val: any, min: number, max: number): boolean {
    return parseFloat(val) >= min && parseFloat(val) <= max;
}

export default {
    isNumber,
    checkMinMax,
};
