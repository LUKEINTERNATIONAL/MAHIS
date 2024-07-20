<script lang="ts">
import { defineComponent } from "vue";
import { Service } from "@/services/service";
import { UserService } from "@/services/user_service";
import { IonIcon, IonFab, IonFabButton, IonFabList } from "@ionic/vue";
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
            sessionStorage.setItem("app", JSON.stringify({ programID: program.program_id, applicationName: program.name }));
            await this.setProgramInfo();
            await this.nav(program.url);
        },
        async nav(url: any) {
            await UserService.setProgramUserActions();
            this.$router.push(url);
        },
        async setProgramInfo() {
            let program: any = sessionStorage.getItem("app");
            program = JSON.parse(program);
            this.activeProgramID = program.programID;
            console.log("🚀 ~ setProgramInfo ~ this.activeProgramID:", this.activeProgramID);
            this.programBtn = await UserService.userProgramData();
        },
    },
});
</script>
