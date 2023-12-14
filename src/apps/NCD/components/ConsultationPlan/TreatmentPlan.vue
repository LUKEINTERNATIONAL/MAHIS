<template>
    <ion-list>
        <ion-label>Medical allergies</ion-label>
        <ion-row>
            <ion-item lines="none" class="medicalAl">
                <ion-row>
                    <div v-for="(item, index) in medicalAllergiesList" :key="index">
                        <ion-button v-if="item.selected" @click="selectAl(item)" class="medicalAlBtn">
                        {{ item.name }}
                        <ion-icon slot="end" style="font-size: x-large;" :icon="closeOutline"></ion-icon>
                        </ion-button>
                    </div>
                    <div>
                        <ion-button id="click-trigger" fill="clear" class="medicalAlAddBtn">
                            <ion-icon :icon="addOutline"></ion-icon>
                        </ion-button>
                        <ion-popover class="popover-al" :show-backdrop="false" trigger="click-trigger" trigger-action="click">
                            <ion-content color="light"  class="ion-padding content-al">
                                <ion-label>Choose the allergy:</ion-label>
                                <ion-list class="list-al">
                                    <div class="item-al" v-for="(item, index) in medicalAllergiesList" :key="index">
                                        <ion-label  @click="selectAl(item)" style="display: flex; justify-content: space-between;">
                                            {{ item.name }}
                                            <ion-icon v-if="item.selected" class="icon-al" :icon="checkmarkOutline"></ion-icon> 
                                        </ion-label>                                     
                                    </div>
                                </ion-list>
                            </ion-content>
                        </ion-popover>
                    </div>
                </ion-row>
            </ion-item>
        </ion-row>
        <ion-item lines="none">
            <ion-label>List of medications</ion-label>
        </ion-item>
        <div style="margin-left: 30px; margin-bottom: 14px;">

            <dynamic-list :selectedMedicalDrugsList="selectedMedicalDrugsList" @edit-item="editItemAtIndex"/>

            <ion-row v-if="!addItemButton" style="margin-bottom: 20px;">
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input  v-model="drugName"  @ionInput="FindDrugName" fill="outline"></ion-input>
                        <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <ion-popover 
                        :is-open="popoverOpen" 
                        :event="event" 
                        @didDismiss="popoverOpen = false" 
                        :keyboard-close="false" 
                        :show-backdrop="false" 
                        :dismiss-on-select="true"
                        style="top: 10px;left: -25px;"
                        >
                        <ion-content class="search_card" >
                        
                            <ion-row class="search_result" v-for="(item, index) in diagnosisData" :key="index" >
                                <ion-col @click="selectedDrugName(item.name)">{{ item.name }} </ion-col>
                            </ion-row>
                        </ion-content>
                    </ion-popover>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Dose" v-model="dose"  fill="outline"></ion-input>
                        <ion-label><span  class="selectedPatient"></span></ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                            <ion-input id="chooseType" placeholder="Frequency" v-model="frequency" @click="popoverOpenForFrequencyFn2"></ion-input>
                            <ion-icon v-if="!showPopoverOpenForFrequency"  :icon="chevronDownOutline"></ion-icon>
                            <ion-icon v-if="showPopoverOpenForFrequency" :icon="chevronUpOutline"></ion-icon>
                            <ion-popover
                                class="popover-al"
                                :show-backdrop="false"
                                trigger="chooseType"
                                trigger-action="click"
                                @didDismiss="showPopoverOpenForFrequency = false"
                                >
                                <ion-content color="light" class="ion-padding content-al">
                                    <ion-label>Choose the type:</ion-label>
                                    <ion-list class="list-al">
                                        <div class="item-al" v-for="(item, index) in drug_frequencies" :key="index">
                                                    <ion-label  @click="selectFrequency(index)" style="display: flex; justify-content: space-between;">
                                                        {{ item.label }}
                                                        <ion-icon v-if="item.selected" class="icon-al" :icon="checkmarkOutline"></ion-icon> 
                                                    </ion-label>                                     
                                                </div>
                                    </ion-list>
                                </ion-content>
                            </ion-popover>
                        </ion-item>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Duration" v-model="duration"  fill="outline"></ion-input>
                        <ion-label><span  class="selectedPatient"></span></ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item" style="min-height: 50px !important; height: 5px;">
                        <ion-input  id="click-trigger2" placeholder="Prescription" v-model="prescription" ></ion-input>
                        <ion-popover
                            @didDismiss="prescPopoverOpen = false" 
                            show-backdrop="false" 
                            dismiss-on-select="false"
                            trigger="click-trigger2"
                            trigger-action="click"
                            >
                            <ion-content class="search_card" >
                                <ion-datetime ref="prescription" @ionChange="getDate($event)" presentation="date"></ion-datetime>
                            </ion-content>
                        </ion-popover>
                    </ion-item>
                </ion-col>
                <ion-col class="action_buttons">
                    <span @click="saveData()">+ Save</span> 
                </ion-col>
            </ion-row>

            <!-- <ion-button v-if="addItemButton" fill="clear" @click="addData" class="addMedicalAlBtn">
                Add new medication
                <ion-icon slot="start" style="font-size: x-large;" :icon="addOutline"></ion-icon>
            </ion-button> -->
            <dynamic-button  v-if="addItemButton" :name="btnName1" :fill="btnFill" :icon="addOutline" :Fn="addData">
            </dynamic-button>
            <ion-row>
                <dynamic-button class="addMedicalTpBtn" :name="btnName2"/>
                <dynamic-button class="addMedicalTpBtn" :name="btnName3" style="margin-left: 4%;"/>
            </ion-row>
        </div>
        <div class="checkLbltp">
            <ion-checkbox label-placement="end" style="font-size: 16px; font-weight: 600; line-height: 24px; margin: 15px; marg">Use of traditional medicine</ion-checkbox>
        </div>
        <div style="margin-top: 14px; margin-left: 10px;">
            <ion-label class="tpStndCls">Non-pharmalogical therapy and other notes</ion-label>
            <ion-item class="input_item" style="min-height: 120px; margin-top: 14px;">
                <ion-label><span v-html="iconsContent.editPen"></span></ion-label>
                <ion-textarea  style="min-height: 120px;" class="inputTpln" :auto-grow="true"  fill="outline"></ion-textarea >
            </ion-item>

        </div>
    </ion-list>
