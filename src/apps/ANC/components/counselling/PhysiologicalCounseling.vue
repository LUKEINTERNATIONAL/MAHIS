<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="physiologicalCounselingInfo"
                    :initialData="initialData"
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 1300px; /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; /* Adjust max-width as needed */
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}
ion-card {

  width: 100%;
  color: black;
}
</style>
