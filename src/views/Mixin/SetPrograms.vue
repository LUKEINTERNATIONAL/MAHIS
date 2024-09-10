<script lang="ts">
import { defineComponent } from "vue";
import { Service } from "@/services/service";
import { UserService } from "@/services/user_service";
import { IonIcon, IonFab, IonFabButton, IonFabList } from "@ionic/vue";
import { useProgramStore } from "@/stores/ProgramStore";
import {
    medkit,
    chevronBackOutline,
    checkmark,
    grid,
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document,
    globe,
    add,
    person,
} from "ionicons/icons";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
export default defineComponent({
    components: {
        IonIcon,
        IonFab,
        IonFabButton,
        IonFabList,
    },
    data: () => ({
        userRole: "" as any,
        ready: false,
        userRoleSettings: {} as any,
        programBtn: {} as any,
        activeProgramID: "" as any,
    }),
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
    },
    setup() {
        return {
            chevronBackOutline,
            checkmark,
            grid,
            chevronDownCircle,
            chevronForwardCircle,
            chevronUpCircle,
            colorPalette,
            document,
            globe,
            medkit,
            add,
            person,
        };
    },
    watch: {
        demographics: {
            async handler() {
                await this.setProgramInfo();
            },
            deep: true,
        },
        $route: {
            async handler(route: any) {
                await this.setProgramInfo();
            },
            immediate: true,
            deep: true,
        },
    },
    async mounted() {
      // await this.setProgramInfo();
      
    },
    methods: {
        async setProgram(program: any) {
            localStorage.setItem("app", JSON.stringify({ programID: program.program_id, applicationName: program.name }));
            await this.setProgramInfo();
            if (this.demographics.patient_id) await this.nav(program.url);
        },
        async nav(url: any) {
            await UserService.setProgramUserActions();
            this.$router.push(url);
        },
        async setProgramInfo() {
          let program: any = sessionStorage.getItem("app");
       
            program = JSON.parse(program);
            this.activeProgramID = program? program.programID : null;
            this.programBtn = await UserService.userProgramData(this.demographics.patient_id);
            const programStore = useProgramStore();
            programStore.setProgramInformation({ program: program, programBtn: this.programBtn });
        },
    },
});
</script>