<template>
    <ion-header style="display: flex; justify-content: space-between">
        <ion-title class="modalTitle">
            <div class="medication-list">
                <ion-icon :icon="medkit" class="ion-margin-end"></ion-icon>
                <span>Add Other Medication</span>
            </div>
        </ion-title>
        <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="iconsContent.cancel"></ion-icon>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div class="modal_wrapper">
            <div class="">
                <OPDMedications @drug-selected="addSearchedDrug"/>
                <Medication :use-default-stores="false"/>
            </div>
        </div>
    </ion-content>
    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                
            </ion-col>
        </ion-row>
    </ion-footer>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonFooter, modalController, IonIcon, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import { icons } from "@/utils/svg";
import { medkit } from 'ionicons/icons';
import OPDMedications from "./OPDMedications.vue"
import Medication from "./Medication.vue"
import { useOtherNCDMedicationStore } from "@/stores/NCDMedicationStore";

import SetUser from "@/views/Mixin/SetUser.vue";
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonToolbar,
        IonRow,
        IonTitle,
        IonIcon,
        IonFooter,
        OPDMedications,
        Medication,
    },
    data() {
        const dismiss = () => {
            modalController.dismiss();
        }

        const addSearchedDrug = (data: any) => {
            const OtherNCDmedicationsStore = useOtherNCDMedicationStore()
            OtherNCDmedicationsStore.addSearchedDrug(data)
        }

        return {
            iconsContent: icons,
            dismiss,
            addSearchedDrug,
            medkit
        };
    },
    computed: {

    },
    $route: {
        async handler() {},
        deep: true,
    },
    watch: {

    },
    async mounted() {
        
    },
    methods: {

    },
});
</script>
<style scoped>
    .medication-list {
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>



