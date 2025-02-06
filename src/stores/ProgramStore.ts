import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialProgram = {} as any;
export const useProgramStore = defineStore("programStore", {
    state: () => ({
        programs: initialProgram,
    }),
    actions: {
        setProgramInformation(program: any, authorizedPrograms: any) {
            this.programs = {
                activeProgramID: program.program_id,
                name: program.name,
                shortName: program.short_name,
                authorizedPrograms: authorizedPrograms,
            };
        },
    },
    persist: true,
});
