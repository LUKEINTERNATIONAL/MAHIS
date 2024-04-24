import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

const initialVisitForMother=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'What is the status of the mother?',
                    selectedValue: '',
                    name:'Status of the mother',
                    class:'bold'
                },
                data:[
                    {
                        name: 'Alive',
                        value: 'Alive',
                        colSize: '4',

                    },
                    {
                        name: 'Dead',
                        value: 'Dead',
                        colSize: '4',

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
                    title: 'Is the postnatal check within?',
                    selectedValue: '',
                    class:'bold',
                    name:'Postnatal check period'
                },
                data:[
                    {
                        name: 'Up to 48 hrs or before discharge',
                        value: 'up to 48 hrs or before discharge',
                        colSize: '7',
                    },
                    {
                        name: '3-7 days',
                        value: '3 to 7 days',
                        colSize: '7',

                    },
                    {
                        name: '8-42 days',
                        value: '8 to 42 days',
                        colSize: '7',

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
                    title: 'Does the woman have any of the danger signs?',
                    selectedValue: '',
                    name:'Danger signs',
                    class:'bold'
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
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',

                },
                data:[

                    {
                        name: 'Anemia',
                        value: 'anemia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Postpartum hemorrhage',
                        value: 'postpartum hemorrhage',
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
                    selectedValue: '',
                    name:'Danger signs',

                },
                data:[
                    {
                        name: 'Severe pre-eclampsia',
                        value: 'severe pre-eclampsia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Pre-eclampsia',
                        value: 'pre-eclampsia',
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
                    selectedValue: '',
                    name:'Danger signs',

                },
                data:[
                    {
                        name: 'Breast engorgement',
                        value: 'breast engorgement',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Other danger signs',
                        value: 'Other danger signs',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        childName:'Other danger signs',
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
                                name: 'Other danger signs notes',
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
                    title: 'Status of uterus',
                    selectedValue: '',
                    class:'bold',
                    name:'Status of Uterus',
                    displayNext:"Other status"
                },
                data:[
                    {
                        name: 'Involuted',
                        value: 'involuted',
                        colSize: '4',

                    },
                    {
                        name: 'Sub-involuted',
                        value: 'sub-involuted',
                        colSize: '4',

                    },
                    {
                        name: 'Other status',
                        value: 'Other status',
                        colSize: '5',

                    },
                ]
            }

    },
    {
        childName:'Status of uterus',
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
                                valueType:'text',
                                name: 'Status of uterus notes',
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
        childName:'Status of uterus',
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Was the intervention given?',
                    selectedValue: '',
                    name:'Intervention on uterus problem',
                    class:'bold',
                    displayNone:true,
                    displayNext:'Yes'
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
        isFinishBtn: false,
        sectionHeader: '',
        childName:'Intervention on uterus problem',
        classDash: 'dashed_bottom_border _padding',

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Describe the intervention given?',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Intervention provided notes',
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
                    title: 'Status of lochia',
                    selectedValue: '',
                    class:'bold',
                    name:'Status of lochia',
                    displayNext:'Other',
                },
                data:[
                    {
                        name: 'Mild',
                        value: 'mild',
                        colSize: '4',

                    },
                    {
                        name: 'Moderate',
                        value: 'moderate',
                        colSize: '4',

                    },
                    {
                        name: 'Heavy',
                        value: 'heavy',
                        colSize: '4',

                    },
                    {
                        name: 'Offensive smell',
                        value: 'offensive smell',
                        colSize: '4',

                    },
                    {
                        name: 'Other status',
                        value: 'other status',
                        colSize: '4',

                    },
                ]
            }

    },
    {
        isFinishBtn: false,
        ChildName:'Status of lochia',
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
                                valueType:'text',
                                name: 'Status of lochia notes',
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
                    title: 'Was the intervention given?',
                    selectedValue: '',
                    name:"Intervention on lochia",
                    class:'bold',
                    displayNext:'Yes'
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
        isFinishBtn: false,
        childName:'Intervention on lochia',
        sectionHeader: '',
        classDash: 'dashed_bottom_border _padding',

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Describe the intervention given?',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Intervention on lochia notes',
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
                    title: 'Episiotomy/tear present?',
                    selectedValue: '',
                    class:'bold',
                    name:'Episiotomy/tear',
                    displayNext:'Yes'
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
        childName:'Episiotomy/tear present',
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Condition of episiotomy/tear?',
                    selectedValue: '',
                    name:'Condition of episiotomy/tear',
                    class:'bold',
                    displayNone:true,
                },
                data:[
                    {
                        name: 'Intact',
                        value: 'intact',
                        colSize: '4',

                    },
                    {
                        name: 'Gaped',
                        value: 'gaped',
                        colSize: '4',

                    },
                    {
                        name: 'Infected',
                        value: 'infected',
                        colSize: '4',

                    },
                    {
                        name: 'Infected and gaped',
                        value: 'infected and gaped',
                        colSize: '4',

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
                    title: 'Was the intervention given?',
                    selectedValue: '',
                    class:'bold',
                    name:'Intervention on condition of episiotomy/tear',
                    displayNext:'Yes'
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
        childName:'Intervention on condition of episiotomy/tear',
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
                                inputHeader: 'Describe the intervention given?',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Intervention on episiotomy/tear notes',
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
                    title: 'Vitamin A supplementation given?',
                    selectedValue: '',
                    name:'Vitamin A supplementation',
                    displayNext:'Yes'
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
        childName: 'Vitamin A supplementation',
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Counselling on family planning done?',
                    selectedValue: '',
                    name:'Counselling on family planning',
                    class:'bold',
                    displayNone:true,
                    displayNext:'Yes'
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
        childName: 'Counselling on family planning',
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Postpartum family planning method chosen',
                    selectedValue: '',
                    name:'Postpartum family planning method',
                    class:'bold',
                    displayNone:true,
                },
                data:[
                    {
                        name: 'Intrauterine contraceptive device',
                        value: 'IUCD',
                        colSize: '4',

                    },
                    {
                        name: 'Bilateral tubal ligation',
                        value: 'BTL',
                        colSize: '4',

                    },
                    {
                        name: 'Oral contraceptive',
                        value: 'Oral contraceptive',
                        colSize: '4',

                    },
                    {
                        name: 'Injectable contraceptives',
                        value: 'Injectable contraceptives',
                        colSize: '4',

                    },
                    {
                        name: 'Contraceptive implant',
                        value: 'Contraceptive implant',
                        colSize: '4',

                    },
                    {
                        name: 'Intrauterine device (IUD)',
                        value: 'Intrauterine device (IUD)',
                        colSize: '4',

                    },
                    {
                        name: 'Y7',
                        value: 'Y7',
                        colSize: '4',

                    },
                    {
                        name: 'None',
                        value: 'none',
                        colSize: '4',

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
                    title: 'Breast feeding?',
                    selectedValue: '',
                    name:'Breast feeding',
                    class:'bold'
                },
                data:[
                    {
                        name: 'Breastfed exclusively',
                        value: 'Breastfed exclusively',
                        colSize: '4',

                    },
                    {
                        name: 'Non exclusive',
                        value: 'Non exclusive',
                        colSize: '4',

                    },
                    {
                        name: 'Not breastfeeding',
                        value: 'Not breastfeeding',
                        colSize: '5',

                    },
                ]
            }

    },
] as any;
export const useVisitForMotherStore = defineStore('visitForMotherStore',{
    state: () => ({
        visitForMother: [...initialVisitForMother] as any,
    }),
    actions:{
        setPNCVisitForMother(data: any){
            this.visitForMother = data
        },
        getInitial(){
            const data=[...initialVisitForMother]
            return[...data]
        }


    },
    persist:true,

})