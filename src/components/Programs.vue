<template>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button color="primary"> <ion-icon :icon="grid"></ion-icon> </ion-fab-button>
        <ion-fab-list side="top">
            <ion-fab-button @click="$emit('clicked', btn)" v-for="(btn, index) in programBtn" :key="index" :data-desc="btn.actionName">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab-list>
    </ion-fab>
</template>

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
        ready: false,
    }),
    props: {
        programBtn: {
            default: [] as any,
        },
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
});
</script>
<style scoped>
ion-fab-button[data-desc] {
    position: relative;
    width: 0px;
}

ion-fab-button[data-desc]::after {
    position: absolute;
    content: attr(data-desc);
    z-index: 1;
    right: -20px;
    bottom: 7px;
    color: var(--ion-color-contrast, rgb(112, 109, 109));
    background-color: rgb(221, 238, 221);
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}
ion-fab-button[data-desc]:hover::after {
    background-color: rgb(200, 230, 200); /* Change background color on hover */
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.4), 0 6px 10px 0 rgba(0, 0, 0, 0.28), 0 1px 18px 0 rgba(0, 0, 0, 0.24); /* Adjust box-shadow on hover */
}
</style>
