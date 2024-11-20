import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";
import * as yup from "yup";
import {extractArrayOfNameValue, validateStore} from "@/services/data_helpers";
import {FetalAssessmentValidation} from "@/apps/ANC/store/physical exam/FetalAssessmentStore";

export const NextAppointmentValidationSchema = yup.object().shape({
    'Appointment date': yup.string()
        .required()
        .label("Appointment date"),
});
const initialScheduleNextAppointment =[

    {
        classDash: "dashed_bottom_border",
        sideColSize:0,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            class:'bold',
                            icon: icons.calenderPrimary,
                            value: "",
                            valueType:'text',
                            name: "Appointment date",
                            eventType: "input",
                            inputWidth: "100%",
                            required: true,
                            minDate:"",
                            maxDate:"",
                            isDatePopover:true
                        },
                    ],
                },
            ],
        },
    },
    ] as any;
export const useScheduleNextAppointmentStore = defineStore('scheduleNextAppointmentStore',{
    state: () => ({

        nextAppointmentDate: [...initialScheduleNextAppointment] as any
       
    }),
    actions:{
        setNextAppointmentDate(data: any){
            this.nextAppointmentDate = data
        },
        getInitialNextAppointmentDate(){
            const data = _.cloneDeep(initialScheduleNextAppointment);
            return [...data];
        },
        async validate(){
            const nextAppointmentDate=extractArrayOfNameValue(this.nextAppointmentDate);
            const nextAppointmentDateValid= await validateStore(this.nextAppointmentDate, NextAppointmentValidationSchema,nextAppointmentDate);
            return nextAppointmentDateValid;
        }
      
    },
     // persist:true,

})