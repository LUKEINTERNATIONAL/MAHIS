<template>
    <div class="dashed_bottom_border" style="padding-bottom:5px" @click="openModal()">
        <div class="text_header_16">
            Disposition
        </div>
        <div class="text_header_14">
            Facility 1
        </div>
        <div class="diplay_space_between">
            <div>
                Internal / 2023-11-16 / some reason typing.
            </div>
            <div>
                <span v-html="iconsContent.tree_dot" ></span>
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

import DispositionModal from '@/components/ProfileModal/DispositionModal.vue'
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
        createModal(DispositionModal)
    }
}
});
</script>

<style scoped>


</style>
