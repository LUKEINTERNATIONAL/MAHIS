<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form
            :contentData="dischargeWoman"
            :initialData="initialData"
            @update:selected="handleInputData"
            @update:inputValue="handleInputData"
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
import {useDischargeWomanStore} from "@/apps/PNC/stores/others/DischargeWoman";
import {validateField} from "@/services/ANC/profile_validation_service";
import { getCheckboxSelectedValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers'
import { useMedicalHistoryStore } from '@/apps/ANC/store/profile/medicalHistoryStore';
import { LocationService } from '@/services/location_service';

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
      facilityData: [] as any,
    };
  },
  computed:{
    ...mapState(useDischargeWomanStore,["dischargeWoman"]),
  },
  mounted(){
    const dischargeWoman=useDischargeWomanStore()

    this.initialData=dischargeWoman.getInitial()
    this.handleSelection()
  },
  watch:{
    dischargeWoman: {
      handler(col){
        this.handleSelection()
        this.handleInputData(col)
      },
      deep: true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    validationRules(col: any) {
        return validateField(this.dischargeWoman,col.name, (this as any)[col.name]);
    },
    async handleInputData(col:any){
          this.validationRules(col)
          if(col.inputHeader  == "Facility for ART"){
                this.facilityData = await this.getFacility(col.value);
                modifyFieldValue(this.dischargeWoman,'facility for art',"popOverData",{
                filterData: false,
                data: this.facilityData,
              },)

            }

        },
        async getFacility(value:any){
           const data = await LocationService.getFacilities({ name: value })
            return data
        },
      handleSelection() {
        if (getRadioSelectedValue(this.dischargeWoman, "Discharge status of woman") == "Referred out") {
          modifyFieldValue(this.dischargeWoman, "facility for art", "displayNone", false)
        }else{
          modifyFieldValue(this.dischargeWoman, "facility for art", "displayNone", true)
        }

        if (getRadioSelectedValue(this.dischargeWoman, "Discharge status of woman") == "Death") {
          modifyFieldValue(this.dischargeWoman, "Date of Death", "displayNone", false)
        } else {
          modifyFieldValue(this.dischargeWoman, "Date of Death", "displayNone", true)
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