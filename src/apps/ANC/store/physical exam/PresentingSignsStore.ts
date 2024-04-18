import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const usePresentingSigns = defineStore('presentingSigns',{
    state: () => ({

        signsOfInjury: [

            {
                selectdData: [],
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: 'Any injury present?',
                            selectedValue: '',
                            name:'Injury present',
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'no',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }


            },
            {
                selectdData: [],
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: 'Is there traumatic injury to abdomen?',
                            selectedValue: '',
                            name:'Traumatic injury'
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'no',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }


            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

                header:{
                    selectedValue: '',
                    name:'Other'
                },

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other (specify)',
                                        valueType: 'text',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "55%",
                                        displayNone: true
                                        
                                    },

                                ]
                            }
                        ]
                    },
            },

        ],

        clinicalEnquiry:[
            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Any other clinical enquiry done?',
                            selectedValue: '',
                            name: "Clinical enquiry"
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'no',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }


            },
            {
                selectdData: [],
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: 'Reason clinical enquiry was not done',
                            selectedValue: '',
                            name:'Reason not done'
                        },
                        data:[
                            {
                                value: 'Client referred',
                                name: 'Client was referred',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Trained provider unavailable',
                                name: 'Trained provider unavailable',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Safe space unavailable',
                                name: 'Private or safe space unavailable',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Confidentiality not assured',
                                name: 'Confidentiality could not be assured',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Other',
                                name: 'Other reason',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }


            },

            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

                header:{
                    title: '',
                    selectedValue: '',
                    name: "Other"
                },

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Specify ',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other (specify)',
                                        valueType: 'text',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "55%",
                                        displayNone: true
                                        
                                    },

                                ]
                            }
                        ]
                    },
            },

        ],
        intimateViolence:[
            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Has the woman been subjected to any form of injury?',
                            selectedValue: '',
                            name:'Injury present'
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'no',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }


            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border',

                header:{
                    title: 'Any other clinical enquiry done?',
                    selectedValue: '',
                    name: "Clinical enquiry"
                },

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Specify any other signs indicative of violence',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other (specify)',
                                        valueType: 'text',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "55%",
                                        
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                selectdData: [],
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: 'Types of IPV',
                            selectedValue: '',
                            name: "Intimate partner violence"
                        },
                        data:[
                            {
                                value: 'Physical violence (IPV)',
                                name: 'Physical violence',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Sexual violence',
                                name: 'Sexual violence',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Psychological abuse',
                                name: 'Psychological/emotional abuse',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }


            },

            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

                header:{
                    title: 'Types of IPV',
                    selectedValue: '',
                    name: "Other"
                },

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Violence by other family members (specify)',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other (specify)',
                                        required: true,
                                        eventType: 'input',
                                        valueType:'text',
                                        inputWidth: "55%",
                                        displayNone:true
                                        
                                    },

                                ]
                            }
                        ]
                    },
            },

        ]

    }),
    actions:{
        setClinicalEnquiry(data: any){
            this.clinicalEnquiry = data
        }
    },
    persist:true,

})
