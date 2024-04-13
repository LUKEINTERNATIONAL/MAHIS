import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useSecondStageOfLabourStore = defineStore('secondStageOfLabourStore',{
    state: () => ({

        secondStageDetails: [
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Time of delivery',
                                        unit: '',
                                        icon: icons.time,
                                        value: '',
                                        name: 'time of delivery',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:'Pick time'

                                    },
                                    {
                                        inputHeader: 'Date of delivery',
                                        unit: '',
                                        icon: icons.calenderPrimary,
                                        value: '',
                                        name: 'date of delivery',
                                        required: true,
                                        datePopover:true,
                                        eventType: 'input',
                                        placeholder:'Pick date'
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
                            title: 'Baby general condition at birth',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Live full term',
                                value: 'live full term',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Live preterm',
                                value: 'live preterm',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Macerated stillbirth',
                                value: 'macerated stillbirth',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Fresh stillbirth',
                                value: 'fresh stillbirth',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },

                        ]
                    }

            },

            {
                isFinishBtn: false,
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Number of babies',
                                        unit: 'Babies',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'number of babies',
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
                isFinishBtn: false,
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Baby first name',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'baby first name',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

                                    },
                                    {
                                        inputHeader: 'Baby last name',
                                        unit: 'Babies',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'number of babies',
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
                isFinishBtn: false,
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'APGAR score at 1 minute',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'apgar score at 1 minute',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

                                    },
                                    {
                                        inputHeader: 'APGAR score at 5 minutes',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'apgar score at 5 minutes',
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
                            title: 'Newborn sex',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Male',
                                value: 'male',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Female',
                                value: 'female',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Baby weight',
                                        unit: 'grams',
                                        icon: icons.weight,
                                        value: '',
                                        name: 'baby weight',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

                                    },
                                    {
                                        inputHeader: 'Baby height',
                                        unit: 'cm',
                                        icon: icons.height,
                                        value: '',
                                        name: 'baby height',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

                                    },
                                    {
                                        inputHeader: 'Baby circumference',
                                        unit: 'cm',
                                        icon: icons.height,
                                        value: '',
                                        name: 'baby circumference',
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
                            title: 'Tetracycline eye ointment given?',
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
                            title: 'Chlorhexidine 7.1% applied?',
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


        ] as any,

        newbornComplications: [
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
                                        inputHeader: 'specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
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
                            title: 'Type of resuscitation?',
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
                                value: 'bag and mask',
                                labelPlacement: 'start',
                                colSize: '7',
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
                                name: 'None',
                                value: 'none',
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
                                name: 'Kangaroo mother care',
                                value: 'kangaroo mother care',
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
                                name: 'Antibiotics',
                                value: 'antibiotics',
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
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
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
                                        inputHeader: 'specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
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
                            title: 'Oxytocin 10 UI given?',
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
                            title: 'Vitamin K given?',
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
                                name: 'In-transit',
                                value: 'in-transit',
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
                            {
                                name: 'Other facility',
                                value: 'other facility',
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
                                        inputWidth: "85%",
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
                            title: 'Staff conducting delivery',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Skilled health worker (Nurse midwife/community midwife assistant/medical assistant/clinical technician/medical doctor',
                                value: 'skilled health worker',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between',
                            },
                            {
                                name: 'Unskilled (Patient attendant/ ward attendant/ health surveillance assistant/other/none',
                                value: 'unskilled',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between',
                            },
                            {
                                name: 'Traditional birth attendant (TBA)',
                                value: 'home/tba',
                                labelPlacement: 'start',
                                colSize: '12',
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
                                        inputHeader: 'Estimated blood loss',
                                        unit: 'ml',
                                        icon: icons.editPen,
                                        value: 'estimated blood loss',
                                        name: 'Estimated blood loss',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
                                    },

                                ]
                            }
                        ]
                    },
            },

        ] as any,

        obstetricComplications:[
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
                                name: 'Postpartum haemorrhage',
                                value: 'postpartum haemorrhage',
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
                                name: '(Pre)-Eclampsia',
                                value: 'pre-eclampsia',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Sepsis',
                                value: 'sepsis',
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
                                name: 'Retained placenta',
                                value: 'retained placenta',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Perineal tear (2nd, 3rd or 4th degree',
                                value: 'perineal tear',
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
                                        inputHeader: 'specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
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
                            title: 'Obstetric care provided',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'None',
                                value: 'none',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                            title: 'Obstetric care provided',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Oxytocin/cabitocin/tranexamic acid',
                                value: 'oxytocin/cabitocin/tranexamic acid',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: 'Anticonvulsants',
                                value: 'anticonvulsants',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: 'Antibiotics',
                                value: 'antibiotics',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: 'Blood transfusion',
                                value: 'blood transfusion',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: 'Manual removal of placenta',
                                value: 'manual removal of placenta',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: 'Non-pneumatic Anti-shock Garment (NASG)',
                                value: 'non-pneumatic Anti-shock Garment',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: 'Manual Removal of Retained Products of Conception (MRPOC)',
                                value: 'manual Removal of Retained Products of Conception',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: 'Evacuation',
                                value: 'evacuation',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: 'Misoprostol',
                                value: 'misoprostol',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                name: '',
                                value: 'other',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '8',
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
                                        inputWidth: "85%",
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
                            title: 'Dexamethasone?',
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

        ] as any
    }),
    actions:{
        setNewbornComplications(data: any){
            this.newbornComplications = data
        },
        setSecondStageDetails(data: any){
            this.secondStageDetails = data
        },
        setObstetricComplications(data: any){
            this.obstetricComplications = data
        },
    },
    persist:true,

})