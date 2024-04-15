import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

const initialNewbornComplications=[
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
] as any;

const initialSecondStageDetails=[
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
        sideColSize:0.5,
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
                                name: 'Time of delivery',
                                required: true,
                                eventType: 'input',
                                placeholder:'Pick time'

                            },
                            {
                                inputHeader: 'Date of delivery',
                                unit: '',
                                icon: icons.calenderPrimary,
                                value: '',
                                name: 'Date of delivery',
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
                    class:'bold',
                    title: 'Baby general condition at birth',
                    selectedValue: '',
                    name:"Baby general condition at birth"
                },
                data:[
                    {
                        name: 'Live full term',
                        value: 'live full term',
                        colSize: '5',
                    },
                    {
                        name: 'Live preterm',
                        value: 'live preterm',
                        colSize: '5',
                    },
                    {
                        name: 'Macerated stillbirth',
                        value: 'macerated stillbirth',
                        colSize: '5',
                    },
                    {
                        name: 'Fresh stillbirth',
                        value: 'fresh stillbirth',
                        colSize: '5',
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
                    title: 'Number of babies',
                    class:'bold',
                    selectedValue: ''
                },
                data:[


                ]
            }

    },
    {
        sideColSize:0.5,
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: '',
                                unit: 'Babies',
                                icon: icons.editPen,
                                value: '',
                                name: 'Number of babies',
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
        sideColSize:0.5,
        isFinishBtn: false,
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
                                name: 'First name',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },
                            {
                                inputHeader: 'Last name',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Last name',
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
        sideColSize:0.5,
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
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
                                name: 'Apgar score at 1 minute',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },
                            {
                                inputHeader: 'APGAR score at 5 minutes',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Apgar score at 5 minutes',
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
                    selectedValue: '',
                    class:'bold'
                },
                data:[
                    {
                        name: 'Male',
                        value: 'male',
                        colSize: '3',
                    },
                    {
                        name: 'Female',
                        value: 'female',
                        colSize: '4',
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
                    title: 'Newborn vitals',
                    class:'bold',
                    selectedValue: ''
                },
                data:[


                ]
            }

    },
    {
        sideColSize:0.5,
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
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
                                name: 'Baby weight',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },
                            {
                                inputHeader: 'Baby height',
                                unit: 'cm',
                                icon: icons.height,
                                value: '',
                                name: 'Baby height',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },
                            {
                                inputHeader: 'Baby circumference',
                                unit: 'cm',
                                icon: icons.height,
                                value: '',
                                name: 'Baby circumference',
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
                    selectedValue: '',
                    class:'bold',
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
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Chlorhexidine 7.1% applied?',
                    selectedValue: '',
                    class:'bold'
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

const initialObstetricDetails=[
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

] as any;
export const useSecondStageOfLabourStore = defineStore('secondStageOfLabourStore',{
    state: () => ({

        secondStageDetails: [...initialSecondStageDetails] as any,

        newbornComplications: [...initialNewbornComplications] as any,

        obstetricComplications:[...initialObstetricDetails] as any
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
        getInitial(){
            const data=[...initialSecondStageDetails]
            return [...data]
        },
        getInitial1(){
            const data=[...initialNewbornComplications]
            return [...data]
        },
        getInitial2(){
            const data=[...initialObstetricDetails]
            return [...data]
        }
    },
    persist:true,

})