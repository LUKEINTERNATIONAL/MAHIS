<template>
    <ion-header>
        <ion-title style="margin-bottom: 20px;" class="modalTitle">Missed Vaccines</ion-title>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
        <div v-for="(item, index) in missedVaccineSchedules" :key="index">
            <row style="width: 90%;">
                <ion-icon size="medium" style="margin-bottom: -6px;" :icon="iconsContent.calendar"></ion-icon>
                <span> at <span style="color: #016302;">{{ item.age }}</span></span>
                <span style="color: #316CBA; margin-left: 10%;">{{ vaccinesGivenCount(item) }}/{{ item.antigens.length }} vaccine(s) given</span>
            </row>

            <row style="text-align: center;" class="mod-ls">
                <customVaccine :vaccines="item.antigens" :milestone_status="item.milestone_status" />
            </row>
        </div>
    </ion-content>

    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="dismiss()"> Cancel </ion-button>
            </ion-col>
        </ion-row>
    </ion-footer>

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
    IonCol,
    IonFooter,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import { icons } from "@/utils/svg";
import { defineComponent } from "vue";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { mapState } from "pinia";
import customVaccine from "@/apps/Immunization/components/customVaccine.vue"

export default defineComponent({
    name: "Home",
    components: {
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
        customVaccine,
        IonCol,
        IonFooter,
        IonContent,
    },
    data() {
        return {
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useAdministerVaccineStore, ["currentMilestone", "missedVaccineSchedules"]),
    },
    methods: {
        vaccinesGivenCount(vaccinSchedule: any) {
            const administeredVaccines = []
            vaccinSchedule.antigens.forEach((vaccine: any) => {
                if (vaccine.status == 'administered') {
                    administeredVaccines.push(vaccine)
                }
            })
            return administeredVaccines.length
        },
        dismiss() {
            modalController.dismiss();
        },
    }
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
.mod-ls {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
}
</style>