</template>
  
<script lang="ts">
    import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            menuController,
            IonButton,
            IonInput,
            IonDatetime,
            IonLabel
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline,addOutline,closeOutline, checkmarkOutline, filter, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg.ts';
    import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service";
    import { DrugService} from "@/services/drug_service"
    import { ConceptName } from '@/interfaces/conceptName';
    import DynamicButton from "@/components/DynamicButton.vue"
    import DynamicList from '@/components/DynamicList.vue';

    export default defineComponent({
    name: 'Menu',
    components:{
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonButton,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonLabel,
    DynamicButton,
    DynamicList
},
        data() {
    return {
        iconsContent: icons,
        searchText: '' as any,
        drug_frequencies: DRUG_FREQUENCIES,
        no_item: true,
        search_item: false,
        display_item: false,
        addItemButton: true,
        popoverOpen: false,
        prescPopoverOpen: false,
        datetime: ref(),
        event: null,
        prescEvent: null,
        selectedMedicalDrugsList: [
            {
                drugName: 'Metformin Extentend',
                dose: '750mg',
                frequency: 'twice',
                duration: '30days',
                prescription: '2023-09-23'
            },
            {
                drugName: 'Metformin Extentend',
                dose: '750mg',
                frequency: 'twice',
                duration: '30days',
                prescription: '2023-09-29'
            }
        ] as any,
        diagnosisData: [] as any,
        medicalAllergiesList: [
            {
                name: 'Eye too short',
                selected: false,
            },
            {
                name: 'Glibenclamide 2',
                selected: false,
            },
            {
                name: 'Gliben',
                selected: false,
            },
            {
                name:  'Metformin',
                selected: false,
            },
            {
                name: 'Short acting insulin',
                selected: false,
            },
            {
                name: 'Glibenclamide',
                selected: false,
            }
          ],
          drugName: '' as any,
          dose: '' as any,
          frequency: '' as any,
          duration: '' as any,
          prescription: '' as any,
          showPopoverOpenForFrequency: false,
          btnName1: 'Add new medication',
          btnName2: 'Send to pharmacy',
          btnName3: 'Send to dispensation',
          btnFill: 'clear',
    };
  },
    setup() {
      return { checkmark, pulseOutline, closeOutline, addOutline, checkmarkOutline, chevronDownOutline,chevronUpOutline };
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        selectAl(item: any) {
            item.selected = !item.selected
        },
        selectFrequency(index: any) {
            this.drug_frequencies.forEach(item => {
                item.selected = false
            })
            this.drug_frequencies[index].selected = !this.drug_frequencies[index].selected
            this.frequency = this.drug_frequencies[index].label
        },
        addData(){
            // this.searchText = ""
            // this.drugName = ""
            // this.dose = ""
            // this.frequency = ""
            // this.duration = ""
            // this.no_item = false
            this.addItemButton = false
            this.search_item =true
        },
        async saveData(){
            this.search_item= false
            this.display_item= true
            this.addItemButton =true

            const drugString = {
                drugName: this.drugName,
                dose: this.dose,
                frequency: this.frequency,
                duration: this.duration,
                prescription: '2023-09-23'
            }
            this.selectedMedicalDrugsList.push(drugString)

            this.drugName = ''
            this.dose = ''
            this.frequency = ''
            this.duration = ''
            this.prescription = ''
        },
        async FindDrugName(text: any) {
            const searchText = text.target.value;
            this.openPopover(text)
            const page=1, limit=10
            const drugs: ConceptName[] = await DrugService.getOPDDrugs({ 
            "name": searchText, 
            "page": page,
            "page_size": limit,
            })
            drugs.map(drug => ({
            label: drug.name, value: drug.name, other: drug
            }))
            this.diagnosisData = drugs
        },
        openPopover(e: any) {
        this.event = e;
        this.popoverOpen = true;
        }, 
        openPrescPopover(e: any) {
            this.prescEvent = e
            this.prescPopoverOpen = true
        },
        selectedDrugName(name: any){
            this.drugName = name
        },
        popoverOpenForFrequencyFn2() {
            this.showPopoverOpenForFrequency = true
        },
        editItemAtIndex(index: any) {
            const dataItem = this.selectedMedicalDrugsList[index]
            this.selectedMedicalDrugsList.splice(index, 1)
            this.drugName = dataItem.drugName
            this.dose = dataItem.dose
            this.frequency = dataItem.frequency
            this.duration = dataItem.duration
            this.prescription = dataItem.prescription
            this.addItemButton = !this.addItemButton
        },
        getDate(ev: any) {
            const inputDate = new Date(ev.detail.value)
            const year = inputDate.getFullYear()
            const month = inputDate.getMonth() + 1
            const day = inputDate.getDate()
            const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            this.prescription = formattedDate
        }
    }
    });
