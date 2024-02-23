<template>
    <ion-row v-if="showEmptyMsg">
       <span class="dash_box">{{ initialMsg }}</span> 
    </ion-row>

    <ion-row>
        <ion-col>
            <ion-item class="input_item">
                <ion-input  v-model="faciltyName"  @ionInput="FindFacilityName" fill="outline"></ion-input>
                <!--  -->
                <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
            </ion-item>
            <div>
                <ion-label v-if="show_error_msg_for_drug_facilty_name" class="error-label">{{ facilityNameErrMsg }}</ion-label>
            </div>
            
            <ion-popover 
                :is-open="popoverOpen" 
                :event="event" 
                @didDismiss="popoverOpen = false" 
                :keyboard-close="false" 
                :show-backdrop="false" 
                :dismiss-on-select="true"
                style="top: 10px;left: -25px;"
                v-if="!show_error_msg_for_drug_facilty_name"
                >
                <ion-content color="light"  class="ion-padding content-al" >
                    <!-- <ion-row class="search_result" v-for="(item, index) in diagnosisData" :key="index" >
                        <ion-col @click="selectedDrugName(item.name, item)">{{ item.name }} </ion-col>
                    </ion-row> -->
                    <ion-list class="list-al">
                        <div class="item-al" v-for="(item, index) in facilityNameData" :key="index">
                            <ion-col @click="selectedFaciltyName(item.name, item)">{{ item.name }} </ion-col>
                        </div>
                    </ion-list>
                </ion-content>
            </ion-popover> 
        </ion-col>

        <ion-col>
            <BasicInputField :placeholder="basicInputFieldProperties[1].placeholder"
                :icon="basicInputFieldProperties[1].icon" :inputValue="basicInputFieldProperties[1].selection"
                @clicked:inputValue="showOptions" />

                <SelectionPopover :content="popoverProperties.popoverData" :keyboardClose="popoverProperties.keyboardClose"
                    :title="popoverProperties.title" :popoverOpen="popoverProperties.popoverOpen"
                    :event="popoverProperties.event" @closePopoover="value => popoverProperties.popoverOpen = value"
                    @setSelection="setSelection" />
        </ion-col>

        <ion-col>
            <BasicInputField :placeholder="basicInputFieldProperties[2].placeholder"
                :inputValue="basicInputFieldProperties[2].date" :icon="basicInputFieldProperties[2].icon"
                @update:inputValue="basicInputFieldProperties[2].date" @clicked:inputValue="openDate" />

            <ion-popover :show-backdrop="false" :keep-contents-mounted="true" :is-open="popoverProperties.dateOpen"
                :event="popoverProperties.event" @didDismiss="popoverProperties.dateOpen = false">
                <ion-datetime @ionChange="saveTheDate" id="datetime" presentation="date"
                    :show-default-buttons="true"></ion-datetime>
            </ion-popover>
        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col>
            <BasicInputField :placeholder="basicInputFieldProperties[3].placeholder"
            :inputValue="basicInputFieldProperties[3].referralReason" @update:inputValue="updateReason" />
        </ion-col>
    </ion-row>

    <ion-row class="spc_btwn" v-if="showAddItemButton">
        <dynamic-button  v-if="addItemButton" :name="btnName1" :fill="btnFill" :icon="addOutline" @clicked:btn="addReferral"></dynamic-button>
    </ion-row>

</template>

