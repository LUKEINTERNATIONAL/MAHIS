import { defineStore } from "pinia";
import { icons } from '@/utils/svg';
import _ from "lodash";
import * as yup from "yup";
import {extractArrayOfNameValue, validateStore} from "@/services/data_helpers";
import {ReferralValidationSchema} from "@/apps/ANC/store/referral/referralStore";

export const ANCEndValidationSchema = yup.object().shape({
    'ANC pregnancy outcome': yup.string()
        .required("ANC pregnancy outcome is required")
        .label("ANC pregnancy outcome"),

    'Weight': yup.number()
        .typeError("Value should be a number")
        .min(0, "Weight cannot be less than 0.")
        .max(6000, "Weight cannot exceed 6000.")
        .label("Weight"),
        // .when('ANC pregnancy outcome', {
        //     is:(outcome: string) => outcome === "Live birth",
        //     then: yup.number().required("Weight is required when ANC pregnancy outcome is Live birth."),
        //     otherwise: yup.number().notRequired(),
        // }),

    'Place of Delivery': yup.string()
        .required("Place of Delivery is required when ANC pregnancy outcome is Live birth.")
        .label("Place of Delivery"),
        // .when('ANC pregnancy outcome', {
        //     is: "Live birth",
        //     then: yup.string().required("Place of Delivery is required when ANC pregnancy outcome is Live birth."),
        //     otherwise: yup.string().notRequired(),
        // }),

    'Preterm birth': yup.string(),
        // .when('ANC pregnancy outcome', {
        //     is: "Live birth",
        //     then: yup.string().required("Preterm birth is required when ANC pregnancy outcome is Live birth."),
        //     otherwise: yup.string().notRequired(),
        // }),

    'Mode of delivery': yup.string(),
        // .when('ANC pregnancy outcome', {
        //     is: "Live birth",
        //     then: yup.string().required("Mode of delivery is required when ANC pregnancy outcome is Live birth."),
        //     otherwise: yup.string().notRequired(),
        // }),

    'Cause of death': yup.string(),
        // .when('ANC pregnancy outcome', {
        //     is: "Death",
        //     then: yup.string().required("Cause of death is required when ANC pregnancy outcome is Death."),
        //     otherwise: yup.string().notRequired(),
        // }),
});


