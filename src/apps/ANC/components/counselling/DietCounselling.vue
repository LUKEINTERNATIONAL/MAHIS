<template>
    <ion-list>    
        <div class="sub_item_body">
            <BasicForm :contentData="dietCounsellingInfo"
                        :initialData="initialData"
            />
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
 import {initial} from "lodash";


export default defineComponent({
    name:"Diet Counselling",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },

  data(vm) {
      return{
        initialData:[] as any,
      }
  },
        methods:{

    },
    mounted(){
        const  dietCounsellingInfo =useDietCounsellingStore()
        this.initialData=dietCounsellingInfo.getInitial()
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