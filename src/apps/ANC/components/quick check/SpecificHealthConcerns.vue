<template>
  <!--  reason for visit-->
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="HealthConcerns"
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
import {defineComponent, watch} from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg';
import BasicInputField from '@/components/BasicInputField.vue';
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue'
import {useSpecificHealthConcernsStore} from "@/apps/ANC/store/quickCheck/specificHealthConcerns";
import {getCheckboxSelectedValue, modifyCheckboxValue, modifyFieldValue} from "@/services/data_helpers";

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
      healthConcern: '',
      initialData:[] as any

    };
  },
  watch:{
    HealthConcerns:{
      handler(){
        this.handleHealthconcerns()
      },
      deep:true
    }
  },
  mounted() {
    const HealthConcerns=useSpecificHealthConcernsStore()
    this.initialData=HealthConcerns.getInitial();
    this.handleHealthconcerns()
  },
  computed: {
    ...mapState(useSpecificHealthConcernsStore, ["HealthConcerns"])
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },
    handleHealthconcerns(){  if(getCheckboxSelectedValue(this.HealthConcerns, 'Other')?.value =='other'){
      modifyFieldValue(this.HealthConcerns,'Other','displayNone', false)
    }   else {modifyFieldValue(this.HealthConcerns,'Other','displayNone', true)}


      const checkBoxes=['Abnormal vaginal discharge','Change in blood pressure-up','Diarrhoea','Vomiting','Genital ulcers',
                        'Change in blood pressure-down','Constipation', 'Contractions','Vaginal bleeding','Intimate partner violence',
                          'Flu symptoms','Painful urination','Dyspepsia','Itchy vulva','Headache','Heartburn','Frequent urination/Polyuria','Injury','Jaundice','Mental health-Depression',
                        'Genital warts','Painful intercourse','Other']
      if (getCheckboxSelectedValue(this.HealthConcerns, 'No health concerns')?.checked) {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.HealthConcerns, checkbox, 'checked', false);
          modifyCheckboxValue(this.HealthConcerns, checkbox, 'disabled', true);
        });
      } else {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.HealthConcerns, checkbox, 'disabled', false);
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
