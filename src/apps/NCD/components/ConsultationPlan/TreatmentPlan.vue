<template>
    <ion-list>
        <ion-label>Medical allergies</ion-label>
        <ion-row>
            <ion-item lines="none" class="medicalAl">
                <ion-row>
                    <div v-for="(item, index) in selectedMedicalAllergiesList" :key="index">
                        <ion-button v-if="item.selected" @click="selectAl(item)" class="medicalAlBtn">
                        {{ item.name }}
                        <ion-icon slot="end" style="font-size: x-large;" :icon="closeOutline"></ion-icon>
                        </ion-button>
                    </div>
                    <div>
                        <ion-button id="click-trigger" fill="clear" class="medicalAlAddBtn">
                            <ion-icon :icon="addOutline"></ion-icon>
                        </ion-button>
                        <ion-popover class="popover-al" :show-backdrop="false" trigger="click-trigger" trigger-action="click" @didPresent="dissmissDrugAddField">
                            <ion-content color="light"  class="ion-padding content-al">
                                <ion-label>Choose the allergy:</ion-label>
                                <ion-input  v-model="drugName"  @ionInput="FindAllegicDrugName" fill="outline"></ion-input>
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

            <dynamic-list :_selectedMedicalDrugsList="selectedMedicalDrugsList" @edit-item="editItemAtIndex" @remove-item="removeItemAtIndex" :key="componentKey"/>

            <ion-row v-if="!addItemButton" style="margin-bottom: 20px;">
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input  v-model="drugName"  @ionInput="FindDrugName" fill="outline"></ion-input>
                        <!--  -->
                        <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_drug_name" class="error-label">{{ drugnameErrMsg }}</ion-label>
                    </div>
                    
                    <ion-popover 
                        :is-open="popoverOpen" 
                        :event="event" 
                        @didDismiss="popoverOpen = false" 
                        :keyboard-close="false" 
                        :show-backdrop="false" 
                        :dismiss-on-select="true"
                        style="top: 10px;left: -25px;"
                        v-if="!show_error_msg_for_drug_name"
                        >
                        <ion-content color="light"  class="ion-padding content-al" >
                            <!-- <ion-row class="search_result" v-for="(item, index) in diagnosisData" :key="index" >
                                <ion-col @click="selectedDrugName(item.name, item)">{{ item.name }} </ion-col>
                            </ion-row> -->
                            <ion-list class="list-al">
                                <div class="item-al" v-for="(item, index) in diagnosisData" :key="index">
                                    {{ item.name }}
                                    <ion-col @click="selectedDrugName(item.name, item)">{{ item.name }} </ion-col>
                                </div>
                            </ion-list>
                        </ion-content>
                    </ion-popover> 
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Dose" v-model="dose"  fill="outline"></ion-input>
                        <ion-label><span  class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_dose" class="error-label">{{ doseErrMsg }}</ion-label>
                    </div>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <span class="spcls" id="chooseType" @click="popoverOpenForFrequencyFn2">
                            <ion-input  placeholder="Frequency" v-model="frequency"></ion-input>
                            <ion-icon v-if="!showPopoverOpenForFrequency"  :icon="chevronDownOutline"/>
                            <ion-icon v-if="showPopoverOpenForFrequency" :icon="chevronUpOutline"/>
                        </span>
                            
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
                    <div>
                        <ion-label v-if="show_error_msg_for_duration" class="error-label">{{ durationErrMsg }}</ion-label>
                    </div>
                </ion-col>
                <!-- <ion-col>
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
                </ion-col> -->
                <ion-col class="action_buttons">
                    <span @click="saveData()">+ Save</span> 
                </ion-col>
            </ion-row>

            <!-- <ion-button v-if="addItemButton" fill="clear" @click="addData" class="addMedicalAlBtn">
                Add new medication
                <ion-icon slot="start" style="font-size: x-large;" :icon="addOutline"></ion-icon>
            </ion-button> -->
            <dynamic-button  v-if="addItemButton" :name="btnName1" :fill="btnFill" :icon="addOutline" @clicked:btn="addData">
            </dynamic-button>
            <ion-row>
                <dynamic-button class="addMedicalTpBtn" :name="btnName2"/>
                <dynamic-button class="addMedicalTpBtn" :name="btnName3" style="margin-left: 4%;"/>
            </ion-row>
        </div>
        <div class="checkLbltp">
            <ion-checkbox  @ionChange="useOfTraditional" :checked="isUseOfTraditionalMedicineSelected" label-placement="end" style="font-size: 16px; font-weight: 600; line-height: 24px; margin: 15px; marg">Use of traditional medicine</ion-checkbox>
        </div>
        <div style="margin-top: 14px; margin-left: 10px;">
            <ion-label class="tpStndCls">Non-pharmalogical therapy and other notes</ion-label>
            <ion-item class="input_item" style="min-height: 120px; margin-top: 14px;">
                <ion-label><span v-html="iconsContent.editPen"></span></ion-label>
                <ion-textarea @ionInput="validateNotes" v-model="nonPharmalogicalTherapyAndOtherNotes"  style="min-height: 120px;" class="inputTpln" :auto-grow="true"  fill="outline"></ion-textarea >
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
            IonLabel,
            IonTextarea
        } from '@ionic/vue';
    import { defineComponent } from 'vue'
    import { checkmark,pulseOutline,addOutline,closeOutline, checkmarkOutline, filter, chevronDownOutline, chevronUpOutline } from 'ionicons/icons'
    import { ref } from 'vue'
    import { icons } from '@/utils/svg.ts'
    import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service"
    import { DrugService} from "@/services/drug_service"
    import { ConceptName } from '@/interfaces/conceptName'
    import DynamicButton from "@/components/DynamicButton.vue"
    import DynamicList from '@/components/DynamicList.vue'
    import { mapState } from 'pinia';
    import { useTreatmentPlanStore } from '@/stores/TreatmentPlanStore'
    import { ConceptService } from "@/services/concept_service"
    import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"
    import { Service } from "@/services/service"

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
    DynamicList,
    IonTextarea
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
        componentKey: 0,
        prescEvent: null,
        drugnameErrMsg: '' as string,
        show_error_msg_for_drug_name: false,
        doseErrMsg: '' as string,
        show_error_msg_for_dose: false,
        durationErrMsg: '' as string,
        show_error_msg_for_duration: false,
        diagnosisData: [] as any,
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
    watch: {
        drugName: {
            async handler(){
                this.validatedDrugName()
            },
            deep: true
        },
        dose: {
            async handler(){
                this.validateDose()
            },
            deep: true
        },
        duration: {
            async handler(){
                this.validateDuration()
            },
            deep: true
        }
    },
    computed: {
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList",
                        "medicalAllergiesList",
                        "nonPharmalogicalTherapyAndOtherNotes",
                        "isUseOfTraditionalMedicineSelected",
                        "selectedMedicalAllergiesList"
                        ]
                    ),
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        async validatedDrugName() {
            const drugNameExists  = await this.findIfDrugNameExists()
                if (!drugNameExists) {
                    this.drugnameErrMsg = "please select a valid drug name"
                    this.show_error_msg_for_drug_name = true
                } else {
                    this.show_error_msg_for_drug_name = false
                }
                return this.show_error_msg_for_drug_name
        },
        async validateDose() {
            const isNum = this.isNumeric(this.dose)
            if (!isNum) {
                this.doseErrMsg = "please enter a number"
                this.show_error_msg_for_dose = true
            } else {
                this.show_error_msg_for_dose = false
            }
            return this.show_error_msg_for_dose
        },
        async validateDuration() {
            const isNum = this.isNumeric(this.duration)
            if (!isNum) {
                this.durationErrMsg = "please enter a number"
                this.show_error_msg_for_duration = true
            } else {
                this.show_error_msg_for_duration = false
            }
            return this.show_error_msg_for_duration
        },
        async areFieldsValid() {
            const isDrugnameValid = await this.validatedDrugName()
            const isDoseValid = await this.validateDose()
            const isDurationValid = await this.validateDuration()

            if (!isDrugnameValid && !isDoseValid && !isDurationValid) {
                return true
            } else {
                return false
            }
        },
        selectAl(item: any) {
            item.selected = !item.selected
            const treatmentPlanStore = useTreatmentPlanStore()
            treatmentPlanStore.setSelectedMedicalAllergiesList(item)
            this.saveStateValuesState()
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
            const are_fieldsValid = await this.areFieldsValid()
            if (!are_fieldsValid) {
                toastWarning("Please enter correct data values",4000)
                return
            }
            this.dissmissDrugAddField()
            const systemSessionDate = Service.getSessionDate()
            const daysToAdd = this.duration as number
            const generatedPrescriptionDate = this.addDaysToDate(systemSessionDate, parseInt(this.duration))

            const drugString = {
                drugName: this.drugName,
                dose: this.dose,
                frequency: this.frequency,
                duration: this.duration,
                prescription: generatedPrescriptionDate
            }
            this.selectedMedicalDrugsList.push(drugString)

            this.drugName = ''
            this.dose = ''
            this.frequency = ''
            this.duration = ''
            this.prescription = ''

            this.componentKey++
            this.saveStateValuesState()
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
            const filter_id_array = []
            this.selectedMedicalAllergiesList.forEach(selectedMedicalAllergy => {
                if (selectedMedicalAllergy.selected) {
                    filter_id_array.push(selectedMedicalAllergy.concept_id)
                }
            })

            const filteredDrugs = this.filterArrayByIDs(drugs, filter_id_array);
            
            filteredDrugs.map(drug => ({
            label: drug.name, value: drug.name, other: drug
            }))
            
            this.diagnosisData = filteredDrugs
        },
        async FindDrugName2(text: any) {
            
            let search_value
            if (text.target === undefined) {
                search_value = text
            } else search_value = text.target.value

            const page=1, limit=10
            const drugs: ConceptName[] = await DrugService.getOPDDrugs({ 
            "name": search_value, 
            "page": page,
            "page_size": limit,
            })
            const filter_id_array = []
            this.selectedMedicalAllergiesList.forEach(selectedMedicalAllergy => {
                if (selectedMedicalAllergy.selected) {
                    filter_id_array.push(selectedMedicalAllergy.concept_id)
                }
            })

            const filteredDrugs = this.filterArrayByIDs(drugs, filter_id_array);
            
            filteredDrugs.map(drug => ({
            label: drug.name, value: drug.name, other: drug
            }))
            
            this.diagnosisData = filteredDrugs
            return filteredDrugs
        },
        async findIfDrugNameExists() {
            const filteredDrugs = await this.FindDrugName2(this.drugName)
            if (filteredDrugs.length > 0) {
                // if (this.drugName.length > 0) {
                //     filteredDrugs.forEach((drug: any) => {
                //         if (drug.name === this.drugName) {
                //             return true
                //         }
                //     })
                // }
                if (this.drugName.length == 0) {
                    return false
                }
                return true
            } else return false
        },
        filterArrayByIDs(mainArray: [], idsToFilter: []) {
            return mainArray.filter(item => !idsToFilter.includes(item.concept_id))
        },
        async FindAllegicDrugName(text: any) {
            const searchText = text.target.value
            const page=1, limit=10
            const drugs: ConceptName[] = await ConceptService.getConceptSet('OPD Medication', searchText)
            // const drugs: ConceptName[] = await DrugService.getOPDDrugs({ 
            // "name": searchText, 
            // "page": page,
            // "selected": false as any, 
            // "page_size": limit,
            // })
            drugs.map(drug => ({
            label: drug.name, value: drug.name, other: drug
            }))
            const treatmentPlanStore = useTreatmentPlanStore()
            treatmentPlanStore.setMedicalAllergiesList(drugs)
        },
        openPopover(e: any) {
        this.event = e;
        this.popoverOpen = true;
        }, 
        openPrescPopover(e: any) {
            this.prescEvent = e
            this.prescPopoverOpen = true
        },
        selectedDrugName(name: any, obj: any) {
            //console.log(obj)
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
            this.componentKey++
            this.saveStateValuesState()
        },
        getDate(ev: any) {
            const inputDate = new Date(ev.detail.value)
            const year = inputDate.getFullYear()
            const month = inputDate.getMonth() + 1
            const day = inputDate.getDate()
            const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            this.prescription = formattedDate
        },
        removeItemAtIndex(index: any) {
            this.selectedMedicalDrugsList.splice(index, 1)
            this.componentKey++
            this.saveStateValuesState()
        },
        validateNotes(ev: any) {
            let value = ev.target.value
            const textArry = []
            this.refSetNonPharmalogicalTherapyAndOtherNotes(value)
        },
        saveStateValuesState() {
            const treatmentPlanStore = useTreatmentPlanStore()
            treatmentPlanStore.setSelectedMedicalDrugsList(this.selectedMedicalDrugsList)
            treatmentPlanStore.setMedicalAllergiesList(this.medicalAllergiesList)
            treatmentPlanStore.setIsUseOfTraditionalMedicineSelected(this.isUseOfTraditionalMedicineSelected)
            treatmentPlanStore.setNonPharmalogicalTherapyAndOtherNotes(this.nonPharmalogicalTherapyAndOtherNotes)
        },
        useOfTraditional(ev: any) {
            const checked = ev.detail.checked
            const treatmentPlanStore = useTreatmentPlanStore()
            treatmentPlanStore.setIsUseOfTraditionalMedicineSelected(checked as boolean)
            this.saveStateValuesState()
        },
        refSetNonPharmalogicalTherapyAndOtherNotes(value: string) {
            const treatmentPlanStore = useTreatmentPlanStore()
            treatmentPlanStore.setNonPharmalogicalTherapyAndOtherNotes(value as string)
            this.saveStateValuesState()
        },
        isNumeric(text: string): boolean {
        return /^[0-9]+$/.test(text)
        },
        addDaysToDate(dateString: string, daysToAdd: number): string {
            const currentDate = new Date(dateString)
            currentDate.setDate(currentDate.getDate() + daysToAdd)
            const year = currentDate.getFullYear()
            const month = String(currentDate.getMonth() + 1).padStart(2, '0')
            const day = String(currentDate.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        },
        dissmissDrugAddField(): void{
            this.search_item= false
            this.display_item= true
            this.addItemButton =true
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
.error-label {
    background: #FECDCA;
    color: #B42318;
    text-transform: none;
    padding: 6%;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
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
.spcls {
  display: flex;
  align-items: center;
}
</style>
  