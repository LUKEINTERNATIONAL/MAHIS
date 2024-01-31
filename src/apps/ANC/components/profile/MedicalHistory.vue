<template>
    <!-- Past Surgeries -->
    <ion-list>
        <ion-item :lines="pastSurgeries" class="dashed_bottom_border">
            <ion-toggle :checked ="surgeriesChecked" @ionChange="surgeries">Past Surgeries</ion-toggle>
        </ion-item>
        
        <div class="sub_item_body" v-if="surgeriesChecked">
            <BasicForm :contentData="medicalHistory" />
        </div>
        <ion-item class="sub_item_body_close" v-if="surgeriesChecked"/>
    </ion-list>

    <!-- Allegies -->

        <ion-list>
        <ion-item :lines="allegies" class="dashed_bottom_border">
            <ion-toggle :checked ="allegiesChecked" @ionChange="allegyMethod">Allegies</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="allegiesChecked">
            <BasicForm :contentData="allegy" />
        </div>
        <ion-item class="sub_item_body_close" v-if="allegiesChecked"/>
    </ion-list>

    <!-- Chronical Health conditions -->

    <ion-list>
        <ion-item :lines="chronicalHC" class="dashed_bottom_border">
            <ion-toggle :checked ="chronicalHCChecked" @ionChange="chronicalHCMethod">Existing Chronical Health Conditions</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="chronicalHCChecked">
            <BasicForm :contentData="exisitingChronicHealthConditions" />
        </div>
        <ion-item class="sub_item_body_close" v-if="chronicalHCChecked"/>
    </ion-list>

    <!-- Blood disorder -->
     
    <ion-list>
        <ion-item :lines="bloodDisorder" class="dashed_bottom_border">
            <ion-toggle :checked ="bloodDisorderChecked" @ionChange="bloodDisorderMethod">Blood Disorder</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="bloodDisorderChecked">
            <BasicForm :contentData="blood" />
        </div>
        <ion-item class="sub_item_body_close" v-if="bloodDisorderChecked"/>
    </ion-list>
    
   <!-- Cancer  -->

       <ion-list>
        <ion-item :lines="cancer" class="dashed_bottom_border">
            <ion-toggle :checked ="cancerChecked" @ionChange="cancerMethod">Cancer</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="cancerChecked">
            <BasicForm :contentData="cancerIssue" />
        </div>
        <ion-item class="sub_item_body_close" v-if="cancerChecked"/>
    </ion-list>

    <!-- HeartDesease -->

    <ion-list>
        <ion-item :lines="heartDesease" class="dashed_bottom_border">
            <ion-toggle :checked ="heartDeseaseChecked" @ionChange="heartDeseaseMethod">Heart Desease</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="heartDeseaseChecked">
            <BasicForm :contentData="heartProblem" />
        </div>
        <ion-item class="sub_item_body_close" v-if="heartDeseaseChecked"/>
    </ion-list>

    <!-- Diabetis -->

        <ion-list>
        <ion-item :lines="diabetis" class="dashed_bottom_border">
            <ion-toggle :checked ="diabetisChecked" @ionChange="diabetisMethod">Diabetis</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="diabetisChecked">
            <BasicForm :contentData="diabetes" />
        </div>
        <ion-item class="sub_item_body_close" v-if="diabetisChecked"/>
    </ion-list>

    <!-- HIV -->


        <ion-list>
        <ion-item :lines="hiv" class="dashed_bottom_border">
            <ion-toggle :checked ="hivChecked" @ionChange="hivMethod">HIV</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="hivChecked">
            <ion-row class="hiv_content">
                <ion-col class="first_col">Positive</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end">
                        <span class = "checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="general_content" style="display: flex; border-bottom-style: none;">
            <ion-col size="3.75" >
                <span class="hiv_input">Diagnosis date</span>
                <ion-item class="input_item" style="margin: 10px 0px;">
                    <ion-input fill="outline"></ion-input>
                    <ion-label><span  class="selectedPatient"></span></ion-label>
                </ion-item>
            </ion-col>
            </ion-row>
        </div>
        <ion-item class="sub_item_body_close" v-if="hivChecked"/>
    </ion-list>

    <!-- Hypertations-Kidney-TB-MentalIlliness -->

    <ion-list>
        <ion-item :lines="hyperKTM" class="dashed_bottom_border">
            <ion-toggle :checked ="hyperKTMChecked" @ionChange="hyperKTMMethod">Hypertations/Kidney/TB/Mental Illiness</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="hyperKTMChecked">
            <ion-row class="hyperKTM_content">
                <ion-col class="first_col">Hypertations</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end">
                        <span class = "checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="hyperKTM_content">
                <ion-col class="first_col">Kidney</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end">
                        <span class = "checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="hyperKTM_content">
                <ion-col class="first_col">TB</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end">
                        <span class = "checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="hyperKTM_content">
                <ion-col class="first_col">Mental Illiness</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end">
                        <span class = "checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
        </div>
        <ion-item class="sub_item_body_close" v-if="hyperKTMChecked"/>

        <ion-row class="general_content" style="display: flex; border-bottom-style: none;">
        <ion-col size="3.75" >
            <span class="other_input">Other Site</span>
            <ion-item class="input_item" style="margin: 10px 0px;">
                <ion-input fill="outline"></ion-input>
                <ion-label><span  class="selectedPatient"></span></ion-label>
            </ion-item>
        </ion-col>
        </ion-row>
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
 import {useMedicalHistoryStore} from "@/apps/ANC/store/medicalHistoryStore/medicalHistoryStore";
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
            surgeriesChecked: false,
            allegiesChecked: false,
            chronicalHCChecked:false,
            bloodDisorderChecked:false,
            cancerChecked:false,
            heartDeseaseChecked: false,
            diabetisChecked: false,
            hivChecked: false,
            hyperKTMChecked: false,

            pastSurgeries:"",
            allegies:"",
            chronicalHC:"",
            bloodDisorder:"",
            cancer:"",
            heartDesease:"",
            diabetis:"",
            hiv:"",
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
    },
      computed:{
        ...mapState(useMedicalHistoryStore,["medicalHistory"]),
        ...mapState(useMedicalHistoryStore,["allegy"]),
        ...mapState(useMedicalHistoryStore,["exisitingChronicHealthConditions"]),
        ...mapState(useMedicalHistoryStore,["blood"]),
        ...mapState(useMedicalHistoryStore,["cancerIssue"]),
        ...mapState(useMedicalHistoryStore,["heartProblem"]),
        ...mapState(useMedicalHistoryStore,["diabetes"]),
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
@/apps/ANC/store/medicalHistoryStore/medicalHistoryStore