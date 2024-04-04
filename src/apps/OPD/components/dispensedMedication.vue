<template>
    <ion-list>
        <ion-label>Allergies (Medication, Healthcare items, Environment and Food)</ion-label>
        <ion-row>
            <ion-item lines="none" class="medicalAl">
                <ion-row>
                    <div v-for="(item, index) in selectedAllergiesList2" :key="index">
                        <ion-button v-if="item.selected" class="medicalAlBtn">
                            {{ item.name }}
                        </ion-button>
                    </div>
                </ion-row>
            </ion-item>
        </ion-row>

        <ion-label>Current Diagnoses</ion-label>
        <div v-for="(item, index) in list" :key="index">
            <ion-button color="secondary" class="medicalAlBtn">
                {{ item.display[0] }}
            </ion-button>
        </div>

        <div class="space" />
        <ion-label>Prescribed Medications To Be Dispensed</ion-label>
        <div v-if="dispensationStore.getDrugPrescriptions() && dispensationStore.getDrugPrescriptions().length > 0">
            <dynamic-list
                @clickt="toggleCheckbox"
                :dataArray="dispensationStore.drugPrescriptions"
                :withCheckboxs="true"
                :showInputs="true"
                :show_actions_buttons="false"
                @updateQuantity="sendQuantityToStore"
                @getInputID="updateReason"
                @getSelectedReason="setSelectedReason"
            />
        </div>
        <div v-else>Loading, Please Wait. If this takes more than 2 seconds then something went wrong...</div>
        <div>
            <div class="space3" />
            <ion-button class="primary_btn" style="padding-left: 15px" @click="saveDispensations()">Dispense</ion-button>
        </div>
    </ion-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import DynamicList from "../components/DynamicList.vue";
import { useDispensationStore } from '@/apps/OPD/stores/DispensationStore'
import { ObservationService } from "@/services/observation_service";
import { isEmpty } from "lodash";
import { useDemographicsStore } from "@/stores/DemographicStore";
import HisDate from "@/utils/Date";


export default defineComponent({
    watch: {},
    name: "xxxComponent",
    computed: {
        ...mapState(useDispensationStore, ['drugPrescriptions']),
        ...mapState(useDemographicsStore, ["demographics"])
    },
    data() {
        return {
            list: [] as any,
        };
    },
    async mounted() {
        const obs = await ObservationService.getAll(this.demographics.patient_id, 'Primary diagnosis')
        const diagnosis = !isEmpty(obs) ? Promise.all(obs.map(async (ob: any) => {
            return {
                'name': await ObservationService.getConceptName(ob['value_coded']),
                'obs_date': ob.obs_datetime
            }
        }
        )) : []
        this.setListData(await diagnosis)
    },
    methods: {
        setListData(data: any) {
            this.list = []
            data.forEach((item: any) => {

                this.list.push({
                    'display': [
                        item.name,
                    ]
                })

            })

        }
    }

});
</script>
<script setup lang="ts">
import { useAllegyStore } from "@/apps/OPD/stores/AllergyStore";
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
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { PreviousTreatment } from "@/apps/NCD/services/treatment"
import { DispensationService } from "@/apps/OPD/services/dispensation_service"
import { Service } from "@/services/service"
const usedemographics_store = useDemographicsStore()
const demographics = computed(() => usedemographics_store.demographics)
const dispensationStore = useDispensationStore()
const store2 = useAllegyStore();
const selectedAllergiesList2 = computed(() => store2.selectedMedicalAllergiesList);
const selectedReason = ref("");

onMounted(async () => {
    const previousTreatment = new PreviousTreatment();
    const { previousDrugPrescriptions } = await previousTreatment.getPatientEncounters();

    dispensationStore.setDrugPrescriptions(previousDrugPrescriptions[0].previousPrescriptions);
    for (let index = 0; index < dispensationStore.getDrugPrescriptions().length; index++) {
        dispensationStore.initializeValidationsBoolean();
        dispensationStore.initializeReasonParameter();
        dispensationStore.initializeDispensedAmount();
        dispensationStore.updateCheckboxBool(true, index);
    }
});

function setSelectedReason(event: any) {
    selectedReason.value = event.name;
}
function updateReason(event: any) {
    if (selectedReason.value == "") {
        return;
    }
    dispensationStore.setReason(selectedReason.value, event.target.id);
    selectedReason.value = "";
    dispensationStore.validateInputs();
}
function sendQuantityToStore(event: any) {
    const index = event.target.id;
    const quantity = event.detail.value;

    dispensationStore.addQuantity(quantity, index);
    dispensationStore.validateInputs();
}
function toggleCheckbox(event: any) {
    const index = event.target.id;
    const CheckboxBoolean = event.detail.checked;

    dispensationStore.updateCheckboxBool(CheckboxBoolean, index);
}
function saveDispensations() {
    dispensationStore.isSaveInitiated(true);
    if (dispensationStore.validateInputs()) {
        return;
    }
    dispensationStore.saveDispensedMedications()
    dispensationStore.setDispensedMedicationsPayload()
    usedemographics_store
    const dispensation_srvc = new DispensationService(demographics.value.patient_id, Service.getUserID() as any)
    const dispensation_payload: any = dispensationStore.getDispensedMedicationsPayload()
    dispensation_srvc.saveDispensations(dispensation_payload.dispensations)
    dispensationStore.toggleStepperData()
}
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

ion-label {
    font-size: 1.2rem;
    font-weight: bold;
}

.space {
    height: 1rem;
}

.space2 {
    height: 2.5rem;
}

.space3 {
    height: 2rem;
}

#container a {
    text-decoration: none;
}

ion-item.medicalAl {
    --background: #fff;
    --border-radius: 5px;
    width: 100%;
    padding: 1rem 0px;
}

ion-button.medicalAlBtn {
    --background: #fecdca;
    --color: #b42318;
    text-transform: none;
    margin: 1rem;
    font-size: 1rem;
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

ion-button.addMedicalTpBtn {
    --background: #ddeedd;
    --color: #006401;
    text-transform: none;
    font-weight: 600;
    font-size: 16px;
}

ion-button.medicalAlAddBtn {
    font-size: large;
}

ion-icon.icon-al {
    /* margin-left: 40%; */
    font-size: x-large;
    margin-bottom: -5px;
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

ion-content.content-al {
    --background: #fff;
}

ion-list.list-al {
    --background: #fff;
    -ion-item-background: #fff;
}

.checkLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
}

.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
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

.spcls {
    display: flex;
    align-items: center;
}

.previousView {
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
}

.previousLabel {
    font-weight: 600;
    color: #000;
}

.previousLabelDate {
    font-weight: 600;
    color: #000;
    margin: 2%;
}

.previousSecDrgs {
    margin: 2%;
}

.notes_p {
    margin: 4%;
}
</style>
