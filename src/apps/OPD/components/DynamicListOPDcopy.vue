<template>
    <ion-row style="padding-top: 1rem;">
        <ion-col>
            <div style="display: flex; padding: 0.3em;">
                <ion-label
                    style="width: 500px; color: #00190E; font-weight: 550; font: inter; line-height: 14px; line-height: 21px;">Drug
                    Name</ion-label>
            </div>
        </ion-col>
        <ion-col>
            <div style="display: flex; padding: 0.3em;">
                <ion-label
                    style="width: 280px; color: #00190E; font-weight: 550; font: inter; line-height: 14px; line-height: 21px;">Duration</ion-label>
            </div>
        </ion-col>
        <ion-col>
            <div style="display: flex; padding: 0.3em;">
                <ion-label
                    style="color: #00190E; font-weight: 550; font: inter; line-height: 14px; line-height: 21px;">Dispensation</ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-item v-for="(item, index) in dataArray" class="ionLbltp" :key="index" @mousemove="highlightItem(index)"
        @mouseout="undoHighlightItem(index)">
        <ion-row>
            <ion-col>
                <ion-row style="display: flex; align-items: center; width: 800px;">
                    <ion-col>
                        <ion-checkbox v-if="withCheckboxs" :id="index" @ionChange="$emit('clickt', $event)"
                            justify="start" labelPlacement="end" :checked=true style="width: 500px;">
                            <div style="padding: 0.3em; ">
                                <ion-label :id="asignLblID(index)"
                                    style="color: #00190E; font-weight: 400; font: inter; line-height: 21px;">{{
        item.drugName }}</ion-label>
                                <ion-label style="color: #636363; font-weight: 400; font: inter; line-height: 21px;">
                                    {{ item.frequency }}
                                </ion-label>
                            </div>
                        </ion-checkbox>
                        <div v-if="!withCheckboxs">
                            <div style="padding: 0.3em; width: 500px;" @click="$emit('click', $event)">
                                <ion-label :id="asignLblID(index)"
                                    style="color: #00190E; font-weight: 400; font: inter; line-height: 21px;">{{
        item.drugName }}</ion-label>
                                <ion-label style="color: #636363; font-weight: 400; font: inter; line-height: 21px;">
                                    {{ item.frequency }}
                                </ion-label>
                            </div>
                        </div>
                    </ion-col>
                    <ion-col>
                        <div>
                            <ion-label style="color: #636363; font-weight: 400; font: inter; line-height: 21px;">
                                {{ " for" }} {{ item.duration }} days
                            </ion-label>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-col>
                <div v-if="!showInputs && (item.other.quantity > 0)">
                    <ion-label color="primary">{{ item.other.quantity }} dispensed</ion-label>
                </div>
                <div v-else-if="!showInputs && (item.other.quantity < 1)">
                    <ion-label style="color: #b42318;">Not Dispensed.</ion-label>
                    <ion-label style="color: #b42318;">({{ item.reason }})</ion-label>
                </div>

                <ion-item v-if="dispensationStore.getCheckedBool(index) && showInputs" class="input_item">
                    <ion-input :id="index" placeholder="Quantity" @ionInput="$emit('updateQuantity', $event)"></ion-input>
                </ion-item>
                <span v-if="dispensationStore.getValidation(index)">
                    <ion-label style="color: red;">Please fill in this section</ion-label>
                </span>
                <ion-item v-if="!(dispensationStore.getCheckedBool(index)) && showInputs" class="input_item"
                    style="width: 190px;">
                    <span style="display: flex; align-items: center;" id="chooseType"
                        @click="openPopover">
                        <ion-input :id="index" :value="dispensationStore.getReason(index)" @ionFocus="$emit('getInputID', $event)" placeholder="Reason why?"></ion-input>
                        <ion-icon v-if="!showPopoverOpenForFrequency" :icon="chevronDownOutline" />
                        <ion-icon v-if="showPopoverOpenForFrequency" :icon="chevronUpOutline" />
                    </span>
                    <SelectionPopover 
                    :content="noDispensationReason"
                    :title="title"
                    :popoverOpen="popoverOpen" @closePopoover="popoverOpen = $event" :event="event"
                    @setSelection="$emit('getSelectedReason', $event)" />
                </ion-item>
            </ion-col>
        </ion-row>
    </ion-item>

