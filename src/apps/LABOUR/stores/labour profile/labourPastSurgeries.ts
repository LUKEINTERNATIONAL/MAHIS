import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const medicalHistoryForm = {
    dilationAndCurrettage: {
        name: "Dilation and currettage",
        value: "dilation and currettage",
    },
    Myomectomy: {
        name: "Myomectomy",
        value: "myomectomy",
    },
    removalOfOvarianCystst: {
        name: "Removal of ovarian cyst",
        value: "Removal of ovarian cyst",
    },
    Oophorectomy: {
        name: "Oophorectomy",
        value: "oophorectomy",
    },
    Salpingectomy: {
        name: "Salpingectomy",
        value: "salpingectomy",
    },
    cervicalCone: {
        name: "Cervical cone",
        value: "cervical cone",
    },
    otherSurgerirs: {
        name: "Other",
        value: "",
    },
};

const initialMedicalHistory = [
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Does the woman have any past medical and surgical?",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any past surgeries done?",
            },
            data: [
                {
                    name: medicalHistoryForm.dilationAndCurrettage.name,
                    value: medicalHistoryForm.dilationAndCurrettage.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: medicalHistoryForm.Myomectomy.name,
                    value: medicalHistoryForm.Myomectomy.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Past surgeries done?",
            },
            data: [
                {
                    name: medicalHistoryForm.removalOfOvarianCystst.name,
                    value: medicalHistoryForm.removalOfOvarianCystst.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: medicalHistoryForm.Oophorectomy.name,
                    value: medicalHistoryForm.Oophorectomy.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any past surgeries done?",
            },
            data: [
                {
                    name: medicalHistoryForm.Salpingectomy.name,
                    value: medicalHistoryForm.Salpingectomy.name,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: medicalHistoryForm.cervicalCone.name,
                    value: medicalHistoryForm.cervicalCone.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any past surgeries done?",
            },
            data: [
                {
                    name: "None",
                    value: "none",
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Other",
                    value: "Other",
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        childName: "Other",
        classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Specify",
                            icon: icons.editPen,
                            value: "",
                            name: "Other notes",
                            valueType: "text",
                            eventType: "input",
                            inputWidth: "82%",
                            required: true,
                        },
                    ],
                },
            ],
        },
    },
] as any;

export const useLabourPastSurgeriesStore = defineStore("labourPastSurgeriesStore", {
    state: () => ({
        labourPastSurgeries: [...initialMedicalHistory] as any,
    }),
    actions: {
        addLabourPastSurgeries(data: any) {
            this.labourPastSurgeries = data;
        },
        getInitial() {
            const data = _.cloneDeep(initialMedicalHistory);
            return [...data];
        },
    },
    // persist: true,
});
