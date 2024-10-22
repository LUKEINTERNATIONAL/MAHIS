import { getBaseURL } from "@/utils/GeneralUti";
export interface Bmi {
    M: { [key: string]: { [key: string]: string } };
    F: { [key: string]: { [key: string]: string } };
    colors: { [key: string]: string };
}

function removeQuotes(str: string | undefined) {
    if (typeof str !== "string") {
        return "";
    }
    if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
        return str.substring(1, str.length - 1);
    }
    return str;
}
export class BMIService {
    static async getBMIData(): Promise<Bmi> {
        let baseURL = getBaseURL();
        if (baseURL.length > 0) {
            baseURL = "/" + baseURL;
        }
        const req = await fetch(`${baseURL}/bmi.json`);
        return req.json();
    }
    static async getBMIResult(gender: "M" | "F", age: number, bmindex: number) {
        let BMIResult = {
            result: "",
            color: "",
            index: bmindex,
        };
        if (bmindex <= 0) {
            BMIResult.index = 0;
            return BMIResult;
        }
        if (age < 5 && age > 0) {
            BMIResult.result = "Use MUAC to calculate nutrition status";
            BMIResult.color = "red";
        } else {
            if (age > 18) {
                age = 19;
            }
            const result = await this.getBMIData();
            const dataset = result[gender][age];
            if (dataset) {
                BMIResult = this.buildBounds(Object.keys(dataset), dataset, bmindex, result.colors);
            }
        }
        return BMIResult;
    }

    static buildBounds(bounds: any, dataset: any, bmindex: any, results: any) {
        const BMIResult = {
            result: "",
            color: "",
            index: bmindex,
        };
        bounds.forEach((bound: any) => {
            if (bound.indexOf("-") >= 0) {
                const boundsArray = bound.split("-");
                if (bmindex >= parseFloat(boundsArray[0]) && bmindex <= parseFloat(boundsArray[1])) {
                    BMIResult.result = dataset[bound];
                    BMIResult.color = results[dataset[bound]];
                }
            } else if (bound.indexOf("<") >= 0) {
                const lessThanBounds = bound.replace("<", "");
                if (bmindex < parseFloat(lessThanBounds)) {
                    BMIResult.result = dataset[bound];
                    BMIResult.color = results[dataset[bound]];
                }
            } else if (bound.indexOf(">=") >= 0) {
                const greaterThanBounds = bound.replace(">=", "");
                if (bmindex >= parseFloat(greaterThanBounds)) {
                    BMIResult.result = dataset[bound];
                    BMIResult.color = results[dataset[bound]];
                }
            }
        });

        return BMIResult;
    }
    static getBMI(weight: number, height: number, gender: "M" | "F", age: number) {
        const bmindex = this.calculateBMI(weight, height);
        return this.getBMIResult(gender, age, bmindex);
    }
    static calculateBMI(weight: number, height: number) {
        if (height == 0 || weight == 0) {
            return 0;
        }
        let bmindex = (weight / height / height) * 10000;
        return (bmindex = Math.round(bmindex * 10) / 10);
    }

    static iconBMI(color: any) {
        return color
            ? `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="8" fill="${color[2]}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.41222 6.57922C8.52428 5.46716 10.1884 5.04199 12.3333 5.04199H15.6667C17.8116 5.04199 19.4757 5.46716 20.5878 6.57922C21.6998 7.69127 22.125 9.35535 22.125 11.5003V16.5003C22.125 18.6453 21.6998 20.3094 20.5878 21.4214C19.4757 22.5335 17.8116 22.9587 15.6667 22.9587H12.3333C10.1884 22.9587 8.52428 22.5335 7.41222 21.4214C6.30017 20.3094 5.875 18.6453 5.875 16.5003V11.5003C5.875 9.35535 6.30017 7.69127 7.41222 6.57922ZM8.29611 7.4631C7.53317 8.22604 7.125 9.47864 7.125 11.5003V16.5003C7.125 18.522 7.53317 19.7746 8.29611 20.5375C9.05905 21.3005 10.3116 21.7087 12.3333 21.7087H15.6667C17.6884 21.7087 18.9409 21.3005 19.7039 20.5375C20.4668 19.7746 20.875 18.522 20.875 16.5003V11.5003C20.875 9.47864 20.4668 8.22604 19.7039 7.4631C18.9409 6.70016 17.6884 6.29199 15.6667 6.29199H12.3333C10.3116 6.29199 9.05905 6.70016 8.29611 7.4631Z" fill="${color[1]}"/>
        <path d="M10.5703 11.5326C10.4322 11.2935 10.5142 10.9877 10.7533 10.8496C10.9925 10.7115 11.2983 10.7935 11.4363 11.0326L14.4363 16.2288C14.5744 16.4679 14.4925 16.7737 14.2533 16.9118C14.0142 17.0499 13.7084 16.9679 13.5703 16.7288L10.5703 11.5326Z" fill="${color[1]}"/>
    </svg>
    `
            : "";
    }
}