</template>

<script setup lang="ts">

import { ref } from "vue"

const popoverOpen = ref(false);
const frequency = ref("");
const showPopoverOpenForFrequency = ref(false);
const reasonsList = [{ label: "Out of stock", selected: false }, { label: "Wrong prescription", selected: false }]
const event = ref(Event);

function selectFrequency(index: any) {
    reasonsList.forEach((item) => {
        item.selected = false;
    });
    reasonsList[index].selected = !reasonsList[index].selected;
    frequency.value = reasonsList[index].label;
}
function openPopover(e: any) {
    event.value = e;
    popoverOpen.value = true;
}

</script>
<script lang="ts">
import SelectionPopover from "@/components/SelectionPopover.vue";
import { IonItem, IonCol, IonLabel } from '@ionic/vue'
import { defineComponent } from 'vue'
import { createModal, popoverConfirmation, alertConfirmation } from '../../../utils/Alerts'
import { icons } from '../../../utils/svg';
import { mapState } from "pinia";
import { useDispensationStore } from '@/apps/OPD/stores/DispensationStore'
import {
    checkmark,
    pulseOutline,
    addOutline,
    closeOutline,
    checkmarkOutline,
    filter,
    chevronDownOutline,
    chevronUpOutline,
    codeSlashOutline,
} from "ionicons/icons";

export default defineComponent({
    components: {
        IonItem,
        IonCol,
        IonLabel
    },
    computed: {
        ...mapState(useDispensationStore, ['drugPrescriptions']),
    },
    data() {
        return {
            iconsContent: icons,
            dataArray: [...this.$props.dataArray] as any,
            dispensationStore: useDispensationStore(),
            noDispensationReason: [{ name: 'Out of stock', selected: false }, { name: 'Wrong prescription', selected: false }],
            title: "Select a reason",
        }
    },
    props: {
        dataArray: {
            type: Array,
            default: []
        },
        show_actions_buttons: {
            type: Boolean,
            default: true
        },
        withCheckboxs: {
            type: Boolean,
            default: false
        },
        showInputs: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ""
        }
    },
    watch: {

    },
    methods: {
        highlightItem(item: any) {
            const el = document.getElementById(item + '_lbl')
            if (el) {
                el.style.color = '#006401'
            }
            this.highlightActionBtns(item)
        },
        undoHighlightItem(item: any) {
            const el = document.getElementById(item + '_lbl')
            if (el) {
                el.style.color = 'rgb(0,0,0)'
            }
            this.undohighlightActionBtns(item)
        },
        highlightActionBtns(item: any) {
            const elements = document.getElementsByClassName(item + '_spanlbl') as any
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'block'
            }
        },
        undohighlightActionBtns(item: any) {
            const elements = document.getElementsByClassName(item + '_spanlbl') as any
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none'
            }
        },
        asignLblID(num: any) {
            return num + '_lbl' as string;
        },
        asignSpanLblID(num: any) {
            return num + '_spanlbl' as string;
        },
        async removeItemAtIndex(index: any, e: Event) {
            const deleteConfirmed = await popoverConfirmation("Do you want to delete it?", e as any)
            if (deleteConfirmed) {
                this.$emit('remove-item', index)
            }
        },
        editItemAtIndex(index: any) {
            this.$emit('edit-item', index)
        }
    }
})
</script>
<style scoped>
.input_item {
    margin-top: 20px;
}

.selectionItem {
    width: 250px;
    height: 50px;
    margin-top: 5px;
}

.spacing {
    width: 100px;
}

.padding {
    padding: 0px 10px;
}

ion-item.ionLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
    cursor: pointer;
}

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
}

.action_buttons:hover {
    cursor: pointer;
}

.modify_buttons {
    padding-left: 20px;
}
</style>