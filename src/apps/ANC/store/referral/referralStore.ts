import { defineStore } from "pinia"
import { icons } from '@/utils/svg';
import _ from "lodash";
import * as yup from "yup";
export const ReferralValidationSchema = yup.object().shape({
    'Location of referral': yup.string()
        .required("Location of referral is required")
        .label("Location of referral"),

    // 'Referral for urgent care': yup.string()
    //     .required("Referral for urgent care is required")
    //     .label("Referral for urgent care")
    //     .test('is-checked', 'You must select an option for urgent care', function(value) {
    //         return value === 'Yes' || value === 'No';
    //     }),

    'Provider’s facility': yup.string()
        .required("Provider’s facility is required")
        .typeError("Invalid name")
        .label("Provider’s facility"),

    'Provider’s phone number': yup.string()
        .matches(/^(09|08)\d{8}$/, "Phone number must start with 09 or 08 and contain 10 digits")
        .typeError("Invalid phone number format")
        .label("Provider’s phone number"),
});



const initialReferral=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Referral for urgent care *',
                selectedValue: '',
                class:"bold",
                name:'Referral for urgent care',
                displayNext:"Yes",
            },
            data:[
                {
                    name: 'Yes',
                    value: 'Yes',
                    colSize: "2",
                },
                {
                    name: 'No',
                    value: 'No',
                    colSize: "2",
                },
            ]
        }
    },
    {
        childName:"Referral for urgent care",
        classDash: 'dashed_bottom_border',
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent:{
            header:{
                title: 'Reason for referral',
                selectedValue: '',
                displayNone: true,
                class:"bold",
                name:"Reason for referral",
            },
            data:[
                {
                    name: "Referral for screening including diagnostics",
                    value: "Referral for screening including diagnostics",
                    colSize: "7",
                },
                {
                    name: 'Referral for other general services',
                    value: 'Referral for other general services',
                    colSize: "7",
                },
            ]
        }
    },


    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Any treatment given before referral?',
                class:"bold",
                selectedValue: '',
                name:'Any treatment given before referral',
                displayNext:"Yes",
            },
            data:[
                {
                    name: 'Yes',
                    value: 'Yes',
                    colSize: "2",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2",
                },
            ]
        }
    },
    {
        childName:"Any treatment given before referral",
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
                            inputHeader: "Treatment provided on referral",
                            unit: "",
                            icon: "",
                            value: "",
                            name: "Treatment",
                            valueType: "text",
                            eventType: "input",
                        },
                    ],
                },
            ],
        },
    },



    {
        classDash: 'dashed_bottom_border',
        header:{
            title: 'Date and time for scheduled referral',
            selectedValue: ''
        },
        data:{
            rowData:[
                {
                    colData:[
                        {
                            class:"bold",
                            inputHeader: 'Date scheduled referral *',
                            icon: icons.calenderPrimary,
                            name: "Date scheduled referral",
                            value: "",
                            eventType: 'input',
                            valueType: 'text',
                            minDate:"",
                            maxDate:"",
                            required: true,
                            placeholder:'Pick date',
                            isDatePopover: true
                        },
                        {
                            class:"bold",

                            inputHeader: 'Time scheduled referral',
                            icon: icons.timePicker,
                            name: 'Time scheduled referral',
                            value: "",
                            valueType: "text",
                            placeholder:'Pick time',
                            eventType: 'input',
                            required: true
                        }
                    ]
                }
            ],

        }

    },
    {
        classDash: 'dashed_bottom_border',
        header:{
            title: 'Location of referral',
            selectedValue: ''
        },
        data:{
            rowData:[
                {
                    colData:[
                        {
                            class:"bold",
                            inputHeader: "Where is the client being referred to? *",
                            icon: icons.search,
                            value: "",
                            name: "Location of referral",
                            popOver: true,
                            valueType: "text",
                            eventType: "input",
                            required: true,
                            alertsError: false,
                            alertsErrorMassage: "",
                            placeholder: "Search for facility",
                            popOverData: {
                                filterData: false,
                                data: [],
                            },
                            id: "",
                            idName: "facility_id",
                        },

                    ]
                }
            ],

        }

    },
    {
        classDash: 'dashed_bottom_border',
        header:{
            title: 'Date and time referral was made',
            selectedValue: ''
        },
        data:{
            rowData:[
                {
                    colData:[
                        {
                            class:"bold",
                            inputHeader: 'Date referral was made *',
                            icon: icons.calenderPrimary,
                            name: "Date referral was made",
                            value: "",
                            eventType: 'input',
                            valueType:'text',
                            minDate:"",
                            maxDate:"",
                            required: true,
                            placeholder:'Pick date',
                            isDatePopover: true
                        },
                        {
                            class:"bold",
                            inputHeader: 'Time referral made',
                            name: "Time referral made",
                            value: "",
                            eventType: 'input',
                            valueType:'text',
                            placeholder:'Pick time',
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    {
        classDash: 'dashed_bottom_border',
        header:{
            title: 'Provider who made the referral',
            selectedValue: ''
        },
        data:{
            rowData:[
                {
                    colData:[
                        {
                            class:"bold",
                            inputHeader: "Provider’s facility *",
                            icon: icons.search,
                            value: "",
                            name: "Provider’s facility",
                            popOver: true,
                            valueType: "text",
                            eventType: "input",
                            required: true,
                            alertsError: false,
                            alertsErrorMassage: "",
                            placeholder: "Search for facility",
                            popOverData: {
                                filterData: false,
                                data: [],
                            },
                            id: "",
                            idName: "facility_id",
                        },
                        {
                            inputHeader: 'Provider’s phone number',
                            icon: icons.editPen,
                            name: 'Provider’s phone number',
                            value: '',
                            eventType: 'input',
                            valueType: "text",

                        },

                    ]
                }
            ],

        }

    },

    {
        classDash: 'dashed_bottom_border',
        header:{
            title: 'Provider who made the referral',
            selectedValue: ''
        },
        data:{
            rowData:[
                {
                    colData:[
                        {
                            class:"bold",
                            inputHeader: 'Referral notes',
                            icon: icons.editPen,
                            name: 'Referral notes',
                            value:'',
                            eventType: 'input',
                            valueType: "text",
                            required: true
                        },

                    ]
                }
            ],

        }

    },

] as any;
export const useReferralStore = defineStore('referralStore',{
    state: () =>({
        referralInfo:[...initialReferral] as any,
    }),
        actions:{
        addReferralInfo(data:any){
            this.referralInfo = data
        },
            getInitialReferral(){
                const data= _.cloneDeep(initialReferral);
                return[...data]
            }
    },
    // persist:true
})