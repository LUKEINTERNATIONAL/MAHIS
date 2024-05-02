<template>
    <ion-list>
        <ion-item  class="dashed_bottom_border" style="font-weight: bold;">
             Reason for closing ANC
        </ion-item>      
        <div class="sub_item_body">
            <BasicForm :contentData="ancInfo" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
 import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useAncEndStore} from "@/apps/ANC/store/ancEnd/ancEndStore";
 import BasicForm from '@/components/BasicForm.vue';
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue} from '@/services/data_helpers'


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
    };
  },
    computed:{
        ...mapState(useAncEndStore,["ancInfo"]),
    },

    mounted(){
        // const  ancInfo =useAncEndStore()
        this.handleOther()
        this.handledeath()
        this.handleDeathDate()
        this.handleRecordNotViewed()
        this.handleDeliverDate()
        this.handlePlaceDelivery()
        this.handleOtherPlaceDelivery()
        this.handlePretermBirth()
        this.handleModeDelivery()
        this.handleWeight()
    },
    watch:{
        ancInfo:{
            handler(){
                this.handleOther()
                this.handledeath()
                this.handleDeathDate()
                this.handleRecordNotViewed()
                this.handleDeliverDate()
                this.handlePlaceDelivery()
                this.handleOtherPlaceDelivery()
                this.handlePretermBirth()
                this.handleModeDelivery()
                this.handleWeight()
            },
            deep:true
        }
    },
  
    methods:{
        handleOther(){
            if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Other'){
                modifyFieldValue(this.ancInfo,'Other (specify)','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'Other (specify)','displayNone',true)
            }
        },
        handledeath(){
            if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Death'){
                modifyFieldValue(this.ancInfo,'DeathDate','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'DeathDate','displayNone',true)
            }
        },
        handleDeathDate(){
            if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Death'){
                modifyFieldValue(this.ancInfo,'DeathCause','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'DeathCause','displayNone',true)
            }
        },
        handleRecordNotViewed(){
            if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Death'){
                modifyRadioValue(this.ancInfo,'recordViewed','displayNone',false)
            }else{
                modifyRadioValue(this.ancInfo,'recordViewed','displayNone',true)
            }
        },
        handleDeliverDate(){
            if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Live birth'){
                modifyFieldValue(this.ancInfo,'Date of delivery','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'Date of delivery','displayNone',true)
            }
        },
        handlePlaceDelivery(){
            if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Live birth'){
                modifyRadioValue(this.ancInfo,'Place of Delivery','displayNone',false)
            }else{
                modifyRadioValue(this.ancInfo,'Place of Delivery','displayNone',true)
            }
        },
        handleOtherPlaceDelivery(){
            if(getRadioSelectedValue(this.ancInfo,'Place of Delivery')=='Other'){
                modifyFieldValue(this.ancInfo,'Other (specify)','displayNone',false)
            }else{
                 modifyFieldValue(this.ancInfo,'Other (specify)','displayNone',true)
            }
        },
        handlePretermBirth(){
               if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Live birth'){
                modifyRadioValue(this.ancInfo,'Preterm','displayNone',false)
            }else{
                modifyRadioValue(this.ancInfo,'Preterm','displayNone',true)
            }
        },
        handleModeDelivery(){
           if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Live birth'){
                modifyRadioValue(this.ancInfo,'Mode of delivery','displayNone',false)
            }else{
                modifyRadioValue(this.ancInfo,'Mode of delivery','displayNone',true)
            }
        },
        handleWeight(){
            if(getRadioSelectedValue(this.ancInfo,'Reason for closing ANC')=='Live birth'){
                modifyFieldValue(this.ancInfo,'Weight','displayNone',false)
            }else{
                 modifyFieldValue(this.ancInfo,'Weight','displayNone',true)
            }
        }
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
</style>
