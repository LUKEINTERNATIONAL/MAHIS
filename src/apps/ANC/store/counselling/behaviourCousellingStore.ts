import { defineStore } from "pinia"

const behaviourCousellingForm ={
    cousellingOnCaffeineYes:{
        name:"Yes",
        value:"yes"
    },
    cousellingOnCaffeineNo:{
        name:"No",
        value:"no"
    },
    clientReferredOnCaffeine:{
        name:"Client was referred",
        value:"clientReferredOnCaffeine"
    },
    otherOnCaffeine:{
        name:'Other On Caffeine',
        value:'otherOnCaffeine'
    },
    specifyOnCaffeine:{
        name:"Specify On Caffeine",
        value:"specifyOnCaffeine"
    },
    cousellingOnTobaccoYes:{
        name:"Yes",
        value:"yes"
    },
    cousellingOnTobaccoNo:{
        name:"No",
        value:"no"
    },
    clientReferredOnTobacco:{
        name:'Client was referred',
        value:"clientReferredOnTobacco"
    }, 
    otherOnTobacco:{
        name:'otherOnTobacco',
        value:'otherOnTobacco'
    },
    specifyOnTobacco:{
        name:"Specify On Tobbaco",
        value:"specifyOnTobacco"
    },
        cousellingOnSecondHAndTobaccoYes:{
        name:"Yes",
        value:"yes"
    },
    cousellingOnSecondHandTobaccoNo:{
        name:"No",
        value:"no"
    },
    clientReferredOnSecondHandTobacco:{
        name:'Client was referred',
        value:"clientReferredOnSecondHandTobacco"
    }, 
    otherOnSecondHandTobacco:{
        name:'otherOnSecondHandTobacco',
        value:'otherOnSecondHandTobacco'
    },
    specifyOnSecondHandTobacco:{
        name:"Specify On Second Hand  Tobacco",
        value:"specifyOnSecondHandTobacco"
    },
    cousellingOnCondomUseYes:{
        name:"Yes",
        value:"yes"
    },
    cousellingOnCondomUseNo:{
        name:"No",
        value:"no"
    },
    clientReferredOnCondomUse:{
        name:'Client was referred',
        value:"clientReferredOnCondomUse"
    }, 
    otherOnCondomUse:{
        name:'otherOnCondomUse',
        value:'otherOnCondomUse'
    },
    specifyOnCondomUse:{
        name:"Specify Condom Use",
        value:"specifyOnCondomUse"
    },
    cousellingOnSubstanceUseYes:{
        name:"Yes",
        value:"yes"
    },
    cousellingOnSubstanceUseNo:{
        name:"No",
        value:"no"
    },
     clientReferredOnSubstanceUse:{
        name:'Client was referred',
        value:"clientReferredOnSubstanceUse"
    }, 
    otherOnSubstanceUse:{
        name:'Other on substance use',
        value:'otherOnSubstanceUse'
    },
        specifyOnSubstanceUse:{
        name:"Specify Substance Use",
        value:"specifyOnSubstanceUse"
    },
}

export const useBehaviourCousellingStore = defineStore('behaviourCousellingStore',{
    state: () =>({
        behaviourInfo:[

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Counselling  conducted on caffeine?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.cousellingOnCaffeineYes.name,
                            value: behaviourCousellingForm.cousellingOnCaffeineYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.cousellingOnCaffeineNo.name,
                            value: behaviourCousellingForm.cousellingOnCaffeineNo.value,
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
                        title: 'Reason couselling on caffeine reduction was not conducted?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.clientReferredOnCaffeine.name,
                            value: behaviourCousellingForm.clientReferredOnCaffeine.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.otherOnCaffeine.name,
                            value: behaviourCousellingForm.otherOnCaffeine.value,
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
                                    name: behaviourCousellingForm.specifyOnCaffeine.name,
                                    value: behaviourCousellingForm.specifyOnCaffeine.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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
                        title: 'Counselling  conducted on Tobacco?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.cousellingOnTobaccoYes.name,
                            value: behaviourCousellingForm.cousellingOnTobaccoYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.cousellingOnTobaccoNo.name,
                            value: behaviourCousellingForm.cousellingOnTobaccoNo.value,
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
                        title: 'Reason couselling on Tobacco cessation was not conducted?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.clientReferredOnTobacco.name,
                            value: behaviourCousellingForm.clientReferredOnTobacco.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.otherOnTobacco.name,
                            value: behaviourCousellingForm.otherOnTobacco.value,
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
                                    name: behaviourCousellingForm.specifyOnTobacco.name,
                                    value: behaviourCousellingForm.specifyOnTobacco.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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
                        title: 'Counselling  conducted on second-hand smoke?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.cousellingOnSecondHAndTobaccoYes.name,
                            value: behaviourCousellingForm.cousellingOnSecondHAndTobaccoYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.cousellingOnSecondHandTobaccoNo.name,
                            value: behaviourCousellingForm.cousellingOnSecondHandTobaccoNo.value,
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
                        title: 'Reason couselling on second-hand smoke was not conducted?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.clientReferredOnSecondHandTobacco.name,
                            value: behaviourCousellingForm.clientReferredOnSecondHandTobacco.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.otherOnSecondHandTobacco.name,
                            value: behaviourCousellingForm.otherOnSecondHandTobacco.value,
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
                                    name: behaviourCousellingForm.specifyOnSecondHandTobacco.name,
                                    value: behaviourCousellingForm.specifyOnSecondHandTobacco.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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
                        title: 'Counselling  conducted on condom use?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.cousellingOnCondomUseYes.name,
                            value: behaviourCousellingForm.cousellingOnCondomUseYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.cousellingOnCondomUseNo.name,
                            value: behaviourCousellingForm.cousellingOnCondomUseNo.value,
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
                        title: 'Reason couselling on condom use was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.clientReferredOnCondomUse.name,
                            value: behaviourCousellingForm.clientReferredOnCondomUse.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.otherOnCondomUse.name,
                            value: behaviourCousellingForm.otherOnCondomUse.value,
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
                                    name: behaviourCousellingForm.specifyOnCondomUse.name,
                                    value: behaviourCousellingForm.specifyOnCondomUse.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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
                        title: 'Counselling  conducted on alcohol/substance?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.cousellingOnSubstanceUseYes.name,
                            value: behaviourCousellingForm.cousellingOnSubstanceUseYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.cousellingOnSubstanceUseNo.name,
                            value: behaviourCousellingForm.cousellingOnSubstanceUseNo.value,
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
                        title: 'Reason couselling on alcohol/substance was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: behaviourCousellingForm.clientReferredOnSubstanceUse.name,
                            value: behaviourCousellingForm.clientReferredOnSubstanceUse.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: behaviourCousellingForm.otherOnSubstanceUse.name,
                            value: behaviourCousellingForm.otherOnSubstanceUse.value,
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
                                    name: behaviourCousellingForm.specifyOnSubstanceUse.name,
                                    value: behaviourCousellingForm.specifyOnSubstanceUse.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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
        addBehaviourInfo(data:any){
            this.behaviourInfo = data
        }
    },
    persist:true
})