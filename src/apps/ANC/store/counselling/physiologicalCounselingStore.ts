import { defineStore } from "pinia"
import { icons } from '@/utils/svg';

const physiologicalCousellingForm ={
    cousellingOnNonPharmacologicalYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnNonPharmacologicalNo:{
        name:"No",
        value:"noPharmacological"
    },
        clientReferredOnNonPharmacological:{
        name:"Client was referred",
        value:"clientReferredOnNonPharmacological"
    },
        otherOnNonPharmacological:{
        name:'Other',
        value:'otherOnNonPharmacological'
    },
        specifyOnNonPharmacological:{
        name:"SpecifyNonP",
        value:""
    },
        cousellingOnPharmacologicalTreatmentYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnPharmacologicalTreatmentNo:{
        name:"No",
        value:"noPharmacologicalTreatment"
    },
        clientReferredOnPharmacologicalTreatment:{
        name:"Client was referred",
        value:"clientReferredOnPharmacologicalTreatment"
    },
        otherOnPharmacologicalTreatment:{
        name:'Other',
        value:'otherOnPharmacologicalTreatment'
    },
        specifyOnPharmacologicalTreatment:{
        name:"SpecifyPT",
        value:""
    },
        cousellingOnDietLifestyleYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnDietLifestyleNo:{
        name:"no",
        value:"noDiet"
    },
        clientReferredOnDietLifestyle:{
        name:"Client was referred",
        value:"clientReferredOnDietLifestyle"
    },
        otherOnDietLifestyle:{
        name:'Other',
        value:'otherOnDietLifestyle'
    },
        specifyOnDietLifestyle:{
        name:"SpecifyL",
        value:""
    },
        cousellingOnAntacidYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnAntacidNo:{
        name:"No",
        value:"noAntacid"
    },
        clientReferredOnAntacid:{
        name:"Client was referred",
        value:"clientReferredOnAntacid"
    },
        otherOnAntacid:{
        name:'Other',
        value:'otherOnAntacid'
    },
        specifyOnAntacid:{
        name:"SpecifyAcid",
        value:""
    },
        cousellingOnLegCrapsYes:{
        name:"Yes",
        value:"yes"
    },
       cousellingOnLegCrapsNo:{
        name:"No",
        value:"noLegCrap"
    },
        clientReferredOnLegCraps:{
        name:"Client was referred",
        value:"clientReferredOnLegCraps"
    },
        otherOnLegCraps:{
        name:'Other',
        value:'otherOnLegCraps'
    },
        specifyOnLegCraps:{
        name:"SpecifyLC",
        value:""
    },
        cousellingOnUseMagnesiumCalciumOnLegCrapsYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnUseMagnesiumCalciumOnLegCrapsNo:{
        name:"No",
        value:"noMagnesiumCalcium"
    },
        clientReferredOnUseMagnesiumCalciumOnLegCraps:{
        name:"Client was referred",
        value:"clientReferredOnUseMagnesiumCalciumOnLegCraps"
    },
        otherOnUseMagnesiumCalciumOnLegCraps:{
        name:'Other',
        value:'otherOnUseMagnesiumCalciumOnLegCraps'
    },
        specifyOnUseMagnesiumCalciumOnLegCraps:{
        name:"SpecifyCraps",
        value:""
    },

        cousellingOnDietaryOnConstipationYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnDietaryOnConstipationNo:{
        name:"No",
        value:"noConstipation"
    },
        clientReferredOnDietaryOnConstipation:{
        name:"Client was referred",
        value:"clientReferredOnDietaryOnConstipation"
    },
        otherOnDietaryOnConstipation:{
        name:'Other',
        value:'otherOnDietaryOnConstipation'
    },
        specifyOnDietaryOnConstipation:{
        name:"SpecifyConstipation",
        value:""
    },
        cousellingOnUseOfWheatYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnUseOfWheatNo:{
        name:"No",
        value:"noWheat"
    },
        clientReferredOnUseOfWheat:{
        name:"Client was referred",
        value:"clientReferredOnUseOfWheat"
    },
        otherOnUseOfWheat:{
        name:'Other',
        value:'otherOnUseOfWheat'
    },
        specifyOnDietaryOnUseOfWheat:{
        name:"useWheat",
        value:""
    },
        cousellingOnRegularExerciseYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnRegularExerciseNo:{
        name:"No",
        value:"noExercise"
    },
        clientReferredOnRegularExercise:{
        name:"Client was referred",
        value:"clientReferredOnRegularExercise"
    },
        otherOnRegularExercise:{
        name:'Other',
        value:'otherOnRegularExercise'
    },
        specifyOnRegularExercise:{
        name:"specifyExercise",
        value:""
    },
        cousellingOnVaricoseVeinsandOedemaYes:{
        name:"Yes",
        value:"yes"
    },
        cousellingOnVaricoseVeinsandOedemaNo:{
        name:"No",
        value:"noOedema"
    },
        clientReferredOnVaricoseVeinsandOedema:{
        name:"Client was referred",
        value:"clientReferredOnVaricoseVeinsandOedema"
    },
        otherOnVaricoseVeinsandOedema:{
        name:'other',
        value:'otherOnVaricoseVeinsandOedema'
    },
        specifyOnVaricoseVeinsandOedema:{
        name:"VeinsaOedema",
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
                        selectedValue: '',
                        name:'nonPharmacological'
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
                radioBtnContent:{
                    header:{
                        title: 'Reason counselling on non-pharmacological measures to reduce nausea and vomiting not conducted',
                        selectedValue: '',
                        name:'reasonNonPharmacological',
                        displayNone:'true'
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displayNone:true,
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
                        selectedValue: '',
                        name:'nauseaVomiting'
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on pharmalogical was not conducted?',
                        selectedValue: '',
                        name:'reasonNauseaVomiting',
                        displayNone:true
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                { 
                                    displaNone:true,
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
                        selectedValue: '',
                        name:'diet'
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on diet and lifestyle was not conducted?',
                        selectedValue: '',
                        name:'reasonDiet',
                        displayNone:'true',
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displayNone:true,
                                    inputHeader: 'Specify',
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
                        selectedValue: '',
                        name:'antacid'
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on antacid was not done?',
                        selectedValue: '',
                        name:'counsellingAntacid',
                        displayNone:true
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Specify',
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
                        selectedValue: '',
                        name:"legCraps"
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on  sysmptions for leg craps was not done?',
                        selectedValue: '',
                        name:'reasonsLegCraps',
                        displayNone:true
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displayNone:'true',
                                    inputHeader: 'Specify',
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
                        selectedValue: '',
                        name:"useOfMagnesium"
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on  use of magnesium and calcium to relieve leg cramps was not done?',
                        selectedValue: '',
                        name:'reasonOnUseofMagnesium',
                        displayNone:true,
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displaNone:true,
                                    inputHeader: 'specify',
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
                        selectedValue: '',
                        name:'constipattion'
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on  dietary modifications to relieve constipation was not done?',
                        selectedValue: '',
                        name:'reasonConstipation',
                        displayNone:true
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Specify',
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
                        selectedValue: '',
                        name:'useWheat'
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on  the use of wheat was not done?',
                        selectedValue: '',
                        name:'counsellingWheat',
                        displayNone: true
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displayNone:true,
                                    inputHeader: 'specify',
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
                        selectedValue: '',
                        name:'excersise'
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling on regular exercise was not done?',
                        selectedValue: '',
                        name:'counsellingExcerise'
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displayNone:true,
                                    inputHeader: 'Specify',
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
                        selectedValue: '',
                        name:'oedema'
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
                radioBtnContent:{
                    header:{
                        title: 'Reason couselling for varicose veins and oedema was not done?',
                        selectedValue: '',
                        name:'counsellingOedema',
                        displayNone:true
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
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displayNone:true,
                                    inputHeader: 'Specify',
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