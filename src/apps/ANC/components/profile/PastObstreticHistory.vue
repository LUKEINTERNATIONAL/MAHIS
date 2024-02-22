<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="sub_item_header">History on previous pregnancies</ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="prevPregnancies" @update:inputValue="validaterowData($event)"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card  style="margin-left: 20px">
        <ion-card-content>
            <basic-form :contentData="modeOfDelivery" @update:inputValue="handleAlert"></basic-form>
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
import { dynamicValue, getCheckboxSelectedValue, getRadioSelectedValue, modifyCheckboxValue, modifyDynamicFieldValue, modifyFieldValue } from '@/services/data_helpers';

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
        currentSection: 0, 
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
        this.modeOfDelieveryRef = {...this.modeOfDelivery[0],...this.modeOfDelivery[1]}
    },
    mounted(){
      this.prevPregnanciesInstance = useObstreticHistoryStore()
      this.prevPregnanciesInstance.setModeOfDelivery([])
      this.handleOther()
      this.handleDynamic()   
    },
    watch:{
      prevPregnancies: {
        
          handler(val) {
            if (val && val[0].data.rowData[2].colData[0].value) {
              const liveBirths = parseInt(val[0].data.rowData[2].colData[0].value)
              this.prevPregnanciesInstance.setModeOfDelivery([])

              const births = []
              for (let i = 0; i < liveBirths; ++i) {
                const x = JSON.parse(JSON.stringify({...this.modeOfDelieveryRef, id: i}))
                x.radioBtnContent.header.title = `Specify mode of delivery (Child ${i + 1})`;
                x.radioBtnContent.header.id=i
                x.data.id=i
                births.push(x)
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
         
        if(getCheckboxSelectedValue(this.Complications,'Other')?.value =='otherInfo'){
          
          modifyFieldValue(this.Complications,'otherC','displayNone',false)
        }else{
          modifyFieldValue(this.Complications,'otherC','displayNone',true)
        }
         const checkBoxes=['Asphyxia','Does not know','Pre-eclampsia',
                           'Eclampsia','Puerperal Sepsis',
                           'Baby died within 24hrs of birth',
                           'Convulsions','Forceps','Gestational diabetes mellitus',
                           'Heavy bleeding','Macrosomia',
                           'Perineal tear (3rd or 4th degree)','Other',]

      if (getCheckboxSelectedValue(this.Complications, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.Complications, checkbox, 'checked', false);
            modifyCheckboxValue(this.Complications, checkbox, 'disabled', true);
        });
        } else {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.Complications, checkbox, 'disabled', false);
        });
    }
       
      },
      handleDynamic(){
        if(getRadioSelectedValue(this.modeOfDelivery,'cesareanSec')=='cesarean'){
          modifyFieldValue(this.modeOfDelivery,'Specify','displayNone',false)
        }else{
          modifyFieldValue(this.modeOfDelivery,'Specify','displayNone',true)
         }
         
      },
      handleAlert(e:any){
        if(dynamicValue(this.modeOfDelivery,'cesareanSec',e.id)=='cesarean'){
          modifyDynamicFieldValue(e.id,this.modeOfDelivery,'Specify','displayNone',false)
        }else{
          modifyDynamicFieldValue(e.id,this.modeOfDelivery,'Specify','displayNone',true)
         }
         console.log(dynamicValue(this.modeOfDelivery,'cesareanSec',e.id),e.id)
      },
      // Validations
      validaterowData(ev: any) {
        const gravidaField = this.prevPregnancies.find((field: any) => field.data.rowData[0].colData[0].name === "Gravida");
        const abortionsField = this.prevPregnancies.find((field: any) => field.data.rowData[0].colData[1].name === "Abortions/Miscarriages");
        const stillBirthsField = this.prevPregnancies.find((field: any) => field.data.rowData[1].colData[0].name === "Stillbirths");

        if (gravidaField && ev.name === gravidaField.data.rowData[0].colData[0].name) {
          let errorMessage = '';

          if (StandardValidations.required(ev.value) != null) {
            errorMessage = StandardValidations.required(ev.value);
          } else if (StandardValidations.isWholeNumber(ev.value) != null) {
            errorMessage = StandardValidations.isWholeNumber(ev.value);
          } else if (StandardValidations.checkMinMax(ev.value, 1, 15) != null) {
            errorMessage = StandardValidations.checkMinMax(ev.value, 1, 15);
          }

          modifyFieldValue(this.prevPregnancies, gravidaField.data.rowData[0].colData[0].name, 'alertsError', !!errorMessage);
          modifyFieldValue(this.prevPregnancies, gravidaField.data.rowData[0].colData[0].name, 'alertsErrorMassage', errorMessage || '');
        }

        if (abortionsField && ev.name === abortionsField.data.rowData[0].colData[1].name) {
          let errorMessage = '';

          if (StandardValidations.required(ev.value) != null) {
            errorMessage = StandardValidations.required(ev.value);
          } else if (StandardValidations.isWholeNumber(ev.value) != null) {
            errorMessage = StandardValidations.isWholeNumber(ev.value);
          } else if (StandardValidations.checkMinMax(ev.value, 0, 15) != null) {
            errorMessage = StandardValidations.checkMinMax(ev.value, 0, 15);
          } else {
            const gravidaValue = gravidaField.data.rowData[0].colData[0].value;
            if (parseInt(ev.value) > parseInt(gravidaValue) || parseInt(ev.value) < 0) {
              errorMessage = "Abortions/Miscarriages should be less than or equal to Gravida and greater than or equal to 0.";
            }
          }

          modifyFieldValue(this.prevPregnancies, abortionsField.data.rowData[0].colData[1].name, 'alertsError', !!errorMessage);
          modifyFieldValue(this.prevPregnancies, abortionsField.data.rowData[0].colData[1].name, 'alertsErrorMassage', errorMessage || '');
        }

        if (stillBirthsField && ev.name === stillBirthsField.data.rowData[1].colData[0].name) {
          let errorMessage = '';

          if (StandardValidations.required(ev.value) != null) {
            errorMessage = StandardValidations.required(ev.value);
          } else if (StandardValidations.isWholeNumber(ev.value) != null) {
            errorMessage = StandardValidations.isWholeNumber(ev.value);
          } else if (StandardValidations.checkMinMax(ev.value, 0, 15) != null) {
            errorMessage = StandardValidations.checkMinMax(ev.value, 0, 15);
          }

          modifyFieldValue(this.prevPregnancies, stillBirthsField.data.rowData[1].colData[0].name, 'alertsError', !!errorMessage);
          modifyFieldValue(this.prevPregnancies, stillBirthsField.data.rowData[1].colData[0].name, 'alertsErrorMassage', errorMessage || '');
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