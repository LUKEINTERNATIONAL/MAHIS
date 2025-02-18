import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialProgram = {} as any;
export const useProgramStore = defineStore("programStore", {
    state: () => ({
        activeProgram: initialProgram,
        authorizedPrograms: initialProgram,
    }),
    actions: {
        setActiveProgram(data: any) {
            this.activeProgram = data;
        },
        setAuthorizedPrograms(data: any) {
            this.authorizedPrograms = data;
        },
    },
    persist: true,
});
