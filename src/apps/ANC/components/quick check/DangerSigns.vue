<template>
  <div class="container">
    <!-- Danger signs -->
    <ion-card v-if="currentSection === 0" class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Danger signs</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="DangerSigns"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- previous visit -->
    <ion-card v-if="currentSection === 1" class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Has the woman had previous ANC visits at another facility?</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="PreviousVisit"></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- Navigation Buttons -->
    <div class="navigation-buttons">
      <ion-button @click="goToPreviousSection" expand="block" color="medium" size="large">Previous</ion-button>
      <ion-button @click="goToNextSection" expand="block" color="primary" size="large">Next</ion-button>
    </div>
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
import {useDangerSignsStore} from "@/apps/ANC/store/quickCheck/dangerSigns";
import {
  modifyRadioValue,
  getRadioSelectedValue,
  modifyFieldValue,
  getCheckboxSelectedValue
} from "@/services/data_helpers";

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
      currentSection: 0, // Initialize currentSection to 0


    };
  },
  mounted() {
    const DangerSigns =useDangerSignsStore()
    const PreviousVisit =useDangerSignsStore()
    this.handleNumberOfVisits()
    this.handleDangerSigns()
  },
  watch:{
    PreviousVisit:{
    handler(){
      this.handleNumberOfVisits()
    },
    deep:true
    },
    DangerSigns:{
      handler(){
        this.handleDangerSigns()
      },
      deep:true
    }
  },
  computed: {
    ...mapState(useDangerSignsStore, ["DangerSigns"]),
    ...mapState(useDangerSignsStore, ["PreviousVisit"]),
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },
    handleDangerSigns(){
      if(getCheckboxSelectedValue(this.DangerSigns, 'Other')=='other'){
      modifyFieldValue(this.DangerSigns,'Other','displayNone', false)
    }   else {modifyFieldValue(this.DangerSigns,'Other','displayNone', true)}
      },

    handleNumberOfVisits(){
      if(getRadioSelectedValue(this.PreviousVisit, 'Yes')=='yes'){
        modifyFieldValue(this.PreviousVisit,'number of previous anc visits','displayNone', false)
      }   else {modifyFieldValue(this.PreviousVisit,'number of previous anc visits','displayNone', true)}
    },
    //Method for navigating
    goToNextSection() {
      if (this.currentSection < 1) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
      }
    },

    //
    // dangerSigns(){
    //   this.dangerSignChecked = !this.dangerSignChecked
    //   if (this.dangerSignChecked) {
    //     this.dangerSign = 'none'
    //   } else {this.dangerSign = ''}
    // },


  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
</style>
