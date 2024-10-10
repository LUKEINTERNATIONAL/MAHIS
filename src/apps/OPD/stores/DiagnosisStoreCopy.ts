import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _, {initial} from "lodash";

const initialDiagnosis=[
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Primary diagnosis*",
                            icon: icons.search,
                            popOver: true,
                            value: "",
                            name: "primaryDiagnosis",
                            eventType: "input",
                            required: true,
                            alertsErrorMassage: "",
                            popOverData: {
                                filterData: false,
                                data: [],
                            },
                            id: "",
                            idName: "district_id",
                        },
                    ],
                    btns: [
                        {
                            name: "Save",
                            fill: "clear",
                            btn_col_size: 3,
                            icon: icons.plus,
                        },
                    ],
                },
            ],
        },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0,
        checkboxBtnContent:{
            header:{

            },
            data:[
                {
                    name:'Secondary Diagnosis',
                    value: 'Secondary Diagnosis',
                    colSize: "3",
                },
                {
                    name: 'Differential Diagnosis',
                    value: 'Differential Diagnosis',
                    colSize: "3",
                },
            ]
        }
    },
    {
        childName:"Secondary Diagnosis",
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: "Secondary diagnosis",
                            icon: icons.search,
                            popOver: true,
                            value: "",
                            name: "secondaryDiagnosis",
                            eventType: "input",
                            required: true,
                            alertsErrorMassage: "",
                            popOverData: {
                                filterData: false,
                                data: [],
                            },
                            id: "",
                            idName: "district_id",
                        },
                    ],
                },
            ],
        },
    },
    {
        childName:"Differential Diagnosis",
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: "Differential diagnosis",
                            icon: icons.search,
                            popOver: true,
                            value: "",
                            name: "differentialDiagnosis",
                            eventType: "input",
                            required: true,
                            alertsErrorMassage: "",
                            popOverData: {
                                filterData: false,
                                data: [],
                            },
                            id: "",
                            idName: "district_id",
                        },
                    ],
                },
            ],
        },
    },
] as any
export const useOPDDiagnosisStore = defineStore("DiagnosisStore", {
    state: () => ({
        OPDdiagnosis: [...initialDiagnosis] as any,
    }),
    actions: {
        setOPDDiagnosis(data: any) {
            this.OPDdiagnosis = data;
        },
        getInitial(){
            const data = _.cloneDeep(initialDiagnosis);
            return [...data];
        }
    },
    // persist: true,
});

