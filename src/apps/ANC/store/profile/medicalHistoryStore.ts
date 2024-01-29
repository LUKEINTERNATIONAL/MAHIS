import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

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
    },
       otherSurgerirs:{
        name:"",
        value: "otherSurgerirs"
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
    },
        otherAllegies:{
        name:"",
        value: "OtherAllegies"
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
    },
        otherSite:{
        name:"",
        value: "otherSite"
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
    },
        otherDiabetis:{
        name:"",
        value: "otherDiabetis"
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
    },
        testStockOut:{
        name:"Test stock-out",
        value: "testStockOut"
    },
        expiredTests:{
        name:"Expired tests",
        value: " expiredTests"
    },
        hivPositive:{
        name:"HIV Positive",
        value: "hivPositive"
    },  
        hivNegative1:{
        name:"HIV Negative 1",
        value: "hivNegative1"
    },  
        hivNegative2:{
        name:"HIV Negative 2",
        value: "hivNegative2"
    },  
        inconclusive:{
        name:"Inconclusive",
        value: "inconclusive"
    },
        highRiskYes:{
        name:"Yes",
        value: "yes"
    },
        highRiskNo:{
        name:"No",
        value: "no"
    },
        testDate:{
        name:"Test Date",
        value: "testDate"
    },
        reasonsTestNotDone:{
        name:"",
        value: "reasonsTestNotDone"
    }
}

