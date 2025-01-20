<template>
    <ion-content :fullscreen="true">
        <div id="containertwo">
            <div class="centered-content OPDDueCardWrapper">
                <ion-card class="section" style="width: 80%">
                    <ion-card-header>
                        <ion-card-title class="cardTitle">Today's patients list</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <div class="OPDDueCardContent">
                            <div
                                class="OPDDueCard"
                                @click="openAllModal('All patients today', 'View profile', '/patientProfile')"
                                :style="dueCardStyle('success')"
                            >
                                <ion-icon :icon="people" class="dueCardIcon"></ion-icon>
                                <div class="OPDStatsValue">{{ totalPatientsToday }}</div>
                                <div class="OPDStatsText">Total patients today</div>
                            </div>
                            <div
                                class="OPDDueCard"
                                @click="openPatientsListModal('Patients waiting for vitals', 'VITALS', 'Vitals', '/OPDVitals')"
                                :style="dueCardStyle('success')"
                                v-if="canViewVitals"
                            >
                                <ion-icon :icon="thermometer" class="dueCardIcon"></ion-icon>
                                <div class="OPDStatsValue">{{ patientsWaitingForVitals.length }}</div>
                                <div class="OPDStatsText">Waiting for vitals</div>
                            </div>

                            <div
                                class="OPDDueCard"
                                @click="
                                    openPatientsListModal('Patients waiting for consultation', 'CONSULTATION', 'Consultation', '/OPDConsultationPlan')
                                "
                                :style="dueCardStyle('success')"
                                v-if="canViewConsultation"
                            >
                                <ion-icon :icon="clipboard" class="dueCardIcon"></ion-icon>
                                <div class="OPDStatsValue">{{ patientsWaitingForConsultation.length }}</div>
                                <div class="OPDStatsText">Waiting for consultation</div>
                            </div>

                            <div
                                class="OPDDueCard"
                                @click="openPatientsListModal('Patients waiting for lab', 'LAB', 'Lab', '/OPDConsultationPlan')"
                                :style="dueCardStyle('success')"
                                v-if="canViewLab"
                            >
                                <ion-icon :icon="clipboard" class="dueCardIcon"></ion-icon>
                                <div class="OPDStatsValue">{{ patientsWaitingForLab.length }}</div>
                                <div class="OPDStatsText">Waiting for lab</div>
                            </div>
                            <div
                                class="OPDDueCard"
                                @click="openPatientsListModal('Patients waiting for dispensation', 'DISPENSATION', 'Dispensation', '/dispensation')"
                                :style="dueCardStyle('success')"
                                v-if="canViewDispensation"
                            >
                                <ion-icon :icon="medkit" class="dueCardIcon"></ion-icon>
                                <div class="OPDStatsValue">{{ patientsWaitingForDispensation.length }}</div>
                                <div class="OPDStatsText">Waiting for dispensation</div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </ion-content>
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
import { modifyCheckboxInputField, getCheckboxSelectedValue, getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";
import { PatientOpdList } from "@/services/patient_opd_list";
import DashboardMixin from "@/views/Mixin/DashboardMixin.vue";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import { getUserLocation } from "@/services/userService";
import OPDWaitingListModal from "@/components/DashboardModal/OPDWaitingListModal.vue";
import OPDAllPatientsModal from "@/components/DashboardModal/OPDAllPatientsModal.vue";
import { UserService } from "@/services/user_service";
export default defineComponent({
    name: "OPD Dashboard",
    mixins: [DashboardMixin],
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
    },
    data() {
        return {
            totalPatientsToday: 0,
            canViewVitals: false,
            canViewConsultation: false,
            canViewLab: false,
            canViewDispensation: false,
            userRoles: [] as any,
        };
    },
    computed: {
        ...mapState(usePatientList, [
            "patientsWaitingForVitals",
            "patientsWaitingForConsultation",
            "patientsWaitingForLab",
            "patientsWaitingForDispensation",
        ]),
    },
    watch: {
        $route: {
            async handler(data) {
                await this.fetchUserData();
            },
            deep: true,
        },
    },

    async mounted() {
        const location = await getUserLocation();
        const locationId = location ? location.code : null;
        try {
            const visitsToday = await PatientOpdList.getAllPatientsVisitsToday();
            const filteredVisits = visitsToday.filter((visit: any) => visit.location_id === locationId);
            this.totalPatientsToday = filteredVisits.length;
            await usePatientList().refresh(locationId);
        } catch (error) {}
        await this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            const user = await UserService.getCurrentUser();
            if (user) {
                this.userRoles = user.roles.map((role) => role.role);
                this.updateCardVisibility();
            }
        },
        updateCardVisibility() {
            this.canViewVitals = this.isUserRole("Clinician") || this.isUserRole("Nurse") || this.isUserRole("Superuser");
            this.canViewConsultation = this.isUserRole("Clinician") || this.isUserRole("Superuser");
            this.canViewLab = this.isUserRole("Lab");
            this.canViewDispensation = this.isUserRole("Clinician") || this.isUserRole("Pharmacist") || this.isUserRole("Superuser");
        },

        isUserRole(role: any) {
            return this.userRoles.includes(role);
        },
        openAllModal(name: any, buttonLink: string, buttonTitle: string) {
            const dataToPass = { title: name, buttonLink, buttonTitle };
            createModal(OPDAllPatientsModal, { class: "fullScreenModal" }, true, dataToPass);
        },
        dueCardStyle(type: "success" | "warning" | "info" | "danger") {
            const colors = {
                success: "rgb(158, 207, 136)",
                warning: "rgb(239, 221, 121)",
                info: "rgb(144, 202, 249)",
                danger: "rgb(241, 154, 154)",
            };

            return {
                border: `1px solid ${colors[type]}`,
                padding: "20px",
                margin: "10px",
            };
        },
        openPatientsListModal(name: any, list: "VITALS" | "CONSULTATION" | "LAB" | "DISPENSATION", buttonTitle: string, buttonLink: string) {
            const dataToPass = { title: name, list, buttonTitle, buttonLink };
            createModal(OPDWaitingListModal, { class: "fullScreenModal" }, true, dataToPass);
        },
    },
});
</script>

<style scoped>
.OPDDueCardWrapper {
    padding: 20px;
}

.OPDDueCardContent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.OPDDueCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
    text-align: center;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-basis: calc(100% / 2 - 40px);
    max-width: 300px;
}

@media (min-width: 0px) {
    .OPDDueCard {
        flex-basis: calc(100% / 2 - 40px);
    }

    #containertwo {
        top: 50% !important;
    }
}

@media (min-width: 1024px) {
    .OPDDueCard {
        flex-basis: calc(100% / 4 - 40px);
    }

    #containertwo {
        top: 30%;
    }
}

.dueCardIcon {
    font-size: 30px;
    margin-bottom: 10px;
}

.OPDStatsValue {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.OPDStatsText {
    font-size: 1rem;
    color: #555;
}
#containertwo {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    transform: translateY(-50%);
}
.centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
</style>
