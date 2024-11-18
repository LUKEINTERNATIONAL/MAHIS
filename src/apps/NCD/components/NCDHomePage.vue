<template>
    <div style="display: flex">
        <div class="left_col">
            <nav class="nav-menu">
                <ul>
                    <li v-for="item in menuItems" :key="item.id" :class="{ active: activeItem === item.id }" @click="setActiveItem(item.id)">
                        {{ item.label }}
                    </li>
                </ul>
            </nav>
        </div>
        <div class="right_col">
            <div>
                <Referral v-if="activeItem === 'referrals'" />
                <Dashboard v-if="activeItem === 'dashboard'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController, IonCheckbox } from "@ionic/vue";
import { defineComponent } from "vue";
import { icons } from "@/utils/svg";

import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { mapState } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import BasicCard from "@/components/BasicCard.vue";
import Referral from "@/apps/NCD/components/Dashboard/Referrals.vue";
import Dashboard from "@/apps/NCD/components/Dashboard/Dashboard.vue";
import { modifyCheckboxInputField, getCheckboxSelectedValue, getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";
interface MenuItem {
    id: string;
    label: string;
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
        BasicForm,
        BasicCard,
        Referral,
        Dashboard,
    },
    data() {
        return {
            menuItems: [
                { id: "dashboard", label: "Dashboard" },
                { id: "referrals", label: "Referrals" },
                { id: "appointments", label: "Appointments" },
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
    width: 250px;
}
.right_col {
    height: 100vh;
    padding-top: 1rem;
    width: 80%;
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
</style>
