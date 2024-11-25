<template>
    <div style="display: flex">
        <div class="left_col">
            <nav class="nav-menu">
                <ul>
                    <li 
                        v-for="item in menuItems" 
                        :key="item.id" 
                        :class="{ active: activeItem === item.id }" 
                        @click="setActiveItem(item.id)"
                    >
                        <ion-icon :icon="item.icon" size="large" class="menu-icon"></ion-icon>
                        <span>{{ item.label }}</span>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="right_col">
            <div>
                <Referral v-if="activeItem === 'referrals'" />
                <Dashboard v-if="activeItem === 'dashboard'" />
                <NCDAppointments v-if="activeItem === 'appointments'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonIcon, modalController, IonCheckbox } from "@ionic/vue";
import { defineComponent } from "vue";
import { gridOutline, peopleOutline, calendarOutline } from 'ionicons/icons';
import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { mapState } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import BasicCard from "@/components/BasicCard.vue";
import Referral from "@/apps/NCD/components/Dashboard/Referrals.vue";
import Dashboard from "@/apps/NCD/components/Dashboard/Dashboard.vue";
import NCDAppointments from "@/apps/NCD/components/NCDAppointments.vue";
import { modifyCheckboxInputField, getCheckboxSelectedValue, getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";

interface MenuItem {
    id: string;
    label: string;
    icon: string;
}

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonCheckbox,
        IonIcon,
        BasicForm,
        BasicCard,
        Referral,
        Dashboard,
        NCDAppointments,
    },
    data() {
        return {
            menuItems: [
                { 
                    id: "dashboard", 
                    label: "Dashboard",
                    icon: gridOutline
                },
                { 
                    id: "referrals", 
                    label: "Referrals",
                    icon: peopleOutline
                },
                { 
                    id: "appointments", 
                    label: "Appointments",
                    icon: calendarOutline
                },
            ] as MenuItem[],
            activeItem: "dashboard" as string,
        };
    },
    computed: {
        ...mapState(useEnrollementStore, ["substance"]),
    },
    watch: {
        substance: {
            handler() {
                // this.buildCards();
            },
            deep: true,
        },
    },
    
    mounted() {},
    methods: {
        setActiveItem(id: string): void {
            this.activeItem = id;
        },
    },
});
</script>

<style scoped>
.left_col {
    background-color: #fff;
    height: 100vh;
    border-right: 1px solid #e0e0e0;
    padding-top: 1rem;
    width: 15%;
}

.right_col {
    height: 100vh;
    padding-top: 1rem;
    width: 85%;
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