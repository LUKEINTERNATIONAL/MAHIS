<template>
    <ion-card class="second_bar" style="display: flex">
        <div style="width: 97%; overflow: scroll">
            <ul class="second_bar_list">
                <li>
                    Fullname:
                    <b
                        >{{ patient?.personInformation?.given_name }} {{ patient?.personInformation?.middle_name }}
                        {{ patient?.personInformation?.family_name }}</b
                    >
                </li>
                <li>
                    NCDNumber: <b>{{ patient.NcdID }}</b>
                </li>
                <li>
                    MRN: <b>{{ patient.ID }}</b>
                </li>
                <li>
                    Birthday: <b>{{ formatBirthdate() }}</b>
                </li>
                <li>
                    Gender: <b>{{ patient?.personInformation?.gender }}</b>
                </li>
                <li>
                    Address: <b>{{ formatCurrentAddress(patient) }}</b>
                </li>
            </ul>
        </div>
        <div style="margin-top: 15px; cursor: pointer" @click="emit('openPopover', $event)">
            <ion-icon :icon="ellipsisVerticalSharp"></ion-icon>
        </div>
    </ion-card>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonIcon } from "@ionic/vue";
import { storeToRefs } from "pinia";
import { useDemographicsStore } from "@/stores/DemographicStore";
import HisDate from "@/utils/Date";
import { ellipsisVerticalSharp } from "ionicons/icons";
import { useRouter } from "vue-router";

// Define emits
const emit = defineEmits<{
    (e: "openPopover", event: any): void;
}>();

const router = useRouter();
const demographicsStore = useDemographicsStore();
const { patient } = storeToRefs(demographicsStore);

const navigationMenu = (url: any) => {
    menuController.close();
    router.push(url);
};

const covertGender = (gender: any) => {
    return ["Male", "M"].includes(gender) ? "Male" : ["Female", "F"].includes(gender) ? "Female" : "";
};

const formatBirthdate = () => {
    return HisDate.getBirthdateAge(patient.value?.personInformation?.birthdate);
};

const formatCurrentAddress = (data: any) => {
    const addressComponents = [
        data?.personInformation?.current_district,
        data?.personInformation?.current_traditional_authority,
        data?.personInformation?.current_village,
    ];
    return addressComponents.filter(Boolean).join(",");
};
</script>

<style scoped>
.second_bar {
    background-color: rgb(255, 255, 255);
    margin: 0;
    border-radius: unset;
    margin-bottom: 20px;
    width: 100%;
    z-index: 1000;
}

.second_bar_list {
    list-style: none;
    justify-content: space-between;
    display: flex;
    font-size: 16px;
    padding: 18px;
    min-width: fit-content;
    white-space: nowrap;
    gap: 20px;
}
</style>
