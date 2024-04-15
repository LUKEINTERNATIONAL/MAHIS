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
                title: 'Counselling  conducted on health eating?',
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
                displayNext:'Other',
                class:'bold',
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name: 'Other',
                    value: 'other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:'Reason counselling on health eating and keeping physically active was not done',
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
                            name: "Other notes",
                            value: "other notes",
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
            // {
            //     selectdData: [],
            //     isFinishBtn: false,
            //     classDash: 'dashed_bottom_border',
            //     radioBtnContent:{
            //         header:{
            //             title: 'Counselling  conducted on increasingly daily energy and protein intake?',
            //             selectedValue: ''
            //         },
            //         data:[
            //             {  
            //                 name: physiologicalCousellingForm.counsellingOnEnergyProteinIntakeYes.name,
            //                 value: physiologicalCousellingForm.counsellingOnEnergyProteinIntakeYes.value,
            //                 labelPlacement:'start',
            //                 colSize: "7",
            //                 justify:"space-between" 
            //             },
            //             { 
            //                 name: physiologicalCousellingForm.counsellingOnEnergyProteinIntakeNo.name,
            //                 value: physiologicalCousellingForm.counsellingOnEnergyProteinIntakeNo.value,
            //                 labelPlacement:'start',
            //                 colSize: "7",
            //                 justify:"space-between" 
            //             },
            //         ]
            //     }
            // },
            // {
            //     selectdData: [],
            //     isFinishBtn: false,
            //     classDash: 'dashed_bottom_border',
            //     radioBtnContent:{
            //         header:{
            //             title: 'Reason couselling on increasing energy and protein dietary supplementation was not done?',
            //             selectedValue: ''
            //         },
            //         data:[
            //             {  
            //                 name: physiologicalCousellingForm.clientReferredOnEnergyProteinIntake.name,
            //                 value: physiologicalCousellingForm.clientReferredOnEnergyProteinIntake.value,
            //                 labelPlacement:'start',
            //                 colSize: "7",
            //                 justify:"space-between" 
            //             },
            //             { 
            //                 name: physiologicalCousellingForm.otherOnEnergyProteinIntake.name,
            //                 value: physiologicalCousellingForm.otherOnEnergyProteinIntake.value,
            //                 labelPlacement:'start',
            //                 colSize: "7",
            //                 justify:"space-between" 
            //             },
            //         ]
            //     }
            // },
            // {   
            //     classDash: 'dashed_bottom_border',
            //     data:{ 
            //         rowData:[
            //             {
            //                 colData:[
            //                     {
            //                         inputHeader: 'Other (specify)',
            //                         icon: icons.editPen,
            //                         name: physiologicalCousellingForm.specifyOnEnergyProteinIntake.name,
            //                         value: physiologicalCousellingForm.specifyOnEnergyProteinIntake.value,
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
            //              {
            //     selectdData: [],
            //     isFinishBtn: false,
            //     classDash: 'dashed_bottom_border',
            //     radioBtnContent:{
            //         header:{
            //             title: 'Counselling  conducted on balanced energy and protein  dietary supplentation?',
            //             selectedValue: ''
            //         },
            //         data:[
            //             {  
            //                 name: physiologicalCousellingForm.counsellingOnEnergyProteinDietarySupplentationYes.name,
            //                 value: physiologicalCousellingForm.counsellingOnEnergyProteinDietarySupplentationYes.value,
            //                 labelPlacement:'start',
            //                 colSize: "7",
            //                 justify:"space-between" 
            //             },
            //             { 
            //                 name: physiologicalCousellingForm.counsellingOnEnergyProteinDietarySupplentationNo.name,
            //                 value: physiologicalCousellingForm.counsellingOnEnergyProteinDietarySupplentationNo.value,
            //                 labelPlacement:'start',
            //                 colSize: "7",
            //                 justify:"space-between" 
            //             },
            //         ]
            //     }
            // },
            // {
            //     selectdData: [],
            //     isFinishBtn: false,
            //     classDash: 'dashed_bottom_border',
            //     radioBtnContent:{
            //         header:{
            //             title: 'Reason couselling on balanced energy and protein dietary  supplementation was not done?',
            //             selectedValue: ''
            //         },
            //         data:[
            //             {  
            //                 name: physiologicalCousellingForm.clientReferredOnEnergyProteinDietarySupplentation.name,
            //                 value: physiologicalCousellingForm.clientReferredOnEnergyProteinDietarySupplentation.value,
            //                 labelPlacement:'start',
            //                 colSize: "7",
            //                 justify:"space-between" 
            //             },
            //             { 
            //                 name: physiologicalCousellingForm.otherOnEnergyProteinDietarySupplentation.name,
            //                 value: physiologicalCousellingForm.otherOnEnergyProteinDietarySupplentation.value,
            //                 labelPlacement:'start',
            //                 colSize: "7",
            //                 justify:"space-between" 
            //             },
            //         ]
            //     }
            // },
            // {   
            //     classDash: 'dashed_bottom_border',
            //     data:{ 
            //         rowData:[
            //             {
            //                 colData:[
            //                     {
            //                         inputHeader: 'Other (specify)',
            //                         icon: icons.editPen,
            //                         name: physiologicalCousellingForm.specifyOnEnergyProteinDietarySupplentation.name,
            //                         value: physiologicalCousellingForm.specifyOnEnergyProteinDietarySupplentation.value,
            //                         eventType: 'input',
            //                         inputWidth: "82%",
            //                         required: true
            //                     }
                                
            //                 ]
            //             }
            //         ],
                    
            //     }
                    
            // },


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