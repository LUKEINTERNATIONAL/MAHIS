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
                    <span v-html="iconsContent.tree_dot" ></span> 
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
                    <span v-html="iconsContent.tree_dot" ></span> 
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
                    <span v-html="iconsContent.tree_dot" ></span> 
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
      modalController 
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg.ts';

import MedicationsModal from '@/components/ProfileModal/MedicationsModal.vue'
import DrugRefill from '@/components/ProfileModal/DrugRefill.vue'
import { createModal } from '@/utils/Alerts'

export default defineComponent({
name: 'Menu',
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar    },
  data() {
return {
  iconsContent: icons,
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
    }
}
});
</script>

<style scoped>



</style>
