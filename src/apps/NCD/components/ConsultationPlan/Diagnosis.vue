<template>
    <DashBox :status="no_item" :content="'No Diagnosis added'" />

    <span v-if="display_item">
        <ion-row class="dashed_bottom_border" v-for="(item, index) in diagnosis" :key="index">
            <ion-col>
                <ion-item class="item_no_border">
                    <span>{{ item.diagnosis }}</span>
                </ion-item>
            </ion-col>
            <ion-col>
                <ion-item class="item_no_border">
                    <span>{{ item.diagnosisStatus }}</span>
                </ion-item>
            </ion-col>
            <ion-col class="action_buttons">
                <ion-label style="cursor: pointer;" @click="editDiagnosis(item.diagnosis)"><span v-html="iconsContent.edit"
                        class="modify_buttons"></span></ion-label>
                <ion-label style="cursor: pointer;" @click="openDeletePopover($event, item.diagnosis)"><span v-html="iconsContent.delete"
                        class="modify_buttons"></span></ion-label>
            </ion-col>
        </ion-row>
    </span>

    <ion-row v-if="search_item">
        <ion-col>
            <BasicInputField 
                        :inputHeader="'Diagnosis'"
                        :icon ="iconsContent.search"
                        :inputValue="searchText"
                        @update:inputValue="searchInput"
                    />
        </ion-col>
        <ion-col>
            <BasicInputField 
                :inputHeader = "'Result'"
                :inputValue="conditionStatus"
                @update:inputValue="value => conditionStatus = value.target.value"
            />
        </ion-col>
        <ion-col class="action_buttons" style="top:25px">
            <span style="cursor: pointer;" @click="savePreperations()">+ Save</span> 
        </ion-col>
    </ion-row>

    <ion-row v-if="addItemButton">
        <span class="add_item" style="cursor: pointer;" @click="displayInputFields()"> + Add Diagnosis </span> 
    </ion-row>

    <SelectionPopover 
        :content="diagnosisData"  
        :popoverOpen="popoverOpen" 
        @closePopoover="value => popoverOpen = value" 
        :event="event" 
        :title="'Choose the investigation:'"
        @setName="setTest"
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
        BasicInputField
    },
    data() {
    return {
        iconsContent: icons,
        no_item: true,
        search_item: false,
        display_item: false,
        addItemButton: true,
        searchText: '' as any,
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
        this.setDashedBox()
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        displayInputFields(){
            this.conditionStatus=""
            this.searchText = ""
            this.no_item = false
            this.addItemButton = false
            this.search_item =true
        },
        async savePreperations(){
            this.search_item= false
            this.display_item= true
            this.addItemButton =true
            if (this.searchText == this.selectedCondition) {
                this.diagnosis.push({
                    "diagnosis": this.selectedCondition,
                    "diagnosisStatus": this.conditionStatus
                })
                this.temporarySave(this.diagnosis)
            } else {
                toastWarning('Please select diagnosis from the list')
            }
            this.data.push([this.searchText,this.conditionStatus])
        },
        temporarySave(diagnosis: any) {
            const diagnosisStore = useDiagnosisStore()
            diagnosisStore.setDiagnosis(diagnosis)
        },
        async searchInput(text: any) {
            const searchText = text.target.value;
            this.openPopover(text)
            this.diagnosisData = await PatientDiagnosisService.getDiagnosis(searchText, 1, 10)
            console.log(this.diagnosisData)
        },
        openPopover(e: any) {
        this.event = e;
        this.popoverOpen = true;
      },
      setTest(value: any) {
            this.selectedCondition = value
            this.searchText = value
        },
      selectedDiagnosis(diagnosis: any){
          this.searchText = diagnosis
      },
        editDiagnosis(diagnosis: any) {
            const diagnosisEdit = this.diagnosis.filter((item: any) => item.diagnosis === diagnosis);
            this.deleteDiagnosis(diagnosis)

            this.selectedCondition = diagnosisEdit[0].selectedCondition
            this.searchText = diagnosisEdit[0].diagnosis
            this.selectedCondition = diagnosisEdit[0].diagnosis
            this.addItemButton = false
            this.search_item = true
        },
        async openDeletePopover(e: Event,diagnosis: any) {
            const deleteConfirmed = await popoverConfirmation("Do you want to delete it?", e)
            if (deleteConfirmed) {
                this.deleteDiagnosis(diagnosis)
            }
        },
        deleteDiagnosis(diagnosis: any) {
            this.temporarySave(this.diagnosis.filter((item: any) => item.diagnosis !== diagnosis))
        },
        editTest(diagnosis: any) {
            const diagnosisEdit = this.diagnosis.filter((item: any) => item.diagnosis === diagnosis);
            this.deleteDiagnosis(diagnosis)

            this.searchText = diagnosisEdit[0].diagnosis
            this.selectedCondition = diagnosisEdit[0].diagnosisStatus
            this.addItemButton = false
            this.search_item = true
        },
        setDashedBox(){
            if (this.diagnosis.length > 0) {
                this.display_item = true
                this.no_item = false
            }else{
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
  