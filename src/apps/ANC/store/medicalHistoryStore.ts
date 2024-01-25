import { defineStore } from 'pinia'

const medicalHistoryForm ={
    dilationAndCurrettage:{
        name:"Dilation and currettage",
        value: "dilation"
    },
        Myomectomy:{
        name:"Myomectomy",
        value: "myomectomy"
    },  
        removalOfOvarianCystst:{
        name:"Removal of ovarian cystst",
        value: "removelOfOvarianCystst"
    },
        Oophorectomy:{
        name:"Oophorectomy",
        value: "oophorectomy"
    },  
       Salpingectomy:{
        name:"Salpingectomy",
        value: "salpingectomy"
    },
        cervicalCone:{
        name:"Cervical cone",
        value: "cervicalCone"
    }
}

const allegiesForm ={
        albendazole:{
        name:"Albendazole",
        value: "albendazole"
    },
       aluminiumHydroxide:{
        name:"Aluminium hydroxide",
        value: "aluminiumHydroxide"
    },  
       calcium:{
        name:"Calcium",
        value: "calcium"
    },
        chamomile:{
        name:"Chamomile",
        value: "chamomile"
    },  
       folicAcid:{
        name:"Folic acid",
        value: "folicAcid"
    },
        ginger:{
        name:"Ginger",
        value: "ginger"
    },
        fish:{
        name:"Fish",
        value: "fish"
    },  
       iron:{
        name:"Iron",
        value: "iron"
    },
        malariaMedication:{
        name:"Malaria medication(sulfadoxine-pyrimethamine)",
        value: "malariaMedication"
    },  
        mebendazole:{
        name:"Mebendazole",
        value: "mebendazole"
    },
        penicillin:{
        name:"Penicillin",
        value: "penicillin"
    },  
       prEPTenofovirDisoproxilFumarate:{
        name:"PrEP tenofovir disoproxil fumarate(TDF)",
        value: "prEPTenofovirDisoproxilFumarate"
    }
}

const chronicHealthConditionsForm = {
        autoImmuneDesease:{
        name:"Auto immune desease",
        value: "autoImmuneDesease"
    },
       asthma:{
        name:"Asthma",
        value: "asthma"
    },  
       diabetes:{
        name:"Diabetes",
        value: "diabetes"
    }
}

const bloodDisorderForm = {
        sickleCell:{
        name:"Sickle cell",
        value: "sickleCell"
    },
       anaemia:{
        name:"Anaemia",
        value: "anaemia"
    },  
       thalassemia:{
        name:"Thalassemia",
        value: "thalassemia"
    }
}

const cancerForm = {

        gynaelogical:{
        name:"Gynaelogical",
        value: "gynaelogical"
    }
}

const heartDeseaseForm = {

        ccf:{
        name:"CCF",
        value: "ccf"
    },
        rhd:{
        name:"RHD",
        value: "rhd"
    }
}

const diabetesForm = {

        gestationalDiabetes:{
        name:"Gestational diabetes",
        value: "gestationalDiabetes"
    },
        preExistingType1:{
        name:"pre-existing type 1",
        value: "pre-existingType1"
    },
        preExistingType2:{
        name:"pre-existing type 2",
        value: "pre-existingType2"
    }
}

const epilespyForm = {

        epilespy:{
        name:"Epilespy",
        value: "epilespy"
    }
}
const hivTestForm ={

        hivTestRequired:{
        name:"HIV test required",
        value: "hivTestRequired"
    },

        hivTestOrdered:{
        name:"HIV test ordered",
        value: "hivTestOrdered"
    },
        hivTestConducted:{
        name:"HIV test conducted",
        value: "hivTestConducted"
    },

        hivTestNotDone:{
        name:"HIV test not done",
        value: "hivTestNotDone"
    }
}
const hypertensionForm = {

        hypertension:{
        name:"Hypertension",
        value: "hypertension"
    }
}
const kidneyForm = {

        kidney:{
        name:"Kidney",
        value: "kidney"
    }
}
const tbForm = {

        tb:{
        name:"TB",
        value: "tb"
    }
}

