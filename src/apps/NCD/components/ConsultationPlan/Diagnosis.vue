<template>
    <DashBox :status="no_item" :content="'No Diagnosis added'"/>

    <span v-if="display_item">
        <list :listData="diagnosis[0].selectdData" 
            @clicked:edit="editDiagnosis($event)"
            @clicked:delete="openDeletePopover($event)">
        </list>
    </span>

    <ion-row v-if="search_item">
        <basic-form 
            :contentData="diagnosis" 
            @clicked:button = "validaterowData"
            @update:inputValue = "searchInput($event)"
            @clicked:inputValue="setEvent($event)">
        </basic-form>
    </ion-row>
    <ion-row v-if="addItemButton" style="margin-top:10px ;">
        <DynamicButton
            fill="clear"
            :icon="iconsContent.plus"
            iconSlot="icon-only"
            @clicked:btn="displayInputFields()"
            name="Add new test"
        />
    </ion-row>
    <SelectionPopover 
        :content="diagnosisData"  
        :popoverOpen="popoverOpen" 
        @closePopoover="value => popoverOpen = value" 
        :event="event" 
        :title="'Choose the investigation:'"
        @setSelection="setSelection"
    />
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
        IonInput,
        IonPopover
    } from '@ionic/vue';
    import { defineComponent,ref } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { icons } from '@/utils/svg';
    import { PatientDiagnosisService } from "@/services/patient_diagnosis_service"
    import DashBox from "@/components/DashBox.vue"
    import SelectionPopover from "@/components/SelectionPopover.vue"
    import BasicInputField from "@/components/BasicInputField.vue"
    import { useDiagnosisStore } from '@/stores/DiagnosisStore'
    import { mapState } from 'pinia';
    import { toastWarning,popoverConfirmation } from '@/utils/Alerts';
    import List from '@/components/List.vue';
    import BasicForm from '@/components/BasicForm.vue';
    import DynamicButton from '@/components/DynamicButton.vue';
    import { Service } from "@/services/service";
    export default defineComponent({
    name: 'Menu',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        IonPopover,
        DashBox,
        SelectionPopover,
        BasicInputField,
        List,
        BasicForm,
        DynamicButton
    },
    data() {
    return {
        iconsContent: icons,
        no_item: false,
        search_item: false,
        display_item: false,
        addItemButton: true,
        selectedText: '' as any,
        conditionStatus: '' as any,
        data: [] as any,
        diagnosisData: [] as any,
        popoverOpen: false,
        event: '' as any,
        selectedCondition: '' as any,
    };
  },
    setup() {
      return { checkmark,pulseOutline };
    },
    computed: {
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        inputFields(){
            return this.diagnosis[0].data.rowData[0].colData
        },
    },
    watch:{
        diagnosis: {
            handler(){
                this.setDashedBox()
            },
            deep: true
        }
    },
    mounted() {
        this.updateDiagnosisStores()
        this.setDashedBox()
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        displayInputFields(){
            this.conditionStatus=""
            this.selectedText = ""
            this.no_item = false
            this.addItemButton = false
            this.search_item =true
        },
        async validaterowData(){
            this.diagnosis[0].data.rowData[0].colData[0].alertsError = false
            this.diagnosis[0].data.rowData[0].colData[0].alertsErrorMassage =''
            const data = this.diagnosisData.filter((obj: any) => {
               return obj.name == this.inputFields[0].value ?  obj : false
            })
            if(data.length > 0) {
                this.diagnosis[0].selectdData.push({
                    actionBtn: true,
                    display: [
                        this.inputFields[0].value,
                    ],
                    data: {
                        "concept_id": 6542, //primary diagnosis
                        "value_coded": data[0].concept_id,
                        "obs_datetime": Service.getSessionDate()
                    }
                })
                this.diagnosis[0].data.rowData[0].colData[0].value =''
                this.search_item = false
                this.display_item = true
                this.addItemButton = true
            } else {
                this.search_item = true
                this.diagnosis[0].data.rowData[0].colData[0].alertsError = true
                this.diagnosis[0].data.rowData[0].colData[0].alertsErrorMassage ='Please select test from the list'
            }
        },
        buildDiagnosis(){
            this.diagnosis[0].finalDiagnosis.push({
                "concept_id": 6542, //primary diagnosis
                "value_coded": 16,
                "obs_datetime": Service.getSessionDate()
            })
        },
        setEvent(event: Event){
            this.event = event
        },
        temporarySave(diagnosis: any) {
            const diagnosisStore = useDiagnosisStore()
            diagnosisStore.setDiagnosis(diagnosis)
        },
        updateDiagnosisStores(){
            const diagnosisStore = useDiagnosisStore()
            diagnosisStore.setDiagnosis(this.diagnosis)
        },
        openPopover(e: any) {
        this.event = e;
        this.popoverOpen = true;
      },
        async searchInput(col: any) {
            if(col.inputHeader == 'Diagnosis'){
                this.popoverOpen = true;
                this.diagnosisData = await PatientDiagnosisService.getDiagnosis(col.value, 1, 10)
            }
        },
        setSelection(value: any) {
            this.selectedText =value.name
            if(this.inputFields[0].inputHeader == 'Diagnosis'){
                this.diagnosis[0].data.rowData[0].colData[0].value =value.name
            }
            this.updateDiagnosisStores()
        },
      selectedDiagnosis(diagnosis: any){
          this.selectedText = diagnosis
      },
        editDiagnosis(test: any) {
            this.deleteDiagnosis(test[0])       
            this.selectedText = test[0]
            this.diagnosis[0].data.rowData[0].colData[0].value =test[0]
            this.addItemButton = false
            this.search_item = true
            this.updateDiagnosisStores()
        },
        async openDeletePopover(e: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${e[1]} ?`, e[0])
            if (deleteConfirmed) {
                this.deleteDiagnosis(e[1])
            }
        },
        deleteDiagnosis(diagnosis: any) {
            this.diagnosis[0].selectdData = this.diagnosis[0].selectdData.filter((item: any) => item.display[0] !== diagnosis);
            this.updateDiagnosisStores()
        },
        setDashedBox(){
            if(this.inputFields[0].value){
                this.addItemButton = false
                this.search_item = true
                this.no_item = false
            }
            if (this.diagnosis[0].selectdData.length > 0) {
                this.display_item = true
                this.no_item = false
            }else
            if(!this.search_item){
                this.no_item = true
            }
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

.action_buttons{
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}
.modify_buttons{
    padding-left: 20px;
}
.item_no_border{
    --border-color: transparent;
}
.search_result{
    padding: 10px;
  }
</style>
  