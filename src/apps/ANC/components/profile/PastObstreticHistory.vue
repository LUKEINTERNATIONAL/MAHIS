<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="sub_item_header">History on previous pregnancies</ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="prevPregnancies" @update:inputValue="validaterowData($event)"></basic-form>
            </ion-card-content>
        </ion-card>
        <ion-card  style="margin-left: 20px">
<!--          <ion-card-title class="sub_item_header">Specify mode of delivery for each child based on number live births provided</ion-card-title>-->
          <ion-card-content>
            <basic-form :contentData="modeOfDelivery"></basic-form>
          </ion-card-content>
        </ion-card>

        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="preterm"></basic-form>
            </ion-card-content>
        </ion-card>
      <ion-card class="section">
        <ion-card-header> <ion-card-title class="sub_item_header">Does the woman have any complications due to past pregnancies?</ion-card-title></ion-card-header>
        <ion-card-content>
          <basic-form :contentData="Complications"></basic-form>
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
            menuController,
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
import { useObstreticHistoryStore} from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { checkmark, pulseOutline } from 'ionicons/icons';
import { getCheckboxSelectedValue, modifyFieldValue } from '@/services/data_helpers';
import { Service } from "@/services/service";
import StandardValidations from "@/validations/StandardValidations";
export default defineComponent({
  name: "History",
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
    BasicForm,
    IonRadio,
    IonRadioGroup
},

  data() {
    return {
        modeOfDelieveryRef: {},
        iconsContent: icons,
        vValidations: '' as any,
        hasValidationErrors: [] as any,
        prevPregnanciesInstance: {} as any,
        modeOfDeliveryInstance: {} as any,
        currentSection: 0, // Initialize currentSection to 0
    };
  },
  computed:{
        ...mapState(useObstreticHistoryStore,["prevPregnancies"]),
        ...mapState(useObstreticHistoryStore,["preterm"]),
        ...mapState(useObstreticHistoryStore,["abnormalities"]),
        ...mapState(useObstreticHistoryStore,["modeOfDelivery"]),
        ...mapState(useObstreticHistoryStore, ["Complications"])

    },
    created() {
        this.modeOfDelieveryRef = {...this.modeOfDelivery[0]}
    },
    mounted(){
      this.prevPregnanciesInstance = useObstreticHistoryStore()
      this.prevPregnanciesInstance.setModeOfDelivery([])
      this.handleOther()
    },
    watch:{
      prevPregnancies: {
        
          handler(val) {
            if (val && val[0].data.rowData[2].colData[0].value) {
              const liveBirths = parseInt(val[0].data.rowData[2].colData[0].value)
              this.prevPregnanciesInstance.setModeOfDelivery([])

              const births = []
              for (let i = 0; i < liveBirths; ++i) {
                // a deep copy of the template object for each text field
                births.push(JSON.parse(JSON.stringify(this.modeOfDelieveryRef)))
              }

              this.prevPregnanciesInstance.setModeOfDelivery(births)
            }
          },

        deep: true
      },
      Complications:{
        handler(){
          this.handleOther() 
        },
        deep:true,
      }
    },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
      handleOther(){
        if(getCheckboxSelectedValue(this.Complications,'Other')=='otherInfo'){
          modifyFieldValue(this.Complications,'otherC','displayNone',false)
        }else{
          modifyFieldValue(this.Complications,'otherC','displayNone',true)
        }
      },
      // Validations
      validaterowData(ev: any) {
        // Finding corresponding fields
        const gravidaField = this.prevPregnancies.find((field: any) => field.data.rowData[0].colData[0].name === "Gravida");
        const abortionsField = this.prevPregnancies.find((field: any) => field.data.rowData[0].colData[1].name === "Abortions/Miscarriages");

        // Check if the event corresponds to the "Gravida" field
        if (gravidaField && ev.name === gravidaField.data.rowData[0].colData[0].name) {
          let errorMessage = '';

          // Apply required validation
          if (StandardValidations.required(ev.value) != null) {
            errorMessage = StandardValidations.required(ev.value);
          }

          // Apply isNumber validation only if no required error
          if (!errorMessage && StandardValidations.isWholeNumber(ev.value) != null) {
            errorMessage = StandardValidations.isNumber(ev.value);
          }

          // Apply checkMinMax validation only if no required or isNumber error
          if (!errorMessage && StandardValidations.checkMinMax(ev.value, 1, 15) != null) {
            errorMessage = StandardValidations.checkMinMax(ev.value, 1, 15);
          }

          // Update the UI based on validation results
          modifyFieldValue(this.prevPregnancies, gravidaField.data.rowData[0].colData[0].name, 'alertsError', !!errorMessage);
          // Update the error message in the UI
          modifyFieldValue(this.prevPregnancies, gravidaField.data.rowData[0].colData[0].name, 'alertsErrorMassage', errorMessage || '');
        }

        // Check if the event corresponds to the "Abortions/Miscarriages" field
        if (abortionsField && ev.name === abortionsField.data.rowData[0].colData[1].name) {
          let errorMessage = '';

          // Apply required validation
          if (StandardValidations.required(ev.value) != null) {
            errorMessage = StandardValidations.required(ev.value);
          }

          // Apply isNumber validation only if no required error
          if (!errorMessage && StandardValidations.isWholeNumber(ev.value) != null) {
            errorMessage = StandardValidations.isWholeNumber(ev.value);
          }

          // Apply checkMinMax validation only if no required or isNumber error
          if (!errorMessage && StandardValidations.checkMinMax(ev.value, 0, 15) != null) {
            errorMessage = StandardValidations.checkMinMax(ev.value, 0, 15);
          }

          // Additional validation: Ensure abortions value is less than or equal to gravida and >= 0
          const gravidaValue = gravidaField.data.rowData[0].colData[0].value;
          if (!errorMessage && (parseInt(ev.value) > parseInt(gravidaValue) || parseInt(ev.value) < 0)) {
            errorMessage = "Abortions/Miscarriages should be less than or equal to Gravida and greater than or equal to 0.";
          }

          // Update the UI based on validation results
          modifyFieldValue(this.prevPregnancies, abortionsField.data.rowData[0].colData[1].name, 'alertsError', !!errorMessage);
          // Update the error message in the UI
          modifyFieldValue(this.prevPregnancies, abortionsField.data.rowData[0].colData[1].name, 'alertsErrorMassage', errorMessage || '');
        }
      },





      //Method for navigating sections
    goToNextSection() {
      if (this.currentSection < 3) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
      }
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