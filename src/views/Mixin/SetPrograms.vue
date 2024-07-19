<template>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end" class="displayNoneDesktop">
        <ion-fab-button color="primary"> <ion-icon :icon="grid"></ion-icon> </ion-fab-button>
        <ion-fab-list side="top">
            <ion-fab-button @click="setProgram(btn)" v-for="(btn, index) in programBtn" :key="index" :data-desc="btn.actionName">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab-list>
    </ion-fab>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Service } from "@/services/service";
import { UserService } from "@/services/user_service";
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
        $route: {
            async handler(route: any) {
                this.userRole = Service.getUserRoles();
                if (this.userRole == "Lab") {
                    this.userRoleSettings = {
                        url: "home",
                        btnName: "Back to home",
                        stepperTitle: "Laboratory",
                    };
                } else {
                    this.userRoleSettings = {
                        url: "OPDvitals",
                        btnName: "Back to vitals",
                        stepperTitle: "The consultation plan",
                    };
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        setProgram(program: any) {
            sessionStorage.setItem("app", JSON.stringify({ programID: program.program_id, applicationName: program.name }));
            this.setActiveProgram();
            this.nav(program.url);
        },
        async nav(url: any) {
            await UserService.setProgramUserActions();
            this.$router.push(url);
        },
        setActiveProgram() {
            let program: any = sessionStorage.getItem("app");
            program = JSON.parse(program);
            this.activeProgramID = program.programID;
        },
    },
});
</script>
