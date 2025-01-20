<template>
    <ion-card>
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
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
    IonCard,
} from "@ionic/vue";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";

const FirstPreviousNotes = ref();
const RestOfPreviousNotes = ref();
const itemWasExpanded = ref(false);
const itemNotesWasExpanded = ref(false);
const showMoreNotesMsg = ref("Show more notes");

onMounted(async () => {
    const previousTreatment = new PreviousTreatment();
    const { previousClinicalNotes } = await previousTreatment.getPatientEncounters();
    FirstPreviousNotes.value = Object.entries(previousClinicalNotes)[0];
    const [, ...restEntries] = Object.entries(previousClinicalNotes);
    RestOfPreviousNotes.value = restEntries;
});

function accordionGroupChangeForNotes(ev: AccordionGroupCustomEvent) {
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

function removeOuterArray(arr: any) {
    return arr[1];
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
.qaws {
    margin-top: -27px;
}
</style>
