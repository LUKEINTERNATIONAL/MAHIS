<template>
    <ion-row style="padding-top: 1rem;">
        <ion-col>
            <div style="display: flex; padding: 0.3em;">
                <ion-label
                    style="width: 260px; color: #00190E; font-weight: 550; font: inter; line-height: 14px; line-height: 21px;">Drug Name</ion-label>
            </div>
        </ion-col>
        <ion-col>
            <div style="display: flex; padding: 0.3em;">
                <ion-label
                    style="width: 260px; color: #00190E; font-weight: 550; font: inter; line-height: 14px; line-height: 21px;">Frequency</ion-label>
            </div>
        </ion-col>
        <ion-col>
            <div style="display: flex; padding: 0.3em;">
                <ion-label
                    style="width: 260px; color: #00190E; font-weight: 550; font: inter; line-height: 14px; line-height: 21px;">Quantity Dispensed</ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-item v-for="(item, index) in dataArray" class="ionLbltp" :key="index" @mousemove="highlightItem(index)"
        @mouseout="undoHighlightItem(index)">
        <ion-row>
            <ion-col class="col-st1">
                <ion-checkbox v-if="withCheckboxs" :id="index" @ionChange="$emit('clickt', $event)" justify="start"
                    labelPlacement="end" :checked=true>
                    <div style="display: flex; padding: 0.3em; ">
                        <ion-label :id="asignLblID(index)"
                            style="width: 260px; color: #00190E; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{
                    item.drugName }}</ion-label>
                        <div class="padding"></div>
                        <ion-label
                            style="color: #636363; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">
                            {{ item.frequency }} /{{ " for" }} {{ item.duration }} days
                        </ion-label>
                    </div>
                </ion-checkbox>
                <div v-if="!withCheckboxs">
                    <div style="display: flex; padding: 0.3em; ">
                        <ion-label :id="asignLblID(index)"
                            style="width: 260px; color: #00190E; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{
                    item.drugName }}</ion-label>
                        <ion-label class="padding"></ion-label>
                        <ion-label
                            style="color: #636363; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">
                            {{ item.frequency }} /{{ " for" }} {{ item.duration }} days
                        </ion-label>
                    </div>
                </div>
            </ion-col>
            <ion-col>
                <div v-if="!showInputs && (item.other.quantity > 0)">
                    <ion-label>{{ item.other.quantity }}</ion-label>
                </div>
                <div v-else-if="!showInputs && (item.other.quantity < 1)">
                    <ion-label style="color: red;">Not Dispensed</ion-label>
                </div>

                <ion-item v-if="dispensationStore.getCheckedBool(index) && showInputs" class="input_item">
                    <ion-label style="padding-right: 3px;">Quantity:</ion-label>
                    <ion-input :id="index" placeholder="0" @ionInput="$emit('updateQuantity', $event)"></ion-input>
                </ion-item>
                <ion-item v-if="!(dispensationStore.getCheckedBool(index)) && showInputs" class="input_item"
                    style="width: 200px;">
                    <span style="display: flex; align-items: center;" id="chooseType"
                        @click="popoverOpenForFrequencyFn2">
                        <ion-input placeholder="Reasons why?" v-model="frequency"></ion-input>
                        <ion-icon v-if="!showPopoverOpenForFrequency" :icon="chevronDownOutline" />
                        <ion-icon v-if="showPopoverOpenForFrequency" :icon="chevronUpOutline" />
                    </span>

                    <ion-popover class="popover-al" :show-backdrop="false" trigger="chooseType" trigger-action="click"
                        @didDismiss="showPopoverOpenForFrequency = false">
                        <ion-content color="light" class="ion-padding content-al">
                            <ion-label>Choose the reason:</ion-label>
                            <ion-list class="list-al">
                                <div class="item-al" v-for="(item, index) in reasonsList" :key="index">
                                    <ion-label @click="selectFrequency(index)"
                                        style="display: flex; justify-content: space-between">
                                        {{ item.label }}
                                        <ion-icon v-if="item.selected" class="icon-al"
                                            :icon="checkmarkOutline"></ion-icon>
                                    </ion-label>
                                </div>
                            </ion-list>
                        </ion-content>
                    </ion-popover>
                </ion-item>

            </ion-col>
        </ion-row>
    </ion-item>

</template>

<script setup lang="ts">

import { ref } from "vue"

const popoverOpen = ref(false);
const prescPopoverOpen = ref(false);
const frequency = ref("");
const showPopoverOpenForFrequency = ref(false);
const reasonsList = [{ label: "Out of stock", selected: false }, { label: "Wrong prescription", selected: false }]

function selectFrequency(index: any) {
    reasonsList.forEach((item) => {
        item.selected = false;
    });
    reasonsList[index].selected = !reasonsList[index].selected;
    frequency.value = reasonsList[index].label;
}
function openPopover(e: any) {
    popoverOpen.value = true;
}

function openPrescPopover(e: any) {
    // const prescEvent = e
    prescPopoverOpen.value = true;
}
function popoverOpenForFrequencyFn2() {
    showPopoverOpenForFrequency.value = true;
}
</script>
<script lang="ts">
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
    created() {
        // this.$emit('onFooterInstance', this)
    },
    components: {
        // IonContent,
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
            dispensationStore: useDispensationStore()
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
    height: 50px;
    margin-top: 5px;
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

.col-st1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 165rem;

}
</style>