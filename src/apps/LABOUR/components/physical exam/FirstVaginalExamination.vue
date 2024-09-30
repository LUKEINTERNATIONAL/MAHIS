<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header">Cervix</ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form :contentData="firstVaginalExamination"   
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
import {
  dynamicValue,
  getCheckboxSelectedValue,
  getFieldValue,
  getRadioSelectedValue,
  modifyFieldValue,
  modifyRadioValue,
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
import {FirstVaginalExaminationValidationSchema, usefirstVaginalExaminationStore} from "@/apps/LABOUR/stores/physical exam/firstVaginalExamination";
import { YupValidateField } from '@/services/validation_service';
export default defineComponent({
  name: "FirstVaginalExamination", 
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
      showPulsingAlert: false as boolean

    };
  },
  computed:{
    ...mapState(usefirstVaginalExaminationStore,["firstVaginalExamination"]),
  },
  mounted(){
  },
  watch:{
    firstVaginalExamination:{
      handler(){
        this.handleShow();
        this.handleRupturedMembrane();
        this.showPulsingAlert = getRadioSelectedValue(this.firstVaginalExamination, 'Is Cord Pulsating')=="yes"
      },
      deep:true
    },
    showPulsingAlert: {
      handler(){
        this.handleShowAlertCordPulsating();
      }
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    handleShow(){
      const isOther =
        getRadioSelectedValue(this.firstVaginalExamination, "Show") ==
        "present";

      modifyRadioValue(
        this.firstVaginalExamination,
        "Color",
        "displayNone",
        !isOther
      );
    },
    async handleInputData(event: any) {
      YupValidateField(
        this.firstVaginalExamination,
        FirstVaginalExaminationValidationSchema,
        event.name,
        event.value
      );
    },
    handleShowAlertCordPulsating(){
      const value = getRadioSelectedValue(this.firstVaginalExamination, 'Is Cord Pulsating');
      const inputItem =this.firstVaginalExamination.find((item:any)=>item?.radioBtnContent?.header?.name=="Is Cord Pulsating");

      if(value== "yes"){
        inputItem.alerts.push({
              backgroundColor: "#FF9999",
              status: "info",
              icon: "info-circle",
              textColor: "#000000",
              value: "emergency",
              name: "Is Cord Pulsating",
            });
            return
      }
      inputItem.alerts = []
    },
    handleRupturedMembrane(){
      const stateOfMembrane = getRadioSelectedValue(this.firstVaginalExamination, "State of membranes");
      const cord = getRadioSelectedValue(this.firstVaginalExamination, "Cord");
      const liquor = getRadioSelectedValue(this.firstVaginalExamination, "Liquor");
      const whatIsPresenting = getRadioSelectedValue(this.firstVaginalExamination, "What part is presenting");
 
   

      modifyRadioValue(
        this.firstVaginalExamination,
        "How",
        "displayNone",
        !(stateOfMembrane =="ruptured")
      );
      modifyFieldValue(
        this.firstVaginalExamination,
        "time membranes ruptured",
        "displayNone",
        !(stateOfMembrane =="ruptured")
      );
      modifyFieldValue(
        this.firstVaginalExamination,
        "date membranes ruptured",
        "displayNone",
        !(stateOfMembrane =="ruptured")
      );
      modifyRadioValue(
        this.firstVaginalExamination,
        "cold felt color",
        "displayNone",
       !(cord=="felt")
      );

      modifyRadioValue(
        this.firstVaginalExamination,
        "Meconium Grade",
        "displayNone",
       !(liquor=="meconium stained")
      );

      modifyFieldValue(this.firstVaginalExamination,"specify","displayNone",!(whatIsPresenting=="other"))
      modifyFieldValue(this.firstVaginalExamination,"Position of sutures and fontanelles","displayNone",!(whatIsPresenting=="head"))
      modifyRadioValue(this.firstVaginalExamination,"Level in relation to ischial spines","displayNone",!(whatIsPresenting=="head"))
      modifyRadioValue(this.firstVaginalExamination,"Caput","displayNone",!(whatIsPresenting=="head"))
      modifyRadioValue(this.firstVaginalExamination,"Moulding","displayNone",!(whatIsPresenting=="head"))
      modifyRadioValue(this.firstVaginalExamination,"Is Cord Pulsating","displayNone",!(cord=="presenting" || cord=="prolapsed"))
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