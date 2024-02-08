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
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'y',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'N',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                        ]
                    }


            },
        ],

        abdominalInjury:[
            {
                selectdData: [],
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'y',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'N',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                        ]
                    }


            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Other (specify)',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                        required: true
                                    },

                                ]
                            }
                        ]
                    },
            },


        ],
        violence:[
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

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
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                        required: true
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
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'y',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'N',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '12',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'client referred',
                                name: 'Client was referred',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'trained provider unavailable',
                                name: 'Trained provider unavailable',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'private or safe space unavailable',
                                name: 'Private or safe space unavailable',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'confidentiality could not be assured',
                                name: 'Confidentiality could not be assured',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                        ]
                    }


            },

            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Other (specify)',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                        required: true
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
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'y',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'N',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '12',
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
                            title: 'Types of IPV',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'physical violence',
                                name: 'Physical violence',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'sexual violence',
                                name: 'Sexual violence',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'psychological/emotional abuse',
                                name: 'Psychological/emotional abuse',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                        ]
                    }


            },

            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

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
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                        required: true
                                    },

                                ]
                            }
                        ]
                    },
            },

        ]

    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        }
    },
    persist:true,

})
