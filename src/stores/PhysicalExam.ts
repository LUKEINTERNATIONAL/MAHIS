import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import { radio } from "ionicons/icons";
import { size } from "lodash";

export const usePhysicalExaminationStore = defineStore("physicalExamStore", {
    state: () => ({
       physicalExam: [
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Physical examination done?",
                       selectedValue: "",
                       name: "Physical examination done",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                   ],
               },
           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Reason why physical examination done?",
                       selectedValue: "",
                       name: "Yes",
                   },
                   data: [
                       {
                           value: "condition does not necessitate assessment",
                           name: "Condition does not necessitate assessment",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "patient refused to consent",
                           name: "Patient refused to consent",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                   ],
               },
           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Eyes normal?",
                       selectedValue: "",
                       name: "Yes",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           title: 'Select abnormality',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Parlour',
                               disabled:false,
                               value: 'parlour',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Jaundice',
                               disabled:false,
                               value:'jaundice',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Ulcerations',
                               disabled:false,
                               value: 'ulcerations',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '9',
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
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Mouth normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: '7',
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: '7',
                           justify: "space-between",
                       },
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
                           title: 'Select abnormality',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Oral thrush',
                               disabled:false,
                               value: 'oral thrush',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Kaposi’s Sarcoma lesions',
                               disabled:false,
                               value:'kaposi’s Sarcoma lesions',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Sores',
                               disabled:false,
                               value: 'sores',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '9',
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
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Ears normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           title: 'Select abnormality',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Discharge',
                               disabled:false,
                               value: 'discharge',
                               labelPlacement: "start",
                               colSize: '7',
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
                               name: 'Bleeding',
                               disabled:false,
                               value:'bleeding',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '9',
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
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Face normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           title: 'Select abnormality',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Rash',
                               disabled:false,
                               value: 'rash',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: '`Swelling',
                               disabled:false,
                               value:'swelling',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '9',
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
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },

           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Neck normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           title: 'Select abnormality',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Rash',
                               disabled:false,
                               value: 'rash',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Swelling',
                               disabled:false,
                               value:'swelling',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Mass',
                               disabled:false,
                               value:'mass',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '9',
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
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },

           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Chest inspection normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: '9',
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Rash',
                               disabled:false,
                               value: 'rash',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Burns',
                               disabled:false,
                               value:'burns',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Bruises',
                               disabled:false,
                               value:'bruises',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Wounds',
                               disabled:false,
                               value:'wounds',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '9',
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
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Chest movement",
                       selectedValue: "",
                       name: "Chest movement",
                   },
                   data: [
                       {
                           value: "symmetrical",
                           name: "Symmetrical",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "asymmetrical",
                           name: "Asymmetrical",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                   ],
               },
           },

           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Heart sounds normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Loud P2',
                               disabled:false,
                               value: 'loud p2',
                               labelPlacement: 'end',
                               colSize: '9',
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
                               name: 'Splitting P2',
                               disabled:false,
                               value:'splitting P2',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Gallop rhythm',
                               disabled:false,
                               value:'gallop rhythm',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Murmur',
                               disabled:false,
                               value:'murmur',
                               labelPlacement: "start",
                               colSize: '9',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Breath sounds normal",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Absent',
                               disabled:false,
                               value: 'absent',
                               labelPlacement: "start",
                               colSize: '9',
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
                               name: 'Reduced',
                               disabled:false,
                               value:'reduced',
                               labelPlacement: "start",
                               colSize: '9',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }

           },
           {
               classDash: 'dashed_bottom_bordder',
               checkboxBtnContent:
                   {
                       header:{
                           title: '',
                           selectedValue: ''
                       },
                       data:[
                           {
                               name: 'Added',
                               disabled:false,
                               value:'added',
                               labelPlacement: "start",
                               colSize: '9',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },

           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Breath sounds normal",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Clackles',
                               disabled:false,
                               value: 'clackles',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Wheezes',
                               disabled:false,
                               value:'wheezes',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Bronchial',
                               disabled:false,
                               value:'bronchial',
                               labelPlacement: "start",
                               colSize: '6',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },
           {
               classDash: 'dashed_bottom_bordder',
               checkboxBtnContent:
                   {
                       header:{
                           title: '',
                           selectedValue: ''
                       },
                       data:[
                           {
                               name: 'Bronchial',
                               disabled:false,
                               value:'bronchial',
                               labelPlacement: "start",
                               colSize: '6',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },
           {
               classDash: 'dashed_bottom_bordder',
               checkboxBtnContent:
                   {
                       header:{
                           title: '',
                           selectedValue: ''
                       },
                       data:[
                           {
                               name: 'Crepitations',
                               disabled:false,
                               value:'Crepitations',
                               labelPlacement: "start",
                               colSize: '6',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Abdominal inspection normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Abdominal distension',
                               disabled:false,
                               value: 'abdominal distension',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Rash',
                               disabled:false,
                               value:'rash',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Wound',
                               disabled:false,
                               value:'wound',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Laceration',
                               disabled:false,
                               value:'laceration',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Bruise',
                               disabled:false,
                               value:'bruise',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Burn',
                               disabled:false,
                               value:'burn',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Other',
                               disabled:false,
                               value:'other',
                               labelPlacement: "start",
                               colSize: '6',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },
           {
               data:{
                   rowData:[
                       {
                           colData:[
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },

           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Abdominal Auscultation normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Bruit',
                               disabled:false,
                               value: 'bruit',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Bowel sounds',
                               disabled:false,
                               value:'bowel sounds',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Hyperactive',
                               disabled:false,
                               value:'hyperactive',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Reduced bowel sounds',
                               disabled:false,
                               value:'reduced bowel sounds',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Absent',
                               disabled:false,
                               value:'absent',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Other',
                               disabled:false,
                               value:'other',
                               labelPlacement: 'end',
                               colSize: '6',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },
           {
               data:{
                   rowData:[
                       {
                           colData:[
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Abdominal Palpation normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Tenderness',
                               disabled:false,
                               value: 'tenderness',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Hepatomegaly',
                               disabled:false,
                               value:'hepatomegaly',
                               labelPlacement: "start",                               colSize: '6',
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
                               name: 'Splenomegaly',
                               disabled:false,
                               value:'splenomegaly',
                               labelPlacement: 'end',
                               colSize: '6',
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
                               name: 'Kidney ballotab',
                               disabled:false,
                               value:'kidney ballotab',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Other masses',
                               disabled:false,
                               value:'other masses',
                               labelPlacement: "start",
                               colSize: '6',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },
           {
               data:{
                   rowData:[
                       {
                           colData:[
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
                                   required: true
                               }

                           ]
                       }
                   ],

               }

           },
           {
               selectdData: [],
               classDash: "dashed_bottom_border",
               radioBtnContent: {
                   header: {
                       title: "Genital examination normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "start",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "no",
                           name: "No",
                           labelPlacement: "end",
                           colSize: "7",
                           justify: "space-between",
                       },
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
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Warts',
                               disabled:false,
                               value: 'warts',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Vesicles',
                               disabled:false,
                               value:'vesicles',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Growths',
                               disabled:false,
                               value:'growths',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Genital sores',
                               disabled:false,
                               value:'genital sores',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Urethral meatus abnormal',
                               disabled:false,
                               value:'urethral meatus abnormal',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Oedema',
                               disabled:false,
                               value:'oedema',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Abnormal discharge',
                               disabled:false,
                               value:'abnormal discharge',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Scrotal swelling',
                               disabled:false,
                               value:'scrotal swelling',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Testes swelling',
                               disabled:false,
                               value:'testes swelling',
                               labelPlacement: "start",
                               colSize: '6',
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
                               name: 'Other',
                               disabled:false,
                               value:'other',
                               labelPlacement: 'end',
                               colSize: '6',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },
           {
               data:{
                   rowData:[
                       {
                           colData:[
                               {   displayNone:true,
                                   inputHeader: 'specify',
                                   icon: icons.editPen,
                                   value: 'other',
                                   name: 'Other',
                                   eventType: 'input',
                                   inputWidth: "100%",
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
                               name: 'Visible bleeding',
                               disabled:false,
                               value:'visible bleeding',
                               labelPlacement: "start",
                               colSize: '6',
                               justify: 'space-between',
                               checked: false
                           },
                       ],
                   }
           },

       ] as any
    }),
    actions: {
        setPhysicalExamStore(data: any) {
            this.physicalExam = data;
        },
    },
    persist: true,
});
