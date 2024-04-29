import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";

const initialDeliveryDetails=[
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
                                valueType:'text',
                                eventType: 'input',
                                alertsError: false,
                                isDatePopover: true,
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
                    selectedValue: '',
                    class:"bold",
                    name:"Mode of delivery",
                    displayNext:"Other mode of delivery"
                },
                data:[
                    {
                        name: 'Spontaneous Vertex Delivery',
                        value: 'Spontaneous vertex delivery',
                        colSize: '5',
                    },
                    {
                        name: 'Vacuum extraction delivery',
                        value: 'Vacuum extraction delivery',
                        colSize: '5',
                    },
                    {
                        name: 'Breech delivery',
                        value: 'Breech delivery',
                        colSize: '5',
                    },
                    {
                        name: 'Caesarean section',
                        value: 'Caesarean section',
                        colSize: '5',
                    },
                    {
                        name: 'Other mode of delivery',
                        value: 'Other mode of delivery',
                        colSize: '5',
                    },
                ]
            }

    },
    {
        childName:'Mode of delivery',
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
                                name: 'Other mode of delivery notes',
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
                    selectedValue: '',
                    name:'Place of delivery',
                    class:'bold'
                },
                data:[
                    {
                        name: 'This facility',
                        value: 'this facility',
                        colSize: '5',

                    },
                    {
                        name: 'In transit',
                        value: 'in transit',
                        colSize: '5',

                    },
                    {
                        name: 'Other facility',
                        value: 'other facility',
                        colSize: '5',

                    },
                    {
                        name: 'Home or TBA',
                        value: 'home/tba',
                        colSize: '5',

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
                    selectedValue: '',
                    class:'bold',
                    name:'Staff conducting delivery'
                },
                data:[
                    {
                        name: 'MD/CO/MA/Nurse midwife/CMA',
                        value: 'md/co/ma/nurse midwife/cma',
                        colSize: '7',

                    },
                    {
                        name: 'PA/WA/HSA/Other/None',
                        value: 'pa/wa/hsa/other/none',
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
                    title: 'What was the outcome of the delivery?',
                    selectedValue: '',
                    class:'bold',
                    name:'Outcome of the delivery',
                    displayNext:'Stillbirths'
                },
                data:[
                    {
                        name: 'Live births',
                        value: 'live births',
                        colSize: '7',

                    },
                    {
                        name: 'Neonatal death',
                        value: 'neonatal death',
                        colSize: '7',

                    },
                    {
                        name: 'Stillbirths',
                        value: 'Stillbirths',
                        colSize: '7',

                    },
                ]
            }

    },
    {
        childName: 'Outcome of the delivery',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Type of still birth?',
                    selectedValue: '',
                    class:'bold',
                    name:'Type of still birth',
                    displayNone:true

                },
                data:[
                    {
                        name: 'Macerated still birth',
                        value: 'macerated still birth',
                        colSize: '7',

                    },
                    {
                        name: 'Fresh still birth',
                        value: 'fresh still birth',
                        colSize: '7',

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
                                valueType:'text',
                                name: 'Number of babies',
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
                                valueType:'text',
                                name: 'First name',
                                required: true,
                                eventType: 'input',
                                inputWidth: '',
                            },
                            {
                                inputHeader: 'Last name',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Last name',
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
                                valueType:'text',
                                name: 'Weight',
                                required: true,
                                eventType: 'input',
                                inputWidth: '',
                            },
                            {
                                inputHeader: 'Birth height',
                                unit: 'cm',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Height',
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
                                valueType:'text',
                                name: 'Apgar score at 5 minutes',
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
                    title: 'Newborn complications',
                    selectedValue: '',
                    class:'bold',
                    name:'Newborn baby complications'
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
                    selectedValue: '',
                    name:'Newborn baby complications'

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
                    selectedValue: '',
                    name:'Newborn baby complications'

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
                                valueType:'text',
                                name: 'Other complications notes',
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
        childName:'Asphyxia',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Was resuscitation attempted?',
                    selectedValue: '',
                    class:'bold',
                    name:'Resuscitation attempt',
                    displayNext:'Yes',
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
        childName:"Resuscitation attempt",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Type of resuscitation',
                    selectedValue: '',
                    class:'bold',
                    name:'Type of Resuscitation',
                    displayNone:true
                },
                data:[
                    {
                        name: 'Drying only',
                        value: 'drying only',
                        colSize: '5',

                    },
                    {
                        name: 'Clearing airway',
                        value: 'clearing airway',
                        colSize: '5',

                    },
                    {
                        name: 'Bag and mask',
                        value: 'Bag and mask',
                        colSize: '5',

                    },
                ]
            }

    },

] as any;
export const useDeliveryDetailsStore = defineStore('deliveryDetailsStore',{
    state: () => ({
        deliveryDetails: [...initialDeliveryDetails] as any,
    }),
    actions:{
        setDeliveryDetails(data: any){
            this.deliveryDetails = data
        },
        getInitial(){
            const data =_.cloneDeep(initialDeliveryDetails);
            return [...data];
        }


    },
    persist:true,

})