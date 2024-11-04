<template>
    <ion-card>
        <ion-card-header>
            <ion-label class="tpStndCls">Non-pharmalogical therapy and other notes</ion-label>
        </ion-card-header>
        <ion-card-content>
            <div>
                <NonPharmacologicalIntervention/>
                
                <ion-item class="input_item" style="min-height: 120px; margin-top: 14px">
                    <ion-label> <ion-icon slot="start" :icon="iconsContent.editPen" aria-hidden="true"></ion-icon> </ion-label>
                    <IonTextarea
                        @ionInput="validateNotes"
                        v-model="nonPharmalogicalTherapyAndOtherNotes"
                        style="min-height: 120px"
                        class="inputTpln"
                        :auto-grow="true"
                        fill="outline"
                    />
                </ion-item>
            </div>
            
            <div style="margin-top: 14px; margin-left: 10px">
                <ion-accordion-group ref="accordionGroup" class="previousView">
                    <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                        <ion-item slot="header" color="light">
                            <ion-label class="previousLabel">Previous visits notes</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <div class="ionLbltp" v-for="(item, index) in FirstPreviousNotes" :key="index">
                                <div v-if="index == 1">
                                    <div v-for="(item1, index1) in item" :key="index1">
                                        <div>
                                            <ion-label class="previousLabelDate">{{ item1.date }}</ion-label>
                                        </div>
                                        <div class="previousSecDrgs">
                                            <ion-list>
                                                <ion-label class="notes_p">{{ item1.notes }} </ion-label>
                                            </ion-list>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ion-accordion-group @ionChange="accordionGroupChangeForNotes">
                                <ion-accordion value="third" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                                    <ion-item slot="header" color="light">
                                        <ion-label class="" color="primary">{{ showMoreNotesMsg }}</ion-label>
                                    </ion-item>
                                    <div class="ion-padding" slot="content">
                                        <div class="ionLbltp" v-for="(item, index) in RestOfPreviousNotes" :key="index">
                                            <div v-for="(item1, index1) in removeOuterArray(item)" :key="index1">
                                                <div>
                                                    <ion-label class="previousLabelDate">{{ item1.date }}</ion-label>
                                                </div>
                                                <div class="previousSecDrgs">
                                                    <ion-list>
                                                        <ion-label class="notes_p">{{ item1.notes }} </ion-label>
                                                    </ion-list>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ion-accordion>
                            </ion-accordion-group>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
            </div>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>

<script setup lang="ts">
import {
    IonItem,
    IonList,
    IonLabel,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonIcon
} from "@ionic/vue";


import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import { icons } from "@/utils/svg";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import NonPharmacologicalIntervention from "@/apps/OPD/components/ConsultationPlan/NonPharmacologicalIntervention.vue"

const store = useTreatmentPlanStore();
const values = ["first", "second", "third"];
const iconsContent = icons;
const showMoreNotesMsg = ref("Show more notes");
const FirstPreviousNotes = ref();
const RestOfPreviousNotes = ref();
const itemNotesWasExpanded = ref(false);
const itemWasExpanded = ref(false);
const nonPharmalogicalTherapyAndOtherNotes = computed(() => store.nonPharmalogicalTherapyAndOtherNotes);

onMounted(async () => {
    const previousTreatment = new PreviousTreatment();
    const { previousDrugPrescriptions, previousClinicalNotes, previousDrugAllergies } = await previousTreatment.getPatientEncounters();
    FirstPreviousNotes.value = Object.entries(previousClinicalNotes)[0];
    const [, ...restEntries] = Object.entries(previousClinicalNotes);
    RestOfPreviousNotes.value = restEntries;

});

function removeOuterArray(arr: any) {
    return arr[1];
}

function validateNotes(ev: any) {
    let value = ev.target.value
    refSetNonPharmalogicalTherapyAndOtherNotes(value)
}

function accordionGroupChangeForNotes(ev: AccordionGroupCustomEvent) {
    const collapsedItems = values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;
    if (selectedValue !== undefined) {
        if (selectedValue == "third") {
            showMoreNotesMsg.value = "Show less notes";
            itemNotesWasExpanded.value = !itemWasExpanded.value;
        }
    } else {
        showMoreNotesMsg.value = "Show more notes";
        itemNotesWasExpanded.value = !itemWasExpanded.value;
    }
}


function refSetNonPharmalogicalTherapyAndOtherNotes(value: string) {
    const treatmentPlanStore = useTreatmentPlanStore();
    treatmentPlanStore.setNonPharmalogicalTherapyAndOtherNotes(value as string);
}
</script>

<style scoped>
.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}
.previousLabel {
    font-weight: 600;
    color: #000;
}
.previousSecDrgs {
    margin: 2%;
}
.notes_p {
    margin: 4%;
}
</style>