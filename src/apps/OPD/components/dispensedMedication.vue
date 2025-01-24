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
        <ion-label>Diagnoses</ion-label>
        <ion-row>
            <ion-item lines="none" class="medicalAl">
                <ion-row>
                    <div v-if="list.length > 0" class="diagnosis-list">
                        <div class="diagnosis-header">
                            <span class="header-name">Diagnosis name</span>
                            <span class="header-type">Diagnosis type</span>
                        </div>
                        <div v-for="(item, index) in list" :key="index" class="diagnosis-item">
                            <span class="item-name">{{ item.display[0] }}</span>
                            <span class="item-type">{{ item.display[1] }}</span>
                        </div>
                    </div>
                    <div v-else>No diagnoses were added.</div>
                </ion-row>
            </ion-item>
        </ion-row>

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
          <div>
            <div class="space3" />
            <ion-button
                class="faded-green"
                style="padding-left: 15px; border-radius: 1px;"
                @click="saveDispensations()">
              <ion-icon slot="start" :icon="addOutline"></ion-icon>
              Submit
            </ion-button>
          </div>
        </div>
        <div v-else>No medications were added for this patient.</div>

    </ion-list>
    <ion-list>
        <div v-if="dispensationStore.getDispensedMedications() && dispensationStore.getDispensedMedications().length > 0">
          <ion-label>Here is the dispensation summary</ion-label>
          <dynamic-list
                @click="editDispensations"
                :dataArray="dispensationStore.getDispensedMedications()"
                :withCheckboxs="false"
                :showInputs="false"
                :show_actions_buttons="false"
            />
        </div>
    </ion-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useDispensationStore } from "@/apps/OPD/stores/DispensationStore";
import { ObservationService } from "@/services/observation_service";
import { isEmpty } from "lodash";
import { useDemographicsStore } from "@/stores/DemographicStore";
import HisDate from "@/utils/Date";
import { useOPDDiagnosisStore } from "@/apps/OPD/stores/DiagnosisStore";
import { Service } from "@/services/service";
import { resetDemographics } from "@/services/reset_data";
import { useAllegyStore } from "@/apps/OPD/stores/AllergyStore";
import { IonSpinner } from "@ionic/vue";
import { addOutline, checkmarkCircle } from "ionicons/icons";



export default defineComponent({
    watch: {
        $route: {
            immediate: true,
            deep: true,
            handler() {
                // const allergyStore = useAllegyStore();
                // allergyStore.selectedMedicalAllergiesList = [];

                this.getPatientDiagnosis();
            },
        },
    },
    name: "xxxComponent",
    computed: {
        ...mapState(useDispensationStore, ["drugPrescriptions"]),
        ...mapState(useDemographicsStore, ["patient"]),
    },
    data() {
        return {
          addOutline,
            list: [] as any,
        };
    },
    async mounted() {
        await this.getPatientDiagnosis();
    },

    methods: {
        async getPatientDiagnosis() {
            this.list = [];
            const patientID = this.patient.patientID;
            const today = new Date(Service.getSessionDate()).toISOString().split("T")[0];
            console.log(today);
            const obs1 = await ObservationService.getAll(patientID, "Primary diagnosis");
            const obs2 = await ObservationService.getAll(patientID, "Secondary diagnosis");
            const obs3 = await ObservationService.getAll(patientID, "Attempted/ Differential diagnosis");

            const additionalDiagnoses = [];

            const filterByToday = (observations: any) => {
                return observations.filter((ob: any) => {
                    const obDate = new Date(ob.obs_datetime).toISOString().split("T")[0];
                    return obDate === today;
                });
            };

            const processDiagnoses = async (obs: any, type: any) => {
                const filteredObs = filterByToday(obs);
                return await Promise.all(
                    filteredObs.map(async (ob: any) => {
                        const name = await ObservationService.getConceptName(ob["value_coded"]);
                        return {
                            display: [name, type],
                        };
                    })
                );
            };

            if (!isEmpty(obs1)) {
                const primaryDiagnoses = await processDiagnoses(obs1, "Primary diagnosis");
                additionalDiagnoses.push(...primaryDiagnoses);
            }
            if (!isEmpty(obs2)) {
                const secondaryDiagnoses = await processDiagnoses(obs2, "Secondary diagnosis");
                additionalDiagnoses.push(...secondaryDiagnoses);
            }
            if (!isEmpty(obs3)) {
                const attemptedDiagnoses = await processDiagnoses(obs3, "Differential diagnosis");
                additionalDiagnoses.push(...attemptedDiagnoses);
            }
            this.list = additionalDiagnoses;
        },
      resetStore() {
        this.drugPrescriptions = [];
      },
        setListData(data: any) {
            this.list = [];
            data.forEach((item: any) => {
                this.list.push({
                    display: [item.name],
                });
            });
        },
    },
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
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import { DispensationService } from "@/apps/OPD/services/dispensation_service";
import DynamicList from "@/apps/OPD/components/DynamicList.vue";
const usedemographics_store = useDemographicsStore();
const demographics = computed(() => usedemographics_store.patient);
const dispensationStore = useDispensationStore();
const store2 = useAllegyStore();
const selectedAllergiesList2 = computed(() => store2.selectedMedicalAllergiesList);
const selectedReason = ref("");

watch(
    () => demographics.value,
    async (newPatient, oldPatient) => {
      if (newPatient && newPatient.patientID !== oldPatient.patientID) {
        dispensationStore.resetStore();

        const previousTreatment = new PreviousTreatment();
        const { previousDrugPrescriptions } = await previousTreatment.getPatientEncounters();

        if (previousDrugPrescriptions.length > 0) {
          dispensationStore.setDrugPrescriptions(previousDrugPrescriptions[0].previousPrescriptions);

          for (let index = 0; index < dispensationStore.getDrugPrescriptions().length; index++) {
            dispensationStore.initializeValidationsBoolean();
            dispensationStore.initializeReasonParameter();
            dispensationStore.initializeDispensedAmount();
            dispensationStore.updateCheckboxBool(true, index);
          }
        } else {
          dispensationStore.setDrugPrescriptions([]);
        }
      }
    },
    { immediate: true, deep: true }
);

function editDispensations() {
    dispensationStore.editDispensations();
}

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
    dispensationStore.saveDispensedMedications();
    dispensationStore.setDispensedMedicationsPayload();
    usedemographics_store;
    const dispensation_srvc = new DispensationService(demographics.value.patientID, Service.getUserID() as any);
    const dispensation_payload: any = dispensationStore.getDispensedMedicationsPayload();
    dispensation_srvc.saveDispensations(dispensation_payload.dispensations);
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
    font-size: 1rem;
    font-weight: bold;
}

.space {
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
    margin: 0.2rem;
    font-size: 0.9rem;
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
.diagnosis-list {
    display: flex;
    flex-direction: column;
    width: 90%;
}

.diagnosis-header {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 2px solid #ccc; /* Line below header */
}

.header-name,
.header-type {
    flex: 1; /* Equal space for both columns */
    text-align: left; /* Align text to the left */
}

.diagnosis-item {
    display: flex;
    justify-content: start;
    padding: 8px 0;
    border-bottom: 1px solid #eee; /* Light line between items */
}

.item-name {
    flex: 1; /* Let the name take 1 space */
}

.item-type {
    flex: 1; /* Let the type take 1 space */
    text-align: left; /* Align text to the right */
    color: #777; /* Slightly muted color for type */
}

ion-button {
  --ion-color-primary: transparent;
  --background: rgba(76, 175, 80, 0.5);
}
</style>
