<template>
    <ion-list>
        <ion-row>
            <ion-col>
                <DynamicDispositionList v-if="true" @update:removeItem="removeItem" @update:editItem="editItem" :displayData="dispositions"  />
            </ion-col>
        </ion-row>

        <ion-row v-if="showEmptyMsg">
            <span class="dash_box">{{ initialMsg }}</span>
        </ion-row>

        <ion-row>
            <ion-col>
                <div style="margin-top: 100px;" v-if="showAddItemButton">
                    <ion-row>
                        <VueMultiselect
                            v-model="selected_referral_type"
                            @update:model-value="selectedReferralType($event)"
                            :multiple="false"
                            :taggable="false"
                            :hide-selected="true"
                            :close-on-select="true"
                            openDirection="top"
                            tag-placeholder="find and select a referral type"
                            placeholder="find and a referral type"
                            selectLabel=""
                            label="name"
                            :searchable="true"
                            :disabled="false"
                            @search-change="($event)=>{}"
                            track-by="name"
                            :options="referralType"
                        />

                        <div>
                            <ion-label v-if="show_error_msg_for_ref_type" class="error-label">{{ 'please select a type' }}</ion-label>
                        </div>
                    </ion-row>
                </div>
            </ion-col>
        </ion-row>

        <AdmittedforShortStayOutcome
            v-if="show_admitted_options"
            @data-saved="dataSavedTrigFn"
        />

        <ReferredOutCome
            v-if="show_referred_options"
            @data-saved="dataSavedTrigFn"
            :selected_referral_data="selected_referral_type_data"
            :selected_other_referral_data="selected_referral_data"
        />

        <DischargedHome
            v-if="show_discharged_options"
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
import DynamicDispositionList from "@/components/DynamicDispositionList.vue"
import { useOutcomeStore } from "@/stores/OutcomeStore"
import deadOutcome from "@/apps/OPD/components/ConsultationPlan/DeadOutcome.vue"
import AdmittedforShortStayOutcome from "@/apps/OPD/components/ConsultationPlan/AdmittedforShortStayOutcome.vue"
import ReferredOutCome from '@/apps/OPD/components/ConsultationPlan/ReferredOutCome.vue'
import DischargedHome from "@/apps/OPD/components/ConsultationPlan/DischargedHome.vue";
import VueMultiselect from "vue-multiselect";

const initialMsg = ref("No outcome created yet");
const show_error_msg_for_ref_type = ref(false);
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
const show_discharged_options = ref(false)
const selected_referral_type = ref()
const selected_referral_type_data = ref(null)
const selected_referral_data = ref(null) as any

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
        name: "Discharged Home",
        selected: false,

    },
    {
        name: "Death",
        selected: false,
    }
] as any)

function listUpdated(data: any) {
    referralType.value.forEach((item: any) => {
        if (data.selected == true && (data.name == item.name || data.type == item.name)) {
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

const editItem = (data: any) => {    
    listUpdated(data.item)
    selected_referral_type_data.value = data.item.other.location_data
    selected_referral_data.value = {
        reason: data.item.reason,
        date: data.item.date,
        time: data.item.time
    }
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
  if (ref_type == referralType.value[2].name) {
    show_discharged_options.value = true

  }
  else {
    show_discharged_options.value = false
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
    show_discharged_options.value = false
    show_referred_options.value = false
    resetSelection()
}

const selectedReferralType = (data: any) => {
    referralType.value.forEach((item: any) => {
        item.selected = false 
    })
    selected_referral_type.value = data;
    selected_referral_type.value.selected = true;
    listUpdated(selected_referral_type.value)
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
