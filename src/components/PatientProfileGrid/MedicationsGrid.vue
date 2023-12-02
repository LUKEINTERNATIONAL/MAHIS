<template>
    <div class="" style="padding-bottom:5px" @click="openModal()">
        <div class="text_header_16">
            Medications
        </div>
        <div class="m_name_dosage">
            <div class="m_name">
                <div>Metformin Extended</div>
                <div class="m_btns">
                    <span v-html="iconsContent.refresh" ></span> 
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
                    <span v-html="iconsContent.refresh" ></span> 
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
                    <span v-html="iconsContent.refresh" ></span> 
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
    }
}
});
</script>

<style scoped>



</style>
