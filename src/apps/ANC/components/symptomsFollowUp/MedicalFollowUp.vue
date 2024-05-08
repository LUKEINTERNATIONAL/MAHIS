<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="trial"
        ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useMedicalFollowUpStore} from "@/apps/ANC/store/symptomsFollowUp/medicalFollowUpStore";
 import BasicForm from '@/components/BasicForm.vue';


export default defineComponent({
    name:"Medical FollowUp",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },

    mounted(){
        const trial =useMedicalFollowUpStore()
    },
      computed:{
        ...mapState(useMedicalFollowUpStore,["trial"]),
    },
})
</script>
<style scoped>
.sub_item_body{
    margin-left: 45px;
}

ion-item.sub_item_body_close {
        border-bottom: 2px dotted var(--ion-color-medium);
        --inner-border-width:0;
    }
ion-card {

  width: 100%;
  color: black;
}
</style>
