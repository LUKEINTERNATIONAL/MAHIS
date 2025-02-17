<template>
    <ion-searchbar @ionInput="handleInput" placeholder="Search client  clinical No." class="searchField"></ion-searchbar>
    <ion-popover
        :is-open="popoverOpen"
        :event="event"
        @didDismiss="popoverOpen = false"
        :keyboard-close="false"
        :show-backdrop="false"
        :dismiss-on-select="true"
    >
        <ion-content class="search_card">
            <ion-row class="search_header">
                <ion-col>MNH no.</ion-col>
                <ion-col>Fullname</ion-col>
                <ion-col>Birthdate</ion-col>
                <ion-col style="max-width: 70px">Gestation Age</ion-col>
                <ion-col style="max-width: 30px"></ion-col>
            </ion-row>
            <ion-row class="search_result" v-for="(item, index) in patients" :key="index" @click="openNewPage('patientProfile', item)">
                <ion-col>{{ patientIdentifier(item) }} </ion-col>
                <ion-col>{{ item.person.names[0].given_name + " " + item.person.names[0].family_name }}</ion-col>
                <ion-col>{{ item.person.birthdate }}</ion-col>
                <ion-col style="max-width: 70px">{{ item.person.gender }}</ion-col>
                <ion-col style="max-width: 30px"><ion-icon :icon="checkmark" class="selectedPatient"></ion-icon> </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="4">
                    <DynButton :icon="add" :name="'Add Patient'" :fill="'clear'" @click="openCheckPaitentNationalIDModal" />
                </ion-col>
            </ion-row>
        </ion-content>
    </ion-popover>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonSearchbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonPopover,
    popoverController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { PatientService } from "@/services/patient_service";
import { checkmark, add } from "ionicons/icons";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useVitalsStore } from "@/stores/VitalsStore";
import DynButton from "@/components/DynamicButton.vue";
import { createModal } from "@/utils/Alerts";
import CheckPatientNationalID from "@/components/CheckPatientNationalID.vue";
import { resetPatientData } from "@/services/reset_data";
import { useWorkerStore } from "@/stores/workerStore";

export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonSearchbar,
        IonPage,
        IonTitle,
        IonToolbar,
        IonIcon,
        IonPopover,
        DynButton,
    },
    setup() {
        return { checkmark, add };
    },
    data() {
        return {
            popoverOpen: false,
            event: null,
            patients: "" as any,
            showPopover: true,
        };
    },
    methods: {
        async handleInput(ev: any) {
            const searchText = ev.target.value;
            this.patients = {};
            this.popoverOpen = false;
            if (searchText.length > 2) {
                this.openPopover(ev);
                this.searchDemographicPayload(searchText);
            }
        },
        searchDemographicPayload(searchText: any) {
            const splittedArray = searchText.split(" ");
            const payload = {
                given_name: splittedArray[0],
                family_name: splittedArray.length >= 2 ? splittedArray[1] : "",
                gender: splittedArray.length >= 3 ? splittedArray[2] : "",
                page: "1",
                per_page: "7",
            };

            this.searchPatient(payload);
        },
        async searchPatient(payload: any) {
            this.patients = await PatientService.search(payload);
        },
        patientIdentifier(item: any) {
            // return item
            const ids = item.patient_identifiers.length - 1;
            if (ids >= 0) return item.patient_identifiers[ids].identifier;
            else return "";
        },
        async openNewPage(url: any, item: any) {
            await resetPatientData();
            await useDemographicsStore().setPatientRecord(item);
            this.$router.push(url);
        },

        openPopover(e: any) {
            this.event = e;
            this.popoverOpen = true;
        },
        async openCheckPaitentNationalIDModal() {
            await resetPatientData();
            createModal(CheckPatientNationalID, { class: "nationalIDModal" });
        },
        onDismiss() {
            console.log("Popover dismissed");
        },
    },
});
</script>

<style scoped>
.searchField {
    --border-radius: 4px;
    --box-shadow: inset 0 -3em 3em #fff, 0 0 0 2px white, 0.3em 0.3em 1em rgba(44, 44, 44, 0.6);
    width: 42vw;
    padding: 10px;
    text-align: left;
}
.second_bar_list {
    list-style: none;
    justify-content: space-between;
    display: flex;
    font-size: 16px;
    margin: unset;
    padding: unset;
}
.search_result {
    text-align: left;
    padding: 5px;
    color: #b3b3b3;
}
li {
    margin-right: 40px;
}
.search_card {
    width: 40vw;
    --padding: 5px;
    --background: #fff;
    left: 10px;
}
.search_header {
    border-bottom: 1px solid;
    border-bottom-style: dashed;
    padding-top: 10px;
    text-align: left;
    padding: 5px;
    color: #b3b3b3;
}
.searchbar-input.sc-ion-searchbar-md {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
}
ion-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search_result .selectedPatient:hover {
    color: var(--ion-color-primary) !important;
    font-size: 18px;
}
.search_result .selectedPatient {
    --ion-hover: #fff;
    font-size: 18px;
    color: var(--ion-hover);
}
.search_result:hover ion-icon {
    --ion-hover: var(--ion-color-primary);
    background-color: #ebebeb;
    border-radius: 5px;
    color: var(--ion-hover) !important;
}
.search_result:hover {
    --ion-hover: var(--ion-color-primary);
    background-color: #ebebeb;
    border-radius: 5px;
    color: var(--ion-hover) !important;
}
ion-popover {
    --width: 41.5vw;
    top: 7px;
}
</style>
<style>
ion-popover {
    --background: #fff;
    --backdrop-opacity: 0.6;
    --box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.6);
    --color: white;
    --width: 300px;
    --padding: 10px;
}
</style>
