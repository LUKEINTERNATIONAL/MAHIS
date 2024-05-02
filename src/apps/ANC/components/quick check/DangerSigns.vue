<template>
  <div class="container">
    <!-- Danger signs -->
    <ion-card  class="section">
      <ion-card-content>
        <basic-form :contentData="DangerSigns"
                    :initialData="initialData"

        ></basic-form>
      </ion-card-content>
    </ion-card>

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
  getCheckboxSelectedValue, modifyCheckboxValue
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
      initialData:[]as any,
      iconsContent: icons,


    };
  },

  mounted() {
    const DangerSigns =useDangerSignsStore()
    this.initialData=DangerSigns.getInitial();
    this.handleDangerSigns()
  },
  watch:{
    PreviousVisit:{
    handler(val){
      // if (val && val[1].data.rowData[0].colData[0].value) {
      //   const numberOfvisits = parseInt(val[1].data.rowData[0].colData[0].value)
      //   this.previousVisitInstance.setPreviousVisitDate([])
      //
      //   const visits = []
      //   for (let i = 0; i < numberOfvisits; ++i) {
      //     const x = JSON.parse(JSON.stringify({...this.previousVisitDateRef, id: i}))
      //     x.data.sectionHeader = `Enter the date of (Visit ${i + 1})`;
      //     x.data.sectionHeader.id=i
      //     x.data.id=i
      //     visits.push(x)
      //   }
      //
      //   this.previousVisitDateInstance.setPreviousVisitDate(visits)
      // }


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

      const checkBoxes=['Pre-term labour','Central cyanosis', 'Unconscious', 'Fever', 'Imminent delivery',
                        'Severe headache', 'Severe vomiting','Severe abdominal pain','Draining liquor',
                        'Respiratory problems','Convulsion history','Vomiting' , 'Oedema', 'Epigastric pain', 'Bleeding vaginally', 'Other']
      if (getCheckboxSelectedValue(this.DangerSigns, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.DangerSigns, checkbox, 'checked', false);
          modifyCheckboxValue(this.DangerSigns, checkbox, 'disabled', true);
        });
      } else {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.DangerSigns, checkbox, 'disabled', false);
        });
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
ion-card {
  box-shadow:none;
  background-color:inherit;
}
</style>
