<template>
    <ion-fab slot="fixed" :vertical="verticalPosition" horizontal="end">
        <ion-fab-button
            v-if="btn"
            color="primary"
            style="
                --border-radius: 4px;
                width: 80px;
                height: 40px;
                font-weight: 900;
                top: -5px;
                position: relative;
                border: 1px solid #cdcdcd;
                border-radius: 5px;
            "
        >
            Start visit
        </ion-fab-button>
        <ion-fab-button v-else color="primary"> <ion-icon :icon="grid"></ion-icon> </ion-fab-button>
        <ion-fab-list :side="side" :class="btn ? 'btn' : 'fab-list'">
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
        btn: {
            default: false,
        },
        verticalPosition: {
            default: "bottom" as any,
        },
        side: {
            default: "top" as any,
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
/* ion-fab-button[data-desc]::after {
    position: absolute;
    content: attr(data-desc);
    z-index: 1;
    right: -20px;
    color: var(--ion-color-contrast, rgb(112, 109, 109));
    background-color: rgb(221, 238, 221);
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}*/
.fab-list {
    bottom: 90px;
}
.fab-list ion-fab-button[data-desc]::after {
    right: -29px;
}
.btn ion-fab-button[data-desc]::after {
    right: -70px;
}
ion-fab-button[data-desc]::after {
    position: absolute;
    content: attr(data-desc);
    z-index: 1;
    color: var(--ion-color-contrast, rgb(112, 109, 109));
    background-color: rgb(221, 238, 221);
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}
.btn {
    min-width: unset;
    min-height: unset;
    top: 20px;
}

ion-fab-button[data-desc]:hover::after {
    background-color: rgb(200, 230, 200); /* Change background color on hover */
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.4), 0 6px 10px 0 rgba(0, 0, 0, 0.28), 0 1px 18px 0 rgba(0, 0, 0, 0.24); /* Adjust box-shadow on hover */
}
</style>
