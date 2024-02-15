<template>
    <div class="container">
        <ion-card v-if="currentSection === 0" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="prevPregnancies"></basic-form>
            </ion-card-content>
    </ion-card>

    

    
        <ion-card v-if="currentSection === 1" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header> 
            <ion-card-content>
                <basic-form :contentData="preterm"></basic-form>
                <basic-form :contentData="abnormalities"></basic-form>
            </ion-card-content>
        </ion-card>

  
   
        <ion-card v-if="currentSection === 2" class="section">
            <ion-card-content>
                <basic-form :contentData="modeOfDelivery"></basic-form>
            </ion-card-content>
        </ion-card>
  

   
        <ion-card v-if="currentSection === 3" class="section">
            <ion-card-content><basic-form :contentData="Complications"></basic-form> </ion-card-content>
        </ion-card> 
    
        <!-- Navigation Buttons -->
        <div class="navigation-buttons">
      <ion-button @click="goToPreviousSection" expand="block" color="primary" size="medium">Previous</ion-button>
      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Next</ion-button>
    </div>
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
        handler (val) {
          if (val && val[0].data.rowData[1].colData[1].value) {
            const liveBirths = parseInt(val[0].data.rowData[1].colData[1].value)
            this.prevPregnanciesInstance.setModeOfDelivery([])
            const births = []
            for(let i=0; i < liveBirths; ++i) {
              births.push({...this.modeOfDelieveryRef})
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
  font-size: medium;
}

</style>