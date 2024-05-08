<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form
            :contentData="physicalExam"
            :initialData="initialData"

        ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenu,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/vue';
import BasicForm from "@/components/BasicForm.vue";
import {icons} from "@/utils/svg";
import BasicInputField from "@/components/BasicInputField.vue";
import {mapState} from 'pinia';
import {checkmark, pulseOutline} from 'ionicons/icons';
import {
  getCheckboxSelectedValue,
  getRadioSelectedValue,
  modifyCheckboxHeader, modifyCheckboxValue,
  modifyFieldValue,
  modifyRadioValue,
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
import {usePhysicalExaminationStore} from "@/apps/OPD/stores/PhysicalExamination";
import physicalExam from "@/apps/LABOUR/views/labourAssessment.vue";

export default defineComponent({
  name: "immidiatePostnatalChecksForChild",
  components:{
    BasicCard,
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
    BasicForm,
    IonRadio,
    IonRadioGroup
  },

  data() {
    return {
      initialData: [] as any,
      iconsContent: icons,
      vValidations: '' as any,
      hasValidationErrors: [] as any,
      inputField: '' as any,

    };
  },
  computed:{
    ...mapState(usePhysicalExaminationStore,["physicalExam"]),
  },
  mounted(){
    const physicalExam=usePhysicalExaminationStore();
    this.initialData=physicalExam.getInitial();
    this.handlePhysicalExam()

  },
  watch:{
    physicalExam: {
      handler() {
        this.handlePhysicalExam()
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    handlePhysicalExam() {
      if (getRadioSelectedValue(this.physicalExam, 'Physical examination') == 'No') {
        // Handle when physical exam is No
        modifyRadioValue(this.physicalExam, 'Reason why physical examination not done', 'displayNone', false);
        } else {
        modifyRadioValue(this.physicalExam, 'Reason why physical examination not done', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Reason why physical examination not done', 'selectedValue', '');

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
  max-width: 1300px;
  margin-bottom: 20px;
}

ion-card {
  box-shadow:none;
  background-color:inherit;
  width: 100%;
  color: black;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header{
  font-weight: bold;
  font-size: 14px;
}

</style>

