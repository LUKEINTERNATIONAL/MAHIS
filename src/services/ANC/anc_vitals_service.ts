import { isArray } from "lodash";
import { AppEncounterService } from "@/services/app_encounter_service";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
export class VitalsService extends AppEncounterService{
  private appEncounterServiceInstance: AppEncounterService;
  constructor(patientID: number, providerID: number) {
    super(patientID, 6, providerID);
    this.appEncounterServiceInstance = this;
  }

  async mapObs(vitals: any) {
      const labelsAndValues: any[] = [];
      // Process other vitals using Promise.all
      const promises = await Promise.all(
          vitals.flatMap((section: any) =>
            section.data.rowData.flat().map(async (item: any) => {
              item.colData.flat().map(async (item: any) => {
                if(item.value){
                  const obs = await this.appEncounterServiceInstance.buildValueNumber(item.name, item.value);
                  labelsAndValues.push(obs);
                }
              })
            })
          )
      );

      // Process BMI
      const bmi: any = String(vitals[0].alerts[0].index)
      if (bmi) {
          const bmiObs = await this.appEncounterServiceInstance.buildValueNumber('BMI',bmi);
          labelsAndValues.push(bmiObs);
      }
      return labelsAndValues;
  }
  async onFinish(vitals: any) {
    const encounter = await this.appEncounterServiceInstance.createEncounter();

    if (!encounter) return toastWarning("Unable to create treatment encounter");

    const obs: any = await this.mapObs(vitals);
    const observations = await this.appEncounterServiceInstance.saveObservationList(obs);

    if (!observations) return toastWarning("Unable to save patient observations");

    toastSuccess("Observations and encounter created!");

    // this.nextTask();
  }
  isNotEmptyandNumber(vital: any) {
    return `${vital.value}`.match(/^-?\d+\.?\d*$/) ? null : [`${vital.inputHeader} entered is not valid`]
  }
  isNotEmptyandFloat(vital: any) {
    return `${vital.value}`.match(/^\d{1,3}\.\d{1,5}$/) 
      ? null 
      : [`${vital.inputHeader} is an invalid entry. ${vital.inputHeader} should have a decimal e.g 61.3 ${vital.unit}`]
  }
  checkMinMax(val: any, min: number, max: number) {
    const p = [];
    if (parseFloat(`${val.value}`) < min) {
      p.push([`${val.inputHeader} captured is less than the required minimum ${min} ${val?.unit || ''}`])
    }
    if (parseFloat(`${val.value}`) > max) {
      p.push([`${val.inputHeader} captured is greater than the required maximum ${max} ${val?.unit || ''}`])
    }
    return p.length > 0 ? p : null;
  }
  validateAll(vitals: any[]) {
    const p: any = [];
    vitals.map((vital: any) => {
      const j = this.validator(vital);
      return isArray(j) ? p.push(j) : null
    })
    return p.length > 0 ? p : null;
  }

  mergeErrors(errors: any[]) {
    const holder: any = [];
    errors.forEach(element => {
      if (isArray(element)) {
        holder.push(element)
      }
    });
    return holder.length > 0 ? holder : null
  }
  isValidBPReading(vital: any) {
    const p = [];
    const isValidBP =  `${vital.value}`.match(/^\d{1,3}\/\d{1,3}$/g) ? null : ['Invalid BP reading']
    p.push(isValidBP);
    if(isValidBP == null) {
      const value = `${vital.value}`.split('/');
      
      const bpSystolic = {
        name: 'Systolic',
        value: value[0]
      };
      const bpDiastolic = {
        name: 'Diastolic',
        value: value[1]
      };
      p.push(this.checkMinMax(bpDiastolic, 30, 200))
      p.push(this.checkMinMax(bpSystolic, 40, 250))
    }
    return this.mergeErrors(p)
  }
  validator(vital: any) {
    const values = [
      {
        name: "Weight*",
        validator: (val: any) => {
          const emptyErrors = this.isNotEmptyandFloat(val);
          const minErrors = this.checkMinMax(val, 40.0, 250.0);
          return this.mergeErrors([emptyErrors, minErrors]); 
        },
      },
      {
        name: "Pre-gestation weight",
        validator: (val: any) => {
          const emptyErrors = this.isNotEmptyandFloat(val);
          const minErrors = this.checkMinMax(val, 40.0, 250.0);
          return this.mergeErrors([emptyErrors, minErrors]);
        },
      },
      {
        name: "Height*",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          errors.push(this.checkMinMax(val, 100, 200))
          return this.mergeErrors(errors); 
        },
      },

      {
        name: "BP",
        validator: (val: any) => {
          return this.isValidBPReading(val)
        },
      }, {
        name: "Temperature",
        validator: (val: any) => {
          const minErrors = this.checkMinMax(val, 30, 42);
          return this.mergeErrors([minErrors]); 
        },
      }, {
        name: "Systolic Pressure*",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          errors.push(this.checkMinMax(val, 110, 140));
          return this.mergeErrors(errors); 
        },

      },
      {
        name: "Repeated systolic pressure",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          errors.push(this.checkMinMax(val, 110, 140));
          return this.mergeErrors(errors);
        }
        },
      {
        name: "Diastolic pressure*",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          errors.push(this.checkMinMax(val, 60, 90));
          return this.mergeErrors(errors); 
        },
      },
      {
        name: "Repeated diastolic pressure",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          errors.push(this.checkMinMax(val, 110, 140));
          return this.mergeErrors(errors);
        }
      },
      {
        name: "Pulse rate*",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          const minErrors = this.checkMinMax(val, 60, 120);
          return this.mergeErrors([minErrors]); 
        },
      },
      {
        name: "Oxygen saturation",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          const minErrors = this.checkMinMax(val, 60, 120);
          return this.mergeErrors([minErrors]);
        },
      },
      {
        name: "Respiratory rate",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          const minErrors = this.checkMinMax(val, 60, 120);
          return this.mergeErrors([minErrors]);
        },
      }
    ]
    const v = values.filter(element => {
      return element.name === vital.inputHeader;
    });
    if (v.length > 0) {
      return v[0].validator(vital);
    }
    return null
  }
}