<template>
    <div :style="screenWidth > 940 ? 'display: flex' : 'display: block'">
        <div class="left_col" v-if="screenWidth > 940">
            <nav class="nav-menu">
                <ul>
                    <li v-for="item in menuItems" :key="item.id" :class="{ active: activeItem === item.id }" @click="setActiveItem(item.id)">
                        <ion-icon :icon="item.icon" style="font-size: 20px" class="menu-icon"></ion-icon>
                        <span class="ellipsis">{{ item.label }}</span>
                    </li>
                </ul>
            </nav>
        </div>

        <div v-if="screenWidth <= 940" style="padding-left: 20px; padding-right: 20px">
            <ion-segment :value="activeItem" style="margin-top: 5px; justify-content: left">
                <ion-segment-button
                    :value="item.id"
                    v-for="item in menuItems"
                    :key="item.id"
                    :class="{ active: activeItem === item.id }"
                    @click="setActiveItem(item.id)"
                >
                    <ion-icon :icon="item.icon" style="font-size: 20px" class="menu-icon"></ion-icon>
                    <span>{{ item.label }}</span>
                </ion-segment-button>
            </ion-segment>
        </div>
        <div class="right_col" :style="screenWidth > 940 ? 'width: 85%' : 'width: 100%'">
            <div>
                <Referral v-if="activeItem === 'referrals'" />
                <Dashboard v-if="activeItem === 'dashboard'" />
                <NCDAppointments v-if="activeItem === 'appointments'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonIcon, modalController, IonCheckbox } from "@ionic/vue";
import { gridOutline, peopleOutline, calendarOutline } from "ionicons/icons";
import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { storeToRefs } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import BasicCard from "@/components/BasicCard.vue";
import Referral from "@/apps/NCD/components/Dashboard/Referrals.vue";
import Dashboard from "@/apps/NCD/components/Dashboard/Dashboard.vue";
import NCDAppointments from "@/apps/NCD/components/NCDAppointments.vue";
import { useWindowSize } from "@/composables/screenSize";
import { modifyCheckboxInputField, getCheckboxSelectedValue, getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";

interface MenuItem {
    id: string;
    label: string;
    icon: string;
}

const { screenWidth } = useWindowSize();
const menuItems = ref<MenuItem[]>([
    {
        id: "dashboard",
        label: "Dashboard",
        icon: gridOutline,
    },
    {
        id: "referrals",
        label: "Referrals",
        icon: peopleOutline,
    },
    {
        id: "appointments",
        label: "Appointments",
        icon: calendarOutline,
    },
]);

const activeItem = ref<string>("dashboard");

// Get store state using storeToRefs for reactivity
const enrollmentStore = useEnrollementStore();
const { substance } = storeToRefs(enrollmentStore);

// Watch for changes in substance
watch(
    () => substance.value,
    () => {
        // Implementation of what was previously in buildCards
    },
    { deep: true }
);

// Methods
const setActiveItem = (id: string): void => {
    activeItem.value = id;
};
</script>

<style scoped>
ion-segment-button {
    margin-right: 3px;
    background: #fff;
    font-size: 12px;
    text-transform: unset;
}
.left_col {
    background-color: #fff;
    height: 100vh;
    border-right: 1px solid #e0e0e0;
    padding-top: 1rem;
    width: 15%;
}

.right_col {
    height: 82vh;
    padding-top: 1rem;
    overflow-y: scroll;
}

.nav-menu {
    height: 100vh;
    padding: 20px 0;
}

.nav-menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.nav-menu li {
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
}

.nav-menu li.active {
    border-left: 0.25rem solid var(--ion-color-primary);
    background-color: #e0e0e0;
    outline: none;
}

.nav-menu li:not(.active) {
    color: #333;
}

.nav-menu li:hover:not(.active) {
    background-color: #f4f4f4;
}

.menu-icon {
    font-size: 1.2rem;
    min-width: 24px;
}
</style>