<script setup lang="ts">
    import {     IonContent, IonHeader, IonCol, IonItem, IonList, IonButton, IonMenu, IonTitle, IonToolbar, IonInput, IonDatetime, IonLabel, IonTextarea, IonAccordion, IonAccordionGroup, AccordionGroupCustomEvent } from '@ionic/vue'
    import { checkmark,pulseOutline,addOutline,closeOutline, checkmarkOutline, filter, chevronDownOutline, chevronUpOutline, codeSlashOutline } from 'ionicons/icons'
    import { ref, watch, computed, onMounted, onUpdated } from 'vue'
    import { LocationService } from "@/services/location_service"
    import DynamicButton from "@/components/DynamicButton.vue"
    import SelectionPopover from "@/components/SelectionPopover.vue"
    import { icons } from '@/utils/svg'
    import BasicInputField from "@/components/BasicInputField.vue";

    const iconsContent = icons
    const initialMsg = ref("No referrals created yet")
    const btnName1 = ref("Add new referral")
    const btnFill = 'clear'
    let event: null = null
    const addItemButton = ref(true)
    const showAddItemButton = ref(true)
    const showEmptyMsg = ref(true)
    const faciltyName = ref()
    const show_error_msg_for_drug_facilty_name = ref(false)
    const facilityNameErrMsg = ref('')
    const popoverOpen = ref(false)
    const facilityNameData = ref([] as any)
    const basicInputFieldProperties = [
        {
            // ### leave as is (this obj)
        },
        {
            name: 'referralType',
            placeholder: 'Referral Type',
            icon: icons.chevronUp,
            selection: '' as string,
        },
        {
            name: 'date',
            placeholder: 'Referral Date',
            icon: icons.calendar,
            keepContentsMounted: true,
            date: '' as string,
        },
        {
            name: 'reason',
            placeholder: 'Referral Reason',
            referralReason: '' as string,
        }
    ]

    const referralType = ref([
        {
            name: 'Internal',
            selected: false,
        },
        {
            name: 'External',
            selected: false,
        },
    ])

    const popoverProperties = ref({
        title: 'List of facilities',
        popoverOpen: false,
        dateOpen: false,
        event: {} as Event,
        keyboardClose: false,
        popoverData: {} as Object,
    })

    function addReferral() {
        showEmptyMsg.value = false
        showAddItemButton.value = false
    }

    async function FindFacilityName(evnt: any) {
        const searchText = evnt.target.value
        openPopover(evnt)
        facilityNameData.value = await LocationService.getFacilities({ name: searchText })
    }

    function openPopover(e: any) {
        event = e
        popoverOpen.value = true
    }

    function openPopoverForReferral(event: Event) {
        popoverProperties.value.event = event
        popoverProperties.value.popoverOpen = true
    }

    function selectedFaciltyName(name: any, obj: any) {
        faciltyName.value = name
        // drug_id.value = obj.drug_id
        // units.value = obj.units
    }

    function showOptions(event: Event) {
            popoverProperties.value.title = 'Referral Type'
            popoverProperties.value.keyboardClose = true
            popoverProperties.value.popoverData = referralType.value
            openPopoverForReferral(event)
    }

    function openDate(event: any) {
        popoverProperties.value.dateOpen = true
        popoverProperties.value.event = event
    }

    function saveTheDate(event: any) {
        basicInputFieldProperties[2].date = event.detail.value
        formatDate(basicInputFieldProperties[2].date)
    }

    function setSelection(selectedValue: any) {
        const name = selectedValue.name
        basicInputFieldProperties[1].selection = name
        popoverProperties.value.popoverOpen = false
    }

    function formatDate(date: any) {
        let theDate = new Date(date)
        let tempDate = new Date(theDate.getFullYear() + '-' + ('0' + (theDate.getMonth() + 1)).slice(-2) + '-' + ('0' + theDate.getDate()).slice(-2))
        let options: Intl.DateTimeFormatOptions = { day: '2-digit', weekday: 'long', month: 'short', year: 'numeric' }; let formattedDate = tempDate.toLocaleDateString('en-US', options)
        basicInputFieldProperties[2].date = formattedDate
    }

    function updateReason(event: any) {
        const reason = event.target.value
        basicInputFieldProperties[3].referralReason = reason
    }
    
</script>

<style scoped>
    .initTxt {
        text-align: center;
    }
    .spc_btwn {
        margin-top: 2%;
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
    ion-list.list-al {
        --background: #fff;
        -ion-item-background: #fff;
    }
</style>