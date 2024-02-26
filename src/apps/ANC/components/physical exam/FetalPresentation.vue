<template>
  <!--  Fetal presentation-->
  <div class="container">
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Fetal presentation result</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="fetalPresentation"></basic-form>
      </ion-card-content>
    </ion-card>
  </div>


</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
  menuController,
  IonInput, IonToggle
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { icons } from '@/utils/svg';
import {useFetalPresentationStore} from "@/apps/ANC/store/physical exam/FetalPresantationStore";
import { mapState } from 'pinia';
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue"
import { VitalsService } from "@/services/vitals_service";
import BasicForm from '@/components/BasicForm.vue';
import { Service } from "@/services/service";
import {getRadioSelectedValue, modifyFieldValue} from "@/services/data_helpers";

export default defineComponent({
  components:{
    IonToggle,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    BasicInputField,
    BasicForm
  },
  data() {
    return {
      iconsContent: icons,
      vValidations: '' as any,
      hasValidationErrors: [] as any,
    };
  },
  computed:{

    ...mapState(useFetalPresentationStore,["fetalPresentation"]),
  },
  mounted(){
    const userID: any  = Service.getUserID()
    const fetalPresentation=useFetalPresentationStore()
    this.handleFetalPresentation()

  },
  watch: {
    fetalPresentation:{
      handler(){
        this.handleFetalPresentation();
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },
    handleFetalPresentation(){
      if(getRadioSelectedValue(this.fetalPresentation, 'fetalPresentation')=='other'){
        modifyFieldValue(this.fetalPresentation,'Other fetal presentation','displayNone', false)
      }   else {modifyFieldValue(this.fetalPresentation,'Other fetal presentation','displayNone', true)}
    },

  }
});

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
  box-shadow:none;
  background-color:inherit;
}
</style>