const syphilisForm={

        syphilisTestConducted:{
        name:"Syphilis test conducted",
        value: "syphilisTestConducted"
    },

        syphilisTestOrdered:{
        name:"Syphilis test ordered",
        value: "syphilisTestOrdered"
    },
        syphilisTestNotDone:{
        name:"Syphilis test not done",
        value: "syphilisTestNotDone"
    },

        rapidSyphilisTest:{
        name:"Rapid syphilis test",
        value: "rapidSyphilisTest"
    },
        offSiteLabTest:{
        name:"Off-site lab test",
        value: "offSiteLabTest"
    },
        treponemaPallidum:{
        name:"treponema pallidum heamagglutination (TPHA)",
        value: "treponemaPallidum"
    },
        testStockOut:{
        name:"Test stock-out",
        value: "testStockOut"
    },  
        expiredTests:{
        name:"Expired tests",
        value: "expiredTests"
    },  
        syphilisPositiveResults:{
        name:"Syphilis positive",
        value: "syphilisPositiveResults"
    },  
        syphilisNegativeResults:{
        name:"Syphilis negative",
        value: "syphilisNegativeResults"
    },
        syphilisPositiveDiagnosis:{
        name:"Syphilis positive",
        value: "syphilisPositiveDiagnosis"
    },
        syphilisNegativeDiagnosis:{
        name:"Syphilis Negative",
        value: "syphilisNegativeDiagnosis"
    },
        testDate:{
        name:"Test Date",
        value: "testDate"
    },
        reasonsTestNotDone:{
        name:"",
        value: "reasonsTestNotDone"
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

const otherSiteForm = {

        otherSite:{
        name:"",
        value: "otherSite"
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other surgeries',
                                    value: medicalHistoryForm.otherSurgerirs.name,
                                    name: medicalHistoryForm.otherSurgerirs.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
    ],
     allegy:[  
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            name: allegiesForm.folicAcid.name,
                            value: allegiesForm.folicAcid.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
           {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other Allegies',
                                    value: allegiesForm.otherAllegies.name,
                                    name: allegiesForm.otherAllegies.value,
                                    eventType: 'input',
                                     inputWidth: "300px",
                                    required: true
                                }
                                
                            ]
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
    blood:[  
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
    cancerIssue:[  
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
            
                    
        },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other Site',
                                    value: cancerForm.otherSite.name,
                                    name: cancerForm.otherSite.value,
                                    eventType: 'input',
                                     inputWidth: "300px",
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
    ],
 heartProblem:[  
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                        title: 'Diabetes',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: diabetesForm.gestationalDiabetes.name,
                            value: diabetesForm.gestationalDiabetes.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
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
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
         {
             classDash: 'dashed_bottom_border',
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other Site',
                                    value: diabetesForm.otherDiabetis.name,
                                    name: diabetesForm.otherDiabetis.value,
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
                            value:epilespyForm.epilespy.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
         hivTest: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Select whether:',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.hivTestRequired.name,
                            value: hivTestForm.hivTestRequired.value,
                            
                        },
                    ]
                }
            },
            {
             classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.hivTestOrdered.name,
                            value: hivTestForm.hivTestOrdered.value,
                        },
                    ]
                }
            },
            {
             classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name:  hivTestForm.hivTestConducted.name,
                            value: hivTestForm.hivTestConducted.value,
                        },
                    ]
                }
            },
            {
             classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.hivTestNotDone.name,
                            value: hivTestForm.hivTestNotDone.value
                        },
                    ]
                }
            },
            {
            classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: 'Reasons HIV test not done:',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.testStockOut.name,
                            value: hivTestForm.testStockOut.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        },
                        
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
                            name: hivTestForm.expiredTests.name,
                            value:hivTestForm.expiredTests.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked:false
                        }
                        
                    ],
                }
                    
            },
            {   
                classDash: 'dashed_bottom_border',
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other reason test not conducted (specify)',
                                    value: hivTestForm.reasonsTestNotDone.name,
                                    name: hivTestForm.reasonsTestNotDone.value,
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
                classDash: 'dashed_bottom_border',
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'HIV test date',
                                    icon: icons.calenderPrimary,
                                    value: '',
                                    name: 'birthdate',
                                    eventType: 'blur',
                                    inputWidth: "300px",
                                    required: true,
                                    isDatePopover: true
                                }
                                
                            ]
                        }
                    ],
                    
                },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Select the result of HIV test',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.hivPositive.name,
                            value: hivTestForm.hivPositive.value
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.hivNegative1.name,
                            value: hivTestForm.hivNegative1.value,
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name:  hivTestForm.hivNegative2.name,
                            value: hivTestForm.hivNegative2.value,
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Select the result of HIV test',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.inconclusive.name,
                            value: hivTestForm.inconclusive.value
                        }
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Is the woman at high risk of HIV?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.highRiskYes.name,
                            value: hivTestForm.highRiskYes.value
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: hivTestForm.highRiskNo.name,
                            value: hivTestForm.highRiskNo.value,
                        },
                    ]
                }
            },
         ],
          syphilisTest: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Select whether:',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: syphilisForm.syphilisTestConducted.name,
                            value: syphilisForm.syphilisTestConducted.value
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: syphilisForm.syphilisTestOrdered.name,
                            value: syphilisForm.syphilisTestOrdered.value,
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name:  syphilisForm.syphilisTestNotDone.name,
                            value: syphilisForm.syphilisTestNotDone.value,
                        },
                    ]
                }
            },
            {
            classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Select the type of syphilis test that was done',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: syphilisForm.rapidSyphilisTest.name,
                            value: syphilisForm.rapidSyphilisTest.value,
                            checked: false
                        },
                        
                    ],
                }
                    
            },
            {
            classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: syphilisForm.offSiteLabTest.name,
                            value: syphilisForm.offSiteLabTest.value,
                            checked:false
                        },
                        
                    ],
                }
                    
            },
                        {
            classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: syphilisForm.treponemaPallidum.name,
                            value: syphilisForm.treponemaPallidum.value,
                            checked:false
                        }
                        
                    ],
                }
                    
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:{
                    header:{
                        title: 'Reason syphilis test not done',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: syphilisForm.testStockOut.name,
                            value: syphilisForm.testStockOut.value,
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between'
                            
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:{
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[

                        {
                            name: syphilisForm.expiredTests.name,
                            value: syphilisForm.expiredTests.value,
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between'
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
                                    inputHeader: 'Other reason test not conducted (specify)',
                                    value: syphilisForm.syphilisTestNotDone.name,
                                    name: syphilisForm.syphilisTestNotDone.value,
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Syphilis test date',
                                    icon: icons.calenderPrimary,
                                    value: '',
                                    name: 'birthdate',
                                    eventType: 'blur',
                                    required: true,
                                     inputWidth: "300px",
                                    isDatePopover: true
                                }
                                
                            ]
                        }
                    ],
                    
                },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Syphilis test result',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: syphilisForm.syphilisPositiveResults.name,
                            value: syphilisForm.syphilisPositiveResults.value
                        },
                        {
                            name: syphilisForm.syphilisNegativeResults.name,
                            value: syphilisForm.syphilisNegativeResults.value,
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
                        title: 'Syphilis diagnosis',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: syphilisForm.syphilisPositiveDiagnosis.name,
                            value: syphilisForm.syphilisPositiveDiagnosis.value
                        },
                        {
                            name: syphilisForm.syphilisNegativeDiagnosis.name,
                            value: syphilisForm.syphilisNegativeDiagnosis.value,
                        },
                    ]
                }
            },
        ],
      hKTMI:[  
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
    ],
    otherSite:[
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Other Site',
                                    value: otherSiteForm.otherSite.name,
                                    name: otherSiteForm.otherSite.value,
                                    eventType: 'input',
                                     inputWidth: "400px",
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
    ]

    }),
    actions:{
         addMedicalHistory(data:any){
            this.medicalHistory = data
         },
        addAllegy(data:any){
            this.allegy =data
        },
        addExisitingChronicHealthConditions(data:any){
            this.exisitingChronicHealthConditions= data
        },
        addBloodDisorders(data:any){
            this.blood = data
        },
        addCancer(data:any){
            this.cancerIssue = data
        },
        addheartDesease(data:any){
            this.heartProblem =data
        },
        addDiabetes(data:any){
            this.diabetes= data
        },
            addhivTest(data:any){
                this.hivTest =data
        },
            addSyphilisTest(data:any){
                this.syphilisTest = data
        },
           addHypertension(data:any){
            this.hKTMI= data
        },
        addOtherSite(data:any){
            this.otherSite = data
        }
    },
    persist:true
});