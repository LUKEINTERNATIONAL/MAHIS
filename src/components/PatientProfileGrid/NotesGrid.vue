<template>
    <ion-card>
        <div style="margin-top: 14px;">

        <ion-item slot="header" color="light">
            <ion-label class="previousLabel">Previous visits notes</ion-label>
            <ion-icon :icon="document" slot="start" class="ion-margin-end diagnosis-icon"></ion-icon>
        </ion-item>
        <div>
            <div>
                <div class="ion-padding" slot="content">
                    <div class="ionLbltp" v-for="(item, index) in RestOfPreviousNotes" :key="index">
                        <div v-for="(item1, index1) in removeOuterArray(item)" :key="index1">
                            <div>
                                <div style="display: flex; align-items: center;">
                                    <ion-icon :icon="calendarOutline" class="ion-margin-end"></ion-icon>
                                    <h4>{{ item1.date }}</h4>
                                </div>
                            </div>
                            <div class="previousSecDrgs">
                                <ion-list>
                                    <ion-label class="notes_p">{{ item1.notes }} </ion-label>
                                </ion-list>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    IonCard,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import { calendarOutline, document } from 'ionicons/icons';

const RestOfPreviousNotes = ref();

onMounted(async () => {
    const previousTreatment = new PreviousTreatment();
    const { previousClinicalNotes } = await previousTreatment.getPatientEncounters();
    const [...restEntries] = Object.entries(previousClinicalNotes);
    RestOfPreviousNotes.value = restEntries;
});

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
    font-size: 19px;
}
.qaws {
    margin-top: -27px;
}
.diagnosis-icon {
    font-size: 1.4rem;
    color: var(--ion-color-primary);
}
</style>
