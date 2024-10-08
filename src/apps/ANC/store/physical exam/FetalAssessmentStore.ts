import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
import * as yup from "yup";

export const FetalAssessmentValidation=yup.object().shape({
    'Number of fetuses':yup.number()
        .required()
        .typeError("Value can only be a number")
        .min(0,)
        .max(5),
    'Symphysis-fundal height':yup.number()
        .typeError("SFH can only be a number")
        .min(0)
        .max(5000)
        .required()
        .label("Symphysis-fundal height")
})

export const FetusDetailsValidationSchema=yup.object().shape({
    'Fetal heart rate'    :yup.number()
        .required()
        .typeError("Value can only be a number")
        .min(0)
        .max(200)
        .label("Fetal heart rate"),
    'Repeated fetal rate'    :yup.number()
        .required()
        .typeError("Value can only be a number")
        .min(0)
        .max(200)
        .label("Repeated fetal rate")
    }
)

const initialFetalAssesment=[
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        isFinishBtn: false,
        sectionHeader: "",

        header: {
            name: "Symphysis-fundal height",
            selectedValue: "",
        },

        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Symphysis-fundal height (SFH)*",
                            unit: "cm",
                            icon: icons.height,
                            value: "",
                            name: "Symphysis-fundal height",
                            valueType: "number",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },

    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Is number of fetuses known?",
                selectedValue: "",
                name: "Number of fetuses known",
                class:"bold",
                displayNext:"Yes"
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name: "No",
                    colSize: "2",
                },
            ],
        },
    },

    {
        childName:"Number of fetuses known",
        sectionHeader: "",
        classDash: "dashed_bottom_border",
        header: {
            selectedValue: "",
        },
        data: {
            rowData: [
                {
                    colData: [
                        {
                            class:"bold",
                            displayNone:true,
                            inputHeader: "Number of fetuses",
                            unit: "",
                            icon: "",
                            value: "",
                            name: "Number of fetuses",
                            valueType: "number",
                            eventType: "input",
                        },
                    ],
                },
            ],
        },
    },

] as any;
const initialFetalDetails=[
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Fetal heartbeat present?",
                selectedValue: "",
                name: "Fetal heartbeat",
                class:"bold",
                displayNext:"Yes"

            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name: "No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        childName:"Fetal heartbeat",
        sectionHeader: "",
        classDash: "dashed_bottom_border",
        header: {
            selectedValue: "",
        },
        data: {
            rowData: [
                {
                    colData: [
                        {
                            class:"bold",
                            displayNone:true,
                            inputHeader: "Fetal rate",
                            unit: "BMP",
                            icon: icons.systolicPressure,
                            value: "",
                            name: "Fetal heart rate",
                            valueType: "number",
                            eventType: "input",
                        },
                    ],
                },
            ],
        },
    },
    {
        childName:"Fetal heartbeat",
        sectionHeader: "",
        classDash: "dashed_bottom_border",
        header: {
            selectedValue: "",
        },
        data: {
            rowData: [
                {
                    colData: [
                        {
                            class:"bold",
                            displayNone: true,
                            inputHeader: "Repeated fetal rate",
                            unit: "BMP",
                            icon: icons.systolicPressure,
                            value: "",
                            name: "Repeated fetal rate",
                            valueType: "number",
                            eventType: "input",
                        },
                    ],
                },
            ],
        },
    },
    {
        childName:"Fetal heartbeat",
        selectdData: [],
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Fetal heart rate regularity ",
                selectedValue: "",
                name: "Fetal heart rate regularity",
                class:"bold",
                displayNone:true
            },
            data: [
                {
                    value: "Regular",
                    name: "Regular",
                    colSize: "7",
                },
                {
                    value: "Irregular",
                    name: "Irregular",
                    colSize: "7",
                },
            ],
        },
    },
        {
            selectdData: [],
            classDash: 'dashed_bottom_border',
            radioBtnContent:
                {
                    header:{
                        title: 'Select fetal presentation',
                        selectedValue: '',
                        name:'Fetal presentation',
                        class:"bold",
                        displayNext:"Other"
                    },
                    data:[
                        {
                            value: 'Unknown presentation',
                            name: 'Unknown',
                            colSize: '3',

                        },
                        {
                            value: 'Cephalic',
                            name: 'Cephalic',
                            colSize: '9',

                        },
                        {
                            value: 'Pelvic',
                            name: 'Pelvic',
                            colSize: '3',

                        },
                        {
                            value: 'Transverse',
                            name: 'Transverse',
                            colSize: '9',

                        },
                        {
                            value: 'Breech',
                            name: 'Breech',
                            colSize: '3',

                        },
                        {
                            value: 'Other',
                            name: 'Other',
                            colSize: '9',

                        },
                    ]
                }


        },

        {
            childName:"Fetal presentation",
            isFinishBtn: false,
            sectionHeader: '',
            classDash: '',

            header:{
                title: '',
                selectedValue: '',

            },

            data:
                {
                    rowData:[
                        {
                            colData: [
                                {   displayNone:true,
                                    inputHeader: 'specify the Fetal presentation',
                                    unit: '',
                                    icon: icons.editPen,
                                    value: '',
                                    name: 'Other (specify)',
                                    required: true,
                                    eventType: 'input',
                                    inputWidth: "100%",

                                },

                            ]
                        }
                    ]
                },
        },

] as any

export const useFetalAssessment = defineStore("fetalAssessment", {
    state: () => ({
        fetalAssessment: [...initialFetalAssesment] as any,
        fetalDetails:[..._.cloneDeep(initialFetalDetails)] as any,
    }),
    actions: {
        setFetalAssessment(data: any) {
            this.fetalAssessment = data;
        },
        setFetalDetails(details = initialFetalDetails) {
            this.fetalDetails = [..._.cloneDeep(details)]
        },
        getInitialFetalAssesment(){
            const data= _.cloneDeep(initialFetalAssesment);
            return[...data]
        },
        getInitialFetalDetails(){
            const data= _.cloneDeep(initialFetalDetails);
            return[...data]
        }
    },
    // persist: true,
});
