<template>
    <!-- Past Surgeries -->
    <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
            Past Surgeries
        </ion-item>
        
        <div class="sub_item_body">
            <BasicForm :contentData="medicalHistory" />
        </div>
        <ion-item class="sub_item_body_close" v-if="surgeriesChecked"/>
    </ion-list>

    <!-- Allegies -->

        <ion-list>
        <ion-item  class="dashed_bottom_border" style="font-weight: bold">
            Allergies
        </ion-item>
        <div class="sub_item_body">
            <BasicForm :contentData="allegy" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>

    <!-- Chronical Health conditions -->

    <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
            Existing Chronic Health Conditions
        </ion-item>
        <div class="sub_item_body">
            <BasicForm :contentData="exisitingChronicHealthConditions" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>


    <!-- HIV -->


        <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
            HIV
        </ion-item>
        <div class="sub_item_body">
            <BasicForm :contentData="hivTest" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>

    <!-- Syphilis Test -->

    <ion-list>
        <ion-item  class="dashed_bottom_border" style="font-weight: bold" >
            Syphilis
        </ion-item>
        <div class="sub_item_body">
            <BasicForm :contentData="syphilisTest" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>

    <!-- Hypertations-Kidney-TB-MentalIlliness -->

    <ion-list>

        <div class="sub_item_body">
            <BasicForm :contentData="hKTMI" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>

    <!-- Other Sute -->
     <ion-list>
        
        <div>
            <BasicForm :contentData="otherSite" />
        </div>
        
     </ion-list>


</template>

<script lang="ts">
 import{
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
    IonSelect
 } from "@ionic/vue";
  import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import {ref} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useMedicalHistoryStore} from "@/apps/ANC/store/medicalHistory/medicalHistoryStore";
 import BasicForm from '@/components/BasicForm.vue';

//  import {icons} from "@/utils/svg.ts"

export default defineComponent({
    name:"Past Surguries",
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
    data(){
        return{
            surgeriesChecked: true,
            allegiesChecked: true,
            chronicalHCChecked:true,
            bloodDisorderChecked:true,
            cancerChecked:true,
            heartDeseaseChecked: true,
            diabetisChecked: true,
            hivChecked: true,
            syphilisChecked:  true,
            hyperKTMChecked: true,

            pastSurgeries:"",
            allegies:"",
            chronicalHC:"",
            bloodDisorder:"",
            cancer:"",
            heartDesease:"",
            diabetis:"",
            hiv:"",
            syphilis:"",
            hyperKTM:""

        }
    },
    mounted(){
        const medicalHistory =useMedicalHistoryStore()
        const allegy = useMedicalHistoryStore()
        const exisitingChronicHealthConditions = useMedicalHistoryStore()
        const blood = useMedicalHistoryStore()
        const cancerIssue = useMedicalHistoryStore()
        const heartProblem = useMedicalHistoryStore()
        const diabetes = useMedicalHistoryStore()
        const hivTest = useMedicalHistoryStore()
        const syphilisTest = useMedicalHistoryStore()
        const  hKTMI = useMedicalHistoryStore()
        const  otherSite = useMedicalHistoryStore()
    },
      computed:{
        ...mapState(useMedicalHistoryStore,["medicalHistory"]),
        ...mapState(useMedicalHistoryStore,["allegy"]),
        ...mapState(useMedicalHistoryStore,["exisitingChronicHealthConditions"]),
        ...mapState(useMedicalHistoryStore,["blood"]),
        ...mapState(useMedicalHistoryStore,["cancerIssue"]),
        ...mapState(useMedicalHistoryStore,["heartProblem"]),
        ...mapState(useMedicalHistoryStore,["diabetes"]),
        ...mapState(useMedicalHistoryStore,["hivTest"]),
        ...mapState(useMedicalHistoryStore,["syphilisTest"]),
        ...mapState(useMedicalHistoryStore,["hKTMI"]),
        ...mapState(useMedicalHistoryStore,["otherSite"]),
    },
    methods:{
        surgeries(){
            this.surgeriesChecked = !this.surgeriesChecked
             if(this.surgeriesChecked){
                this.pastSurgeries = 'none'
             }else{this.pastSurgeries=""}
        },
        allegyMethod(){
            this.allegiesChecked = !this.allegiesChecked
            if(this.allegiesChecked){
                this.allegies = 'none'
            }else{this.allegies ="" }
        },
        chronicalHCMethod(){
            this.chronicalHCChecked = !this.chronicalHCChecked
            if(this.chronicalHCChecked){
                this.chronicalHC = 'none'
            }else{this.chronicalHC=""}
        },
        bloodDisorderMethod(){
            this.bloodDisorderChecked =!this.bloodDisorderChecked
            if(this.bloodDisorderChecked){
                this.bloodDisorder = 'none'
            }else{this.bloodDisorder=""}
        },
        cancerMethod(){
            this.cancerChecked =! this.cancerChecked
            if(this.cancerChecked){
                this.cancer='none'
            }else{this.cancer=""}
        },
        heartDeseaseMethod(){
            this.heartDeseaseChecked =! this.heartDeseaseChecked
            if(this.heartDeseaseChecked){
                this.heartDesease = 'none'
            }else{this.heartDesease=""}
        },
        diabetisMethod(){
            this.diabetisChecked =! this.diabetisChecked
            if(this.diabetisChecked){
                this.diabetis = 'none'
            }else {this.diabetis=""}
        },
        hivMethod(){
            this.hivChecked =! this.hivChecked
            if(this.hivChecked){
                this.hiv="none"
            }else{this.hiv=""}
        },
        syphilisMethod(){
            this.syphilisChecked =! this.syphilisChecked
            if(this.syphilisChecked){
                this.syphilis = 'nine'
            }else{this.syphilis=""}
        },
        hyperKTMMethod(){
            this.hyperKTMChecked =! this.hyperKTMChecked
            if(this.hyperKTMChecked){
                this.hyperKTM ="none"
            }else{this.hyperKTM=""}
        }

        
    }
})
</script>
<style scoped>
.surgery_content{
    color: #636363;
    text-align: center;
}
.sub_item_body{
    margin-left: 45px;
}
.surgery_content,.general_content,.allegy_content,.chronical_content,.blood_content,.cancer_content,.heart_content,.diabetis_content,.hiv_content,.hyperKTM_content{
    color:#00190E;
    text-align: center;
    border-bottom: solid 1px #ccc;
    border-bottom-style: dashed;
    padding: 10px 0px;
    font-weight: 500;
    font-size: 14px;
}
.first_col{
    text-align: left;
    font-weight: 400;
    font-size: 14px;
}
.surgery_input,.allegy_input,.cancer_input,.hiv_input,.other_input{
    width: 100%;
    color: #636363;
    text-align: left;

}
.general_content{
    text-align: left;
}
ion-item.sub_item_body_close {
        border-bottom: 2px dotted var(--ion-color-medium);
        --inner-border-width:0;
    }
</style>