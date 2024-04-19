import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

const initialExamsAfterDelivery=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'At what interval is the postnatal check',
                    selectedValue: '',
                    name:"Time for postnatal check",
                    class:"bold"
                },
                data:[
                    {
                        name: 'Immediately after delivery',
                        value: 'immediately after delivery',
                        colSize: '7',
                    },
                    {
                        name: '1 hour after delivery',
                        value: '1 hour after delivery',
                        colSize: '7',
                    },

                ]
            }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: '',
        radioBtnContent:
            {
                header:{
                    title: 'Immediate vitals',
                    selectedValue: '',
                    name:"Vitals",
                    class:"bold"
                },
                data:[


                ]
            }

    },

    {
        classDash: 'dashed_bottom_border _padding',
        data:
            {
                rowData: [
                    {
                        colData: [
                            {
                                inputHeader: 'Systolic Pressure*',
                                unit: 'mmHg',
                                icon: icons.systolicPressure,
                                value: '',
                                name: 'Systolic blood pressure',
                                required: true,
                                eventType: 'input'
                            },
                            {
                                inputHeader: 'Diastolic pressure*',
                                unit: 'mmHg',
                                icon: icons.diastolicPressure,
                                value: '',
                                name: 'Diastolic blood pressure',
                                required: true,
                                eventType: 'input'
                            }
                        ],
                    },
                    {
                        colData: [
                            {
                                inputHeader: 'Second systolic Pressure',
                                unit: 'mmHg',
                                icon: icons.systolicPressure,
                                value: '',
                                name: 'Repeated systolic blood pressure',
                                required: true,
                                eventType: 'input'
                            },
                            {
                                inputHeader: 'Second diastolic pressure',
                                unit: 'mmHg',
                                icon: icons.diastolicPressure,
                                value: '',
                                name: 'Repeated diastolic blood pressure',
                                required: true,
                                eventType: 'input'
                            }
                        ],
                    },
                ]
            }
    },
    {
        classDash: 'dashed_bottom_border _padding',

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Pulse rate',
                                unit: 'BMP',
                                icon: icons.pulse,
                                value: '',
                                name: 'Pulse',
                                eventType: 'input'
                            },
                            {
                                inputHeader: 'Temperature',
                                unit: 'C',
                                icon: icons.temprature,
                                value: '',
                                name: 'Temperature (c)',
                                eventType: 'input'
                            },
                        ],
                    },

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
                    title: 'Uterus',
                    selectedValue: '',
                    class:"bold",
                    name:"Raptured Uterus"

                },
                data:[
                    {
                        name: 'Involuted',
                        value: 'Involuted',
                        colSize: '5',
                    },
                    {
                        name: 'Moderate',
                        value: 'moderate',
                        colSize: '5',
                    },
                    {
                        name: 'Heavy',
                        value: 'heavy',
                        colSize: '5',
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
                    title: 'Lochia?',
                    selectedValue: '',
                    class:"bold",
                    name:'Lochia'
                },
                data:[
                    {
                        name: 'Mild',
                        value: 'mild',
                        colSize: '5',
                    },
                    {
                        name: 'Moderate',
                        value: 'moderate',
                        colSize: '5',
                    },
                    {
                        name: 'Heavy',
                        value: 'heavy',
                        colSize: '5',
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
                    title: 'Has the woman urinated?',
                    selectedValue: '',
                    class:"bold",
                    name:"woman urinated",
                    displayNext:"Yes"
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
    {
        childName:"Woman urinated",
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Amount of urine',
                                unit: 'ml',
                                icon: icons.editPen,
                                value: '',
                                name: 'amount of urine',
                                required: true,
                                eventType: 'input',
                                placeholder:'',
                                inputWidth:''

                            },
                            {
                                inputHeader: 'Color of urine',
                                unit: 'colour',
                                icon: icons.editPen,
                                value: '',
                                name: 'color of urine',
                                required: true,
                                eventType: 'input',
                                placeholder:'',
                                inputWidth:''

                            },

                            {
                                inputHeader: 'Odour of urine',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Odour of urine',
                                required: true,
                                eventType: 'input',
                                placeholder:'',
                                inputWidth:''

                            },

                        ]
                    }
                ]
            },
    },
]
export const useImmediatePostnatalChecksForMotherStore = defineStore('immediatePostnatalChecksForMotherStore',{
    state: () => ({

        examsAfterDelivery: [...initialExamsAfterDelivery] as any,
    }),
    actions:{
        setExamsAfterDelivery(data: any){
            this.examsAfterDelivery = data
        },
        getInitial(){
            const data=[...initialExamsAfterDelivery]
            return [...data]
        }
    },
    persist:true,

})