<template>
    <ion-list>    
        <div class="sub_item_body">
            <BasicForm :contentData="behaviourInfo" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
 import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useBehaviourCousellingStore} from "@/apps/ANC/store/counselling/behaviourCousellingStore";
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
        const  behaviourInfo =useBehaviourCousellingStore()
        this.handleCaffeine()
        this.handleOtherCaffeine()
        this.handleTobacco()
        this.handleOtherTobacco()
        this.handleSecondHandSmoke()
        this.handleOtherSecondHandSmoke()
        this.handleCondomUse()
        this. handleOtherCondom()
        this.handleSubstanceUse()
        this.handleOtherOnSubstance()
    },

    watch:{
        behaviourInfo:{
            handler(){
                this.handleCaffeine()
                this.handleOtherCaffeine()
                this.handleTobacco()
                this.handleOtherTobacco()
                this.handleSecondHandSmoke()
                this.handleOtherSecondHandSmoke()
                this.handleCondomUse()
                this.handleOtherCondom()
                this.handleSubstanceUse()
                this.handleOtherOnSubstance()
            },
            deep:true
        }
    },
      computed:{
        ...mapState(useBehaviourCousellingStore,["behaviourInfo"]),
    },
    methods:{
        handleCaffeine(){
            if(getRadioSelectedValue(this.behaviourInfo,'caffeine')=='no'){
                modifyRadioValue(this.behaviourInfo,'reasons','displayNone',false)
            }else{
                 modifyRadioValue(this.behaviourInfo,'reasons','displayNone',true)
            }
            //console.log(getRadioSelectedValue(this.behaviourInfo,'caffeine'))
        },
        handleOtherCaffeine(){
            if(getRadioSelectedValue(this.behaviourInfo,'reasons')=='otherOnCaffeine'){
                modifyFieldValue(this.behaviourInfo,'specifyC','displayNone',false)
            }else{
                 modifyFieldValue(this.behaviourInfo,'specifyC','displayNone',true)
            }
        },
        handleTobacco(){
            if(getRadioSelectedValue(this.behaviourInfo,'tobacco')=='noT'){
                modifyRadioValue(this.behaviourInfo,'reasons','displayNone',false)
            }else{
                modifyRadioValue(this.behaviourInfo,'reasons','dispalayNone',true)
            }
        },
        handleOtherTobacco(){
            if(getRadioSelectedValue(this.behaviourInfo,'reasons')=='otherOnTobacco'){
                modifyFieldValue(this.behaviourInfo,'SpecifyT','displayNone',false)
            }else{
                modifyFieldValue(this.behaviourInfo,'SpecifyT','displayNone',true)
            }
        },
        handleSecondHandSmoke(){
            if(getRadioSelectedValue(this.behaviourInfo,'secondHandSmoke')=='noSecondHandTobacco'){
                modifyRadioValue(this.behaviourInfo,'reasonsOnSecondHandSmoke','displayNone',false)
            }else{
                modifyRadioValue(this.behaviourInfo,'reasonsOnSecondHandSmoke','displayNone',true)
            }
        },
        handleOtherSecondHandSmoke(){
            if(getRadioSelectedValue(this.behaviourInfo,'reasonsOnSecondHandSmoke')=='otherOnSecondHandTobacco'){
                modifyFieldValue(this.behaviourInfo,'SpecifyST','displayNone',false)
            }else{
                modifyFieldValue(this.behaviourInfo,'SpecifyST','displayNone',true)
            }
        },
        handleCondomUse(){
            if(getRadioSelectedValue(this.behaviourInfo,'condomUse')=='noCondomUse'){
                modifyRadioValue(this.behaviourInfo,'reasonsOnCondom','displayNone',false)
            }else{
                modifyRadioValue(this.behaviourInfo,'reasonsOnCondom','displayNone',true)
            }
        },
        handleOtherCondom(){
            if(getRadioSelectedValue(this.behaviourInfo,'reasonsOnCondom')=='otherOnCondomUse'){
                modifyFieldValue(this.behaviourInfo,'SpecifyC','displayNone',false)
            }else{
                  modifyFieldValue(this.behaviourInfo,'SpecifyC','displayNone',true)
            }
        },
        handleSubstanceUse(){
            if(getRadioSelectedValue(this.behaviourInfo,'alcohol')=='noOnSubstanceUse'){
                modifyRadioValue(this.behaviourInfo,'reasonsOnSubstance','displayNone',false)
            }else{
                modifyRadioValue(this.behaviourInfo,'reasonsOnSubstance','displayNone',true)
            }
        },
        handleOtherOnSubstance(){
            if(getRadioSelectedValue(this.behaviourInfo,'reasonsOnSubstance')=='otherOnSubstanceUse'){
                modifyFieldValue(this.behaviourInfo,'SpecifySU','displayNone',false)
            }else{
                 modifyFieldValue(this.behaviourInfo,'SpecifySU','displayNone',true)
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
