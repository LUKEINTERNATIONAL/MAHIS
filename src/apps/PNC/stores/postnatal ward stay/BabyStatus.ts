import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";

const initialBabyStatusDetails=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'What is the status of the baby?',
                    selectedValue: '',
                    name:'Status of baby',
                    class:'bold',
                    displayNext:"Alive"

                },
                data:[
                    {
                        name: 'Alive',
                        value: 'Alive',
                        colSize: '2.5',

                    },
                    {
                        name: 'Dead',
                        value: 'Dead',
                        colSize: '2.5',

                    },
                ]
            }

    },
    {
        childName:"Status of baby",
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
                                inputHeader: 'Full name of the baby',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Full name of the baby',
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
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Baby sex?',
                    selectedValue: '',
                    name:'Sex',
                    class:'bold',
                    displayNone:true,

                },
                data:[
                    {
                        name: 'Male',
                        value: 'Male',
                        colSize: '2.5',

                    },
                    {
                        name: 'Female',
                        value: 'Female',
                        colSize: '2.5',

                    },

                ]
            }

    },
    {
        childName:"Status of baby",
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
                                inputHeader: 'Birth weight',
                                unit: 'kg',
                                icon: icons.weight,
                                value: '',
                                valueType:'text',
                                name: 'Weight',
                                required: true,
                                eventType: 'input',
                                inputWidth: '',
                            },
                            {
                                inputHeader: 'current weight',
                                unit: 'kg',
                                icon: icons.weight,
                                valueType:'text',
                                value: '',
                                name: 'Current weight',
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
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Is the birth weight low?',
                    class:'bold',
                    name:'Low birth weight',
                    selectedValue: '',
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
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Prematurity/Kangaroo?',
                    selectedValue: '',
                    class:'bold',
                    name:'Prematurity/Kangaroo',
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
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'What is the condition at birth?',
                    name:'Birth condition',
                    selectedValue: '',
                    class:'bold',
                    displayNext:'Asphyxia',
                    displayNone:true,

                },
                data:[
                    {
                        name: 'Very well',
                        value: 'Very well',
                        colSize: '4',

                    },
                    {
                        name: 'Asphyxia',
                        value: 'Asphyxia',
                        colSize: '4',

                    },
                ]
            }

    },
    {
        childName:'Birth condition',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Resuscitation tempted',
                    selectedValue: '',
                    class:'bold',
                    name:'Resuscitation attempt',
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

    {
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Is the visit within',
                    selectedValue: '',
                    name:'Is the visit within',
                    class:'bold',
                    displayNone:true,

                },
                data:[
                    {
                        name: 'Up to 48 hrs or before discharge',
                        value: 'Up to 48 hrs or before discharge',
                        colSize: '7',

                    },
                    {
                        name: '2-7 days',
                        value: '2-7 days',
                        colSize: '7',

                    },
                    {
                        name: '8-42 days',
                        value: '8-42 days',
                        colSize: '7',

                    },
                ]
            }

    },

    {
        childName:"Status of baby",
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: 'What type immunisation has been given?',
                    selectedValue: '',
                    name:'Immunisation given',
                    class:'bold',
                    displayNone:true,

                },
                data:[

                    {
                        name: 'BCG',
                        value: 'bcg',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Polio',
                        value: 'polio',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {
        childName:'BCG',
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
                                inputHeader: 'Date BCG given',
                                unit: '',
                                icon: icons.calenderPrimary,
                                value: '',
                                valueType:'text',
                                name: 'Date BCG given',
                                required: true,
                                eventType: 'input',
                                datePopover:true,
                                inputWidth: '',
                                placeholder:'Pick holder',
                                isDatePopover:true,
                            },

                        ]
                    }
                ]
            },
    },
    {
        childName:'Polio',
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
                                inputHeader: 'Date polio given',
                                unit: '',
                                icon: icons.calenderPrimary,
                                value: '',
                                valueType:'text',
                                name: 'Date polio given',
                                required: true,
                                eventType: 'input',
                                datePopover:true,
                                inputWidth: '',
                                placeholder:'Pick holder',
                                isDatePopover:true,

                            },

                        ]
                    }
                ]
            },
    },
    {
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Tetracycline eye ointment  given?',
                    selectedValue: '',
                    name:'Tetracycline eye ointment',
                    class:'bold',
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
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Cord care (Chlorhexidine) used?',
                    selectedValue: '',
                    name:'Cord care',
                    class:'bold',
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
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Vitamin K given?',
                    selectedValue: '',
                    class:'bold',
                    name:'Vitamin K given',
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
        childName:"Status of baby",
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: 'Danger signs',
                    selectedValue: '',
                    name:'Danger signs',
                    class:'bold',
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
                        name: 'Not able to feed',
                        value: 'not able to feed',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:"Status of baby",
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[

                    {
                        name: 'Fever (>37.5C)',
                        value: 'fever',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Hypothermia',
                        value: 'Hypothermia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Convulsions',
                        value: 'convulsions',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Lethargic',
                        value: 'lethargic',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Chest in-drawing',
                        value: 'chest in-drawing',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Fast breathing',
                        value: 'fast breathing',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Eye discharge',
                        value: 'eye discharge',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Signs of cord infection',
                        value: 'signs of cord infection',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Jaundice',
                        value: 'jaundice',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Skin rashes',
                        value: 'skin rashes',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
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
                                inputHeader: 'specify',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Other danger signs notes',
                                required: true,
                                eventType: 'input',
                                inputWidth: "100%",
                            },

                        ]
                    }
                ]
            },
    },
    {
        childName:'None',
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
                                inputHeader: 'Describe the intervention',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Intervention notes',
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
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Nevirapine given?',
                    selectedValue: '',
                    class:'bold',
                    name:'Nevirapine given',
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
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Cotrimoxazole prophylaxis?',
                    selectedValue: '',
                    name:'Cotrimoxazole prophylaxis',
                    class:'bold',
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

    }
] as any;

const initialDangerSigns=[

] as any
export const useBabyStatusStore = defineStore('babyStatusStore',{
    state: () => ({
        babyStatusDetails: [...initialBabyStatusDetails] as any,

        dangerSigns:[...initialDangerSigns] as any
    }),
    actions:{
        setBabyStatusDetails(data: any){
            this.babyStatusDetails = data
        },
        setBabyDangerSigns(data: any){
            this.dangerSigns = data
        },
        getInitial(){
            const data=_.cloneDeep(initialBabyStatusDetails);
            return[...data];
        } ,
        getInitial1(){
            const data=_.cloneDeep(initialDangerSigns);
            return[...data];
        }


    },
    // persist:true,

})