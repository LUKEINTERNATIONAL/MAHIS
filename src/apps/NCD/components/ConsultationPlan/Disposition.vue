<template>
    <DashBox v-if="displayDashBox" :status="no_item" :content="content"></DashBox>
    <div class="validation" v-if="displayValidationMessage">
        <div style="display: flex; justify-content:center"><span style="padding-top: 13px; color: #B42318;">{{
            validationMessage }}</span></div>
    </div>

    <div class="container" v-if="displayInputFields">
        <div class="containerSections">
            <ion-row class="">
                <!-- THE THREE SELECTION OPTIONS START-->
                <ion-col>
                    <BasicInputField :placeholder="basicInputFieldProperties[0].placeholder"
                        :icon="basicInputFieldProperties[0].icon" :inputValue="basicInputFieldProperties[0].searchText"
                        @update:inputValue="startSearching" />
                </ion-col>

                <ion-col>
                    <BasicInputField :placeholder="basicInputFieldProperties[1].placeholder"
                        :icon="basicInputFieldProperties[1].icon" :inputValue="basicInputFieldProperties[1].selection"
                        @clicked:inputValue="showOptions" />
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

                <!-- POPUP CODE START-->
                <SelectionPopover :content="popoverProperties.popoverData" :keyboardClose="popoverProperties.keyboardClose"
                    :title="popoverProperties.title" :popoverOpen="popoverProperties.popoverOpen"
                    :event="popoverProperties.event" @closePopoover="value => popoverProperties.popoverOpen = value"
                    @setSelection="setSelection" />
                <!-- THE THREE SELECTION OPTIONS && POPUP END -->

            </ion-row>
            <!-- REFERRAL REASON INPUT FIELD -->
            <div>
                <BasicInputField :placeholder="basicInputFieldProperties[3].placeholder"
                    :inputValue="basicInputFieldProperties[3].referralReason" @update:inputValue="updateReason" />
            </div>
        </div>

        <!-- SAVE BUTTON. -->
        <div class="saveContainer">
            <ion-col class="action_buttons">
                <span style="cursor: pointer;" @click="saveData">+ Save</span>
            </ion-col>
        </div>

        <!-- CONTAINER DIV END -->
    </div>

    <ion-row>
        <ion-col class="action_buttons">
            <span style="cursor: pointer;" @click="addReferralFunc">{{ !displayInputFields ? '+ Add new referral' : 'Cancel'
            }}</span>
        </ion-col>
    </ion-row>

    <div class="dottedLine"></div>

    <DynamicDispositionList v-if="addReferrals" @update:removeItem="removeItem" @update:editItem="editItem"
        :displayData="dispositions" />
</template>

<script lang="ts">
import DashBox from "@/components/DashBox.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { icons } from '@/utils/svg';
import SelectionPopover from "@/components/SelectionPopover.vue";
import { LocationService } from "@/services/location_service";
import { IonDatetime, IonDatetimeButton } from '@ionic/vue';
import DynamicDispositionList from "@/components/DynamicDispositionList.vue";
import { mapState } from 'pinia'
import { useDispositionStore } from "@/stores/DispositionStore"

