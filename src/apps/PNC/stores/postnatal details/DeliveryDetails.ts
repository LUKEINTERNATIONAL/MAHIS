import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useDeliveryDetailsStore = defineStore('deliveryDetailsStore',{
    state: () => ({
        deliveryDetails: [
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
                                        inputHeader: 'Date of delivery',
                                        value: '',
                                        name: 'Date of delivery',
                                        icon: icons.calenderPrimary,
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        calenderPopover:true,
                                        alertsErrorMassage: '',
                                        placeholder:'Pick date'
                                    },

                                ],

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
                            title: 'Mode of delivery',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Spontaneous Vertex Delivery (SVD)',
                                value: 'spontaneous vertex delivery',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: ' Vacuum Extraction (VE)',
                                value: 'no',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Breech (BR)',
                                value: 'breech',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Caesarean section',
                                value: 'caesarean section',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other',
                                value: 'other',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "",
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
                            title: 'Place of delivery',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'This facility',
                                value: 'this facility',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'In transit',
                                value: 'in transit',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other facility',
                                value: 'other facility',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Home/TBA',
                                value: 'home/tba',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
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
                            title: 'Staff conducting delivery',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'MD/CO/MA/Nurse midwife/CMA',
                                value: 'md/co/ma/nurse midwife/cma',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'PA/WA/HSA/Other/None',
                                value: 'pa/wa/hsa/other/none',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
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
                            title: 'What was the outcome of the delivery?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Live birth',
                                value: 'live birth',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Neonatal death',
                                value: 'neonatal death',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Still birth',
                                value: 'still birth',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
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
                            title: 'Type of still birth?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Macerated still birth',
                                value: 'macerated still birth',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Fresh still birth',
                                value: 'fresh still birth',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Total number of babies',
                                        unit: 'baby',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Total number of babies',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'First name',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'first name',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },
                                    {
                                        inputHeader: 'Last name',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'last name',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Birth weight',
                                        unit: 'gm',
                                        icon: icons.weight,
                                        value: '',
                                        name: 'birth weight',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },
                                    {
                                        inputHeader: 'Birth length',
                                        unit: 'cm',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'birth length',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'APGAR score at 5 minutes',
                                        unit: '',
                                        icon: icons.weight,
                                        value: '',
                                        name: 'apgar score at 5 minutes',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },
                                ]
                            }
                        ]
                    },
            },

            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'None',
                                value: 'none',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Prematurity',
                                value: 'prematurity',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Sepsis',
                                value: 'sepsis',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Congenital abnormalities',
                                value: 'congenital abnormalities',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Asphyxia',
                                value: 'asphyxia',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other',
                                value: 'other',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },

                        ]
                    }

            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

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
                                        name: 'other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "",
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
                            title: 'Was resuscitation attempted?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'no',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
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
                            title: 'Type of resuscitation',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Drying only',
                                value: 'drying only',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Clearing airway',
                                value: 'clearing airway',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Bag and mask',
                                value: 'clearing airway',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },


        ] as any,
    }),
    actions:{
        setDeliveryDetails(data: any){
            this.deliveryDetails = data
        },


    },
    persist:true,

})