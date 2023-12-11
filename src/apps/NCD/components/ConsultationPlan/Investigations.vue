<template>
    <DashBox :status="no_item" :content="'No Investigations added '" />
    <span v-if="display_item">
        <ion-row class="dashed_bottom_border" v-for="(item, index) in data" :key="index">
            <ion-col>
                <ion-item class="item_no_border">
                    <span>{{ item[0] }}</span>
                </ion-item>
            </ion-col>
            <ion-col>
                <ion-item class="item_no_border">
                    <span>{{ item[1] }}</span>
                </ion-item>
            </ion-col>
            <ion-col class="action_buttons">
                <ion-label style="cursor: pointer;"><span v-html="iconsContent.edit"
                        class="modify_buttons"></span></ion-label>
                <ion-label style="cursor: pointer;"><span v-html="iconsContent.delete"
                        class="modify_buttons"></span></ion-label>
            </ion-col>

        </ion-row>
    </span>

    <ion-row v-if="search_item">
        <ion-col>
           <BasicInputField 
                :icon ="iconsContent.search"
                :inputValue="searchText"
                @update:inputValue="searchInput"
            />
        </ion-col>
        <ion-col>
            <BasicInputField 
                :inputValue="addTest"
                @update:inputValue="value => addTest = value.target.value"
            />
        </ion-col>
        <ion-col class="action_buttons">
            <span style="cursor: pointer;" @click="saveData()">+ Save</span>
        </ion-col>
    </ion-row>

    <ion-row v-if="addItemButton">
        <span class="add_item" style="cursor: pointer;" @click="addData()"> + Add new test </span>
    </ion-row>

    <SelectionPopover 
        :testData="testData"  
        :popoverOpen="popoverOpen" 
        @closePopoover="value => popoverOpen = value" 
        :event="event" 
        :key="componetKey"
        :title="'Choose the investigation:'"
        @setName="value => searchText = value"
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
import { defineComponent, ref } from 'vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '@/utils/svg.ts';
import { PatientDiagnosisService } from "@/services/patient_diagnosis_service"
import { OrderService } from "@/services/order_service"
import DashBox from "@/components/DashBox.vue"
import SelectionPopover from "@/components/SelectionPopover.vue"
import BasicInputField from "@/components/BasicInputField.vue"

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
            addTest: '' as any,
            data: [] as any,
            testData: [] as any,
            popoverOpen: false,
            event: '' as any,
            componetKey:0
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        navigationMenu(url: any) {
            menuController.close()
            this.$router.push(url);
        },
        addData() {
            this.addTest = ""
            this.searchText = ""
            this.no_item = false
            this.addItemButton = false
            this.search_item = true
        },
        async saveData() {
            this.search_item = false
            this.display_item = true
            this.addItemButton = true
            this.data.push([this.searchText, this.addTest])
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
            this.componetKey++;
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
  