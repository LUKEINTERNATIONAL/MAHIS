<template>
    <ion-list>   
        <div class="sub_item_body">
            <BasicForm :contentData="trial" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useMedicalFollowUpStore} from "@/apps/ANC/store/medicalFollowUpStore";
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
</style>
@/apps/ANC/store/symptomsFollowUpStore/medicalFollowUpStore