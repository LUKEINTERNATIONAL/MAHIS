<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form
            :contentData="ancInfo"
            :initialData="initialData"
            @update:selected="handleInputData" @update:inputValue="handleInputData"

        ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
 import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {ANCEndValidationSchema, useAncEndStore} from "@/apps/ANC/store/ancEnd/ancEndStore";
 import BasicForm from '@/components/BasicForm.vue';
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue} from '@/services/data_helpers'
 import {YupValidateField} from "@/services/validation_service";
 import {ReferralValidationSchema} from "@/apps/ANC/store/referral/referralStore";


export default defineComponent({
    name:"Persistent Behaviour",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },
    data() {
    return {
      
      currentSection: 0, // Initialize currentSection to 0
      vValidations: '' as any,
      hasValidationErrors: [] as any,
      initialData:[] as any,

    };
  },
    computed:{
        ...mapState(useAncEndStore,["ancInfo"]),
    },

    mounted(){
        const  ancInfo =useAncEndStore()
        this.initialData=ancInfo.getInitialANCend()
        this.handleOther()
        this.handledeath()
        this.handleDeathDate()
        this.handleRecordNotViewed()

    },
    watch:{
        ancInfo:{
            handler(){
                this.handleOther()
                this.handledeath()
                this.handleDeathDate()
                this.handleRecordNotViewed()

            },
            deep:true
        }
    },
  
    methods:{
      async handleInputData(col: any) {
        YupValidateField(
            this.ancInfo,
            ANCEndValidationSchema,
            col.name,
            col.value
        )
      },
        handleOther(){
            if(getRadioSelectedValue(this.ancInfo,'ANC pregnancy outcome')=='Other outcome'){
                modifyFieldValue(this.ancInfo,'Pregnancy outcome notes','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'Pregnancy outcome notes','displayNone',true)
            }
        },
        handledeath(){
            if(getRadioSelectedValue(this.ancInfo,'ANC pregnancy outcome')=='Death'){
                modifyFieldValue(this.ancInfo,'Date of death','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'Date of death','displayNone',true)
            }
        },
        handleDeathDate(){
            if(getRadioSelectedValue(this.ancInfo,'ANC pregnancy outcome')=='Death'){
                modifyFieldValue(this.ancInfo,'Cause of death','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'Cause of death','displayNone',true)
            }
        },
        handleRecordNotViewed(){
            if(getRadioSelectedValue(this.ancInfo,'ANC pregnancy outcome')=='Death'){
                modifyRadioValue(this.ancInfo,'Client record will no longer be  viewed','displayNone',false)
            }else{
                modifyRadioValue(this.ancInfo,'Client record will no longer be  viewed','displayNone',true)
            }
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
