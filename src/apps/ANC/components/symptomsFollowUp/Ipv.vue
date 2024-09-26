<template>
  <div class="container">

    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="ipv"></basic-form>
        <br/>
        <basic-form :contentData="ipv1"></basic-form>
      </ion-card-content>
    </ion-card>
     <!-- new ipv -->
        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="additionalCare"></basic-form>
                <basic-form :contentData="safety_assessment"></basic-form>
            </ion-card-content>
        </ion-card>

        
        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="physical_violence"></basic-form>
                <basic-form :contentData="beaten_pregnant"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="woman_threatened"></basic-form>
                <basic-form :contentData="constant_jealous"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="strangling"></basic-form>
                <basic-form :contentData="murder_threat"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="referrals"></basic-form>
            </ion-card-content>
        </ion-card>
  </div>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useIpvStore} from "@/apps/ANC/store/symptomsFollowUp/ipvStore";
 import BasicForm from '@/components/BasicForm.vue';
import { getCheckboxSelectedValue, getRadioSelectedValue, modifyCheckboxValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";


export default defineComponent({
    name:"Persistent Behaviour",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },

    mounted(){
        const  ipv =useIpvStore()
        this.handleNone()
        this.handleReferal()
        this.handleOtherFirstline()
    },
    watch:{
        ipv:{
            handler(){
                this.handleNone()
            },
            deep:true
        },
        referrals:{
          handler(){
            this.handleReferal()
            this.handleOtherFirstline()
          },deep:true
        },
    },
      computed:{
        ...mapState(useIpvStore,["ipv","ipv1","additionalCare","safety_assessment","physical_violence","beaten_pregnant"
          ,"strangling","murder_threat","referrals","constant_jealous","woman_threatened"]),
    },
    methods:{
        handleNone(){
        const checkBoxes=["Ongoing stress","Unspecified Harmful Behaviours","Unwanted pregnancies","Injury to abdomen","Partner's intrusive during consultations","Misuse of alcohol","Unspecified harmful behaviours","Thoughts of self-harm","Unwanted Pregnancies","Misuse of drugs",]

      if (getCheckboxSelectedValue(this.ipv, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.ipv, checkbox, 'checked', false);
            modifyCheckboxValue(this.ipv, checkbox, 'disabled', true);
        });
        } else {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.ipv, checkbox, 'disabled', false);
        });
    }
        },
         //new IPV

    handleIntimate(){
        if(getRadioSelectedValue(this.ipv,'intimateInfo')=='no'){
          modifyRadioValue(this.ipv,'IPV firstline support','displayNone',false)
        }else{
          modifyRadioValue(this.ipv,'IPV firstline support','displayNone',true)
        }
      },
      handleOtherIpv(){
        if(getRadioSelectedValue(this.ipv,'IPV firstline support')=='other'){
          modifyFieldValue(this.ipv,'other','displayNone',false)
        }else{
           modifyFieldValue(this.ipv,'other','displayNone',true)
        }
      },
      handleReferal(){

        const checkBoxes=['Care at another facility',"Care at another facility",'Crisis intervention or counselling','Police','Shelter or housing',
                         'Shelter or housing','Child protection','Livelihood support','Other',]

      if (getCheckboxSelectedValue(this.referrals, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.referrals, checkbox, 'checked', false);
            modifyCheckboxValue(this.referrals, checkbox, 'disabled', true);
        });
        } else {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.referrals, checkbox, 'disabled', false);
        });
    }
      },
      // handleOtherReferal(){
      //   if(getCheckboxSelectedValue(this.referrals,'first-line support')?.value=='other'){
      //     modifyFieldValue(this.referrals,'Other','displayNone',false)
      //   }else{
      //     modifyFieldValue(this.referrals,'Other','displayNone',true)
      //   }
      // },
      
      handleOtherFirstline(){
        if(getCheckboxSelectedValue(this.referrals,'first-line support')?.value=='other'){
           modifyFieldValue(this.referrals,'specifics','displayNone',false)
        }else{
           modifyFieldValue(this.referrals,'specifics','displayNone',true)
        }

        console.log("+++++++++",getCheckboxSelectedValue(this.referrals,'first-line support')?.value=='specifics');
      },
    }
})
</script>
<style scoped>
.sub_item_body{
    margin-left: 45px;
}

ion-item.sub_item_body_close {
        border-bottom: 2px dotted var(--ion-color-medium);
        --inner-border-width:0;
    }
ion-card {

  width: 100%;
  color: black;
}
</style>
@/apps/ANC/store/symptomsFollowUpStore/ipvStore