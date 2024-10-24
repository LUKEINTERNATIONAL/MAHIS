import { isArray } from "lodash";
import { AppEncounterService } from "@/services/app_encounter_service";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
export class VitalsService extends AppEncounterService {
    private appEncounterServiceInstance: AppEncounterService;
    constructor(patientID: number, providerID: number) {
        super(patientID, 6, providerID);
        this.appEncounterServiceInstance = this;
    }

    async mapObs(vitals: any) {
        const labelsAndValues: any[] = [];

        // Process other vitals using Promise.all
        const promises = vitals.flatMap((section: any) =>
            section?.data?.rowData.flat().map((item: any) =>
                item.colData.flat().map(async (colItem: any) => {
                    if (colItem.value && !colItem.disabled) {
                        const obs = await this.appEncounterServiceInstance.buildValueNumber(colItem.name, parseInt(colItem.value));
                        labelsAndValues.push(obs);
                    }
                })
            )
        );

        // Await all promises
        await Promise.all(promises.flat());

        // Process BMI
        if (!getFieldValue(vitals, "Weight", "disabled")) {
            const bmi: any = String(vitals[0].alerts[0].index);
            if (bmi) {
                const bmiObs = await this.appEncounterServiceInstance.buildValueNumber("BMI", bmi);
                labelsAndValues.push(bmiObs);
            }
        }

        return labelsAndValues;
    }

    async onFinish(vitals: any) {
        const obs: any = await this.mapObs(vitals);
        if (obs.length > 0) {
            const encounter = await this.appEncounterServiceInstance.createEncounter();

            if (!encounter) return toastWarning("Unable to create treatment encounter");

            const observations = await this.appEncounterServiceInstance.saveObservationList(obs);

            if (!observations) return toastWarning("Unable to save patient observations");

            toastSuccess("Observations and encounter created!");
        }

        // this.nextTask();
    }
    isNotEmptyandNumber(vital: any) {
        return `${vital.value}`.match(/^-?\d+\.?\d*$/) ? null : [`Invalid entry for ${vital.inputHeader}`];
    }
    isNotEmptyandFloat(vital: any) {
        return `${vital.value}`.match(/^\d{1,3}\.\d{1,5}$/)
            ? null
            : [`Invalid entry for ${vital.inputHeader}. Don't forget to add a decimal. e.g. 56.2 ${vital.unit}`];
    }
    checkMinMax(val: any, min: number, max: number) {
        const p = [];
        if (parseFloat(`${val.value}`) < min) {
            p.push([`${val.inputHeader} entered is less than minimum ${min} ${val?.unit || ""}`]);
        }
        if (parseFloat(`${val.value}`) > max) {
            p.push([`${val.inputHeader} entered is greater than maximum ${max} ${val?.unit || ""}`]);
        }
        return p.length > 0 ? p : null;
    }
    validateAll(vitals: any[]) {
        const p: any = [];
        vitals.map((vital: any) => {
            const j = this.validator(vital);
            return isArray(j) ? p.push(j) : null;
        });
        return p.length > 0 ? p : null;
    }

    mergeErrors(errors: any[]) {
        const holder: any = [];
        errors.forEach((element) => {
            if (isArray(element)) {
                holder.push(element);
            }
        });
        return holder.length > 0 ? holder : null;
    }
    isValidBPReading(vital: any) {
        const p = [];
        const isValidBP = `${vital.value}`.match(/^\d{1,3}\/\d{1,3}$/g) ? null : ["Invalid BP reading"];
        p.push(isValidBP);
        if (isValidBP == null) {
            const value = `${vital.value}`.split("/");

            const bpSystolic = {
                name: "Systolic",
                value: value[0],
            };
            const bpDiastolic = {
                name: "Diastolic",
                value: value[1],
            };
            p.push(this.checkMinMax(bpDiastolic, 30, 200));
            p.push(this.checkMinMax(bpSystolic, 40, 250));
        }
        return this.mergeErrors(p);
    }
    validator(vital: any) {
        const values = [
            {
                name: "Weight*",
                validator: (val: any) => {
                    const errors = [];
                    errors.push(this.isNotEmptyandNumber(val));
                    errors.push(this.checkMinMax(val, 0.5, 250.0));
                    return this.mergeErrors(errors);
                },
            },
            {
                name: "Height*",
                validator: (val: any) => {
                    const errors = [];
                    errors.push(this.isNotEmptyandNumber(val));
                    errors.push(this.checkMinMax(val, 40, 220));
                    return this.mergeErrors(errors);
                },
            },
            {
                name: "BP",
                validator: (val: any) => {
                    return this.isValidBPReading(val);
                },
            },
            {
                // name: "Temperature",
                // validator: (val: any) => {
                //     const minErrors = this.checkMinMax(val, 30, 42);
                //     return this.mergeErrors([minErrors]);
                // },

                name: "Temperature",
                validator: (val: any) => {
                    const errors = [];
                    errors.push(this.isNotEmptyandNumber(val));
                    errors.push(this.checkMinMax(val, 30, 42));
                    return this.mergeErrors(errors);
                },
            },
            {
                name: "Respiratory rate",
                validator: (val: any) => {
                    const minErrors = this.checkMinMax(val, 5, 80);
                    return this.mergeErrors([minErrors]);
                },
            },
            {
                name: "Respiratory rate*",
                validator: (val: any) => {
                    const errors = [];
                    errors.push(this.isNotEmptyandNumber(val));
                    errors.push(this.checkMinMax(val, 5, 80));
                    return this.mergeErrors(errors);
                },
            },
            {
                name: "Oxygen saturation",
                validator: (val: any) => {
                    const errors = [];
                    errors.push(this.isNotEmptyandNumber(val));
                    errors.push(this.checkMinMax(val, 40, 100));
                    return this.mergeErrors(errors);
                },
            },
            {
                name: "Systolic Pressure*",
                validator: (val: any) => {
                    const errors = [];
                    errors.push(this.isNotEmptyandNumber(val));
                    errors.push(this.checkMinMax(val, 20, 300));
                    return this.mergeErrors(errors);
                },
            },
            {
                name: "Diastolic pressure*",
                validator: (val: any) => {
                    const errors = [];
                    errors.push(this.isNotEmptyandNumber(val));
                    errors.push(this.checkMinMax(val, 20, 300));
                    return this.mergeErrors(errors);
                },
            },
            {
                name: "Pulse rate*",
                validator: (val: any) => {
                    const errors = [];
                    errors.push(this.isNotEmptyandNumber(val));
                    errors.push(this.checkMinMax(val, 20, 80));
                    return this.mergeErrors(errors);
                },
            },
        ];
        const v = values.filter((element) => {
            return element.name === vital.inputHeader;
        });
        if (v.length > 0) {
            return v[0].validator(vital);
        }
        return null;
    }
}