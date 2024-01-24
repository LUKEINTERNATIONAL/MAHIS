<template>
    <div class="" style="cursor: pointer; padding-bottom:5px" >
        <div class="text_header_16" @click="openModal()">
            Medications {{ selectedMedicalDrugsList }}
        </div>
        <div class="m_name_dosage">
            <div class="m_name">
                <div>Metformin Extended</div>
                <div class="m_btns">
                    <ion-icon style="font-size: x-large;"  :icon="iconsContent.refresh" @click="openDrugRefill"></ion-icon>
                    <ion-icon style="font-size: 20px;"  :icon="iconsContent.delete" @click="openDeleteModal($event)"></ion-icon>
                </div>
            </div>
            <div class="m_dosage">
                750mg / Twice/daily / 30days/ until 2023-09-23
            </div>
        </div>
        <div class="m_name_dosage">
            <div class="m_name">
                <div>Metformin Extended</div>
                <div class="m_btns">
                    <ion-icon style="font-size: x-large;"  :icon="iconsContent.refresh" @click="openDrugRefill"></ion-icon>
                    <ion-icon style="font-size: 20px;"  :icon="iconsContent.delete" @click="openDeleteModal($event)"></ion-icon>
                </div>
            </div>
            <div class="m_dosage">
                750mg / Twice/daily / 30days/ until 2023-09-23
            </div>
        </div>
        <div class="m_name_dosage">
            <div class="m_name">
                <div>Metformin Extended 2</div>
                <div class="m_btns">
                    <ion-icon style="font-size: x-large;"  :icon="iconsContent.refresh" @click="openDrugRefill"></ion-icon>
                    <ion-icon style="font-size: 20px;"  :icon="iconsContent.delete" @click="openDeleteModal($event)"></ion-icon>
                </div>
            </div>
            <div class="m_dosage">
                750mg / Twice/daily / 30days/ until 2023-09-23
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { 
      IonContent, 
      IonHeader,
      IonItem,
      IonList,
      IonTitle, 
      IonToolbar, 
      IonMenu,
      modalController,
      popoverController
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg';

import MedicationsModal from '@/components/ProfileModal/MedicationsModal.vue'
import DrugRefill from '@/components/ProfileModal/DrugRefill.vue'
import { createModal,popoverConfirmation,alertConfirmation } from '@/utils/Alerts'
import { mapState } from 'pinia';
import { useTreatmentPlanStore } from '@/stores/TreatmentPlanStore'

export default defineComponent({
name: 'Menu',
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar
      },
  data() {
return {
  iconsContent: icons,
  event: null as any,
  eventPopover:null as any,
  modalStatus: false,
};
},
computed: {
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList"])
},
methods:{
    openModal(){
        createModal(MedicationsModal)
    },
    async openDrugRefill(){
        const modal = await modalController.create({
                component: DrugRefill,
                backdropDismiss: false,
                cssClass: "small-modal"
            });
            modal.present();
    },
    async openDeleteModal(e: Event){
        popoverConfirmation("Do you want to delete it?",e)
    }
}
});
</script>

<style scoped>



</style>
