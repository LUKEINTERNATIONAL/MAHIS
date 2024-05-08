<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="persistentSymptom"
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
 import {usePersistentSymptomsStore} from "@/apps/ANC/store/symptomsFollowUp/persistentSymptomsStore";
 import BasicForm from '@/components/BasicForm.vue';
import { getCheckboxSelectedValue, modifyCheckboxValue } from "@/services/data_helpers";


export default defineComponent({
    name:"Persistent Behaviour",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },

    mounted(){
        const persistentSymptom =usePersistentSymptomsStore()
        this.handleNone()
    },
    watch:{
        persistentSymptom:{
            handler(){
                this.handleNone()
            },
            deep:true
        },
        
    },
      computed:{
        ...mapState(usePersistentSymptomsStore,["persistentSymptom"]),
    },methods:{
        handleNone(){
                   const checkBoxes=["Breathing difficulty","Leg cramps","Visual disturbance","Constipation","Headache","Heartburn","Pain-Leg",]

                if (getCheckboxSelectedValue(this.persistentSymptom, 'None')?.checked) {
                    checkBoxes.forEach((checkbox) => {
                        modifyCheckboxValue(this.persistentSymptom, checkbox, 'checked', false);
                        modifyCheckboxValue(this.persistentSymptom, checkbox, 'disabled', true);
                    });
                    } else {
                    checkBoxes.forEach((checkbox) => {
                        modifyCheckboxValue(this.persistentSymptom, checkbox, 'disabled', false);
                    });
                }
        },
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
