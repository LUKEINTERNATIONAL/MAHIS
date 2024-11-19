import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import { getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";
import * as yup from "yup";
import { extractArrayOfNameValue, validateStore } from "@/services/data_helpers";

export const pastObstreticValidationShema = yup.object().shape({
    Gravida: yup.number().typeError("Gravida can only be number").min(0).max(30),
    "Abortions/Miscarriages": yup.number().typeError("Abortions/Miscarriages can only be number").min(0),
    Stillbirths: yup.number().typeError("Stillbirths can only be number").min(0),
});

export const useLabourObstreticHistoryStore = defineStore("labourObstreticHistoryStore", {
    state: () => ({
        prevPregnancies: [
            {
                isFinishBtn: false,
                sectionHeader: "",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    class: "bold",
                                    inputHeader: "Gravida*",
                                    value: "",
                                    name: "Gravida",
                                    icon: icons.editPen,
                                    required: true,
                                    valueType: "text",
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
                alerts: [
                    {
                        backgroundColor: "",
                        status: "",
                        icon: "",
                        textColor: "",
                        value: "",
                        name: "",
                        index: "",
                    },
                ],
            },

            {
                isFinishBtn: false,
                sectionHeader: "",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    class: "bold",
                                    inputHeader: "Abortions/Miscarriages*",
                                    value: "",
                                    icon: icons.editPen,
                                    name: "Abortions/Miscarriages",
                                    required: true,
                                    disabled: false,
                                    valueType: "text",
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                                {
                                    class: "bold",
                                    inputHeader: "Stillbirths*",
                                    value: "",
                                    name: "Stillbirths",
                                    disabled: false,
                                    required: true,
                                    valueType: "text",
                                    icon: icons.editPen,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    class: "bold",
                                    inputHeader: "Live births",
                                    value: "",
                                    disabled: true,
                                    name: "LiveBirths",
                                    required: true,
                                    valueType: "text",
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                                {
                                    class: "bold",
                                    inputHeader: "Parity",
                                    disabled: true,
                                    value: "",
                                    name: "Parity",
                                    valueType: "text",
                                    required: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
                alerts: [
                    {
                        backgroundColor: "",
                        status: "",
                        icon: "",
                        textColor: "",
                        value: "",
                        name: "",
                        index: "",
                    },
                ],
            },
        ] as any,
        preterm: [],
        modeOfDelivery: [] as any,
        Complications: [] as any,
    }),
    actions: {
        setPrevPregnancies(data: any) {
            this.prevPregnancies = data;
        },
        setPreterm(data: any) {
            this.preterm = data;
        },
        // setModeOfDelivery(number: number) {
        //     this.modeOfDelivery = [];
        //     for (let i = 0; i < number; i++) {
        //         const inputs = getRadioButton(i);
        //         this.modeOfDelivery.push(inputs[0]);
        //         this.modeOfDelivery.push(inputs[1]);
        //     }
        // },

        // checkChanges() {
        //     const number = this.modeOfDelivery.length / 2;
        //     for (let i = 0; i < number; i++) {
        //         const value = getRadioSelectedValue(this.modeOfDelivery, `Mode of delivery ${i}`);
        //         if (value == "Other") {
        //             modifyFieldValue(this.modeOfDelivery, `Specify ${i}`, "displayNone", false);
        //         } else {
        //             modifyFieldValue(this.modeOfDelivery, `Specify ${i}`, "displayNone", true);
        //         }
        //     }
        // },
        setComplications(data: any) {
            this.Complications = data;
        },
        async validate() {
            const obstetricHistory = extractArrayOfNameValue(this.prevPregnancies);
            const obstetricHistoryValid = await validateStore(this.prevPregnancies, pastObstreticValidationShema, obstetricHistory);

            return obstetricHistoryValid;
        },
    },
    // persist: true,
});

// const getRadioButton = (number: number) => {
//     return [
//         {
//             sideColSide: 1,
//             selectdData: [],
//             isFinishBtn: false,
//             classDash: "dashed_bottom_border",
//             radioBtnContent: {
//                 header: {
//                     title: `Specify mode of delivery (child ${number + 1})`,
//                     selectedValue: "",
//                     name: `Mode of delivery ${number}`,
//                     class: "bold",
//                     //displayNext:"Other"
//                 },
//                 data: [
//                     {
//                         name: "Caesarean section",
//                         value: "caesarean section",
//                         colSize: "4.1",
//                     },
//                     {
//                         name: "Vacuum extraction delivery",
//                         value: "vacuum extraction delivery",
//                         colSize: "4.1",
//                     },
//                     {
//                         name: "Breech delivery",
//                         value: "breech delivery",
//                         colSize: "4.1",
//                     },
//                     {
//                         name: "SVD",
//                         value: "svd",
//                         colSize: "4.1",
//                     },
//                     {
//                         name: "Other",
//                         value: "Other",
//                         colSize: "4.1",
//                     },
//                 ],
//             },
//         },
//         {
//             //childName:`cesareanSec ${number}`,
//             data: {
//                 rowData: [
//                     {
//                         colData: [
//                             {
//                                 displayNone: true,
//                                 inputHeader: `specify  for child ${number + 1}`,
//                                 icon: icons.editPen,
//                                 value: "",
//                                 name: `Specify ${number}`,
//                                 eventType: "input",
//                                 inputWidth: "82%",
//                                 required: true,
//                             },
//                         ],
//                     },
//                 ],
//             },
//         },
//     ];
// };
