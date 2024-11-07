<template>

    <div class="ion-padding">
      <ion-item-divider>
        <ion-label class="h_dmt">Documented medications timeline</ion-label>
        <ion-icon :icon="medkit" slot="start" class="ion-margin-end diagnosis-icon"></ion-icon>
      </ion-item-divider>

      <ion-list>
        <ion-item v-for="(item, index) in PreviuosSelectedMedicalDrugsList" :key="index">
          <ion-label class="ion-text-wrap">
            <ion-card style="padding: 10px; margin: 5px;">
            <div style="display: flex; align-items: center;">
                <ion-icon :icon="calendarOutline" class="ion-margin-end"></ion-icon>
                <h2>{{ item.prescriptionDate }}</h2>
            </div>
            <dynamic-list
              :_selectedMedicalDrugsList="item.previousPrescriptions"
              :show_actions_buttons="false"
              :key="componentKey"
            />
            </ion-card>
          </ion-label>
        </ion-item>
      </ion-list>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard, IonAccordion, IonAccordionGroup, IonItem, IonLabel, AccordionGroupCustomEvent } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import DynamicList from "@/components/DynamicList.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import { useNCDMedicationsStore } from "@/stores/NCDMedicationStore";
import { calendarOutline, medkit } from 'ionicons/icons';

import SetUser from "@/views/Mixin/SetUser.vue";
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonToolbar,
        Toolbar,
        IonRow,
        IonItem,
        IonLabel,
        DynamicList,
        IonCard,
    },
    data() {
        const componentKey = ref(0);
        const itemWasExpanded = ref(false);
        const PreviuosSelectedMedicalDrugsList = ref();

        const loadPreviousMedications = async () => {
            const previousTreatment = new PreviousTreatment();
            const { previousDrugPrescriptions } = await previousTreatment.getPatientEncounters();
            PreviuosSelectedMedicalDrugsList.value = previousDrugPrescriptions;
        }

        return {
            componentKey,
            itemWasExpanded,
            PreviuosSelectedMedicalDrugsList,
            loadPreviousMedications,
            calendarOutline,
            medkit,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useNCDMedicationsStore, ["selectedNCDMedicationList"]),  
    },
    $route: {
        async handler() {},
        deep: true,
    },
    watch: {
        patient: {
            handler() {
                this.loadPreviousMedications()
            },
            deep: true,
        },
        selectedNCDMedicationList: {
            handler() {
                this.loadPreviousMedications()
            },
            deep: true,
        }
    },
    async mounted() {
        this.loadPreviousMedications()
    },
});
</script>
<style scoped>
.ion-text-wrap {
    white-space: normal;
}

.ion-margin-end {
    margin-right: 8px;
}

.diagnosis-icon {
    font-size: 1.4rem;
    color: var(--ion-color-primary);
}
.h_dmt {
    font-weight: 400;
    font-size: 22px;
}
</style>