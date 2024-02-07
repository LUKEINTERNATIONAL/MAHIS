<template>
    <ion-list>    
        <div class="sub_item_body">
            <BasicForm :contentData="referralInfo" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useReferralStore} from "@/apps/ANC/store/referral/referralStore";
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
        const  referralInfo =useReferralStore()
    },
      computed:{
        ...mapState(useReferralStore,["referralInfo"]),
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