export default {
    components: {
        DashBox,
        BasicInputField,
        SelectionPopover,
        IonDatetime,
        IonDatetimeButton,
        DynamicDispositionList
    },
    computed: {
        ...mapState(useDispositionStore, ["dispositions"]),
    },
    mounted() {
        this.cleanInputs();
        if (this.dispositions.length > 0) {
            this.displayDashBox = false;
            this.addReferrals = true;
        }
    },
    data() {
        return {
            no_item: true,
            content: "There are no referrals to display. Add a referral below.",

            displayDashBox: true,
            displayInputFields: false,
            addReferrals: false,
            displayValidationMessage: false,
            editIndex: NaN,
            validationMessage: '' as string,
            dispositionStore: useDispositionStore(),


            // POPOVER PROPERTIES
            popoverProperties: {
                title: 'List of facilities',
                popoverOpen: false,
                dateOpen: false,
                event: {} as Event,
                keyboardClose: false,
                popoverData: {} as Object,
            },

            // INPUT FIELD PROPERTIES
            basicInputFieldProperties: [
                {
                    name: 'search',
                    placeholder: 'Facility Search',
                    icon: icons.search,
                    searchText: '' as any,
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
            ],

            // REFERRALS
            refralType: [
                {
                    name: 'Internal',
                    selected: false,
                },
                {
                    name: 'External',
                    selected: false,
                },
            ],
        };
    },
    methods: {
        openPopover(event: Event) {
            this.popoverProperties.event = event;
            this.popoverProperties.popoverOpen = true;
        },
        async startSearching(event: any) {
            this.popoverProperties.keyboardClose = false;
            this.basicInputFieldProperties[0].searchText = event.target.value;
            this.popoverProperties.title = 'Facility Search';
            this.openPopover(event);
            this.popoverProperties.popoverData = await LocationService.getFacilities({ name: this.basicInputFieldProperties[0].searchText })
        },
        showOptions(event: Event) {
            this.popoverProperties.title = 'Referral Type';
            this.popoverProperties.keyboardClose = true;
            this.popoverProperties.popoverData = this.refralType;
            this.openPopover(event);
        },
        setSelection(selectedValue: any) {
            const name = selectedValue.name
            if (name !== 'Internal' && name !== 'External') {
                this.basicInputFieldProperties[0].searchText = name;
                this.popoverProperties.popoverOpen = false;
            } else {
                this.basicInputFieldProperties[1].selection = name;
                this.popoverProperties.popoverOpen = false;
            }
        },
        saveTheDate(event: any) {
            this.basicInputFieldProperties[2].date = event.detail.value;
            this.formatDate(this.basicInputFieldProperties[2].date);
        },
        openDate(event: any) {
            this.popoverProperties.dateOpen = true;
            this.popoverProperties.event = event;
        },
        formatDate(date: any) {
            let theDate = new Date(date);
            let tempDate = new Date(theDate.getFullYear() + '-' + ('0' + (theDate.getMonth() + 1)).slice(-2) + '-' + ('0' + theDate.getDate()).slice(-2));
            let options: Intl.DateTimeFormatOptions = { day: '2-digit', weekday: 'long', month: 'short', year: 'numeric' }; let formattedDate = tempDate.toLocaleDateString('en-US', options);
            this.basicInputFieldProperties[2].date = formattedDate;
        },
        updateReason(event: any) {
            const reason = event.target.value;
            this.basicInputFieldProperties[3].referralReason = reason;
        },
        saveData() {
            const referralData = {
                name: this.basicInputFieldProperties[0].searchText,
                type: this.basicInputFieldProperties[1].selection,
                date: this.basicInputFieldProperties[2].date,
                reason: this.basicInputFieldProperties[3].referralReason,
            };

            const inputsValid = this.validateInputs();
            if (!inputsValid) {
                return
            }
            this.displayValidationMessage = false;

            this.dispositionStore.addDispositionData(referralData, this.editIndex);
            this.displayInputFields = false;
            this.addReferrals = true;

            this.editIndex = NaN;
            this.cleanInputs();
        },
        cleanInputs() {
            this.basicInputFieldProperties[0].searchText = '';
            this.basicInputFieldProperties[1].selection = '';
            this.basicInputFieldProperties[2].date = '';
            this.basicInputFieldProperties[3].referralReason = '';
        },
        addReferralFunc() {
            if (this.displayInputFields) {
                this.displayInputFields = false;
                this.displayValidationMessage = false;
            } else {
                this.displayInputFields = true;
                this.displayValidationMessage = false;
            }
        },
        removeItem(index: number) {
            this.dispositions.splice(index, 1);
        },
        editItem(index: any) {
            this.editIndex = parseInt(index);

            this.basicInputFieldProperties[0].searchText = this.dispositions[index].first;
            this.basicInputFieldProperties[1].selection = this.dispositions[index].second;
            this.basicInputFieldProperties[2].date = this.dispositions[index].third;
            this.basicInputFieldProperties[3].referralReason = this.dispositions[index].fourth;

            this.displayInputFields = true;
        },
        validateInputs() {
            if (this.basicInputFieldProperties[0].searchText === '' || this.basicInputFieldProperties[1].selection === '' || this.basicInputFieldProperties[2].date === '' || this.basicInputFieldProperties[3].referralReason === '') {
                this.validationMessage = 'Please make sure you have filled in all the fields below.';
                this.displayValidationMessage = true;
                return false;
            } else {
                return true;
            }
        }
    },
};
</script>

<style scoped>
.validation {
    border: 2px solid #FDA19B;
    background-color: #FECDCA;
    border-radius: 5px;
    height: 3rem;
    margin-bottom: 5px;
}

.container {
    display: flex;
}

.saveContainer {
    display: flex;
    align-items: flex-end;
}

.action_buttons {
    margin-top: 10px;
}

.dottedLine {
    border-bottom: dotted 1px;
    margin-top: 10px;
}
</style>