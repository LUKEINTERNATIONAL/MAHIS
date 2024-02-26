<template>

    <DynamicDispositionList v-if="true" @update:removeItem="" @update:editItem=""
        :displayData="dispositions" />

    <ion-row v-if="showEmptyMsg">
       <span class="dash_box">{{ initialMsg }}</span> 
    </ion-row>

    <div v-if="showAddReferralInfo">    
    <ion-row>
        <ion-col>
            <ion-item class="input_item">
                <ion-input  v-model="faciltyName"  @ionInput="FindFacilityName" fill="outline"></ion-input>
                <!--  -->
                <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
            </ion-item>
            <div>
                <ion-label v-if="show_error_msg_for_ref_facility_name" class="error-label">{{ refFacilityNameErrMsg }}</ion-label>
            </div>
            
            <ion-popover 
                :is-open="popoverOpen" 
                :event="event" 
                @didDismiss="popoverOpen = false" 
                :keyboard-close="false" 
                :show-backdrop="false" 
                :dismiss-on-select="true"
                style="top: 10px;left: -25px;"
                v-if="!show_error_msg_for_ref_facility_name"
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
                :icon="basicInputFieldProperties[1].icon" :inputValue="refType"
                @clicked:inputValue="showOptions" />

            <SelectionPopover :content="popoverProperties.popoverData" :keyboardClose="popoverProperties.keyboardClose"
                :title="popoverProperties.title" :popoverOpen="popoverProperties.popoverOpen"
                :event="popoverProperties.event" @closePopoover="value => popoverProperties.popoverOpen = value"
                @setSelection="setSelection" />

            <div>
                <ion-label v-if="show_error_msg_for_ref_type" class="error-label">{{ refTypErrMsg }}</ion-label>
            </div>
        </ion-col>

        <ion-col>
            <BasicInputField :placeholder="basicInputFieldProperties[2].placeholder"
                :inputValue="refDate" :icon="basicInputFieldProperties[2].icon"
                @update:inputValue="refDate" @clicked:inputValue="openDate" />

            <ion-popover :show-backdrop="false" :keep-contents-mounted="true" :is-open="popoverProperties.dateOpen"
                :event="popoverProperties.event" @didDismiss="popoverProperties.dateOpen = false">
                <ion-datetime @ionChange="saveTheDate" id="datetime" presentation="date"
                    :show-default-buttons="true"></ion-datetime>
            </ion-popover>
            <div>
                <ion-label v-if="show_error_msg_for_ref_date" class="error-label">{{ refDateErrMsg }}</ion-label>
            </div>
        </ion-col>

        <ion-col>

        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col size="9">
            <BasicInputField :placeholder="basicInputFieldProperties[3].placeholder"
            :inputValue="refReason" @update:inputValue="updateReason" />
            <div>
                <ion-label v-if="show_error_msg_for_ref_reason" class="error-label">{{ refRsnErrMsg }}</ion-label>
            </div>

        </ion-col>
        
        <ion-col>
            <dynamic-button  v-if="addItemButton" :name="saveBtn" :fill="btnFill" :icon="addOutline" @clicked:btn="saveReferralInfo"></dynamic-button>
        </ion-col>
        
    </ion-row>
    </div>

    <ion-row class="spc_btwn" v-if="showAddItemButton">
        <dynamic-button  v-if="addItemButton" :name="btnName1" :fill="btnFill" :icon="addOutline" @clicked:btn="addReferral"></dynamic-button>
    </ion-row>


</template>

