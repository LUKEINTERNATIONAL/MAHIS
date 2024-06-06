<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form
            :contentData="referralInfo"
            @update:selected="handleInputData" @update:inputValue="handleInputData"

        ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
<!--  :initialData="initialData"-->
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useReferralStore} from "@/apps/ANC/store/referral/referralStore";
 import BasicForm from '@/components/BasicForm.vue';
 import {modifyRadioValue, getRadioSelectedValue, modifyFieldValue, getFieldValue} from '@/services/data_helpers'
 import {LocationService} from "@/services/location_service";
 import {validateField} from "@/services/ANC/referral_validation_service";


export default defineComponent({
    name:"Referral",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },
  data(){
    return{
      //referral facility data
      no_item: false,
      search_item: false,
      display_item: false,
      addItemButton: true,
      selectedText: "" as any,
      conditionStatus: "" as any,
      data: [] as any,
      facilityData: [] as any,
      popoverOpen: false,
      event: "" as any,
      selectedCondition: "" as any,
    }
  },


    mounted(){
        const  referralInfo =useReferralStore()
        this.handleReferral()
      this.validaterowData({})

    },
    watch:{
        referralInfo:{
            handler(){
                this.handleReferral()
            },
            deep:true
        }
    },
      computed:{
        ...mapState(useReferralStore,["referralInfo"]),
        "Provider’s phone number"(){ return getFieldValue(this.referralInfo, 'Provider’s phone number','value')},

      },
    methods:{
        handleReferral(){
            if(getRadioSelectedValue(this.referralInfo,'referalOption') == 'yes'){
                modifyRadioValue(this.referralInfo,'referralOutcome','displayNone',false)
            }else{
                modifyRadioValue(this.referralInfo,'referralOutcome','displayNone',true)
            }
        },


      //Handling input data on Referral
      async handleInputData(col: any){
        this.validaterowData(col)
        this.handleReferralDateRange(col)
        this.handleDateOfScheduledReferralRange(col)

        if(col.inputHeader  == "Where is the client being referred to? *"){

          this.facilityData = await this.getFacility(col.value);
          modifyFieldValue(this.referralInfo,'Location of referral',"popOverData",{
            filterData: false,
            data: this.facilityData,
          },)

        }
        if(col.inputHeader  == "Provider’s facility *"){

          this.facilityData = await this.getFacility(col.value);
          modifyFieldValue(this.referralInfo,'Provider’s facility',"popOverData",{
            filterData: false,
            data: this.facilityData,
          },)

        }
      },
      async getFacility(value:any){
        const data = await LocationService.getFacilities({ name: value })
        return data
      },
      validationRules(event: any) {
        return validateField(this.referralInfo,event.name, (this as any)[event.name]);
      },


      // Validations
      validaterowData(event: any) {
        this.validationRules(event)
      },
      handleReferralDateRange(event: any) {
        // Get the current date
        const currentDate = new Date();
        // Calculate the date 36 weeks before the current date
        const minDate = new Date(currentDate);
        const maxDate = new Date(currentDate);
        minDate.setDate(minDate.getDate() - 1);
        maxDate.setMonth(maxDate.getMonth() + 6);

        // Format the minDate and maxDate to a string in the desired format (e.g., YYYY-MM-DD)
        const formattedMinDate = minDate.toISOString().split('T')[0];
        const formattedMaxDate = maxDate.toISOString().split('T')[0];
        // Set the minDate and maxDate
        modifyFieldValue(this.referralInfo, 'Date scheduled referral', 'minDate', formattedMinDate);
        modifyFieldValue(this.referralInfo, 'Date scheduled referral', 'maxDate', formattedMaxDate);
      },
      handleDateOfScheduledReferralRange(event: any) {
        // Get the current date
        const currentDate = new Date();
        const minDate = new Date(currentDate);
        minDate.setDate(minDate.getDate() - 1);        // Format the minDate and maxDate to a string in the desired format (e.g., YYYY-MM-DD)
        const formattedMinDate = minDate.toISOString().split('T')[0];
        const formattedMaxDate = currentDate.toISOString().split('T')[0];
        // Set the minDate and maxDate
        modifyFieldValue(this.referralInfo, 'Date referral was made', 'minDate', formattedMinDate);
        modifyFieldValue(this.referralInfo, 'Date referral was made', 'maxDate', formattedMaxDate);
      },
    },

})
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





