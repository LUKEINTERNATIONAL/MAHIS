<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-content>
              <basic-form :contentData="prevPregnancies"  @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
              <basic-form :contentData="modeOfDelivery" @update:inputValue="handleAlert"></basic-form>
             <basic-form :contentData="preterm"></basic-form>
              <div v-if="alertMessage" class="alert-message">
                {{ alertMessage }}
              </div>
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
import { icons } from '@/utils/svg';
import BasicInputField from '../../../../components/BasicInputField.vue';
import { mapState } from 'pinia';
import { useObstreticHistoryStore} from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { checkmark, pulseOutline } from 'ionicons/icons';
import {
  dynamicValue,
  getCheckboxSelectedValue,
  getFieldValue,
  getRadioSelectedValue,
  modifyCheckboxValue,
  modifyDynamicFieldValue,
  modifyFieldValue, modifyRadioValue
} from '@/services/data_helpers';
import StandardValidations from "@/validations/StandardValidations";
import {validateField} from "@/services/ANC/profile_validation_service"
import BasicCard from "@/components/BasicCard.vue";
import { Service } from "@/services/service"
export default defineComponent({
  name: "History",
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
        modeOfDelieveryRef: {},
        iconsContent: icons,
        vValidations: '' as any,
        hasValidationErrors: [] as any,
        prevPregnanciesInstance: {} as any,
        modeOfDeliveryInstance: {} as any,
        currentSection: 0,
        inputField: '' as any,
        alertMessage: '' as string,
        

    };
  },
  computed:{
        ...mapState(useObstreticHistoryStore,["prevPregnancies"]),
        ...mapState(useObstreticHistoryStore,["preterm"]),
        ...mapState(useObstreticHistoryStore,["abnormalities"]),
        ...mapState(useObstreticHistoryStore,["modeOfDelivery"]),
        ...mapState(useObstreticHistoryStore, ["Complications"]),
        Stillbirths(){ return getFieldValue(this.prevPregnancies, 'Stillbirths','value')},
        Gravida(){ return getFieldValue(this.prevPregnancies, 'Gravida','value')},
        LiveBirths(){ return getFieldValue(this.prevPregnancies, 'LiveBirths','value')},
        Parity(){ return getFieldValue(this.prevPregnancies, 'Parity','value')},
        "Abortions/Miscarriages"(){ return getFieldValue(this.prevPregnancies, 'Abortions/Miscarriages','value')},
  },
    created() {
        this.modeOfDelieveryRef = {...this.modeOfDelivery[0],...this.modeOfDelivery[1]}
    },
    mounted(){
      this.prevPregnanciesInstance = useObstreticHistoryStore()
      // this.prevPregnanciesInstance.setModeOfDelivery([])
      this.handleOther()
      this.handleDynamic()
      this.handleGravida(event)
      this.validaterowData({})

    },
    watch:{
      LiveBirths:{


        handler(val){
         if(val == 0 || !val){
           this.prevPregnanciesInstance.setModeOfDelivery(0)
         }
        }
      },
      prevPregnancies: {
          handler(val) {
            if (val && val[2].data.rowData[0].colData[0].value) {
              const liveBirths = parseInt(val[2].data.rowData[0].colData[0].value)
              // this.prevPregnanciesInstance.setModeOfDelivery([])
              // const births = []
              // for (let i = 0; i < liveBirths; ++i) {
              //   const x = JSON.parse(JSON.stringify({...this.modeOfDelieveryRef, id: i}))
              //   x.radioBtnContent.header.title = `Specify mode of delivery (Child ${i + 1})`;
              //   x.radioBtnContent.header.id=i
              //   x.data.id=i
              //   births.push(x)
              // }
              this.prevPregnanciesInstance.setModeOfDelivery(liveBirths)
            }
            this.handleGravida(val)
            this.handleOther()


          },

        deep: true,
      },
      modeOfDelivery:{
        handler(){
           this.handleDynamic()  
           this.prevPregnanciesInstance.checkChanges()
        },
        deep:true
      },
    },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
      handleOther(){
         
                  if(getCheckboxSelectedValue(this.prevPregnancies,'Other')?.value =='other'){

                    modifyFieldValue(this.prevPregnancies,'Other notes','displayNone',false)
                  }else{
                    modifyFieldValue(this.prevPregnancies,'Other notes','displayNone',true)
                  }
                   const checkBoxes=['Asphyxia','Does not know','Pre-eclampsia',
                                     'Eclampsia','Puerperal Sepsis',
                                     'Baby died within 24hrs of birth',
                                     'Convulsions','Forceps','Gestational diabetes mellitus',
                                     'Heavy bleeding','Macrosomia',
                                     'Perineal tear (3rd or 4th degree)','Other',]

                if (getCheckboxSelectedValue(this.prevPregnancies, 'None')?.checked) {
                  checkBoxes.forEach((checkbox) => {
                      modifyCheckboxValue(this.prevPregnancies, checkbox, 'checked', false);
                      modifyCheckboxValue(this.prevPregnancies, checkbox, 'disabled', true);
                  });
                  } else {
                  checkBoxes.forEach((checkbox) => {
                      modifyCheckboxValue(this.prevPregnancies, checkbox, 'disabled', false);
                  });
              }

      },

      handleDynamic(){
                if(getRadioSelectedValue(this.modeOfDelivery,'Mode of delivery')=='caesarean section'){
                  modifyFieldValue(this.modeOfDelivery,'Specify','displayNone',false)
                }else{
                  modifyFieldValue(this.modeOfDelivery,'Specify','displayNone',true)
                 }
      },
      handleAlert(e:any){
              if(dynamicValue(this.modeOfDelivery,'Mode of delivery',e.id)=='caesarean section'){
                modifyDynamicFieldValue(e.id,this.modeOfDelivery,'Specify','displayNone',false)
              }else{
                modifyDynamicFieldValue(e.id,this.modeOfDelivery,'Specify','displayNone',true)
               }
              },


      validationRules(event: any) {
             return validateField(this.prevPregnancies,event.name, (this as any)[event.name]);
      },

      //Handling input data on Profile-Past Obstetric history
      async handleInputData(event: any){
            this.validaterowData(event)
        this.calculateParity(event)
            this.calculateLiveBirths(event)
      },

      // Validations
      validaterowData(event: any) {
           this.validationRules(event)
         },

          //Calculating parity.
      calculateParity(event: any) {
        if (event.name === 'LiveBirths' || event.name === 'Stillbirths') {
          const stillbirthValue = parseInt(getFieldValue(this.prevPregnancies, 'Stillbirths', 'value'));
          const liveBirthValue = parseInt(getFieldValue(this.prevPregnancies, 'LiveBirths', 'value'));
          if (!isNaN(stillbirthValue) && !isNaN(liveBirthValue)) {
            const parityValue = stillbirthValue + liveBirthValue;
            modifyFieldValue(this.prevPregnancies, 'Parity', 'value', parityValue);
          } else {
            modifyFieldValue(this.prevPregnancies, 'Parity', 'value', null);           }
        }
      },
      calculateLiveBirths(event:any){
        if (event.name === 'Gravida' || event.name === 'Abortions/Miscarriages') {
          let errorMessage: any = "";
          const gravidaValue= parseInt(getFieldValue(this.prevPregnancies, 'Gravida', 'value'));
          const abortionsValue = parseInt(getFieldValue(this.prevPregnancies, 'Abortions/Miscarriages', 'value'));
          if (!isNaN(gravidaValue) && !isNaN(abortionsValue)) {
            const liveBirthsValue = (gravidaValue)-abortionsValue
            modifyFieldValue(this.prevPregnancies, 'LiveBirths', 'value', liveBirthsValue);
             if (getFieldValue(this.prevPregnancies, 'LiveBirths','value',)>=1){
               modifyRadioValue(this.prevPregnancies,'Was last live birth preterm?','displayNone', false)
             } else{
               modifyRadioValue(this.prevPregnancies,'Was last live birth preterm?','displayNone', true)
             }
          } else {
            modifyFieldValue(this.prevPregnancies, 'LiveBirths', 'value', null);          }
        }
      },
      handleGravida(event: any) {
        const gravida = getFieldValue(this.prevPregnancies, 'Gravida', 'value');
        const alertMessage = "First pregnancy, take note";
        const existingAlert = this.prevPregnancies[0].alerts.findIndex(
            (alert: any) => alert.value === alertMessage
        );
        if (gravida == 1) {
          modifyRadioValue(this.prevPregnancies, 'Was last live birth preterm?', 'displayNone', true);
          modifyRadioValue(this.prevPregnancies, 'Last live birth had congenital abnormalities', 'displayNone', true);
          modifyRadioValue(this.prevPregnancies, 'Last live birth preterm was full term', 'displayNone', true);
          modifyCheckboxValue(this.prevPregnancies, 'past pregnancies complications', 'displayNone', true);
          if (existingAlert === -1) {
            this.prevPregnancies[0].alerts.push({
              backgroundColor: "#FFD700",
              status: "info",
              icon: "info-circle",
              textColor: "#000000",
              value: alertMessage,
              name: "Gravida",
            });
          }
        } else {
          modifyRadioValue(this.prevPregnancies, 'Was last live birth preterm?', 'displayNone', false);
          modifyRadioValue(this.prevPregnancies, 'Last live birth preterm was full term', 'displayNone', false);
          modifyRadioValue(this.prevPregnancies, 'Last live birth had congenital abnormalities', 'displayNone', false);
          modifyCheckboxValue(this.prevPregnancies, 'past pregnancies complications', 'displayNone', false);

          if (existingAlert !== -1) {
            this.prevPregnancies[0].alerts.splice(existingAlert, 1);
          }
        }

        this.$forceUpdate();
      }

    },
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

</style>