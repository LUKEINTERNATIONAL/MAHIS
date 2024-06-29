import { defineStore } from "pinia";
import { icons } from '@/utils/svg';
import _ from "lodash";

const initialDietCounselling=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on health eating and keeping physically active?',
                selectedValue: '',
                class:'bold',
                name:'Counselling on health eating',
                displayNext:"No"
            },
            data:[
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2.5",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2.5",
                },
            ]
        }
    },
    {
        selectdData: [],
        childName:'Counselling on health eating',
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        isFinishBtn: false,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on health eating and keeping physically active was not done?',
                selectedValue: '',
                name:'Counselling on health eating and keeping physically active was not done',
                displayNone: true,
                displayNext:"Other",
                class:'bold',
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name:'Other',
                    value:'Other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:'Counselling on health eating and keeping physically active was not done',
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Specify',
                            icon: icons.editPen,
                            valueType:'text',
                            name: "Other notes",
                            value: "Other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on increasingly daily energy and protein supplementation?',
                selectedValue: '',
                class:'bold',
                name:"Counselling  conducted on increasingly daily energy and protein supplementation",
                displayNext:"No"
            },
            data:[
                {
                    name: 'Yes',
                    value:'Yes',
                    colSize: "2.5",
                },
                {
                    name: 'No',
                    value:'No',
                    colSize: "2.5",
                },
            ]
        }
    },
    {
        selectdData: [],
        sideColSize:0.5,
        childName: 'Counselling  conducted on increasingly daily energy and protein supplementation',
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Reason counselling on increasing energy and protein dietary supplementation was not done?',
                selectedValue: '',
                name:"Reason counselling on increasing energy and protein dietary supplementation was not done",
                class:'bold',
                displayNone:true,
                displayNext:'Other'
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name:'Other',
                    value:'Other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:'Reason counselling on increasing energy and protein dietary supplementation was not done',
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Specify',
                            icon: icons.editPen,
                            valueType:'text',
                            name: "Other notes",
                            value: "Other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },

] as any;
export const useDietCounsellingStore = defineStore('dietCounsellingStore',{
    state: () =>({
        dietCounsellingInfo:[...initialDietCounselling] as any,
    }),
        actions:{
        addDietCounsellingInfo(data:any){
            this.dietCounsellingInfo = data
        },

            getInitial(){
                const data = _.cloneDeep(initialDietCounselling)
                return [...data];
            },
    },
    persist:true
})


//first copy

            // {   
            //     classDash: 'dashed_bottom_border',
            //     data:{ 
            //         rowData:[
            //             {
            //                 colData:[
            //                     {
            //                         inputHeader: 'Other (specify)',
            //                         icon: icons.editPen,
            //                         name: physiologicalCousellingForm.specifyOnHealthEating.name,
            //                         value: physiologicalCousellingForm.specifyOnHealthEating.value,
            //                         eventType: 'input',
            //                         inputWidth: "82%",
            //                         required: true
            //                     }
                                
            //                 ]
            //             }
            //         ],
                    
            //     }
                    
            // },
            // //break



            //second copy

                //     specifyOnHealthEating:{
    //     name:"Specify On Health Eating",
    //     value:""
    // },
    //     counsellingOnEnergyProteinIntakeYes:{
    //     name:"Yes",
    //     value:"yes"
    // },
    //     counsellingOnEnergyProteinIntakeNo:{
    //     name:"No",
    //     value:"no"
    // },
    //     clientReferredOnEnergyProteinIntake:{
    //     name:"Client was referred",
    //     value:"clientReferredOnEnergyProteinIntake"
    // },
    //     otherOnEnergyProteinIntake:{
    //     name:'Other On Energy Protein Intake',
    //     value:'otherOnEnergyProteinIntake'
    // },
    //     specifyOnEnergyProteinIntake:{
    //     name:"Specify On Energy Protein Intake",
    //     value:""
    // },
    //     counsellingOnEnergyProteinDietarySupplentationYes:{
    //     name:"Yes",
    //     value:"yes"
    // },
    //    counsellingOnEnergyProteinDietarySupplentationNo:{
    //     name:"No",
    //     value:"no"
    // },
    //     clientReferredOnEnergyProteinDietarySupplentation:{
    //     name:"Client was referred",
    //     value:"clientReferredOnEnergyProteinDietarySupplentation"
    // },
    //     otherOnEnergyProteinDietarySupplentation:{
    //     name:' Energy and protein  dietary supplentation',
    //     value:'otherOnEnergyProteinDietarySupplentation'
    // },
    //     specifyOnEnergyProteinDietarySupplentation:{
    //     name:"Specify On Energy Protein Dietary Supplentation",
    //     value:""
    // },