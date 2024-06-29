<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="dietCounsellingInfo"
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

<!-- //  <ion-item class="sub_item_body_close"/> -->