<template>
    <ion-list>
        <ion-label>Medical allergies</ion-label>
        <div class="space"></div>
        <ion-row>
            <ion-button class="medicalAlBtn">
                Regular Insulin
            </ion-button>
            <ion-button class="medicalAlBtn">
                Aspirin
            </ion-button>
            <ion-button class="medicalAlBtn">
                Paracetamol
            </ion-button>
            <ion-button class="medicalAlBtn">
                Quinine
            </ion-button>
            <ion-button class="medicalAlBtn">
                Folic Acid
            </ion-button>
        </ion-row>
        <div class="space"></div>
        <ion-label>Diagnoses</ion-label>
        <div class="space"></div>
        <ion-row>
            <ion-button color="secondary" class="medicalAlBtn">
                Covid 19
            </ion-button>
            <ion-button color="secondary" class="medicalAlBtn">
                TB
            </ion-button>
            <ion-button color="secondary" class="medicalAlBtn">
                Malaria
            </ion-button>
        </ion-row>

        <div class="space2" />
        <ion-label>Prescribed Medication</ion-label>
        <dynamic-list @clickt="toggleCheckbox" :_selectedMedicalDrugsList="previousDrugPrescriptions"
            :show_actions_buttons="false" />
        <div>
            <div class="space2" />
            <ion-button class="primary_btn" style="padding-left: 15px" @click="populateUnprescribedMedication(previousDrugPrescriptions)">Dispense</ion-button>
        </div>


    </ion-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { dispensationStore } from "../store/dispensation";
import BasicForm from "@/components/BasicForm.vue";
import DynamicList from "../components/DynamicList.vue";
import { tr } from "date-fns/locale";

import { PreviousTreatment } from "@/apps/NCD/services/treatment";

onMounted(async () => {
    const previousTreatment = new PreviousTreatment();
    const { previousDrugPrescriptions, previousClinicalNotes, previousDrugAllergies } = await previousTreatment.getPatientEncounters();
});
export default defineComponent({
    watch: {},
    name: "xxxComponent",
    computed: {
        ...mapState(dispensationStore, ["dispensedMedications"]),
    },
    methods: {
        toggleCheckbox(event: Event) {
            // const index = event.target.id;
            // const dispensedBool = event.detail.checked;
            // prescribedList[index].dispensed = dispensedBool;
        },
        populateUnprescribedMedication(prescribedListArray: any) {
            // for (let index = 0; index < prescribedListArray.length; index++) {
            //     const object = prescribedListArray[index];
            //     const checkedStatus = object.dispensed;
            //     if (!checkedStatus) {
            //         previousDrugPrescriptions.push(object.drugName)
            //     }                
            // }
            console.log(previousDrugPrescriptions)
        }
    }
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
import { icons } from "@/utils/svg";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
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
    height: 3rem;
}

#container a {
    text-decoration: none;
}

ion-item.medicalAl {
    --background: #fff;
    --border-radius: 5px;
}

ion-button.medicalAlBtn {
    --background: #fecdca;
    --color: #b42318;
    text-transform: none;
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
