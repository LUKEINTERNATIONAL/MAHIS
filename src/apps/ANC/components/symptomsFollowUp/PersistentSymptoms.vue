<template>
    <ion-list>   
        <ion-item  class="dashed_bottom_border" style="font-weight: bold;">
             Select which of the following physiological symptoms persist after being reported during last contact
        </ion-item>
        <div class="sub_item_body" >
            <BasicForm :contentData="persistentSymptom" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {usePersistentSymptomsStore} from "@/apps/ANC/store/symptomsFollowUp/persistentSymptomsStore";
 import BasicForm from '@/components/BasicForm.vue';


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
    },
      computed:{
        ...mapState(usePersistentSymptomsStore,["persistentSymptom"]),
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
</style>
@/apps/ANC/store/symptomsFollowUpStore/persistentSymptomsStore