<script setup lang="ts">
    import { IonContent, IonHeader, IonCol, IonItem, IonList, IonButton, IonMenu, IonTitle, IonToolbar, IonInput, IonDatetime, IonLabel, IonTextarea, IonAccordion, IonAccordionGroup, AccordionGroupCustomEvent } from '@ionic/vue'
    import { checkmark,pulseOutline,addOutline,closeOutline, checkmarkOutline, filter, chevronDownOutline, chevronUpOutline, codeSlashOutline } from 'ionicons/icons'
    import { ref, watch, computed, onMounted, onUpdated } from 'vue'
    import { LocationService } from "@/services/location_service"
    import DynamicButton from "@/components/DynamicButton.vue"
    import SelectionPopover from "@/components/SelectionPopover.vue"
    import { icons } from '@/utils/svg'
    import BasicInputField from "@/components/BasicInputField.vue"
    import DynamicDispositionList from "@/components/DynamicDispositionList.vue"
    import { useDispositionStore } from "@/stores/OutcomeStore"
    import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"

    const iconsContent = icons
    const initialMsg = ref("No referrals created yet")

    const show_error_msg_for_ref_type = ref(false)
    const refTypErrMsg = ref("please enter a number")

    const show_error_msg_for_ref_facility_name = ref(false)
    const refFacilityNameErrMsg = ref("please enter a valid facility name")
    const show_error_msg_for_ref_date = ref(false)
    const refDateErrMsg = ref("please select a date")
    const show_error_msg_for_ref_reason = ref(false)
    const refRsnErrMsg = ref("please enter a reason")

    const btnName1 = ref("Add new referral")
    const btnFill = 'clear'
    let event: null = null
    const saveBtn = ref("Save")
    const addItemButton = ref(true)
    const showAddItemButton = ref(true)
    const refType = ref('')
    const refDate = ref('')
    const refReason = ref('')
    const showEmptyMsg = ref(true)
    const faciltyName = ref('')
    const editIndex = ref(NaN)
    const popoverOpen = ref(false)
    const showAddReferralInfo = ref(false)
    const store = useDispositionStore()
    const dispositions = computed(() => store.dispositions)
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

    onMounted(async () => {
        checkForDispositions()
    })

    watch(
        () => dispositions,
        async (newvalue) => {
            checkForDispositions()
        }
    )

    watch(
        () => refType.value,
        async (newValue) => {
            validateReftype()
        }
    )

    watch(
        () => refDate.value,
        async (newValue) => {
            validateRefDate()
        }
    )

    watch(
        () => refReason.value,
        async (newValue) => {
            validateRefReasons()
        }
    )

    function checkForDispositions() {
        if (dispositions.value.length > 0) {
            showEmptyMsg.value = false
        } else if (dispositions.value.length == 0) {
            showEmptyMsg.value = true
        }
    }

    function addReferral() {
        showEmptyMsg.value = false
        showAddItemButton.value = false
        showAddReferralInfo.value = true
    }

    async function saveReferralInfo() {
        const are_fieldsValid = await validateInputs()
        if (!are_fieldsValid) {
            toastWarning("Please enter correct data values",4000)
            return
        }


        showEmptyMsg.value = !false
        showAddItemButton.value = !false
        showAddReferralInfo.value = !true

        const referralData = {
            name: faciltyName.value,
            type: refType.value,
            date: refDate.value,
            reason: refReason.value,
        }

        store.addDispositionData(referralData, editIndex.value)
        clearInputs()
    }

    function clearInputs() {
        faciltyName.value = ''
        refType.value = ''
        refDate.value = ''
        refReason.value = ''
    }

    async function validateReftype() {
        if (refType.value === '') {
            show_error_msg_for_ref_type.value = true
        } else {
            show_error_msg_for_ref_type.value = false
        }
        return show_error_msg_for_ref_type.value
    }

    async function validateRefDate() {
        if (refDate.value === '') {
            show_error_msg_for_ref_date.value = true
        } else {
            show_error_msg_for_ref_date.value = false
        }
        return show_error_msg_for_ref_date.value
    }

    async function validateRefReasons() {
        if (refReason.value === '') {
            show_error_msg_for_ref_reason.value = true
        } else {
            show_error_msg_for_ref_reason.value = false
        }
        return show_error_msg_for_ref_reason.value
    }

    async function validateInputs() {
        const isReftypeValid = await validateReftype()
        const isRefDateValid = await validateRefDate()
        const isRefReasonValid = await validateRefReasons()

        if (!isReftypeValid && !isRefDateValid && !isRefReasonValid) {
            return true
        } else {
            return false
        }
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
        refDate.value = event.detail.value
        formatDate(refDate.value)
    }

    function setSelection(selectedValue: any) {
        const name = selectedValue.name
        refType.value = name
        popoverProperties.value.popoverOpen = false
    }

    function formatDate(date: any) {
        let theDate = new Date(date)
        let tempDate = new Date(theDate.getFullYear() + '-' + ('0' + (theDate.getMonth() + 1)).slice(-2) + '-' + ('0' + theDate.getDate()).slice(-2))
        let options: Intl.DateTimeFormatOptions = { day: '2-digit', weekday: 'long', month: 'short', year: 'numeric' }; let formattedDate = tempDate.toLocaleDateString('en-US', options)
        refDate.value = formattedDate
    }

    function updateReason(event: any) {
        const reason = event.target.value
        refReason.value = reason
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
    .saveContainer {
        display: flex;
        align-items: flex-end;
    }
    .action_buttons {
        margin-top: 5px;
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
</style>