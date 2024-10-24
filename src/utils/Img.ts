import { getBaseURL } from "@/utils/GeneralUti";

export default function img(name: string) {
    let baseURL = getBaseURL();
    if (baseURL.length > 0) {
        baseURL = "/" + baseURL;
    }
    return `${baseURL}/images/${name}`;
}

function removeQuotes(str: string) {
    if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
        return str.substring(1, str.length - 1);
    }
    return str;
}