const mentalIllinessForm = {

        mentalIlliness:{
        name:"Mental  illiness",
        value: "mentalIlliness"
    }
}
export const useMedicalHistoryStore = defineStore('medicalHistoryStore',{
    state: () => ({
    medicalHistory:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: medicalHistoryForm.dilationAndCurrettage.name,
                            value: medicalHistoryForm.dilationAndCurrettage.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: medicalHistoryForm.Myomectomy.name,
                            value: medicalHistoryForm.Myomectomy.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: medicalHistoryForm.removalOfOvarianCystst.name,
                            value: medicalHistoryForm.removalOfOvarianCystst.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: medicalHistoryForm.Oophorectomy.name,
                            value: medicalHistoryForm.Oophorectomy.value,
                            checked: false
                        }
                        
                    ],
                },
                    
        },
        {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: medicalHistoryForm.Salpingectomy.name,
                            value: medicalHistoryForm.Salpingectomy.name,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
         {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: medicalHistoryForm.cervicalCone.name,
                            value: medicalHistoryForm.cervicalCone.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
     allegies:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.albendazole.name,
                            value: allegiesForm.albendazole.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.aluminiumHydroxide.name,
                            value: allegiesForm.aluminiumHydroxide.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.calcium.name,
                            value: allegiesForm.calcium.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.chamomile.name,
                            value: allegiesForm.chamomile.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.folicAcid.name,
                            value: allegiesForm.folicAcid.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.ginger.name,
                            value: allegiesForm.ginger.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.fish.name,
                            value: allegiesForm.fish.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.iron.name,
                            value: allegiesForm.iron.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.malariaMedication.name,
                            value: allegiesForm.malariaMedication.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.mebendazole.name,
                            value: allegiesForm.mebendazole.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.penicillin.name,
                            value: allegiesForm.penicillin.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: allegiesForm.prEPTenofovirDisoproxilFumarate.name,
                            value: allegiesForm.prEPTenofovirDisoproxilFumarate.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
 exisitingChronicHealthConditions:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: chronicHealthConditionsForm.autoImmuneDesease.name,
                            value: chronicHealthConditionsForm.autoImmuneDesease.value,
                            checked: false
                        }
                        
                    ],
                }
            
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: chronicHealthConditionsForm.asthma.name,
                            value: chronicHealthConditionsForm.asthma.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
                {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: chronicHealthConditionsForm.diabetes.name,
                            value: chronicHealthConditionsForm.diabetes.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
    bloodDisorder:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: bloodDisorderForm.sickleCell.name,
                            value: bloodDisorderForm.sickleCell.value,
                            checked: false
                        }
                        
                    ],
                }
            
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: bloodDisorderForm.anaemia.name,
                            value: bloodDisorderForm.anaemia.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: bloodDisorderForm.thalassemia.name,
                            value:bloodDisorderForm.thalassemia.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
    cancer:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: cancerForm.gynaelogical.name,
                            value: cancerForm.gynaelogical.value,
                            checked: false
                        }
                        
                    ],
                }
            
                    
        },
    ],
 heartDesease:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: heartDeseaseForm.ccf.name,
                            value: heartDeseaseForm.rhd.value,
                            checked: false
                        }
                        
                    ],
                },
                
            
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: heartDeseaseForm.rhd.name,
                            value: heartDeseaseForm.rhd.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
 diabetes:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: diabetesForm.gestationalDiabetes.name,
                            value: diabetesForm.gestationalDiabetes.value,
                            checked: false
                        }
                        
                    ],
                },
                
            
                    
        },
        {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: diabetesForm.preExistingType1.name,
                            value: diabetesForm.preExistingType1.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
         {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: diabetesForm.preExistingType2.name,
                            value: diabetesForm.preExistingType2.value,
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
epilespy:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: epilespyForm.epilespy.name,
                            value: epilespyForm.epilespy.value,
                            checked: false
                        }
                        
                    ],
                },
                
            
                    
        },
    ],
    socialHistory: [
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent:{
                    header:{
                        title: 'Select whether:',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.hivTestRequired.name,
                            value: hivTestForm.hivTestRequired.value
                        },
                        {
                            name: hivTestForm.hivTestOrdered.name,
                            value: hivTestForm.hivTestOrdered.value,
                        },
                        {
                            name:  hivTestForm.hivTestConducted.name,
                            value: hivTestForm.hivTestConducted.value,
                        },
                        {
                            name: hivTestForm.hivTestNotDone.name,
                            value: hivTestForm.hivTestNotDone.value
                        }
                    ]
                }
            },
        ],
  hypertension:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hypertensionForm.hypertension.name,
                            value: hypertensionForm.hypertension.value,
                            checked: false
                        }
                        
                    ],
                },
                
            
                    
        },
    ],
      kidney:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: kidneyForm.kidney.name,
                            value: kidneyForm.kidney.value,
                            checked: false
                        }
                        
                    ],
                },
                
            
                    
        },
    ],
    tb:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: tbForm.tb.name,
                            value: tbForm.tb.value,
                            checked: false
                        }
                        
                    ],
                },
                
            
                    
        },
    ],
 mentalIlliness:[  
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: mentalIllinessForm.mentalIlliness.name,
                            value: mentalIllinessForm.mentalIlliness.value,
                            checked: false
                        }
                        
                    ],
                },
                
            
                    
        },
    ]

    }),
    actions:{
         addMedicalHistory(data:any){
            this.medicalHistory = data
         },
        addAllegies(data:any){
            this.allegies = data
        },
        addExisitingChronicHealthConditions(data:any){
            this.exisitingChronicHealthConditions= data
        },
        addBloodDisorder(data:any){
            this.bloodDisorder = data
        },
        addCancer(data:any){
            this.cancer = data
        },
        addheartDesease(data:any){
            this.heartDesease =data
        },
        addDiabetes(data:any){
            this.diabetes= data
        },
            addEpilespy(data:any){
            this.epilespy= data
        },
           addHypertension(data:any){
            this.hypertension= data
        },
            addKidney(data:any){
            this.kidney = data
        },
            addTb(data:any){
            this.tb = data
        },
    },
    persist:true
});