import { defineStore } from "pinia"
import { icons } from '@/utils/svg';

const physiologicalCousellingForm ={
    cousellingOnNonPharmacologicalYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnNonPharmacologicalNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnNonPharmacological:{
        name:"Client was referred",
        value:"clientReferredOnNonPharmacological"
    },
        otherOnNonPharmacological:{
        name:'Other On non-Pharmacological',
        value:'otherOnNonPharmacological'
    },
        specifyOnNonPharmacological:{
        name:"Specify On non-Pharmacological",
        value:""
    },
        cousellingOnPharmacologicalTreatmentYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnPharmacologicalTreatmentNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnPharmacologicalTreatment:{
        name:"Client was referred",
        value:"clientReferredOnPharmacologicalTreatment"
    },
        otherOnPharmacologicalTreatment:{
        name:'Other On Pharmacological Treatment',
        value:'otherOnPharmacologicalTreatment'
    },
        specifyOnPharmacologicalTreatment:{
        name:"Specify On Pharmacological Treatment",
        value:""
    },
        cousellingOnDietLifestyleYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnDietLifestyleNo:{
        name:"no",
        value:"no"
    },
        clientReferredOnDietLifestyle:{
        name:"Client was referred",
        value:"clientReferredOnDietLifestyle"
    },
        otherOnDietLifestyle:{
        name:'Other On Diet Life style',
        value:'otherOnDietLifestyle'
    },
        specifyOnDietLifestyle:{
        name:"Specify On Diet Life style",
        value:""
    },
        cousellingOnAntacidYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnAntacidNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnAntacid:{
        name:"Client was referred",
        value:"clientReferredOnAntacid"
    },
        otherOnAntacid:{
        name:'Other On Ant acid',
        value:'otherOnAntacid'
    },
        specifyOnAntacid:{
        name:"Specify On Ant acid",
        value:""
    },
        cousellingOnLegCrapsYes:{
        name:"Yes",
        value:"yes"
    },
       cousellingOnLegCrapsNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnLegCraps:{
        name:"Client was referred",
        value:"clientReferredOnLegCraps"
    },
        otherOnLegCraps:{
        name:'Other On Leg Craps',
        value:'otherOnLegCraps'
    },
        specifyOnLegCraps:{
        name:"Specify On Leg Craps",
        value:""
    },
        cousellingOnUseMagnesiumCalciumOnLegCrapsYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnUseMagnesiumCalciumOnLegCrapsNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnUseMagnesiumCalciumOnLegCraps:{
        name:"Client was referred",
        value:"clientReferredOnUseMagnesiumCalciumOnLegCraps"
    },
        otherOnUseMagnesiumCalciumOnLegCraps:{
        name:'Other On Use Magnesium Calcium  On Leg Craps',
        value:'otherOnUseMagnesiumCalciumOnLegCraps'
    },
        specifyOnUseMagnesiumCalciumOnLegCraps:{
        name:"Specify On Leg Craps",
        value:""
    },

        cousellingOnDietaryOnConstipationYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnDietaryOnConstipationNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnDietaryOnConstipation:{
        name:"Client was referred",
        value:"clientReferredOnDietaryOnConstipation"
    },
        otherOnDietaryOnConstipation:{
        name:'Other On Dietary On Constipation',
        value:'otherOnDietaryOnConstipation'
    },
        specifyOnDietaryOnConstipation:{
        name:"Specify On Dietary On Constipation",
        value:""
    },
        cousellingOnUseOfWheatYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnUseOfWheatNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnUseOfWheat:{
        name:"Client was referred",
        value:"clientReferredOnUseOfWheat"
    },
        otherOnUseOfWheat:{
        name:'Other On Use Of  Wheat',
        value:'otherOnUseOfWheat'
    },
        specifyOnDietaryOnUseOfWheat:{
        name:"Specify On Use Of Wheat",
        value:""
    },
        cousellingOnRegularExerciseYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnRegularExerciseNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnRegularExercise:{
        name:"Client was referred",
        value:"clientReferredOnRegularExercise"
    },
        otherOnRegularExercise:{
        name:'Other On Regular Exercise',
        value:'otherOnRegularExercise'
    },
        specifyOnRegularExercise:{
        name:"Specify On Regular Exercise",
        value:""
    },
        cousellingOnVaricoseVeinsandOedemaYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnVaricoseVeinsandOedemaNo:{
        name:"No",
        value:"no"
    },
        clientReferredOnVaricoseVeinsandOedema:{
        name:"Client was referred",
        value:"clientReferredOnVaricoseVeinsandOedema"
    },
        otherOnVaricoseVeinsandOedema:{
        name:'Other On Regular Exercise',
        value:'otherOnRegularExercise'
    },
        specifyOnVaricoseVeinsandOedema:{
        name:"Specify On specify On Varicose Veinsa nd Oedema",
        value:""
    },
   
}

