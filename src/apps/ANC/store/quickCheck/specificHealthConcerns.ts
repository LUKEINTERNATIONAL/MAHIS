import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';
import _, {initial} from "lodash";

const initialHealthConcerns=[
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    class:'bold',
                    title: 'What are the specific health concerns for the patient?',
                    selectedValue: '',
                    name: 'Specific health concerns'
                },
                data:[

                    {
                        name: 'Abnormal vaginal discharge',
                        value: 'Abnormal vaginal discharge',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Change in blood pressure-up',
                        value: 'Change in blood pressure-up',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Diarrhoea',
                        value: 'Diarrhoea',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Vomiting',
                        value: 'Vomiting',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Genital ulcers',
                        value: 'Genital ulcers',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Change in blood pressure-down',
                        value: 'Change in blood pressure-down',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Constipation',
                        value: 'Constipation',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Contractions',
                        value: 'Contractions',
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
                    name: 'Specific health concerns'

                },
                data:[

                    {
                        name: 'Vaginal bleeding',
                        value: 'Vaginal bleeding',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Intimate partner violence',
                        value: 'Intimate partner violence',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Flu symptoms',
                        value: 'Flu symptoms',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Painful urination',
                        value: 'Painful urination',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Headache',
                        value: 'Headache',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Dyspepsia',
                        value: 'Dyspepsia',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Frequent urination/Polyuria',
                        value: 'Frequent urination/Polyuria',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Injury',
                        value: 'Injury',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Jaundice',
                        value: 'Jaundice',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Mental health-Depression',
                        value: 'Mental health-Depression',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Genital warts',
                        value: 'Genital warts',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Itchy vulva',
                        value: 'Itchy vulva',
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
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Painful intercourse',
                        value: 'Painful intercourse',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'No health concerns',
                        value: 'No health concerns',
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
                    name: 'Specific health concerns'

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
                                inputHeader: 'Other (specify)',
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


] as any;
export const useSpecificHealthConcernsStore = defineStore('specificHealthConcernsStore',{
    state: () => ({
        HealthConcerns:[...initialHealthConcerns]
    }),
    actions:{
        setHealthConcerns(data: any){
            this.HealthConcerns = data
        },
        getInitial(){
            const data = _.cloneDeep(initialHealthConcerns);
            return [...data]; // Return a copy of the initial state
        }
    },
    persist:true,

})