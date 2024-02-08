<template>
    <ion-list>    
        <div class="sub_item_body">
            <BasicForm :contentData="dietCounsellingInfo"/>
        </div>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useDietCounsellingStore} from "@/apps/ANC/store/counselling/dietCounsellingStore";
 import BasicForm from '@/components/BasicForm.vue';
 import { modifyFieldValue} from '@/services/data_helpers'


export default defineComponent({
    name:"Diet Counselling",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },
        methods:{
    handleHivResults(name: any) {
      if (name === 'yes') {
        const data = this.dietCounsellingInfo;
        modifyFieldValue(data, 'selectedValue', 'displayNone', true);
        useDietCounsellingStore().addDietCounsellingInfo(data);
      } else {
        const data = this.dietCounsellingInfo;
        modifyFieldValue(data, 'selectedValue', 'displayNone', false);
        useDietCounsellingStore().addDietCounsellingInfo(data);
      }
    }
    },
    mounted(){
        const  dietCounsellingInfo =useDietCounsellingStore()
    },
      computed:{
        ...mapState(useDietCounsellingStore,["dietCounsellingInfo"]),
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

<!-- //  <ion-item class="sub_item_body_close"/> -->