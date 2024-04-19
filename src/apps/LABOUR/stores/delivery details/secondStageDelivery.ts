import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'


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
                    name:"Baby general condition at birth",
                    displayNext:'Live full term',
                },
                data:[
                    {
                        name: 'Live full term',
                        value: 'Live full term',
                        colSize: '5',
                    },
                    {
                        name: 'Live preterm',
                        value: 'Live preterm',
                        colSize: '5',
                    },
                    {
                        name: 'Macerated stillbirth',
                        value: 'Macerated stillbirth',
                        colSize: '5',
                    },
                    {
                        name: 'Fresh stillbirth',
                        value: 'Fresh stillbirth',
                        colSize: '5',
                    },

                ]
            }

    },
    {
        sideColSize:1,
        childName:'Baby general condition at birth',
        selectdData: [],
        isFinishBtn: false,
        classDash: '',
        radioBtnContent:
            {
                header:{
                    title: 'Baby details',
                    class:'bold',
                    selectedValue: '',
                    displayNone:true,
                },
                data:[


                ]
            }

    },
    // {
    //     childName:'Baby general condition at birth',
    //     isFinishBtn: false,
    //     data:
    //         {
    //             rowData:[
    //                 {
    //                     colData: [
    //                         {
    //                             displayNone:true,
    //                             inputHeader: '',
    //                             unit: 'Babies',
    //                             icon: icons.editPen,
    //                             value: '',
    //                             name: 'Number of babies',
    //                             required: true,
    //                             eventType: 'input',
    //                             placeholder:'',
    //                             inputWidth:''
    //
    //                         },
    //
    //                     ]
    //                 }
    //             ]
    //         },
    // },
    {
        sideColSize:1,
        childName:'Baby general condition at birth',
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
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
        sideColSize:1,
        childName:'Baby general condition at birth',
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
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
        sideColSize:1,
        childName:'Baby general condition at birth',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Newborn sex',
                    selectedValue: '',
                    class:'bold',
                    displayNone:true,
                    name:"Sex"
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
    {          sideColSize:1,

        childName:'Baby general condition at birth',
        selectdData: [],
        isFinishBtn: false,
        classDash: '',
        radioBtnContent:
            {
                header:{
                    displayNone:true,
                    title: 'Newborn vitals',
                    class:'bold',
                    selectedValue: '',
                    name:"vitals"
                },
                data:[


                ]
            }

    },
    {
        sideColSize:1,
        childName:'Baby general condition at birth',
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Baby weight',
                                unit: 'grams',
                                icon: icons.weight,
                                value: '',
                                name: 'Weight',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },
                            {
                                inputHeader: 'Baby height',
                                unit: 'cm',
                                icon: icons.height,
                                value: '',
                                name: 'Height',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },
                            {
                                inputHeader: 'Baby circumference',
                                unit: 'cm',
                                icon: icons.height,
                                value: '',
                                name: 'Circumference',
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
        sideColSize:1,
        childName:'Baby general condition at birth',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Tetracycline eye ointment given?',
                    selectedValue: '',
                    class:'bold',
                    displayNone:true,
                    name:"Tetracycline eye ointment given"
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
        sideColSize:1,
        childName:'Baby general condition at birth',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Chlorhexidine 7.1% applied?',
                    selectedValue: '',
                    class:'bold',
                    displayNone:true,
                    name:"Chlorhexidine"
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
        sideColSize:1,

        childName:'Baby general condition at birth',
        selectdData: [],
        checkboxBtnContent:
            {
                header:{
                    title: 'Any Newborn complications?',
                    selectedValue: '',
                    class:'bold',
                    name:'Newborn baby complications',
                    displayNone:true,

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
        sideColSize:1,

        childName:'Baby general condition at birth',
        selectdData: [],
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Newborn baby complications',
                    displayNone:true,

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
                        value: 'Congenital abnormalities',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {
        sideColSize:1,
        classDash: 'dashed_bottom_border _padding',
        childName:'Baby general condition at birth',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Newborn baby complications',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Asphyxia',
                        value: 'Asphyxia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Other complications',
                        value: 'Other complications',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        sideColSize:1,
        childName:'Other complications',
        isFinishBtn: false,
        sectionHeader: '',
        classDash: 'dashed_bottom_border _padding',

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
                                name: 'Other notes',
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
        sideColSize:1,
        childName:'Asphyxia',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Was resuscitation attempted?',
                    selectedValue: '',
                    name:'Resuscitation attempt',
                    class:'bold',
                    displayNext:"Yes",
                    displayNone:true,

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
        sideColSize:1,
        childName:'Resuscitation attempt',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Type of resuscitation?',
                    selectedValue: '',
                    displayNone:true,
                    class:'bold',
                    name:"Type of resuscitation"

                },
                data:[
                    {
                        name: 'Drying only',
                        value: 'Drying only',
                        colSize: '7',
                    },
                    {
                        name: 'Clearing airway',
                        value: 'Clearing airway',
                        colSize: '7',
                    },
                    {
                        name: 'Bag and mask',
                        value: 'Bag and mask',
                        colSize: '7',
                    },
                ]
            }

    },
    {
        sideColSize:1,
        childName:'Baby general condition at birth',
        selectdData: [],
        checkboxBtnContent:
            {
                header:{
                    title: 'Select the management given to newborn',
                    selectedValue: '',
                    class:'bold',
                    displayNone:true,
                    name:"Management to newborn"

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
        sideColSize:1,
        childName:'Baby general condition at birth',
        selectdData: [],
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name:"Management to newborn"


                },
                data:[

                    {
                        name: 'Kangaroo mother care',
                        value: 'Kangaroo mother care',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {
        sideColSize:1,
        childName:'Baby general condition at birth',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name:"Management to newborn"


                },
                data:[
                    {
                        name: 'Antibiotics',
                        value: 'Antibiotics',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        sideColSize:1,
        classDash: 'dashed_bottom_border _padding',
        childName:'Baby general condition at birth',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name:"Management to newborn"


                },
                data:[
                    {
                        name: 'Other',
                        value: 'Other',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        sideColSize:1,
        childName:'Other',
        isFinishBtn: false,
        sectionHeader: '',
        classDash: 'dashed_bottom_border _padding',

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
                                name: 'Other notes',
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
        sideColSize:1,
        childName:'Baby general condition at birth',
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Oxytocin 10 UI given?',
                    selectedValue: '',
                    class:'bold',
                    displayNone:true,
                    name:"Oxytocin 10 UI given"
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
        sideColSize:1,
        isFinishBtn: false,
        childName:'Baby general condition at birth',
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Vitamin K given?',
                    selectedValue: '',
                    name:'Vitamin K given',
                    class:'bold',
                    displayNone:true
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
const initialNewbornComplications=[


    // {
    //     selectdData: [],
    //     isFinishBtn: false,
    //     radioBtnContent:
    //         {
    //             header:{
    //                 title: 'Place of delivery',
    //                 selectedValue: '',
    //                 class:'bold'
    //             },
    //             data:[
    //                 {
    //                     name: 'This facility',
    //                     value: 'This facility',
    //                     colSize: '5',
    //                 },
    //                 {
    //                     name: 'In-transit',
    //                     value: 'in-transit',
    //                     colSize: '5',
    //                 },
    //
    //             ]
    //         }
    //
    // },
    // {
    //     selectdData: [],
    //     isFinishBtn: false,
    //     classDash: 'dashed_bottom_border _padding',
    //     radioBtnContent:
    //         {
    //             header:{
    //                 title: '',
    //                 selectedValue: '',
    //                 class:'bold'
    //             },
    //             data:[
    //                 {
    //                     name: 'Home/TBA',
    //                     value: 'Home/tba',
    //                     colSize: '5',
    //                 },
    //                 {
    //                     name: 'Other facility',
    //                     value: 'Other facility',
    //                     colSize: '5',
    //                 },
    //             ]
    //         }
    //
    // },

    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    class:"bold",
                    title: 'Place of delivery',
                    name:'Place of delivery',
                    selectedValue: '',
                    displayNext:"Other"
                },
                data:[
                    {
                        name: 'This facility',
                        value: 'This facility',
                        colSize: '5',
                    },
                    {
                        name: 'In transit',
                        value: 'In transit',
                        colSize: '5',
                    },
                    {
                        name: 'Home',
                        value: 'Home',
                        colSize: '5',
                    },

                    {
                        name: 'Other facility',
                        value: 'Other facility',
                        colSize: '7',
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
                    class:"bold",
                    title: 'Mode of delivery',
                    name:'Mode of delivery',
                    selectedValue: '',
                    displayNext:"Other"
                },
                data:[
                    {
                        name: 'Spontaneous Vertex Delivery (SVD)',
                        value: 'spontaneous vertex delivery',
                        colSize: '6',
                    },
                    {
                        name: 'Vacuum Extraction (VE)',
                        value: 'Vacuum Extraction',
                        colSize: '6',
                    },
                    {
                        name: 'Breech (BR)',
                        value: 'Breech',
                        colSize: '6',
                    },
                    {
                        name: 'Caesarean section',
                        value: 'Caesarean section',
                        colSize: '6',
                    },
                    {
                        name: 'Other',
                        value: 'Other',
                        colSize: '6',
                    },
                ]
            }

    },
    {

        isFinishBtn: false,
        childName:'mode of delivery',
        sectionHeader: '',
        classDash: 'dashed_bottom_border _padding',

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
                                name: 'Other notes',
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
                    selectedValue: '',
                    class:'bold',
                    name:'Staff conducting delivery'
                },
                data:[
                    {
                        name: 'Skilled health worker (Nurse midwife/community midwife assistant/medical assistant/clinical technician/medical doctor',
                        value: 'skilled health worker',
                        colSize: '12',
                    },
                    {
                        name: 'Unskilled (Patient attendant/ ward attendant/ health surveillance assistant/other/none',
                        value: 'unskilled',
                        colSize: '12',
                    },
                    {
                        name: 'Traditional birth attendant (TBA)',
                        value: 'tba',
                        colSize: '12',
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


const initialObstetricDetails=[
    {
        selectdData: [],
        checkboxBtnContent:
            {
                header:{
                    title: 'Any obstetric complications?',
                    selectedValue: '',
                    name:'Obstetric complications',
                    class:'bold'
                },
                data:[

                    {
                        name: 'None',
                        value: 'None',
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
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: ''
                },
                data:[

                    {
                        name: 'Pre-Eclampsia',
                        value: 'Pre-Eclampsia',
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
                        name: 'Perineal tear',
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
        classDash: 'dashed_bottom_border _padding',
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
                                name: 'Other notes',
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
        checkboxBtnContent:
            {
                header:{
                    title: 'Obstetric care provided',
                    selectedValue: '',
                    class:'bold',
                    name:"Obstetric care"
                },
                data:[

                    {
                        name: 'None',
                        value: 'None',
                        checked: false,
                        colSize: '8',
                    },

                ]
            }

    },
    {
        selectdData: [],
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[

                    {
                        name: 'Oxytocin/cabitocin/tranexamic acid',
                        value: 'oxytocin/cabitocin/tranexamic acid',
                        checked: false,
                        colSize: '8',
                    },

                ]
            }

    },
    {
        selectdData: [],
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[

                    {
                        name: 'Anticonvulsants',
                        value: 'anticonvulsants',
                        checked: false,
                        colSize: '8',
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
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[

                    {
                        name: 'Antibiotics',
                        value: 'antibiotics',
                        checked: false,
                        colSize: '8',
                    },
                ]
            }

    },


    {
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[
                    {
                        name: 'Blood transfusion',
                        value: 'blood transfusion',
                        checked: false,
                        colSize: '8',
                    },


                ]
            }

    },
    {
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[

                    {
                        name: 'Manual removal of placenta',
                        value: 'manual removal of placenta',
                        checked: false,
                        colSize: '8',
                    },

                ]
            }

    },
    {
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[

                    {
                        name: 'Non-pneumatic Anti-shock Garment (NASG)',
                        value: 'non-pneumatic Anti-shock Garment',
                        checked: false,
                        colSize: '8',
                    },

                ]
            }

    },
    {
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[

                    {
                        name: 'Manual Removal of Retained Products of Conception (MRPOC)',
                        value: 'manual Removal of Retained Products of Conception',
                        checked: false,
                        colSize: '8',
                    },

                ]
            }

    },
    {
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[

                    {
                        name: 'Evacuation',
                        value: 'evacuation',
                        checked: false,
                        colSize: '8',
                    },

                ]
            }

    },
    {
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[

                    {
                        name: 'Misoprostol',
                        value: 'misoprostol',
                        checked: false,
                        colSize: '8',
                    },

                ]
            }

    },
    {
        classDash: 'dashed_bottom_border _padding',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:"Obstetric care"

                },
                data:[
                    {
                        name: 'Other',
                        value: 'Other',
                        checked: false,
                        colSize: '8',
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
                                name: 'Other notes',
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
                    selectedValue: '',
                    name:"Dexamethasone",
                    class:"bold"
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