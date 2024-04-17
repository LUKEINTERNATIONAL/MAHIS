import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

const initialPlacentaExamination=[
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
                                inputHeader: '',
                                unit: '',
                                icon: icons.time,
                                value: '',
                                name: 'time of delivery',
                                required: true,
                                eventType: 'input',
                                placeholder:'Pick time'

                            },
                            {
                                inputHeader: '',
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
                    title: 'Mode of delivery',
                    selectedValue: '',
                    class:"bold",
                    name:'Mode of delivery',
                    displayNext:"Other"
                },
                data:[
                    {
                        name: 'Controlled cord traction',
                        value: 'Controlled cord traction',
                        colSize: '5',
                    },
                    {
                        name: 'Manual removal',
                        value: 'Manual removal',
                        colSize: '5',
                    },

                    {
                        name: 'Other',
                        value: 'Other',
                        colSize: '5',
                    },
                ]
            }

    },
    {        classDash: 'dashed_bottom_border _padding',
        childName:'Mode of delivery',
        isFinishBtn: false,
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
                                name: 'Other',
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
                    title: 'Placenta',
                    selectedValue: '',
                    class:"bold",
                    name:"Placenta"
                },
                data:[
                    {
                        name: 'Complete',
                        value: 'Complete',
                        colSize: '4',
                    },
                    {
                        name: 'Incomplete',
                        value: 'Incomplete',
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
                    title: 'Membranes',
                    selectedValue: '',
                    class:"bold",
                    name:"Membranes"
                },
                data:[
                    {
                        name: 'Complete',
                        value: 'Complete',
                        colSize: '4',
                    },
                    {
                        name: 'Incomplete',
                        value: 'Incomplete',
                        colSize: '4',
                    },

                ]
            }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent:
            {
                header:{
                    title: 'Placenta and Cord weight',
                    selectedValue: '',
                    class:"bold",
                    name:""
                },
                data:[


                ]
            }

    },

    {
        classDash: 'dashed_bottom_border _padding',
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: '',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Placenta weight',
                                required: true,
                                eventType: 'input',
                                placeholder:''

                            },
                            {
                                inputHeader: '',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Cord weight',
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
                    title: 'Cord insertion',
                    selectedValue: '',
                    class:"bold",
                },
                data:[
                    {
                        name: 'Central',
                        value: 'central',
                        colSize: '4',
                    },
                    {
                        name: 'Lateral',
                        value: 'lateral',
                        colSize: '4',
                    },

                ]
            }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent:
            {
                header:{
                    title: 'Number of vessels',
                    selectedValue: '',
                    class:"bold",
                    name:""
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
                                inputHeader: '',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Number of vessels',
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
                    title: 'Placenta condition',
                    selectedValue: '',
                    class:"bold",
                    name:"Placenta condition",
                    displayNext:'Unhealthy'

                },
                data:[
                    {
                        name: 'Healthy',
                        value: 'Healthy',
                        colSize: '4',
                    },
                    {
                        name: 'Unhealthy',
                        value: 'Unhealthy',
                        colSize: '4',
                    },

                ]
            }

    },
    {
        childName:'Unhealthy',
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Abnormalities',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Placenta abnormalities',
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
                    title: 'Cervix',
                    selectedValue: '',
                    class:"bold",
                    name:"Cervix",

                },
                data:[
                    {
                        name: 'Intact',
                        value: 'Intact',
                        colSize: '4',
                    },
                    {
                        name: 'Tears',
                        value: 'Tears',
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
                    title: 'Perineum',
                    selectedValue: '',
                    class:"bold",
                    name:"Perineum",
                    displayNext:'Other'
                },
                data:[
                    {
                        name: 'Intact',
                        value: 'Intact',
                        colSize: '4.000001',
                    },
                    {
                        name: 'Tears',
                        value: 'Tears',
                        colSize: '4.000001',
                    },
                    {
                        name: 'Episiotomy',
                        value: 'episiotomy',
                        colSize: '4.000001',
                    },
                    {
                        name: 'Lacerations',
                        value: 'lacerations',
                        colSize: '4.00001',
                    },
                    {
                        name: 'Other',
                        value: 'Other',
                        colSize: '4.000001',
                    },

                ]
            }

    },
    {
        classDash: 'dashed_bottom_border _padding',
        childName:"Perineum",
        isFinishBtn: false,
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Specify tears',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Other tears',
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
                    title: 'Repair done for Tears/Episiotomy',
                    selectedValue: '',
                    class:"bold",
                    name:"Perineum",
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
export const useThirdStageOfLabour = defineStore('thirdStageOfLabour',{
    state: () => ({

        placentaExamination: [...initialPlacentaExamination] as any,


    }),
    actions:{
        setPlacentaExamnianation(data: any){
            this.placentaExamination = data
        },
        getInitial(){
            const data=[...initialPlacentaExamination]
            return [...data]
        }
    },
    persist:true,

})