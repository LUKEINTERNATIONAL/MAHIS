import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";
import * as yup from "yup"


export const PlacentaExaminationValidationSchema = yup.object().shape({
    'Weight': yup.number()
    .typeError("Weight can only be a number")
    .min(0)
    .required()
.label("Weight"),
'Length': yup.number()
    .typeError("Length can only be a number")
    .min(0)
    .required(),
'Cord Length': yup.number()
    .typeError("Cord Length can only be a number")
    .min(0)
    .required(),
    'Number of vessels': yup.number()
    .typeError("Number of Vessels can only be a number")
    .min(0)
    .required(),

})

const initialPlacentaExamination=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: '',
        radioBtnContent:
            {
                header:{
                    title: 'Time and date of delivery',
                    class:'bold',
                    selectedValue: ''
                },
                data:[

                ]
            }

    },
    {
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: '',
                                unit: '',
                                icon: icons.time,
                                valueType: 'text',
                                name: 'Time of delivery',
                                required: true,
                                eventType: 'input',
                                placeholder:'Pick time',
                                isTimePopover: true

                            },
                            {
                                inputHeader: '',
                                unit: '',
                                icon: icons.calenderPrimary,
                                value: '',
                                valueType: 'text',
                                name: 'Date of delivery',
                                required: true,
                                eventType: 'input',
                                placeholder:'Pick date',
                                isDatePopover:true,
                            },

                        ]
                    }
                ]
            },
    },

    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Mode of delivery',
                    selectedValue: '',
                    class:"bold",
                    name:'Mode of delivery',
                    displayNext:"Other"
                },
                data:[
                    {
                        name: 'Controlled cord traction',
                        value: 'Controlled cord traction',
                        colSize: '7',
                    },
                    {
                        name: 'Manual removal',
                        value: 'Manual removal',
                        colSize: '7',
                    },

                ]
            }

    },
    {  classDash: 'dashed_bottom_border _padding',
        childName:'Mode of delivery',
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Specify',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Other mode of delivery notes',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },

                        ]
                    }
                ]
            },
    },

    // {
    //     selectdData: [],
    //     isFinishBtn: false,
    //     classDash: 'dashed_bottom_border _padding',
    //     radioBtnContent:
    //         {
    //             header:{
    //                 title: 'Placenta Weight and Length',
    //                 selectedValue: '',
    //                 class:"bold",
    //                 name:"Placenta"
    //             },
    //             data:[
    //                 {
    //                     name: 'Complete',
    //                     value: 'Complete',
    //                     colSize: '3',
    //                 },
    //                 {
    //                     name: 'Incomplete',
    //                     value: 'Incomplete',
    //                     colSize: '3',
    //                 },

    //             ]
    //         }

    // },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: '',
        radioBtnContent:
            {
                header:{
                    title: 'Placenta Weight and Length',
                    class:'bold',
                    selectedValue: ''
                },
                data:[

                ]
            }

    },
    {
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: '',
                                unit: '',
                                icon: icons.editPen,
                                valueType: 'text',
                                name: 'Weight',
                                required: true,
                                eventType: 'input',
                                placeholder:'Enter Weight',

                            },
                            {
                                inputHeader: '',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType: 'text',
                                name: 'Length',
                                required: true,
                                eventType: 'input',
                                placeholder:'Enter Length',
                            },

                        ]
                    }
                ]
            },
    },

    {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent:
            {
                header:{
                    title: 'Cord Length',
                    selectedValue: '',
                    class:"bold",
                    name:""
                },
                data:[


                ]
            }

    },

    {
        classDash: 'dashed_bottom_border _padding',
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            // {
                            //     inputHeader: '',
                            //     unit: '',
                            //     icon: icons.editPen,
                            //     value: '',
                            //     valueType:'text',
                            //     name: 'Placenta weight',
                            //     required: true,
                            //     eventType: 'input',
                            //     placeholder:''

                            // },
                            {
                                inputHeader: '',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Cord Length',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },

                        ]
                    }
                ]
            },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Cord insertion',
                    selectedValue: '',
                    class:"bold",
                    name:'Cord insertion'
                },
                data:[
                    {
                        name: 'Central',
                        value: 'central',
                        colSize: '3',
                    },
                    {
                        name: 'Lateral',
                        value: 'lateral',
                        colSize: '3',
                    },

                ]
            }

    },


    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Membranes',
                    selectedValue: '',
                    class:"bold",
                    name:"Membranes"
                },
                data:[
                    {
                        name: 'Complete',
                        value: 'Complete',
                        colSize: '3',
                    },
                    {
                        name: 'Incomplete',
                        value: 'Incomplete',
                        colSize: '3',
                    },

                ]
            }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
            header: {
                title: "Oxytocin 10 UI given?",
                selectedValue: "",
                class: "bold",
                displayNone: false,
                name: "Oxytocin 10 UI given",
            },
            data: [
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2.5",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2.5",
                },
            ],
        },
    },

    {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent:
            {
                header:{
                    title: 'Number of vessels',
                    selectedValue: '',
                    class:"bold",
                    name:""
                },
                data:[


                ]
            }

    },
    {
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: '',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Number of vessels',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },

                        ]
                    }
                ]
            },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Placenta condition',
                    selectedValue: '',
                    class:"bold",
                    name:"Placenta condition",
                    displayNext:'Unhealthy'

                },
                data:[
                    {
                        name: 'Healthy',
                        value: 'Healthy',
                        colSize: '3',
                    },
                    {
                        name: 'Unhealthy',
                        value: 'Unhealthy',
                        colSize: '3',
                    },

                ]
            }

    },
    {
        childName:'Unhealthy',
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Abnormalities',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Placenta abnormalities',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },

                        ]
                    }
                ]
            },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Cervix',
                    selectedValue: '',
                    class:"bold",
                    name:"Cervix",

                },
                data:[
                    {
                        name: 'Intact',
                        value: 'Intact',
                        colSize: '3',
                    },
                    {
                        name: 'Tears',
                        value: 'Tears',
                        colSize: '3',
                    },

                ]
            }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
            header: {
                displayNone:true,
                title: "Severity of Tear",
                selectedValue: "",
                name: "Severity",
                class: "bold",
            },
            data: [
                {
                    name: "Lacerations",
                    value: "Lacerations",
                    colSize: "2.5",
                },
                {
                    name: "First Degree",
                    value: "First Degree",
                    colSize: "3",
                },
                {
                    name: "Second Degree",
                    value: "Second Degree",
                    colSize: "3",
                },
                {
                    name: "Third Degree",
                    value: "Third Degree",
                    colSize: "3",
                },
            ],
        },
    },
    

    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Perineum',
                    selectedValue: '',
                    class:"bold",
                    name:"Perineum",
                    displayNext:'Other'
                },
                data:[
                    {
                        name: 'Intact',
                        value: 'Intact',
                        colSize: '3',
                    },
                    {
                        name: 'Tears',
                        value: 'Tears',
                        colSize: '9',
                    },
                    {
                        name: 'Episiotomy',
                        value: 'episiotomy',
                        colSize: '3',
                    },
                    {
                        name: 'Lacerations',
                        value: 'lacerations',
                        colSize: '9',
                    },
                    {
                        name: 'Other',
                        value: 'Other',
                        colSize: '3',
                    },

                ]
            }

    },
    {
        classDash: 'dashed_bottom_border _padding',
        childName:"Perineum",
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Specify',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Other perineum condition',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },

                        ]
                    }
                ]
            },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Repair done for Tears/Episiotomy',
                    selectedValue: '',
                    class:"bold",
                    name:"Repair done for Tears/Episiotomy",
                },
                data:[
                    {
                        name: 'Yes',
                        value: 'Yes',
                        colSize: '2.5',
                    },
                    {
                        name: 'No',
                        value: 'No',
                        colSize: '2.5',
                    },

                ]
            }

    },

] as any;
export const useThirdStageOfLabourStore = defineStore('thirdStageOfLabour',{
    state: () => ({

        placentaExamination: [...initialPlacentaExamination] as any,


    }),
    actions:{
        setPlacentaExamnianation(data: any){
            this.placentaExamination = data
        },
        getInitial(){
            const data=_.cloneDeep(initialPlacentaExamination)
            return [...data]
        }
    },
    // persist:true,

})