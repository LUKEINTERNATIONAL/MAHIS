<template>
  <ion-item>
    <div>
            
                    
                        <basic-form :contentData="prevPregnancies"></basic-form>
                       <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold;">Was last live birth preterm?</ion-label>
                        <ion-radio>Yes</ion-radio>
                        <ion-radio>No</ion-radio>
                        <ion-radio>Don't know</ion-radio>
                      </div>
                      </IonRadioGroup>
                      
                        
                        
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold;">Last live birth had congenital abnormalities?</ion-label>
                        <ion-radio>Yes</ion-radio>
                        <ion-radio>No</ion-radio>
                        <ion-radio>Don't know</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>
                        <basic-form :contentData="modeOfDelivery"></basic-form>
                        
          <ion-list>
            <ion-label style="font-weight: 600;"> Past pregnancy Complications</ion-label>
            <div class="checkboxesDisplay">
            <div>
                        <div>
            <ion-checkbox  @ionChange="addPreEclampsia" :checked="PreEclampsia" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin-top:20px;">Pre-eclampsia</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addEclampsia" :checked="Eclampsia" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Eclampsia</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addPuerperal" :checked="Puerperal" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Puerperal Sepsis</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addBabyDeath" :checked="BabyDeath" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Baby died within 24hrs of birth</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addConvulsions" :checked="Convulsions" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Convulsions</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addForceps" :checked="Forceps" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Forceps</ion-checkbox>
        </div>
        </div>
        <div >
        <div>
            <ion-checkbox  @ionChange="addMellitus" :checked="Mellitus" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Gestational diabetes mellitus</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addBleeding" :checked="Bleeding" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Heavy bleeding (during or after delivery)</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addMacrosomia" :checked="Macrosomia" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Macrosomia</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addPerineal" :checked="Perineal" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Perineal tear (3rd or 4th degree)</ion-checkbox>
        </div>

        <div>
            <ion-checkbox  @ionChange="addAsphyxia" :checked="Asphyxia" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin:;">Asphyxia</ion-checkbox>
        </div>
      </div>
      </div>

        <div style="margin-top: 14px; margin-left: 10px;">
            <ion-label class="tpStndCls">Other Complications (Specify)</ion-label>
            <ion-item class="input_item" style="min-height: 120px; margin-top: 14px;">
                <ion-label><span v-html="iconsContent.editPen"></span></ion-label>
                <ion-textarea v-model="otherComplications"  style="min-height: 120px;" class="inputTpln" :auto-grow="true"  fill="outline"></ion-textarea >
            </ion-item>

        </div>
      </ion-list>

            </div>
          

        </ion-item>
     
</template>

<script lang="ts">
import {defineComponent} from 'vue';
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
IonRadioGroup,
        } from '@ionic/vue';
import BasicForm from '@/components/BasicForm.vue';
import { icons } from '@/utils/svg';
import BasicInputField from '@/components/BasicInputField.vue';
import { mapState } from 'pinia';
import { useObstreticHistoryStore } from '../store/PastObstreticHistoryStore';
import { checkmark, pulseOutline } from 'ionicons/icons';

export default defineComponent({
  name: "History",
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
    BasicForm,
    IonRadio,
    IonRadioGroup
},

        data() {
    return {
        iconsContent: icons,
        prevPregnanciesInstance: {} as any,
        modeOfDeliveryInstance: {} as any,
    };
  },
  computed:{
        ...mapState(useObstreticHistoryStore,["prevPregnancies"]),
        ...mapState(useObstreticHistoryStore,["preterm"]),
        ...mapState(useObstreticHistoryStore,["preterm1"]),
        ...mapState(useObstreticHistoryStore,["preterm2"]),
        ...mapState(useObstreticHistoryStore,["modeOfDelivery"]),
        ...mapState(useObstreticHistoryStore,["PreEclampsia"]),
        ...mapState(useObstreticHistoryStore,["Eclampsia"]),
        ...mapState(useObstreticHistoryStore,["Puerperal"]),
        ...mapState(useObstreticHistoryStore,["BabyDeath"]),
        ...mapState(useObstreticHistoryStore,["Convulsions"]),
        ...mapState(useObstreticHistoryStore,["Forceps"]),
        ...mapState(useObstreticHistoryStore,["Mellitus"]),
        ...mapState(useObstreticHistoryStore,["Bleeding"]),
        ...mapState(useObstreticHistoryStore,["Macrosomia"]),
        ...mapState(useObstreticHistoryStore,["Perineal"]),
        ...mapState(useObstreticHistoryStore,["Asphyxia"]),
        ...mapState(useObstreticHistoryStore, ["otherComplications"])

    },
    mounted(){
      const prevPregnancies = useObstreticHistoryStore()
      const preterm = useObstreticHistoryStore()
      const preterm1 = useObstreticHistoryStore()
      const preterm2 = useObstreticHistoryStore()
      const ModeOfDelivery = useObstreticHistoryStore()
      const Complications = useObstreticHistoryStore()

        
       
    },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{

      saveStateValuesState() {
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setPreEclampsia(this.PreEclampsia)
            obstreticHistoryStore.setEclampsia(this.Eclampsia)
            obstreticHistoryStore.setConvulsions(this.Convulsions)
            obstreticHistoryStore.setBabyDeath(this.BabyDeath)
            obstreticHistoryStore.setForceps(this.Forceps)
            obstreticHistoryStore.setMellitus(this.Mellitus)
            obstreticHistoryStore.setMacrosomia(this.Macrosomia)
            obstreticHistoryStore.setPerineal(this.Perineal)
            obstreticHistoryStore.setAsphyxia(this.Asphyxia)
            obstreticHistoryStore.setBleeding(this.Bleeding)
            obstreticHistoryStore.setPuerperal(this.Puerperal)
            
        },

      addPreEclampsia(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setPreEclampsia(checked as boolean)
            this.saveStateValuesState()
        },
        addEclampsia(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setEclampsia(checked as boolean)
            this.saveStateValuesState()
        },
        addPuerperal(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setPuerperal(checked as boolean)
            this.saveStateValuesState()
        },
        addBabyDeath(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setBabyDeath(checked as boolean)
            this.saveStateValuesState()
        },
        addConvulsions(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setConvulsions(checked as boolean)
            this.saveStateValuesState()
        },
        addForceps(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setForceps(checked as boolean)
            this.saveStateValuesState()
        },
        addMellitus(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setMellitus(checked as boolean)
            this.saveStateValuesState()
        },
        addBleeding(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setBleeding(checked as boolean)
            this.saveStateValuesState()
        },
        addMacrosomia(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setMacrosomia(checked as boolean)
            this.saveStateValuesState()
        },
        addPerineal(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setPerineal(checked as boolean)
            this.saveStateValuesState()
        },
        addAsphyxia(ev: any) {
            const checked = ev.detail.checked
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setAsphyxia(checked as boolean)
            this.saveStateValuesState()
        },
        refSetNonPharmalogicalTherapyAndOtherNotes(value: string) {
            const obstreticHistoryStore = useObstreticHistoryStore()
            obstreticHistoryStore.setOtherComplications(value as string)
            this.saveStateValuesState()
        },


      
    }
    });

</script>

<style scoped>
.vitals_title{
    border-bottom: 1px solid #B3B3B3;
    margin-bottom: 50px ;
}
.input-with-icon {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: gray; /* Adjust the color as needed */
}
ion-col{
    padding-bottom:15px ;
}
.checkLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width:0;
}
h5{
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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

.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.checkboxesDisplay{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


</style>
  