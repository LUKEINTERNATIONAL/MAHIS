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
                           title: '',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Parlour',
                               disabled:false,
                               value: 'parlour',
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
                               name: 'Jaundice',
                               disabled:false,
                               value:'jaundice',
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
                               name: 'Ulcerations',
                               disabled:false,
                               value: 'ulcerations',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '6',
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
                               name: 'Oral thrush',
                               disabled:false,
                               value: 'oral thrush',
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
                               name: 'Kaposi’s Sarcoma lesions',
                               disabled:false,
                               value:'kaposi’s Sarcoma lesions',
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
                               name: 'Sores',
                               disabled:false,
                               value: 'sores',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '6',
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
                           title: '',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Discharge',
                               disabled:false,
                               value: 'discharge',
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
                               name: 'Bleeding',
                               disabled:false,
                               value:'bleeding',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '6',
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
                           title: '',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Rash',
                               disabled:false,
                               value: 'rash',
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
                               name: '`Swelling',
                               disabled:false,
                               value:'swelling',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '6',
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
                           title: '',
                           selectedValue: '',

                       },
                       data:[
                           {
                               name: 'Rash',
                               disabled:false,
                               value: 'rash',
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
                               name: 'Swelling',
                               disabled:false,
                               value:'swelling',
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
                               name: 'Mass',
                               disabled:false,
                               value:'mass',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '6',
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
                               name: 'Rash',
                               disabled:false,
                               value: 'rash',
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
                               name: 'Burns',
                               disabled:false,
                               value:'burns',
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
                               name: 'Bruises',
                               disabled:false,
                               value:'bruises',
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
                               name: 'Wounds',
                               disabled:false,
                               value:'wounds',
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
                               name: "Other",
                               value: "other",
                               disabled:false,
                               labelPlacement: 'start',
                               colSize: '6',
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
                           labelPlacement: "end",
                           colSize: "7",
                           justify: "space-between",
                       },
                       {
                           value: "asymmetrical",
                           name: "Asymmetrical",
                           labelPlacement: "end",
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
                           labelPlacement: "end",
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
                               name: 'Loud P2',
                               disabled:false,
                               value: 'loud p2',
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
                               name: 'Splitting P2',
                               disabled:false,
                               value:'splitting P2',
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
                               name: 'Gallop rhythm',
                               disabled:false,
                               value:'gallop rhythm',
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
                               name: 'Murmur',
                               disabled:false,
                               value:'murmur',
                               labelPlacement: 'end',
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
                       title: "Breath sounds normal",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "end",
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
                               name: 'Absent',
                               disabled:false,
                               value: 'absent',
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
                               name: 'Reduced',
                               disabled:false,
                               value:'reduced',
                               labelPlacement: 'end',
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
                               name: 'Added',
                               disabled:false,
                               value:'added',
                               labelPlacement: 'end',
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
                       title: "Breath sounds normal",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "end",
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
                               name: 'Clackles',
                               disabled:false,
                               value: 'clackles',
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
                               name: 'Wheezes',
                               disabled:false,
                               value:'wheezes',
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
                               name: 'Bronchial',
                               disabled:false,
                               value:'bronchial',
                               labelPlacement: 'end',
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
                               labelPlacement: 'end',
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
                               labelPlacement: 'end',
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
                           labelPlacement: "end",
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
                               name: 'Abdominal distension',
                               disabled:false,
                               value: 'abdominal distension',
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
                               name: 'Rash',
                               disabled:false,
                               value:'rash',
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
                               name: 'Wound',
                               disabled:false,
                               value:'wound',
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
                               name: 'Laceration',
                               disabled:false,
                               value:'laceration',
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
                               name: 'Bruise',
                               disabled:false,
                               value:'bruise',
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
                               name: 'Burn',
                               disabled:false,
                               value:'burn',
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
                       title: "Abdominal Auscultation normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "end",
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
                               name: 'Bruit',
                               disabled:false,
                               value: 'bruit',
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
                               name: 'Bowel sounds',
                               disabled:false,
                               value:'bowel sounds',
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
                               name: 'Hyperactive',
                               disabled:false,
                               value:'hyperactive',
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
                               name: 'Reduced bowel sounds',
                               disabled:false,
                               value:'reduced bowel sounds',
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
                               name: 'Absent',
                               disabled:false,
                               value:'absent',
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
                           labelPlacement: "end",
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
                               name: 'Tenderness',
                               disabled:false,
                               value: 'tenderness',
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
                               name: 'Hepatomegaly',
                               disabled:false,
                               value:'hepatomegaly',
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
                               name: 'Other masses',
                               disabled:false,
                               value:'other masses',
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
                       title: "Genital examination normal?",
                       selectedValue: "",
                       name: "No",
                   },
                   data: [
                       {
                           value: "yes",
                           name: "Yes",
                           labelPlacement: "end",
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
                               name: 'Vesicles',
                               disabled:false,
                               value:'vesicles',
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
                               name: 'Growths',
                               disabled:false,
                               value:'growths',
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
                               name: 'Genital sores',
                               disabled:false,
                               value:'genital sores',
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
                               name: 'Urethral meatus abnormal',
                               disabled:false,
                               value:'urethral meatus abnormal',
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
                               name: 'Oedema',
                               disabled:false,
                               value:'oedema',
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
                               name: 'Abnormal discharge',
                               disabled:false,
                               value:'abnormal discharge',
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
                               name: 'Scrotal swelling',
                               disabled:false,
                               value:'scrotal swelling',
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
                               name: 'Testes swelling',
                               disabled:false,
                               value:'testes swelling',
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

       ] as any
    }),
    actions: {
        setPhysicalExamStore(data: any) {
            this.physicalExam = data;
        },
    },
    persist: true,
});
