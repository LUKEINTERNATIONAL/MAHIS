import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialConfirmPregnancy= [
    {
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Is the pregnancy confirmed?*",
                class:'bold',
                selectedValue: "",
                name:'Pregnancy confirmed'
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name: "No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Was the pregnancy planned?*",
                selectedValue: "",
                class:'bold',
                name:'Pregnancy planned'
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name: "No",
                    colSize: "2",
                },
            ],
        },
    },
] as any;
export const useConfirmPregnancyStore = defineStore("confirmPregnancyStore", {
    state: () => ({
       ConfirmPregnancy:[...initialConfirmPregnancy]
    }),
    actions: {
        setConfirmPregnancy(data: any) {
            this.ConfirmPregnancy = data
        },
        getInitial(){
            const data = _.cloneDeep(initialConfirmPregnancy);
            return [...data];
        }
    },
    persist: true,
});
