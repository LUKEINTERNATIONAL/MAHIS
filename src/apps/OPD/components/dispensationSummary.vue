<template>
    <ion-list>
        <ion-label>Here is the dispensation summary</ion-label>
        <div
            v-if="dispensationStore.getDispensedMedications() && dispensationStore.getDispensedMedications().length > 0">
            <dynamic-list @click="editDispensations" :dataArray="dispensationStore.getDispensedMedications()" :withCheckboxs="false" :showInputs="false"
                :show_actions_buttons="false" />
        </div>
        <div v-else>Please complete dispensing of prescribed medications first. Then the summary will appear here.</div>
    </ion-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import DynamicList from "./DynamicListOPDcopy.vue";
import { useDispensationStore } from '@/apps/OPD/stores/DispensationStore'

export default defineComponent({
    watch: {},
    name: "xxxComponent",
    computed: {
        ...mapState(useDispensationStore, ['drugPrescriptions']),
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
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { PreviousTreatment } from "@/apps/NCD/services/treatment"

const dispensationStore = useDispensationStore()

function editDispensations() {
    dispensationStore.editDispensations()
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