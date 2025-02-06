// useProgram.ts
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Service } from "@/services/service";
import { UserService } from "@/services/user_service";
import { useProgramStore } from "@/stores/ProgramStore";
import { useUserStore } from "@/stores/userStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { storeToRefs } from "pinia";

interface Program {
    program_id: number;
    name: string;
    url: string;
    [key: string]: any;
}

interface ProgramState {
    userRole: string;
    ready: boolean;
    userRoleSettings: Record<string, any>;
    programBtn: Record<string, any>;
    activeProgramID: number | any;
}

export function useProgram() {
    const router = useRouter();
    const route = useRoute();
    const demographicsStore = useDemographicsStore();
    const { patient } = storeToRefs(demographicsStore);

    // State
    const state = ref<ProgramState>({
        userRole: "",
        ready: false,
        userRoleSettings: {},
        programBtn: {},
        activeProgramID: null,
    });

    // Methods
    const setProgram = async (program: Program) => {
        const store = useUserStore();
        store.setCurrentUserProgram(program);

        localStorage.setItem(
            "app",
            JSON.stringify({
                programID: program.program_id,
                applicationName: program.name,
            })
        );

        await setProgramInfo();

        if (patient?.value?.patientID) {
            await nav(program.url);
        }
    };

    const nav = async (url: string) => {
        await UserService.setProgramUserActions();
        router.push(url);
    };

    const setProgramInfo = async () => {
        let program: any = localStorage.getItem("app");
        program = program ? JSON.parse(program) : null;

        state.value.activeProgramID = program ? program.programID : null;
        state.value.programBtn = await UserService.userProgramData(patient?.value?.patientID);

        const programStore = useProgramStore();
        programStore.setProgramInformation({
            program: program,
            programBtn: state.value.programBtn,
        });

        return state.value.programBtn;
    };

    // Watchers
    watch(
        () => patient.value,
        async () => {
            await setProgramInfo();
        },
        { deep: true }
    );

    watch(
        () => route?.path,
        async () => {
            await setProgramInfo();
        },
        { immediate: true }
    );

    return {
        programState: state,
        setProgram,
        setProgramInfo,
        patient,
    };
}
