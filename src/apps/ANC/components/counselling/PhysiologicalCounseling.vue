<template>
    <ion-list>    
        <div class="sub_item_body">
            <BasicForm
                :contentData="physiologicalCounselingInfo"
                :initialData="initialData"
            />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
 import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {usePhysiologicalCounselingStore} from "@/apps/ANC/store/counselling/physiologicalCounselingStore";
 import BasicForm from '@/components/BasicForm.vue';
 import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue} from '@/services/data_helpers'


export default defineComponent({
    name:"Persistent Behaviour",
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

    mounted(){
        const  physiologicalCounselingInfo =usePhysiologicalCounselingStore()
        this.initialData=physiologicalCounselingInfo.getInitial()
    },
    watch:{
        physiologicalCounselingInfo:{
            handler(){

            },
            deep:true
        }
    },
      computed:{
        ...mapState(usePhysiologicalCounselingStore,["physiologicalCounselingInfo"]),
    },
    methods:{


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
</style>
