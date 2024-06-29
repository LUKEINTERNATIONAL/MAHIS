<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form
            :contentData="dangerSigns"
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
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonToggle,
  IonSelectOption,
  IonInput,
  IonSelect,
  IonRadio,
  IonRadioGroup,
} from '@ionic/vue';
import BasicForm from '../../../../components/BasicForm.vue';
import { icons } from '../../../../utils/svg';
import BasicInputField from '../../../../components/BasicInputField.vue';
import { mapState } from 'pinia';
import { checkmark, pulseOutline } from 'ionicons/icons';
import BasicCard from "@/components/BasicCard.vue";
import {usePostnatalWardStayStore} from "@/apps/PNC/stores/postnatal ward stay/PostnatalWardMonitoring";
import {getCheckboxSelectedValue, modifyCheckboxValue} from "@/services/data_helpers";
export default defineComponent({
  name: "DeliveryDetails",
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
      iconsContent: icons,
      vValidations: '' as any,
      hasValidationErrors: [] as any,
      inputField: '' as any,
      initialData:[] as any,

    };
  },
  computed:{
    ...mapState(usePostnatalWardStayStore,["dangerSigns"]),
  },
  mounted(){
    const dangerSigns=usePostnatalWardStayStore()
    this.initialData=dangerSigns.getInitial()
    this.handleDangerSigns()
  },
  watch:{
    dangerSigns:{
      handler(){
        this.handleDangerSigns()
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    handleDangerSigns(){
      const checkBoxes=['Bleeding vaginally','Central cyanosis','Preterm labour',
      'Severe vomiting','Fever','Visual disturbance','Severe abdominal pain','Unconscious',
          'Other danger signs'
      ]
      if (getCheckboxSelectedValue(this.dangerSigns, 'No danger signs')?.checked) {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.dangerSigns, checkbox, 'checked', false);
          modifyCheckboxValue(this.dangerSigns, checkbox, 'disabled', true);
        });
      } else {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.dangerSigns, checkbox, 'disabled', false);
        });
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

</style>yle>