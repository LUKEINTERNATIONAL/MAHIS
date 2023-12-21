import { AppEncounterService } from "@/services/app_encounter_service";
import { isArray } from "lodash";
export class VitalsService {

  isNotEmptyandNumber(vital: any) {
    return `${vital.value}`.match(/^-?\d+\.?\d*$/) ? null : [`Invalid entry for ${vital.inputHeader}`]
  }
  isNotEmptyandFloat(vital: any) {
    return `${vital.value}`.match(/^\d{1,3}\.\d{1,5}$/) 
      ? null 
      : [`Invalid entry for ${vital.inputHeader}. Don't forget to add a decimal. e.g. 56.2 ${vital.unit}`]
  }
  checkMinMax(val: any, min: number, max: number) {
    const p = [];
    if (parseFloat(`${val.value}`) < min) {
      p.push([`${val.inputHeader} entered is less than minimum ${min} ${val?.unit || ''}`])
    }
    if (parseFloat(`${val.value}`) > max) {
      p.push([`${val.inputHeader} entered is greater than maximum ${max} ${val?.unit || ''}`])
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
          const minErrors = this.checkMinMax(val, 2.0, 250.0);
          return this.mergeErrors([emptyErrors, minErrors]); 
        },
      },
      {
        name: "Height*",
        validator: (val: any) => {
          const errors = []
          errors.push(this.isNotEmptyandNumber(val))
          errors.push(this.checkMinMax(val, 40, 220))
          return this.mergeErrors(errors); 
        },
      }, {
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
          errors.push(this.checkMinMax(val, 40, 100));
          return this.mergeErrors(errors); 
        },
      }, {
        name: "Pulse rate",
        validator: (val: any) => {
          const minErrors = this.checkMinMax(val, 50, 120);
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