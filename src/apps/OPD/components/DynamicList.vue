<template>
  <ion-row style="padding-top: 1rem;">
    <ion-col>
      <div style="display: flex; padding: 0.3em;">
        <ion-label
            style="width: 260px; color: #00190E; font-weight: 550; font: inter; line-height: 14px; line-height: 21px;">Drug
          Name</ion-label>
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
            style="width: 260px; color: #00190E; font-weight: 550; font: inter; line-height: 14px; line-height: 21px;">Quantity
          Dispensed</ion-label>
      </div>
    </ion-col>
  </ion-row>

  <ion-item v-for="(item, index) in dataArray" class="ionLbltp" :key="index" @mousemove="highlightItem(index)"
            @mouseout="undoHighlightItem(index)">
    <ion-row>
      <ion-col class="col-st1">
        <ion-checkbox v-if="withCheckboxs" :id="index" @ionChange="$emit('clickt', $event)" justify="start"
                      labelPlacement="end" :checked=true>
          <div style="display: flex; padding: 0.3em;">
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
          <div @click="$emit('click', $event)" style="display: flex; padding: 0.3em; ">
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
          <ion-label color="primary">{{ item.other.quantity }} dispensed</ion-label>
        </div>
        <div v-else-if="!showInputs && (item.other.quantity < 1)">
          <ion-label style="color: #b42318;">Not Dispensed. ({{ item.reason }})</ion-label>
        </div>

        <ion-item v-if="dispensationStore.getCheckedBool(index) && showInputs" class="input_item">
          <ion-label style="padding-right: 3px;">Quantity:</ion-label>
          <ion-input :id="index" placeholder="0" @ionInput="$emit('updateQuantity', $event)"></ion-input>
        </ion-item>
        <span v-if="dispensationStore.getValidation(index)">
                    <ion-label style="color: red;">Please fill in this section</ion-label>
                </span>
        <ion-item v-if="!(dispensationStore.getCheckedBool(index)) && showInputs" class="input_item"
                  style="width: 200px;">
                    <span style="display: flex; align-items: center;" id="chooseType"
                          @click="openPopover">
                        <ion-input :id="index" :value="dispensationStore.getReason(index)" @ionFocus="$emit('getInputID', $event)" placeholder="Reason why?"></ion-input>
                        <ion-icon v-if="!showPopoverOpenForFrequency" :icon="chevronDownOutline" />
                        <ion-icon v-if="showPopoverOpenForFrequency" :icon="chevronUpOutline" />
                    </span>
          <SelectionPopover
              :content="noDispensationReason"
              :title="title"
              :popoverOpen="popoverOpen"
              @closePopoover="popoverOpen = $event"
              :event="event"
              @setSelection="handleReasonSelection(index, $event)" />
        </ion-item>
        <ion-item v-if="item.reason === 'Wrong prescription' && showInputs" class="input_item">
          <ion-label style="padding-right: 3px;">Comments:</ion-label>
          <ion-input :id="'comment-' + index" placeholder="Provide comments..." v-model="comments.value[index]"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-item>
</template>


<<script setup lang="ts">
import { ref, watch } from "vue";
const popoverOpen = ref(false);
const showPopoverOpenForFrequency = ref(false);
const event = ref<Event | null>(null);
const comments = ref<Record<number, string>>({});
const dispensationStore = useDispensationStore();
const noDispensationReason = [
  { name: 'Out of stock', selected: false },
  { name: 'Wrong prescription', selected: false }
];
const title = "Select a reason";
const showInputs = ref(true);

// Function to handle reason selection
function handleReasonSelection(index: number, selectedReason: string) {
  dispensationStore.setReason(selectedReason, index);

  // Update comments based on the selected reason
  if (selectedReason === 'Wrong prescription') {
    comments.value[index] = dispensationStore.getDrugPrescriptions()[index]?.comment || '';
  } else {
    comments.value[index] = '';
  }
}
console.log(handleReasonSelection)

// Function to open the popover
function openPopover(e: Event) {
  event.value = e;
  popoverOpen.value = true;
}

// Watch for changes in comments and update the store
watch(comments, (newComments) => {
  Object.keys(newComments).forEach(index => {
    dispensationStore.setComment(Number(index), newComments[Number(index)]);
  });
}, { deep: true });
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
            noDispensationReason: [{name: 'Out of stock', selected: false}, {name: 'Wrong prescription', selected: false}],
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