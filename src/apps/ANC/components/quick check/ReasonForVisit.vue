<template>
  <!--  reason for visit-->
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="ReasonForVisit"
                    :initialData="initialData"
        ></basic-form>
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
  IonToggle,
  IonSelectOption,
  IonInput,
  IonSelect,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg';
import BasicInputField from '@/components/BasicInputField.vue';
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue'
import {useReasonForVisitStore} from "@/apps/ANC/store/quickCheck/reasonForVisit";
import {usePastMedicalHistoryStore} from "@/apps/OPD/stores/PastMedicalHistoryStore";
import {getRadioSelectedValue, modifyGroupedRadioValue, modifyRadioValue} from "@/services/data_helpers";

export default defineComponent({
  name: 'Menu',
  components:{
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonInput,
    BasicInputField,
    BasicForm
  },
  data() {
    return {
      iconsContent: icons,
      initialData:[] as any,

    };
  },
  computed: {
    ...mapState(useReasonForVisitStore, ["ReasonForVisit"])
  },
  mounted() {
    const ReasonForVisit = useReasonForVisitStore();
    this.initialData = ReasonForVisit.getInitial();
    this.handleReasonVisit()
  },
  watch:{
    ReasonForVisit:{
      handler(){
        this.handleReasonVisit()
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
    handleReasonVisit(){
      if (getRadioSelectedValue(this.ReasonForVisit, 'Reason for visit') == 'First antenatal care contact') {
        modifyRadioValue(this.ReasonForVisit, 'Previous visits', 'displayNone', true);
        modifyRadioValue(this.ReasonForVisit, 'Previous visits', 'selectedValue', '');

      } else {
        modifyRadioValue(this.ReasonForVisit, 'Previous visits', 'displayNone', false);
        // modifyRadioValue(this.ReasonForVisit, 'Previous visits', 'selectedValue', '');

      }
    }
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

  width: 100%;
  color: black;
}
</style>