const initialANCend=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'What is the outcome of the pregnancy? *',
                selectedValue: '',
                name:'ANC pregnancy outcome',
                class:'bold',
                displayNext:"Live birth"
            },
            data:[
                {
                    name: "In labour",
                    value: "In labour",
                    colSize: "4",
                },
                {
                    name: "Live birth",
                    value: "Live birth",
                    colSize: "4",
                },
                {
                    name: "Stillbirth",
                    value: "Stillbirth",
                    colSize: "4.01",
                },
                {
                    name: "Pregnancy, miscarriage",
                    value:"Pregnancy, miscarriage",
                    colSize: "4.01",
                },
                {
                    name: "Abortion",
                    value: "Abortion",
                    colSize: "4.01",
                },
                {
                    name: "Death",
                    value: "Death",
                    colSize: "4.01",
                },
                {
                    name: "Lost to follow up",
                    value: "Lost to follow up",
                    colSize: "4.01",
                },
                {
                    name:  "Moved away",
                    value: "Moved away",
                    colSize: "4.01",
                },
                {
                    name:  "Other outcome",
                    value: "Other outcome",
                    colSize: "4.01",
                },

            ]
        }
    },

    {
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Specify',
                            icon: icons.editPen,
                            value: "",
                            name: "Pregnancy outcome notes",
                            inputType:"text",
                            eventType: 'input',
                            valueType:'text',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    {
        classDash: 'dashed_bottom_border',
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Date of death *',
                            icon: icons.calenderPrimary,
                            name: "Date of death",
                            eventType: 'input',
                            minDate:"",
                            maxDate:"",
                            valueType:"text",
                            inputWidth: "82%",
                            isDatePopover:true,
                            placeholder:"Pick date",
                            required: true
                        },

                    ]
                }
            ],

        }

    },
    {
        classDash: 'dashed_bottom_border',
        data:{
            rowData:[
                {
                    colData:[
                        {

                            displayNone:true,
                            inputHeader: 'Cause of Death *',
                            icon: icons.editPen,
                            name: 'Cause of death',
                            valueType:"text",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    {
        childName:"ANC pregnancy outcome",
        classDash: 'dashed_bottom_border',
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Estimated date of delivery *',
                            icon: icons.calenderPrimary,
                            value: "",
                            name: "Estimated date of delivery",
                            eventType: 'input',
                            inputWidth: "82%",
                            inputType:"text",
                            valueType:"text",
                            placeholder:"Pick date",
                            required: true,
                            isDatePopover: true
                        },

                    ]
                }
            ],

        }

    },
    {
        childName:"ANC pregnancy outcome",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Place of delivery *',
                selectedValue: '',
                name:'Place of Delivery',
                displayNone:true,
                class:"bold",
                displayNext:"Other"
            },
            data:[
                {
                    name: "Home",
                    value: "Home or TBA",
                    colSize: "6.01",
                },
                {
                    name: "Health-care facility",
                    value: "Health-care facility",
                    colSize: "6.01",
                },
                {
                    name:  "Other",
                    value: "Other",
                    colSize: "6.01",
                },
            ]
        }
    },
    { childName:"Place of Delivery",
        classDash: 'dashed_bottom_border',
        data:{
                rowData:[
                    {
                        colData:[
                            {
                                displayNone:true,
                                inputHeader: 'specify',
                                icon: icons.editPen,
                                value: "",
                                name: "Other (specify)",
                                valueType: "text",
                                eventType: 'input',
                                inputWidth: "82%",
                                required: true
                            }

                        ]
                    }
                ],

            }

        },

    {
        childName:"ANC pregnancy outcome",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',

        radioBtnContent:{
            header:{
                title: 'Preterm birth *',
                class:"bold",
                selectedValue: '',
                name:'Preterm birth',
                displayNone:true,
            },
            data:[
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2",
                },
                {
                    name:  "No",
                    value: "No",
                    colSize: "2",
                },
            ]
        }
    },
    {
        childName:"ANC pregnancy outcome",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',

        radioBtnContent:{
            header:{
                title: 'Mode of delivery *',
                selectedValue: '',
                name:'Mode of delivery',
                class:"bold",
                displayNone:true,
            },
            data:[
                {
                    name: "Normal",
                    value: "Normal",
                    colSize: "3.01",
                },
                {
                    name: "Forceps",
                    value: "Forceps",
                    colSize: "6.01",
                },
                {
                    name: "Vacuum",
                    value: "Vacuum",
                    colSize: "3.01",
                },
                {
                    name: "Caesarean section",
                    value: "Caesarean section",
                    colSize: "6.01",
                },
            ]
        }
    },
    {
        classDash: 'dashed_bottom_border',
        childName:"ANC pregnancy outcome",
        data:{
            rowData:[
                {
                    colData:[
                        {   displayNone:true,
                            inputHeader: 'Birth weight *',
                            icon: icons.weight,
                            value: "",
                            name: "Weight",
                            eventType: 'input',
                            valueType:"number",
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
] as any
export const useAncEndStore = defineStore('ancEndStore',{
    state: () =>({
        ancInfo:[...initialANCend]as any,
    }),
        actions:{
        addAncInfo(data:any){
            this.ancInfo = data
        },
           getInitialANCend(){
               const data = _.cloneDeep(initialANCend);
               return [...data]; // Return a copy of the initial state
           },
            async validate(){
                const ancInfo=extractArrayOfNameValue(this.ancInfo);
                const ancEndValid= await validateStore(this.ancInfo, ANCEndValidationSchema,ancInfo);
                return ancEndValid;
            }
    },
    // persist:true
})

