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

    mounted(){
        const  ancInfo =useAncEndStore()
        this.handleOther()
        this.handledeath()
        this.handleDeathDate()
        this.handleRecordNotViewed()
        this.handleDeliverDate()
        this.handlePlaceDelivery()
        this.handleOtherPlaceDelivery()
        this.handlePretermBirth()
        this. handleModeDelivery()
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
                this. handleModeDelivery()
                this.handleWeight()
            },
            deep:true
        }
    },
      computed:{
        ...mapState(useAncEndStore,["ancInfo"]),
    },
    methods:{
        handleOther(){
            if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='otherOnClosingANC'){
                modifyFieldValue(this.ancInfo,'SpecifyAnC','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'SpecifyAnC','displayNone',true)
            }
            console.log(getRadioSelectedValue(this.ancInfo,'otherEnd'))
        },
        handledeath(){
            if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='death'){
                modifyFieldValue(this.ancInfo,'DeathDate','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'DeathDate','displayNone',true)
            }
        },
        handleDeathDate(){
            if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='death'){
                modifyFieldValue(this.ancInfo,'DeathCause','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'DeathCause','displayNone',true)
            }
        },
        handleRecordNotViewed(){
            if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='death'){
                modifyRadioValue(this.ancInfo,'recordViewed','displayNonne',false)
            }else{
                modifyRadioValue(this.ancInfo,'recordViewed','displayNonne',true)
            }
        },
        handleDeliverDate(){
            if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='liveBirth'){
                modifyFieldValue(this.ancInfo,'DateD','displayNone',false)
            }else{
                modifyFieldValue(this.ancInfo,'DateD','displayNone',true)
            }
        },
        handlePlaceDelivery(){
            if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='liveBirth'){
                modifyRadioValue(this.ancInfo,'placeDelivery','displayNone',false)
            }else{
                modifyRadioValue(this.ancInfo,'placeDelivery','displayNone',true)
            }
        },
        handleOtherPlaceDelivery(){
            if(getRadioSelectedValue(this.ancInfo,'placeDelivery')=='otherOnPlaceDelivery'){
                modifyFieldValue(this.ancInfo,'Specify','displayNone',false)
            }else{
                 modifyFieldValue(this.ancInfo,'Specify','displayNone',true)
            }
        },
        handlePretermBirth(){
               if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='liveBirth'){
                modifyRadioValue(this.ancInfo,'preterm','displayNone',false)
            }else{
                modifyRadioValue(this.ancInfo,'preterm','displayNone',true)
            }
        },
        handleModeDelivery(){
           if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='liveBirth'){
                modifyRadioValue(this.ancInfo,'deliveryMode','displayNone',false)
            }else{
                modifyRadioValue(this.ancInfo,'deliveryMode','displayNone',true)
            }
        },
        handleWeight(){
            if(getRadioSelectedValue(this.ancInfo,'otherEnd')=='liveBirth'){
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
