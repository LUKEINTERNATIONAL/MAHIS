import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useChangeStatusStore = defineStore("ChangeStatusStore", {
    state: () => ({
        changeStatus: [
            {
                selectedData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        name: "Immunization patient status",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Active",
                            value: "Active",
                            checked: true,
                        },
                        {
                            name: "Inactive",
                            value: "Inactive",
                            checked: false,
                        },
                        {
                            name: "Lost to follow-up",
                            value: "Lost to follow-up",
                            checked: false,
                        },
                        {
                            name: "Archive Record",
                            value: "Archive Record",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setStatus(data: any) {
            this.changeStatus = data;
        },
    },
    persist: true,
});