</script>

<style scoped>
#container {
text-align: center;

position: absolute;
left: 0;
right: 0;
top: 50%;
transform: translateY(-50%);
}

#container strong {
font-size: 20px;
line-height: 26px;
}

#container p {
font-size: 16px;
line-height: 22px;

color: #8c8c8c;

margin: 0;
}

#container a {
text-decoration: none;
}
ion-item.medicalAl {
    --background: #fff;
    --border-radius: 5px;
}
ion-button.medicalAlBtn {
    --background: #FECDCA;
    --color: #B42318;
    text-transform: none;
}
ion-button.addMedicalTpBtn {
    --background: #DDEEDD;
    --color: #006401;
    text-transform: none;
    font-weight: 600;
    font-size: 16px;
}
ion-button.medicalAlAddBtn {
    font-size: large;
}
ion-icon.icon-al {
    /* margin-left: 40%; */
    font-size: x-large;
    margin-bottom: -5px;
}
.item-al {
    cursor: pointer;
    padding: 5px;
    background-color: #EBEBEB;
    margin-top: 8px;
}
.item-al:hover {
  background-color: #55515148;
  padding: 5px;
  border-radius: 3px;
}
ion-popover.popover-al {
    --background: #fff;
}
ion-content.content-al {
    --background: #fff;
}
ion-list.list-al {
    --background: #fff;
    -ion-item-background: #fff;
}

.checkLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width:0;
}
.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}
.action_buttons{
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
}
.action_buttons:hover {
    cursor: pointer;
}
</style>
  