<template>
    <ion-list>    
        <div class="sub_item_body">
            <BasicForm :contentData="physiologicalCounselingInfo" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
 import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {usePhysiologicalCounselingStore} from "@/apps/ANC/store/counselling/physiologicalCounselingStore";
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
        const  physiologicalCounselingInfo =usePhysiologicalCounselingStore()
        this.handleNonpharmacological()
        this.handleOtherNonpharmacological()
        this.handlePharmacologicalTreament()
        this.handleReasonsPharmacologicalTreament()
        this.handleDiet()
        this.handleOtherDiet()
        this.handleAntacid()
        this.handleOtherAcid()
        this.handleLegCraps()
        this.handleOtherlegCraps()
        this. handleUseMagnesium()
        this.handleConstipation()
        this. handleOtherConstipation()
        this.handleWheat()
        this.handleOtherWheat()
        this. handleExcersise()
        this.handleOtherExcersise()
        this.handleOedema()
        this.handleOtherOedema()
    },
    watch:{
        physiologicalCounselingInfo:{
            handler(){
                this.handleNonpharmacological()
                this.handleOtherNonpharmacological()
                this.handlePharmacologicalTreament()
                this.handleReasonsPharmacologicalTreament()
                this. handleDiet()
                this.handleOtherDiet()
                this.handleAntacid()
                this.handleOtherAcid()
                this.handleLegCraps()
                this.handleOtherlegCraps()
                this. handleUseMagnesium()
                this.handleOtherMagnesium()
                this.handleConstipation()
                this. handleOtherConstipation()
                this.handleWheat()
                this.handleOtherWheat()
                this. handleExcersise()
                this.handleOtherExcersise()
                this.handleOedema()
                this.handleOtherOedema()
            },
            deep:true
        }
    },
      computed:{
        ...mapState(usePhysiologicalCounselingStore,["physiologicalCounselingInfo"]),
    },
    methods:{
        handleNonpharmacological(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'nonPharmacological')=='noPharmacological'){
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonNonPharmacological','displayNone',false)
            }else{
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonNonPharmacological','displayNone',true)
            }
        },
        handleOtherNonpharmacological(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'reasonNonPharmacological')=='otherOnNonPharmacological'){
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyNonP','displayNone',false)
            }else{
                 modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyNonP','displayNone',true)
            }
            
        },
        handlePharmacologicalTreament(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'nauseaVomiting')=='noPharmacologicalTreatment'){
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonNauseaVomiting','displayNone',false)
            }else{
                 modifyRadioValue(this.physiologicalCounselingInfo,'reasonNauseaVomiting','displayNone',true)
            }
        },
        handleReasonsPharmacologicalTreament(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'reasonNauseaVomiting')=='otherOnPharmacologicalTreatment'){
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyPT','displayNone',false)
            }else{
                 modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyPT','displayNone',true)
            }
        },
        handleDiet(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'diet')=='noDiet'){
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonDiet','displayNone',false)
            }else{
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonDiet','displayNone',true)
            }
        },
        handleOtherDiet(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'reasonDiet')=='otherOnDietLifestyle'){
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyL','displayNone',false)
            }else{
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyL','displayNone',true)
            }
        },
        handleAntacid(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'antacid') =='noAntacid'){
                modifyRadioValue(this.physiologicalCounselingInfo,'counsellingAntacid','displayNone',false)
            }else{
                 modifyRadioValue(this.physiologicalCounselingInfo,'counsellingAntacid','displayNone',true)
            }
        },
        handleOtherAcid(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'counsellingAntacid')=='otherOnAntacid'){
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyAcid','displayNone',false)
            }else{
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyAcid','displayNone',true)
            }
        },
        handleLegCraps(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'legCraps')=='noLegCrap'){
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonsLegCraps','displayNone',false)
            }else{
                 modifyRadioValue(this.physiologicalCounselingInfo,'reasonsLegCraps','displayNone',true)
            }
        },
        handleOtherlegCraps(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'reasonsLegCraps')=='otherOnLegCraps'){
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyLC','displayNone',false)
            }else{
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyLC','displayNone',true)
            }
        },
        handleUseMagnesium(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'useOfMagnesium')=='noMagnesiumCalcium'){
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonOnUseofMagnesium','displayNone',false)
            }else{
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonOnUseofMagnesium','displayNone',true)
            }
        },
        handleOtherMagnesium(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'reasonOnUseofMagnesium')=='otherOnUseMagnesiumCalciumOnLegCraps'){
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyCraps','displayNone',false)
            }else{
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyCraps','displayNone',true)
            }
        },
        handleConstipation(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'constipattion')=='noConstipation'){
                modifyRadioValue(this.physiologicalCounselingInfo,'reasonConstipation','displayNone',false)
            }else{
                 modifyRadioValue(this.physiologicalCounselingInfo,'reasonConstipation','displayNone',true)
            }
            console.log(getRadioSelectedValue(this.physiologicalCounselingInfo,'constipattion'))
        },
        handleOtherConstipation(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'reasonConstipation')=='otherOnDietaryOnConstipation'){
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyConstipation','displayNone',false)
            }else{
                modifyFieldValue(this.physiologicalCounselingInfo,'SpecifyConstipation','displayNone',true)
            }
        },
        handleWheat(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'useWheat')=='noWheat'){
                modifyRadioValue(this.physiologicalCounselingInfo,'counsellingWheat','displayNone',false)
            }else{
                 modifyRadioValue(this.physiologicalCounselingInfo,'counsellingWheat','displayNone',true)
            }
        },
        handleOtherWheat(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'counsellingWheat')=='otherOnUseOfWheat'){
                modifyFieldValue(this.physiologicalCounselingInfo,'useWheat','displayNone',false)
            }else{
                 modifyFieldValue(this.physiologicalCounselingInfo,'useWheat','displayNone',true)
            }
        },
        handleExcersise(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'excersise')=='noExercise'){
                modifyRadioValue(this.physiologicalCounselingInfo,'counsellingExcerise','displayNone',false)
            }else{
                 modifyRadioValue(this.physiologicalCounselingInfo,'counsellingExcerise','displayNone',true)
            }
        },
        handleOtherExcersise(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'counsellingExcerise')=='otherOnRegularExercise'){
                modifyFieldValue(this.physiologicalCounselingInfo,'specifyExercise','displayNone',false)
            }else{
                 modifyFieldValue(this.physiologicalCounselingInfo,'specifyExercise','displayNone',true)
            }
        },
        handleOedema(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'oedema')=='noOedema'){
                modifyRadioValue(this.physiologicalCounselingInfo,'counsellingOedema','displayNone',false)
            }else{
                modifyRadioValue(this.physiologicalCounselingInfo,'counsellingOedema','displayNone',true)
            }
        },
        handleOtherOedema(){
            if(getRadioSelectedValue(this.physiologicalCounselingInfo,'counsellingOedema')=='otherOnVaricoseVeinsandOedema'){
                modifyFieldValue(this.physiologicalCounselingInfo,'VeinsaOedema','displayNone',false)
            }else{
                modifyFieldValue(this.physiologicalCounselingInfo,'VeinsaOedema','displayNone',true)
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
</style>
