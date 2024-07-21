import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialProgram = {} as any;
export const useProgramStore = defineStore("programStore", {
    state: () => ({
        programs: initialProgram,
    }),
    actions: {
        setProgramInformation(data: any) {
            this.programs = data;
        },
    },
    persist: true,
});
