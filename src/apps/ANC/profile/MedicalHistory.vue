<template>
    <!-- Past Surgeries -->
    <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
            Past Surgeries
        </ion-item>
        
        <div class="sub_item_body">
            <BasicForm :contentData="medicalHistory" />
        </div>
        <ion-item class="sub_item_body_close" />
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
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue} from '@/services/data_helpers'

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
        this.handleHivResults()
        this.handlePastSurgeries()

        
        
        
    },

    watch:{
        hivTest:{
            handler(){
                this.handleHivResults()
            },
             deep:true
        },
        medicalHistory:{
            handler(){
                this.handlePastSurgeries()
            },
            deep:true
        }
    },
      computed:{
        ...mapState(useMedicalHistoryStore,["medicalHistory"]),
        ...mapState(useMedicalHistoryStore,["allegy"]),
        ...mapState(useMedicalHistoryStore,["exisitingChronicHealthConditions"]),
        ...mapState(useMedicalHistoryStore,["hivTest"]),
        ...mapState(useMedicalHistoryStore,["syphilisTest"]),
        ...mapState(useMedicalHistoryStore,["otherSite"]),
    },
    methods:{
        handleHivResults(){
            
            if(getRadioSelectedValue(this.hivTest,'test2') == 'hivPositive'){
                modifyRadioValue(this.hivTest,'test1','displayNone',false)
            }else{
                modifyRadioValue(this.hivTest,'test1','displayNone',true)
            }

        },
        handlePastSurgeries(){
           if(getCheckboxSelectedValue(this.medicalHistory,'other')== 'otherSurguries'){
              modifyFieldValue(this.medicalHistory,'surgery','dissplayNone',false)
           }else{
             modifyFieldValue(this.medicalHistory,'surgery','dissplayNone',false)
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