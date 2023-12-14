<template>
    <DashBox :status="no_item" :content="'No Investigations added '" />
    <span v-if="display_item">
        <ion-row class="dashed_bottom_border" v-for="(item, index) in investigations" :key="index">
            <ion-col>
                <ion-item class="item_no_border">
                    <span>{{ item.test }}</span>
                </ion-item>
            </ion-col>
            <ion-col>
                <ion-item class="item_no_border">
                    <span>{{ item.testResult }}</span>
                </ion-item>
            </ion-col>
            <ion-col class="action_buttons">
                <ion-label style="cursor: pointer;" @click="editTest(item.test)"><span v-html="iconsContent.edit"
                        class="modify_buttons"></span></ion-label>
                <ion-label style="cursor: pointer;" @click="openDeletePopover($event, item.test)"><span v-html="iconsContent.delete"
                        class="modify_buttons"></span></ion-label>
            </ion-col>
        </ion-row>
    </span>

    <ion-row v-if="search_item">
        <ion-col>
           <BasicInputField 
                :inputHeader="'Test'"
                :icon ="iconsContent.search"
                :inputValue="searchText"
                @update:inputValue="searchInput"
            />
        </ion-col>
        <ion-col>
            <BasicInputField 
                :inputHeader = "'Result'"
                :inputValue="testResult"
                @update:inputValue="value => testResult = value.target.value"
            />
        </ion-col>
        <ion-col class="action_buttons" style="top:25px">
            <span style="cursor: pointer;" @click="savePreperations()">+ Save</span>
        </ion-col>
    </ion-row>

    <ion-row v-if="addItemButton">
        <span class="add_item" style="cursor: pointer;" @click="displayInputFields()"> + Add new test </span>
    </ion-row>

    <SelectionPopover 
        :content="testData"  
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
            testResult: '' as any,
            test: '' as any,
            testData: [] as any,
            popoverOpen: false,
            event: '' as any,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    computed: {
        ...mapState(useInvestigationStore, ["investigations"]),
    },
    watch:{
        investigations: {
            handler(){
                this.setDashedBox()
            },
            deep: true
        }
    },
    mounted() {
        this.setDashedBox()
    },
    methods: {
        displayInputFields() {
            this.testResult = ""
            this.searchText = ""
            this.no_item = false
            this.addItemButton = false
            this.search_item = true
        },
        async savePreperations() {
            this.search_item = false
            this.display_item = true
            this.addItemButton = true
            if (this.searchText == this.test) {
                this.investigations.push({
                    "test": this.test,
                    "testResult": this.testResult
                })
                this.temporarySave(this.investigations)
            } else {
                toastWarning('Please selecte test from the list')
            }
            
        },
        temporarySave(investigations: any) {
            const investigationStore = useInvestigationStore()
            investigationStore.setInvestigations(investigations)
        },
        async searchInput(event: any) {
            this.searchText = event.target.value
            this.openPopover(event)
            this.testData = await OrderService.getTestTypesBySpecimen('Blood')
            this.testData = this.filterByName(this.searchText)
        },
        filterByName(search: any) {
            return this.testData.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()));
        },
        openPopover(e: any) {
            this.event = e;
            this.popoverOpen = true;
        },
        setTest(value: any) {
            this.test = value
            this.searchText = value
        },
        async openDeletePopover(e: Event,test: any) {
            const deleteConfirmed = await popoverConfirmation("Do you want to delete it?", e)
            if (deleteConfirmed) {
                this.deleteTest(test)
            }
        },
        deleteTest(test: any) {
            this.temporarySave(this.investigations.filter((item: any) => item.test !== test))
        },
        editTest(test: any) {
            const testEdit = this.investigations.filter((item: any) => item.test === test);
            this.deleteTest(test)

            this.testResult = testEdit[0].testResult
            this.searchText = testEdit[0].test
            this.test = testEdit[0].test
            this.addItemButton = false
            this.search_item = true
        },
        setDashedBox(){
            if (this.investigations.length > 0) {
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
</style>
  