<template>
    <ion-header style="display: flex; justify-content: space-between">
        <ion-title class="modalTitle">Add Lab Test</ion-title>
        <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="iconsContent.cancel"></ion-icon>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div class="modal_wrapper">
            <div class="">
                <OPDMedications @drug-selected="addSearchedDrug"/>
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
import OPDMedications from "./OPDMedications.vue"

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
        OPDMedications
    },
    data() {
        const dismiss = () => {
            modalController.dismiss();
        }

        const addSearchedDrug = (data: any) => {
            // console.log(data)
            // const drug = drugObj(data.drug_id, data.name, 'Other')
            // console.log(drug)
            // medications.value.unshift(drug)
        }

        return {
            iconsContent: icons,
            dismiss,
            addSearchedDrug,
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



