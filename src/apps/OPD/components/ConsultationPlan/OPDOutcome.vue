<template>
    <ion-list>
        <ion-row>
            <ion-col>
                <DynamicDispositionList v-if="true" @update:removeItem="removeItem" @update:editItem="editItem" :displayData="dispositions" />
            </ion-col>
        </ion-row>

        <ion-row v-if="showEmptyMsg">
            <span class="dash_box">{{ initialMsg }}</span>
        </ion-row>

        <!-- <ion-row class="spc_btwn" v-if="showAddItemButton">
            <dynamic-button v-if="addItemButton" :name="btnName1" :fill="btnFill" :icon="addOutline" @clicked:btn="addReferral"></dynamic-button>
        </ion-row> -->

        <div v-if="showAddItemButton">
            <ion-row>
                
                <ion-col>
                    <ListPicker
                        :multiSelection="list_picker_prperties[0].multi_Selection"
                        :show_label="list_picker_prperties[0].show_list_label"
                        :uniqueId="list_picker_prperties[0].unqueId"
                        :name_of_list="list_picker_prperties[0].name_of_list"
                        :choose_place_holder="list_picker_prperties[0].placeHolder"
                        :items_-list="list_picker_prperties[0].items"
                        :use_internal_filter="list_picker_prperties[0].use_internal_filter"
                        :disabled="list_picker_prperties[0].disabled.value"
                        @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
                        @item-list-filtered="list_picker_prperties[0].listFilteredFN"
                    />
                    <div>
                        <ion-label v-if="show_error_msg_for_ref_type" class="error-label">{{ refTypErrMsg }}</ion-label>
                    </div>
                </ion-col>  
            </ion-row>
        </div>

        <AdmittedforShortStayOutcomef
            v-if="show_admitted_options"
            @data-saved="dataSavedTrigFn"
        />

        <ReferredOutCome 
            v-if="show_referred_options"
            @data-saved="dataSavedTrigFn"
        />

        <deadOutcome
            v-if="show_dead_options"
            @data-saved="dataSavedTrigFn"
        />
    </ion-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "xxxComponent",
});
</script>

<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonButton,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonLabel,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
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
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import DynamicButton from "@/components/DynamicButton.vue"
import { icons } from "@/utils/svg"
import DynamicDispositionList from "@/components/DynamicDispositionList.vue"
import { useOutcomeStore } from "@/stores/OutcomeStore"
import deadOutcome from "../ConsultationPlan/DeadOutcome.vue"
import ListPicker from "@/components/ListPicker.vue"
import AdmittedforShortStayOutcomef from "../ConsultationPlan/AdmittedforShortStayOutcome.vue"
import ReferredOutCome from '../ConsultationPlan/ReferredOutCome.vue'

const initialMsg = ref("No outcome created yet");
const show_error_msg_for_ref_type = ref(false);
const refTypErrMsg = ref("please select a type");
const btnName1 = ref("Add new outcome");
const btnFill = "clear";
let event: null = null;
const addItemButton = ref(true);
const showAddItemButton = ref(true);
const refType = ref("");
const showEmptyMsg = ref(true);;
const showAddReferralInfo = ref(false);
const store = useOutcomeStore();
const dispositions = computed(() => store.dispositions);
const EditEvnt = ref(false);
const show_dead_options = ref(false)
const show_admitted_options = ref(false)
const show_referred_options = ref(false)

const editItem = ref()
const editFormData = ref({ type: "", name: "", reason: "", date: "" });
const isEditing = ref(false);
const editingItemIndex = ref<number | null>(null);

const referralType = ref([
    {
        name: "Admitted for short stay",
        selected: false,
    },
    {
        name: "Referred out",
        selected: false,
    },
    {
        name: "Discharged Home"
    },
    {
        name: "Death",
        selected: false,
    }
] as any)

const list_picker_prperties = [
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: 'qwerty2' as any,
        name_of_list: 'Add new outcome' as any,
        placeHolder: 'Choose one' as any,
        items: referralType.value,
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        use_internal_filter: true as any,
        disabled: ref(false) as any,
    }
]

function listUpdated1(data: any) {
    referralType.value = data
    referralType.value.forEach((item: any) => {
        if (item.selected == true) {
            refType.value = item.name
        }
    })
}

onMounted(async () => {
    checkForDispositions();
})

watch(
    () => refType.value,
    async (newvalue) => {
        if (EditEvnt.value == true) {
            EditEvnt.value = false;
        } else {
            checkRefType()
        }
    }
)

watch(
    () => dispositions.value.length,
    async (newvalue) => {
        checkForDispositions()
    }
)

function resetSelection() {
    referralType.value.forEach((item: any) =>{
        item.selected = false
    })
    refType.value = ''
}


function checkForDispositions() {
    if (dispositions.value.length > 0) {
        showEmptyMsg.value = false;
    } else if (dispositions.value.length == 0 && showAddReferralInfo.value == false) {
        showEmptyMsg.value = true;
    }
}


function removeItem(index: number) {
    dispositions.value.splice(index, 1);
}

async function checkRefType(clear_inputs: boolean = true) {
    const tempRefType = refType.value;

    
    refType.value = tempRefType;
    const ref_type = refType.value;

    if (ref_type == referralType.value[0].name) {
        show_admitted_options.value = true
    } 
    else {
        show_admitted_options.value = false
    }

    if (ref_type == referralType.value[1].name) {
        show_referred_options.value = true
    } 
    else {
        show_referred_options.value = false
    }

    if (ref_type == referralType.value[3].name) {
        show_dead_options.value = true
    } 
    else {
        show_dead_options.value = false
    }
}

function dataSavedTrigFn() {
    show_dead_options.value = false
    show_admitted_options.value = false
    show_referred_options.value = false
    resetSelection()
}
function triggerEditItem(index: number) {
  const item = dispositions.value[index];
  editFormData.value = { ...item };
  editingItemIndex.value = index;
  isEditing.value = true;
}

function cancelEditItem() {
  isEditing.value = false;
  editingItemIndex.value = null;
}

function saveEditItem() {
  if (editingItemIndex.value !== null) {
    dispositions.value[editingItemIndex.value] = { ...editFormData.value };
    isEditing.value = false;
    editingItemIndex.value = null;
  }
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
        background-color: #ebebeb;
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
        background: #fecdca;
        color: #b42318;
        text-transform: none;
        padding: 6%;
        border-radius: 10px;
        margin-top: 7px;
        display: flex;
        text-align: center;
    }
</style>
