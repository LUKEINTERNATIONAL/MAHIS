<template>
    <div class="" style="cursor: pointer; padding-bottom:5px" >
        <div class="text_header_16" @click="openModal()">
            Medications
        </div>
        <div class="m_name_dosage">
            <div class="m_name">
                <div>Metformin Extended</div>
                <div class="m_btns">
                    <span v-html="iconsContent.refresh" @click="openDrugRefill"></span> 
                    <span v-html="iconsContent.delete" @click="openPopover($event)" ></span> 
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
                    <span v-html="iconsContent.refresh" @click="openDrugRefill"></span> 
                    <span v-html="iconsContent.delete" @click="openPopover($event)"  ></span> 
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
                    <span v-html="iconsContent.refresh" @click="openDrugRefill"></span> 
                    <span v-html="iconsContent.delete" @click="openPopover($event)"></span> 
                </div>
            </div>
            <div class="m_dosage">
                750mg / Twice/daily / 30days/ until 2023-09-23
            </div>
        </div>
    </div>
    <!-- <DeletePopover :_event="eventPopover" :deleteStatus="modalStatus" /> -->
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
import { icons } from '@/utils/svg.ts';

import MedicationsModal from '@/components/ProfileModal/MedicationsModal.vue'
import DeletePopover from '@/components/DeleteModal.vue'
import DrugRefill from '@/components/ProfileModal/DrugRefill.vue'
import { createModal,popoverConfirmation,alertConfirmation } from '@/utils/Alerts'

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
        this.event = e;
    },
    async openPopover(e: Event){
        popoverConfirmation("Do you want to delete it?",e)
        // createDeletePopover(DeletePopover,e)
        // const popover = await popoverController.create({
        //         component: DeletePopover,
        //         backdropDismiss: false,
        //         cssClass: "delete-popover",
        //         event:e,
        //         showBackdrop: false,
        //         side: 'bottom',
        //         reference: 'event',
        //         alignment: 'center',
        //     });
        //     popover.present();

    }
}
});
</script>

<style scoped>



</style>
