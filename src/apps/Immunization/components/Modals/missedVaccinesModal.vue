<template>
    <ion-row v-for="(item, index) in missedVaccineSchedules" :key="index" style="display: flex; justify-content: center">
        <div>
            <ion-button class="btnText btnTextWeight" size="small" fill="solid" color="danger">
                <ion-icon slot="start" size="small" :icon="iconsContent.alertDangerRed"></ion-icon>
                <b> at {{ item.age }}</b>
            </ion-button>
        </div>
        <div class="dueAlertText">{{ item.vaccines.length }} vaccine(s) missed!</div>
    </ion-row>
</template>
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonModal,
    IonRow,
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import { icons } from "@/utils/svg";
import { defineComponent } from "vue";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { mapState } from "pinia";

export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonAccordion,
        IonAccordionGroup,
        IonItem,
        IonLabel,
        IonModal,
        IonRow,
    },
    data() {
        return {
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useAdministerVaccineStore, ["currentMilestone", "missedVaccineSchedules"]),
    },
});
</script>
<style scoped>
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
}
.btnTextWeight {
    color: #000;
    --border-width: 1px;
    margin-right: 15px;
    width: 140px;
}
.dueAlert {
    justify-content: space-between;
    /* border: solid 1px #ccc;
        border-style: dashed; */
    margin-top: 10px;
    padding: 5px;
}
.dueAlertText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #b42318;
    padding: 10px;
}
</style>
