<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="fatalMovement" @update:selected="handleInputData"></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useFatalMovementStore} from "@/apps/ANC/store/symptomsFollowUp/fatalMovementStore";
 import BasicForm from '@/components/BasicForm.vue';
import { validateField } from "@/services/ANC/symptoms_validation";


export default defineComponent({
    name:"Fatal Movement",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },

    mounted(){
        const  fatalMovement =useFatalMovementStore()
    },
      computed:{
        ...mapState(useFatalMovementStore,["fatalMovement"]),
    },
    methods:{
      validationRules(event: any) {
            return validateField(this.fatalMovement, event.name, (this as any)[event.name]);
        },

        async handleInputData(event: any) {
            // console.log("🚀 ~ handleInputData ~ event:", event)

            this.validationRules(event);
        },
    }
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
