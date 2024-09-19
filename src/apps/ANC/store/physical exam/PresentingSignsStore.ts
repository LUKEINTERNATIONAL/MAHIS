import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const usePresentingSigns = defineStore('presentingSigns',{
    state: () => ({

        signsOfInjury: [

            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Any injury present?',
                            selectedValue: '',
                            name:'Injury present',
                            class:"bold"
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                value: 'no',
                                name: 'No',
                                colSize: '2.5',

                            },
                        ]
                    }


            },
            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Is there traumatic injury to abdomen?',
                            selectedValue: '',
                            name:'Traumatic injury',
                            class:"bold",
                            displayNone:"true"
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                value: 'no',
                                name: 'No',
                                colSize: '2.5',
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
                            name: "Clinical enquiry",
                            class:"bold"
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                colSize: '2.5',


                            },
                            {
                                value: 'no',
                                name: 'No',
                                colSize: '2.5',
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
                    name: "Clinical enquiry notes",
                    class:"bold"
                },

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        displayNone:true,
                                        inputHeader: 'Specify the clinical enquiry provided',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Clinical enquiry notes',
                                        valueType: 'text',
                                        required: true,
                                        eventType: 'input',

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
                            title: 'Reason clinical enquiry was not done',
                            selectedValue: '',
                            displayNone: true,
                            name:'Reason not done',
                            class:"bold"
                        },
                        data:[
                            {
                                value: 'Client referred',
                                name: 'Client was referred',
                                colSize: '7',


                            },
                            {
                                value: 'Trained provider unavailable',
                                name: 'Trained provider unavailable',
                                colSize: '7',


                            },
                            {
                                value: 'Safe space unavailable',
                                name: 'Private or safe space unavailable',
                                colSize: '7',


                            },
                            {
                                value: 'Confidentiality not assured',
                                name: 'Confidentiality could not be assured',
                                colSize: '7',


                            },
                            {
                                value: 'Other',
                                name: 'Other reason',
                                colSize: '7',


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
                            title: 'Has the woman been subjected to any form of violence?',
                            selectedValue: '',
                            name:'Woman subjected to IPV',
                            class:"bold"
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                value: 'no',
                                name: 'No',
                                colSize: '2.5',
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
                            title: 'What type of Intimate Partner Violence the woman has been subjected to?',
                            selectedValue: '',
                            name: "Type of IPV the woman has been subjected to",
                            class:"bold",
                            displayNone:true
                        },
                        data:[
                            {
                                value: 'Physical violence (IPV)',
                                name: 'Physical violence',
                                colSize: '7',

                            },
                            {
                                value: 'Sexual violence',
                                name: 'Sexual violence',
                                colSize: '7',
                            },
                            {
                                value: 'Psychological abuse',
                                name: 'Psychological/emotional abuse',
                                colSize: '7',

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
    // persist:true,

})
