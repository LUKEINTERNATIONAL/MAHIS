<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form
            :contentData="deliveryDetails"
            :initialData="initialData"
            @update:selected="handleInputData" @update:inputValue="handleInputData"

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
import {useDeliveryDetailsStore} from "@/apps/PNC/stores/postnatal details/DeliveryDetails";
import {
  getCheckboxSelectedValue,
  getFieldValue,
  getRadioSelectedValue, modifyCheckboxValue,
  modifyRadioValue
} from "@/services/data_helpers";
import {validateField} from "@/services/PNC/obstetric_details_validation_service";
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
    ...mapState(useDeliveryDetailsStore,["deliveryDetails"]),
    "Number of babies"(){ return getFieldValue(this.deliveryDetails, 'Number of babies','value')},
    "Last name"(){ return getFieldValue(this.deliveryDetails, 'Last name','value')},
    "First name"(){ return getFieldValue(this.deliveryDetails, 'First name','value')},
    "Weight"(){ return getFieldValue(this.deliveryDetails, 'Weight','value')},
    "Height"(){ return getFieldValue(this.deliveryDetails, 'Height','value')},
    "Apgar score at 5 minutes"(){ return getFieldValue(this.deliveryDetails, 'Apgar score at 5 minutes','value')},

  },
  mounted(){
   const deliveryDetails=useDeliveryDetailsStore()
    this.initialData=deliveryDetails.getInitial()
    this.handleDeliveryDetails()
    this.validateRowData({})
    this.handlePastProblems()


  },
  watch:{
    deliveryDetails: {
      handler() {
        this.handleDeliveryDetails()
        this.handlePastProblems()
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    handlePastProblems(){
      const checkBoxes=['Prematurity','Sepsis','Congenital abnormalities',
        'Asphyxia','Other complications'
      ]
      if (getCheckboxSelectedValue(this.deliveryDetails, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.deliveryDetails, checkbox, 'checked', false);
          modifyCheckboxValue(this.deliveryDetails, checkbox, 'disabled', true);
        });
      } else {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.deliveryDetails, checkbox, 'disabled', false);
        });
      }
    },
    handleDeliveryDetails() {
      if (getRadioSelectedValue(this.deliveryDetails, 'Outcome of the delivery') == 'Stillbirths') {
        modifyRadioValue(this.deliveryDetails, 'Type of still birth', 'displayNone', false);
      } else {
        modifyRadioValue(this.deliveryDetails, 'Type of still birth', 'displayNone', true);
        modifyRadioValue(this.deliveryDetails, 'Type of still birth', 'selectedValue', '');

      }

    },
    validationRules(event: any) {
      return validateField(this.deliveryDetails,event.name, (this as any)[event.name]);
    },

    //Handling input data on Profile-Past Obstetric history
    async handleInputData(event: any){
      this.validateRowData(event)
    },

    // Validations
    validateRowData(event: any) {
      this.validationRules(event)
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