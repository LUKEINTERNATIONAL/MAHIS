import { defineStore } from "pinia";
import { icons } from '@/utils/svg';

const physiologicalCousellingForm ={
    counsellingOnHealthEatingYes:{
        name:"Yes",
        value:"yes"
    },
        counsellingOnHealthEatingNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnHealthEating:{
        name:"Client was referred",
        value:"clientReferredOnOnHealthEating"
    },
        otherOnHealthEating:{
        name:'Other On Health Eating',
        value:'otherOnHealthEating'
    },
        specifyOnHealthEating:{
        name:"Specify On Health Eating",
        value:""
    },
        counsellingOnEnergyProteinIntakeYes:{
        name:"Yes",
        value:"yes"
    },
        counsellingOnEnergyProteinIntakeNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnEnergyProteinIntake:{
        name:"Client was referred",
        value:"clientReferredOnEnergyProteinIntake"
    },
        otherOnEnergyProteinIntake:{
        name:'Other On Energy Protein Intake',
        value:'otherOnEnergyProteinIntake'
    },
        specifyOnEnergyProteinIntake:{
        name:"Specify On Energy Protein Intake",
        value:""
    },
        counsellingOnEnergyProteinDietarySupplentationYes:{
        name:"Yes",
        value:"yes"
    },
       counsellingOnEnergyProteinDietarySupplentationNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnEnergyProteinDietarySupplentation:{
        name:"Client was referred",
        value:"clientReferredOnEnergyProteinDietarySupplentation"
    },
        otherOnEnergyProteinDietarySupplentation:{
        name:' Energy and protein  dietary supplentation',
        value:'otherOnEnergyProteinDietarySupplentation'
    },
        specifyOnEnergyProteinDietarySupplentation:{
        name:"Specify On Energy Protein Dietary Supplentation",
        value:""
    },
   
}

export const useDietCounsellingStore = defineStore('dietCounsellingStore',{
    state: () =>({
        dietCounsellingInfo:[

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Counselling  conducted on health eating?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.counsellingOnHealthEatingYes.name,
                            value: physiologicalCousellingForm.counsellingOnHealthEatingYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.counsellingOnHealthEatingNo.name,
                            value: physiologicalCousellingForm.counsellingOnHealthEatingNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on health eating and keeping phyically active was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnHealthEating.name,
                            value: physiologicalCousellingForm.clientReferredOnHealthEating.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnHealthEating.name,
                            value: physiologicalCousellingForm.otherOnHealthEating.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {   
                classDash: 'dashed_bottom_border',
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other (specify)',
                                    icon: icons.editPen,
                                    name: physiologicalCousellingForm.specifyOnHealthEating.name,
                                    value: physiologicalCousellingForm.specifyOnHealthEating.value,
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            //break
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Counselling  conducted on increasingly daily energy and protein intake?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.counsellingOnEnergyProteinIntakeYes.name,
                            value: physiologicalCousellingForm.counsellingOnEnergyProteinIntakeYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.counsellingOnEnergyProteinIntakeNo.name,
                            value: physiologicalCousellingForm.counsellingOnEnergyProteinIntakeNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on increasing energy and protein dietary supplementation was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnEnergyProteinIntake.name,
                            value: physiologicalCousellingForm.clientReferredOnEnergyProteinIntake.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnEnergyProteinIntake.name,
                            value: physiologicalCousellingForm.otherOnEnergyProteinIntake.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {   
                classDash: 'dashed_bottom_border',
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other (specify)',
                                    icon: icons.editPen,
                                    name: physiologicalCousellingForm.specifyOnEnergyProteinIntake.name,
                                    value: physiologicalCousellingForm.specifyOnEnergyProteinIntake.value,
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            //break
                         {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Counselling  conducted on balanced energy and protein  dietary supplentation?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.counsellingOnEnergyProteinDietarySupplentationYes.name,
                            value: physiologicalCousellingForm.counsellingOnEnergyProteinDietarySupplentationYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.counsellingOnEnergyProteinDietarySupplentationNo.name,
                            value: physiologicalCousellingForm.counsellingOnEnergyProteinDietarySupplentationNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on balanced energy and protein dietary  supplementation was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnEnergyProteinDietarySupplentation.name,
                            value: physiologicalCousellingForm.clientReferredOnEnergyProteinDietarySupplentation.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnEnergyProteinDietarySupplentation.name,
                            value: physiologicalCousellingForm.otherOnEnergyProteinDietarySupplentation.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {   
                classDash: 'dashed_bottom_border',
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other (specify)',
                                    icon: icons.editPen,
                                    name: physiologicalCousellingForm.specifyOnEnergyProteinDietarySupplentation.name,
                                    value: physiologicalCousellingForm.specifyOnEnergyProteinDietarySupplentation.value,
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            
        ] as any,
    }),
        actions:{
        addDietCounsellingInfo(data:any){
            this.dietCounsellingInfo = data
        }
    },
    persist:true
})