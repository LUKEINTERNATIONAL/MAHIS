<template>
    <ion-list>
        <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">TB screening is recommended</ion-label>
                        <ion-radio style="margin-bottom: 10px">TB screening conducted</ion-radio>
                        <ion-radio style="margin-bottom: 10px">TB screening ordered</ion-radio>
                        <ion-radio style="margin-bottom: 10px">TB screening not done</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>

                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">TB screening results</ion-label>
                        <ion-radio style="margin-bottom: 10px;">Positive for TB</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Negative for TB</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Inconclusive</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Incomplete (symptoms only)</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>
                      <ion-list>
            <ion-label style="font-weight: 600; padding-left:10px;"> Reason TB screening not done</ion-label>
            <div class="checkboxesDisplay">
            <div>
                        <div>
            <ion-checkbox  @ionChange="addSputum" :checked="Sputum" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin-top:20px; margin-bottom:10px">
                Sputum smear not available
            </ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addCulture" :checked="SputumCulture" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px;  margin-bottom:10px">
                Sputum culture not available
</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addGeneXpert" :checked="GeneXpert" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px;  margin-bottom:10px">
                GeneXpert machine not available
         </ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addXray" :checked="xRay" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px;  margin-bottom:10px">
                X-ray machine not available
            </ion-checkbox>
        </div>

        </div>
        <div>
        <div>
            <ion-checkbox  @ionChange="addTesting" :checked="sputumTesting" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px;  margin-bottom:10px">
                 No sputum testing supplies available

            </ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addMachine" :checked="Machine" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px;  margin-bottom:10px">
                Machine not functioning   
       </ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addTechnician" :checked="Technician" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px;  margin-bottom:10px">
                Technician not available
            </ion-checkbox>
        </div>
      </div>
      </div>
      </ion-list>
      
         <div style="margin-top: 14px; margin-left: 10px;">
            <ion-label class="tpStndCls">Other reason TB screening not done (specify)</ion-label>
            <ion-item class="input_item" style="min-height: 120px; margin-top: 14px;">
                <ion-label><span v-html="iconsContent.editPen"></span></ion-label>
                <ion-textarea v-model="otherReason"  style="min-height: 120px;" class="inputTpln" :auto-grow="true"  fill="outline"></ion-textarea>
            </ion-item>

        </div>
        <BasicForm :content-data = "screeningDate"></BasicForm> 

    </ion-list>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
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
            IonSelect,
            IonRadio,
            IonRadioGroup
        } from '@ionic/vue';
import {useLabTestsStore} from '../../store/LabTestsStore';
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 
import {useTBScreeningStore} from '../../store/TBScreeningStore'

export default defineComponent({
    name:"TB screening",
    components:{   
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
            IonSelect,
            BasicForm,
            IonRadio,
            IonRadioGroup,},
    data(){
        return {
            iconsContent: icons,
          labTestsInstance: {} as any,
        }
    },
    computed:{
        ...mapState(useTBScreeningStore, ["Sputum"]),
        ...mapState(useTBScreeningStore, ["SputumCulture"]),
        ...mapState(useTBScreeningStore, ["GeneXpert"]),
        ...mapState(useTBScreeningStore, ["xRay"]),
        ...mapState(useTBScreeningStore, ["sputumTesting"]),
        ...mapState(useTBScreeningStore, ["Machine"]),
        ...mapState(useTBScreeningStore, ["Technician"]),
        ...mapState(useTBScreeningStore, ["otherReason"]),
        ...mapState(useTBScreeningStore, ["screeningDate"])

    },
    mounted(){
        const tbScreening = useTBScreeningStore()
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
        saveStateValuesState() {
            const tbScreeningStore = useTBScreeningStore()
            tbScreeningStore.setSputum(this.Sputum)
            tbScreeningStore.setCulture(this.SputumCulture)
            tbScreeningStore.setGeneXpert(this.GeneXpert)
            tbScreeningStore.setXray(this.xRay)
            tbScreeningStore.setTesting(this.sputumTesting)
            tbScreeningStore.setMachine(this.Machine)
            tbScreeningStore.setTechnician(this.Technician)
            
        },

        addSputum(ev: any) {
            const checked = ev.detail.checked
            const tbScreeningStore = useTBScreeningStore()
            tbScreeningStore.setSputum(checked as boolean)
            this.saveStateValuesState()
        },
        addCulture(ev: any) {
            const checked = ev.detail.checked
            const tbScreeningStore = useTBScreeningStore()
            tbScreeningStore.setCulture(checked as boolean)
            this.saveStateValuesState()
        },
        addGeneXpert(ev: any) {
            const checked = ev.detail.checked
            const tbScreeningStore = useTBScreeningStore()
            tbScreeningStore.setGeneXpert(checked as boolean)
            this.saveStateValuesState()
        },
        addXray(ev: any) {
            const checked = ev.detail.checked
            const tbScreeningStore = useTBScreeningStore()
            tbScreeningStore.setXray(checked as boolean)
            this.saveStateValuesState()
        },
        addTesting(ev: any) {
            const checked = ev.detail.checked
            const tbScreeningStore = useTBScreeningStore()
            tbScreeningStore.setTesting(checked as boolean)
            this.saveStateValuesState()
        },
        addMachine(ev: any) {
            const checked = ev.detail.checked
            const tbScreeningStore = useTBScreeningStore()
            tbScreeningStore.setMachine(checked as boolean)
            this.saveStateValuesState()
        },
        addTechnician(ev: any) {
            const checked = ev.detail.checked
            const tbScreeningStore = useTBScreeningStore()
            tbScreeningStore.setTechnician(checked as boolean)
            this.saveStateValuesState()
        },
    }
})


</script>

<style scoped>
.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.radio {
        display: flex;
        flex-direction: column;
        /* border-bottom: 2px dotted var(--ion-color-medium); */
        --inner-border-width:0;
        padding: 10px;
  
    }
ion-radio {
  width: 40%;
}
ion-checkbox {
  width: 100%;
}
.radioContainer{
  border-bottom: 2px dotted var(--ion-color-medium);
  
}
.checkboxesDisplay{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left:10px;
  padding-right:10px;
}

</style>