export const usePhysiologicalCounselingStore = defineStore('physiologicalCounselingStore',{
    state: () =>({
        physiologicalCounselingInfo:[

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Counselling conducted on non-pharmacological measures to reduce nausea and vomiting?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnNonPharmacologicalYes.name,
                            value: physiologicalCousellingForm.cousellingOnNonPharmacologicalYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnNonPharmacologicalNo.name,
                            value: physiologicalCousellingForm.cousellingOnNonPharmacologicalNo.value,
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
                        title: 'Reason counselling on non-pharmacological measures to reduce nausea and vomiting not conducted',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnNonPharmacological.name,
                            value: physiologicalCousellingForm.clientReferredOnNonPharmacological.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnNonPharmacological.name,
                            value: physiologicalCousellingForm.otherOnNonPharmacological.value,
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
                                    name: physiologicalCousellingForm.specifyOnNonPharmacological.name,
                                    value: physiologicalCousellingForm.specifyOnNonPharmacological.value,
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
                        title: 'Counselling conducted on pharmacological treatment for nausea and vomiting?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnPharmacologicalTreatmentYes.name,
                            value: physiologicalCousellingForm.cousellingOnPharmacologicalTreatmentYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnPharmacologicalTreatmentNo.name,
                            value: physiologicalCousellingForm.cousellingOnPharmacologicalTreatmentNo.value,
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
                        title: 'Reason couselling on pharmalogical was not conducted?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnPharmacologicalTreatment.name,
                            value: physiologicalCousellingForm.clientReferredOnPharmacologicalTreatment.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnPharmacologicalTreatment.name,
                            value: physiologicalCousellingForm.otherOnPharmacologicalTreatment.value,
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
                                    name: physiologicalCousellingForm.specifyOnPharmacologicalTreatment.name,
                                    value: physiologicalCousellingForm.specifyOnPharmacologicalTreatment.value,
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
                        title: 'Counselling  conducted on diet and lifestyle?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnDietLifestyleYes.name,
                            value: physiologicalCousellingForm.cousellingOnDietLifestyleYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnDietLifestyleNo.name,
                            value: physiologicalCousellingForm.cousellingOnDietLifestyleNo.value,
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
                        title: 'Reason couselling on diet and lifestyle was not conducted?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnDietLifestyle.name,
                            value: physiologicalCousellingForm.clientReferredOnDietLifestyle.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnDietLifestyle.name,
                            value: physiologicalCousellingForm.otherOnDietLifestyle.value,
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
                                    name: physiologicalCousellingForm.specifyOnDietLifestyle.name,
                                    value: physiologicalCousellingForm.specifyOnDietLifestyle.value,
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
                        title: 'Counselling  conducted on antacid?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnAntacidYes.name,
                            value: physiologicalCousellingForm.cousellingOnAntacidYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnAntacidNo.name,
                            value: physiologicalCousellingForm.cousellingOnAntacidNo.value,
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
                        title: 'Reason couselling on antacid was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnAntacid.name,
                            value: physiologicalCousellingForm.clientReferredOnAntacid.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnAntacid.name,
                            value: physiologicalCousellingForm.otherOnAntacid.value,
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
                                    name: physiologicalCousellingForm.specifyOnAntacid.name,
                                    value: physiologicalCousellingForm.specifyOnAntacid.value,
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
                        title: 'Counselling  conducted on symptoms of leg craps?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnLegCrapsYes.name,
                            value: physiologicalCousellingForm.cousellingOnLegCrapsYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnLegCrapsNo.name,
                            value: physiologicalCousellingForm.cousellingOnLegCrapsNo.value,
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
                        title: 'Reason couselling on  sysmptions for leg craps was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnLegCraps.name,
                            value: physiologicalCousellingForm.clientReferredOnLegCraps.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnLegCraps.name,
                            value: physiologicalCousellingForm.otherOnLegCraps.value,
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
                                    name: physiologicalCousellingForm.specifyOnLegCraps.name,
                                    value: physiologicalCousellingForm.specifyOnLegCraps.value,
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
                        title: 'Counselling  conducted on the use magnesium and calcium to relieve leg cramps?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnUseMagnesiumCalciumOnLegCrapsYes.name,
                            value: physiologicalCousellingForm.cousellingOnUseMagnesiumCalciumOnLegCrapsYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnUseMagnesiumCalciumOnLegCrapsNo.name,
                            value: physiologicalCousellingForm.cousellingOnUseMagnesiumCalciumOnLegCrapsNo.value,
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
                        title: 'Reason couselling on  use of magnesium and calcium to relieve leg cramps was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnUseMagnesiumCalciumOnLegCraps.name,
                            value: physiologicalCousellingForm.clientReferredOnUseMagnesiumCalciumOnLegCraps.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnUseMagnesiumCalciumOnLegCraps.name,
                            value: physiologicalCousellingForm.otherOnUseMagnesiumCalciumOnLegCraps.value,
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
                                    name: physiologicalCousellingForm.specifyOnUseMagnesiumCalciumOnLegCraps.name,
                                    value: physiologicalCousellingForm.specifyOnUseMagnesiumCalciumOnLegCraps.value,
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
                        title: 'Counselling  conducted on dietary modifications to relieve constipation?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnDietaryOnConstipationYes.name,
                            value: physiologicalCousellingForm.cousellingOnDietaryOnConstipationYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnDietaryOnConstipationNo.name,
                            value: physiologicalCousellingForm.cousellingOnDietaryOnConstipationNo.value,
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
                        title: 'Reason couselling on  dietary modifications to relieve constipation was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnDietaryOnConstipation.name,
                            value: physiologicalCousellingForm.clientReferredOnDietaryOnConstipation.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnDietaryOnConstipation.name,
                            value: physiologicalCousellingForm.otherOnDietaryOnConstipation.value,
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
                                    name: physiologicalCousellingForm.specifyOnDietaryOnConstipation.name,
                                    value: physiologicalCousellingForm.specifyOnDietaryOnConstipation.value,
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
                        title: 'Counselling  conducted on the use of wheat?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnUseOfWheatYes.name,
                            value: physiologicalCousellingForm.cousellingOnUseOfWheatYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnUseOfWheatNo.name,
                            value: physiologicalCousellingForm.cousellingOnUseOfWheatNo.value,
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
                        title: 'Reason couselling on  the use of wheat was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnUseOfWheat.name,
                            value: physiologicalCousellingForm.clientReferredOnUseOfWheat.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnUseOfWheat.name,
                            value: physiologicalCousellingForm.otherOnUseOfWheat.value,
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
                                    name: physiologicalCousellingForm.specifyOnDietaryOnUseOfWheat.name,
                                    value: physiologicalCousellingForm.specifyOnDietaryOnUseOfWheat.value,
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
                        title: 'Counselling  conducted on regular exercise?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnRegularExerciseYes.name,
                            value: physiologicalCousellingForm.cousellingOnRegularExerciseYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnRegularExerciseNo.name,
                            value: physiologicalCousellingForm.cousellingOnRegularExerciseNo.value,
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
                        title: 'Reason couselling on regular exercise was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnRegularExercise.name,
                            value: physiologicalCousellingForm.clientReferredOnRegularExercise.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnRegularExercise.name,
                            value: physiologicalCousellingForm.otherOnRegularExercise.value,
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
                                    name: physiologicalCousellingForm.specifyOnRegularExercise.name,
                                    value: physiologicalCousellingForm.specifyOnRegularExercise.value,
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
                        title: 'Counselling  conducted on  varicose veins and  oedema?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.cousellingOnVaricoseVeinsandOedemaYes.name,
                            value: physiologicalCousellingForm.cousellingOnVaricoseVeinsandOedemaYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.cousellingOnVaricoseVeinsandOedemaNo.name,
                            value: physiologicalCousellingForm.cousellingOnVaricoseVeinsandOedemaNo.value,
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
                        title: 'Reason couselling for varicose veins and oedema was not done?',
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: physiologicalCousellingForm.clientReferredOnVaricoseVeinsandOedema.name,
                            value: physiologicalCousellingForm.clientReferredOnVaricoseVeinsandOedema.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: physiologicalCousellingForm.otherOnVaricoseVeinsandOedema.name,
                            value: physiologicalCousellingForm.otherOnVaricoseVeinsandOedema.value,
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
                                    name: physiologicalCousellingForm.specifyOnVaricoseVeinsandOedema.name,
                                    value: physiologicalCousellingForm.specifyOnVaricoseVeinsandOedema.value,
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
        addPhysiologicalCounselingInfo(data:any){
            this.physiologicalCounselingInfo = data
        }
    },
    persist:true
})