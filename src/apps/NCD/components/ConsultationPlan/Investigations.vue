<template>
    <DashBox :status="no_item" :content="'No Investigations added '" />
    <span v-if="display_item">
        <list :listData="investigations[0].selectdData" 
            @clicked:edit="editTest($event)"
            @clicked:delete="openDeletePopover($event)">
        </list>
    </span>

    <span v-if="search_item">
        <basic-form 
            :contentData="investigations" 
            @clicked:button = "validaterowData"
            @update:inputValue = "searchInput($event)"
            @clicked:inputValue="setEvent($event)">
        </basic-form>
    </span>

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
        :content="testData"  
        :popoverOpen="popoverOpen" 
        @closePopoover="value => popoverOpen = value" 
        :event="event" 
        :title="'Choose the investigation:'"
        @setSelection="setTest"
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
    IonInput,
    IonPopover
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '@/utils/svg';
import { OrderService } from "@/services/order_service"
import DashBox from "@/components/DashBox.vue"
import SelectionPopover from "@/components/SelectionPopover.vue"
import BasicInputField from "@/components/BasicInputField.vue"
import { useInvestigationStore } from '@/stores/InvestigationStore'
import { mapState } from 'pinia';
import { toastWarning,popoverConfirmation } from '@/utils/Alerts';
import BasicForm from '@/components/BasicForm.vue';
import List from '@/components/List.vue';
import DynamicButton from '@/components/DynamicButton.vue';

export default defineComponent({
    name: 'Menu',
    components: {
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
        BasicForm,
        List,
        DynamicButton,
        
    },
    data() {
        return {
            iconsContent: icons,
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: '' as any,
            testResult: '' as any,
            test: '' as any,
            testData: [] as any,
            popoverOpen: false,
            event: '' as any,
            labOrders: '' as any,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    computed: {
        ...mapState(useInvestigationStore, ["investigations"]),
        inputFields(){
            return this.investigations[0].data.rowData[0].colData
        }
    },
    watch:{
        investigations: {
            handler(){
                this.setDashedBox()
            },
            deep: true
        }
    },
    async mounted() {
        this.updateInvestigationsStores()
        this.setDashedBox()
        this.labOrders = await OrderService.getTestTypesBySpecimen('Blood')
    },
    methods: {
        onDataChange(){
            console.log(this.inputFields)
        },
        updateInvestigationsStores(){
            const investigationsStore = useInvestigationStore()
            investigationsStore.setInvestigations(this.investigations)
        },
        displayInputFields() {
            this.testResult = ""
            this.selectedText = ""
            this.no_item = false
            this.addItemButton = false
            this.search_item = true
        },
        async validaterowData() {
            this.investigations[0].data.rowData[0].colData[0].alertsError = false
            this.investigations[0].data.rowData[0].colData[0].alertsErrorMassage =''
            this.investigations[0].data.rowData[0].colData[1].alertsError = false
            this.investigations[0].data.rowData[0].colData[1].alertsErrorMassage =''
            const test = this.labOrders.filter((obj: any) => {
               return obj.name == this.inputFields[0].value ?  obj : false
            })

            if (!this.numericValueIsValid(this.inputFields[1].value) && this.inputFields[1].value != '') {
                this.investigations[0].data.rowData[0].colData[1].alertsError = true
                this.investigations[0].data.rowData[0].colData[1].alertsErrorMassage ='You must enter a modifer and numbers only. i.e =90 / >19 / < 750'
                return false
            }else{
                this.buildResults()
            }
            if(test.length > 0) {

                this.investigations[0].selectdData.push({
                    actionBtn: true,
                    display: [
                        this.inputFields[0].value,
                        this.inputFields[1].value,
                    ],
                    data: {
                        
                        "concept_id": test[0].concept_id,
                        "name":this.inputFields[0].value,
                        "specimen": "Blood",
                        "reason": "Routine",
                        "specimenConcept": 8612
                    }
                })
                this.investigations[0].data.rowData[0].colData[0].value =''
                this.investigations[0].data.rowData[0].colData[1].value =''
                this.search_item = false
                this.display_item = true
                this.addItemButton = true
            } else {
                this.search_item = true
                this.investigations[0].data.rowData[0].colData[0].alertsError = true
                this.investigations[0].data.rowData[0].colData[0].alertsErrorMassage = 'Please select test from the list'
            }
            
        },
        buildResults(){
            const modifier = this.inputFields[1].value.charAt(0)
            const result =  parseInt(this.inputFields[1].value.substring(1)) 
            const  measures = {
                "indicator": {
                    "concept_id": 679
                },
                "value": result,
                "value_modifier": modifier,
                "value_type": "numeric"
            }
            console.log(measures)
        },
        numericValueIsValid(value: string){
            try {
                return value.match(/^(=|<|>)([0-9]*)$/m) ? true : false
            }catch(e) {
                return false
            }
        },
        setEvent(event: Event){
            this.event = event
        },
        async searchInput(col: any) {
            if(col.inputHeader == 'Test'){
                this.popoverOpen = true;
                this.testData = this.labOrders.filter((item: any) => item.name.toLowerCase().includes(col.value.toLowerCase()))
            }
        },
        setTest(value: any) {
            this.selectedText =value.name
            if(this.inputFields[0].inputHeader == 'Test'){
                this.investigations[0].data.rowData[0].colData[0].value =value.name
            }else{
                this.investigations[0].data.rowData[0].colData[1].value =value.name
            }
            this.updateInvestigationsStores()
        },
        async openDeletePopover(e: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${e[1]} ?`, e[0])
            if (deleteConfirmed) {
                this.deleteTest(e[1])
            }
        },
        deleteTest(test: any) {
            this.investigations[0].selectdData = this.investigations[0].selectdData.filter((item: any) => item.display[0] !== test);
            this.updateInvestigationsStores()
        },
        editTest(test: any) {
            this.deleteTest(test[0])
            this.selectedText = test[0]
            this.investigations[0].data.rowData[0].colData[0].value =test[0]
            this.investigations[0].data.rowData[0].colData[1].value =test[1]
            this.addItemButton = false
            this.search_item = true
            this.updateInvestigationsStores()
        },
        setDashedBox(){
            if(this.inputFields[0].value || this.inputFields[1].value){
                this.addItemButton = false
                this.search_item = true
                this.no_item = false
            }
            if (this.investigations[0].selectdData.length > 0) {
                this.display_item = true
                this.no_item = false
            }else if(!this.search_item) {
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

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}

.modify_buttons {
    padding-left: 20px;
}

.item_no_border {
    --border-color: transparent;
}

.search_result {
    padding: 10px;
}
.action_buttons {
    opacity: 0; /* Initially hide the action buttons */
    transition: opacity 0.3s; /* Add a smooth transition effect */
}

.dashed_bottom_border:hover .action_buttons {
    opacity: 1; /* Show the action buttons when the row is hovered over */
}
</style>
  