<template>
    <ion-page>
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content :fullscreen="true" v-if="programID() != 33 && programID() != 14 && programID() != 32 && programID() != 12 && programID() != 34 && programID() != 35">
            <div id="container">
                <strong>Search your patient profile</strong>
                <p>
                    Use searchbar below to find your patient <br />
                    profile and start the triage
                </p>
                <div class="centered-content">
                    <ToolbarSearch />
                </div>
            </div>
        </ion-content>

        <ImmunizationDashboard v-if="programID() == 33" />
        <OPDDashboard v-if="programID() == 14" />
        <NCDDashboard v-if="programID() == 32" />
        <ANCDashboard v-if="programID() == 12" />
        <LabourDashboard v-if="programID() == 34" />
        <PNCDashboard v-if="programID() == 35" />
        <Programs :programBtn="programBtn" @clicked="setProgram($event)" />
    </ion-page>
</template>

<script lang="ts">
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { Service } from "@/services/service";
import img from "@/utils/Img";
import ImmunizationTrendsGraph from "@/apps/Immunization/components/Graphs/ImmunizationTrendsGraph.vue";
import ImmunizationGroupGraph from "@/apps/Immunization/components/Graphs/ImmunizationGroupGraph.vue";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { mapState } from "pinia";

import SetUser from "@/views/Mixin/SetUser.vue";
import ApiClient from "@/services/api_client";

import { Appointment } from "../apps/Immunization/services/immunization_appointment_service";
import { useDemographicsStore } from "@/stores/DemographicStore";

import SetDemographics from "@/views/Mixin/SetDemographics.vue";

import NCDDashboard from "@/apps/NCD/components/NCDDashboard.vue";
import ImmunizationDashboard from "@/apps/Immunization/components/ImmunizationDashboard.vue";
import OPDDashboard from "@/apps/OPD/components/OPDDashboard.vue";
import ANCDashboard from "@/apps/ANC/components/ANCDashboard.vue";
import LabourDashboard from "@/apps/LABOUR/components/LabourDashboard.vue";
import PNCDashboard from "@/apps/PNC/components/PNCDashboard.vue";

import SetPrograms from "@/views/Mixin/SetPrograms.vue";
import OfflineStatusModal from "@/components/Modal/OfflineStatus.vue";
import Programs from "@/components/Programs.vue";
import { resetDemographics } from "@/services/reset_data";

import { createModal } from "@/utils/Alerts";
import { useGlobalPropertyStore } from "@/stores/GlobalPropertyStore";
import { useWebWorker } from "@vueuse/core";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import workerData from "@/activate_worker";
import { useStatusStore } from "@/stores/StatusStore";

export default defineComponent({
    name: "Home",
    mixins: [SetUser, SetDemographics, SetPrograms, SetUserRole],
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        IonRow,
        IonCol,
        ImmunizationTrendsGraph,
        ImmunizationGroupGraph,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        Programs,
        NCDDashboard,
        ImmunizationDashboard,
        OPDDashboard,
        ANCDashboard,
        LabourDashboard,
        PNCDashboard,
    },
    data() {
        return {
            workerApi: null as any,
            controlGraphs: "months" as any,
            dataToPass: { payloadData: "tes" } as any,
            programBtn: {} as any,
            isLoading: false,
        };
    },
    computed: {
        ...mapState(useGeneralStore, ["OPDActivities"]),
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useStatusStore, [
            "offlineVillageStatus",
            "offlineCountriesStatus",
            "offlineDistrictStatus",
            "offlineTAsStatus",
            "offlineRelationshipStatus",
        ]),
        backgroundStyle() {
            return {
                background: `linear-gradient(180deg, rgba(150, 152, 152, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%), url(${img("backgroundImg.png")})`,
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
                height: "22.8vh",
            };
        },
    },
    watch: {
        $route: {
            async handler(data) {
                if (data.name == "Home") resetDemographics();
            },
            deep: true,
        },
        workerApi: {
            handler() {
                const status = useStatusStore();
                if (this.workerApi?.data?.payload) {
                    if (this.workerApi?.data?.payload?.total_relationships) status.setOfflineRelationshipStatus(this.workerApi?.data?.payload);
                    if (this.workerApi?.data?.payload?.total_village) status.setOfflineVillageStatus(this.workerApi?.data?.payload);
                    if (this.workerApi?.data?.payload?.total_countries) status.setOfflineCountriesStatus(this.workerApi?.data?.payload);
                    if (this.workerApi?.data?.payload?.total_districts) status.setOfflineDistrictStatus(this.workerApi?.data?.payload);
                    if (this.workerApi?.data?.payload?.total_TAs) status.setOfflineTAsStatus(this.workerApi?.data?.payload);

                    if (
                        this.offlineVillageStatus?.total_village &&
                        this.offlineRelationshipStatus?.total_relationships &&
                        this.offlineCountriesStatus?.total_countries &&
                        this.offlineDistrictStatus?.total_districts &&
                        this.offlineTAsStatus?.total_TAs &&
                        this.offlineVillageStatus?.total_village == this.offlineVillageStatus?.total &&
                        this.offlineRelationshipStatus?.total_relationships == this.offlineRelationshipStatus?.total &&
                        this.offlineCountriesStatus?.total_countries == this.offlineCountriesStatus?.total &&
                        this.offlineDistrictStatus?.total_districts == this.offlineDistrictStatus?.total &&
                        this.offlineTAsStatus?.total_TAs == this.offlineTAsStatus?.total
                    ) {
                        modalController.dismiss();
                    }
                }
            },
            deep: true,
        },
    },
    async mounted() {
        this.isLoading = true;
        const status = useStatusStore();
        status.setOfflineVillageStatus("");
        status.setOfflineDistrictStatus("");
        status.setOfflineTAsStatus("");
        status.setOfflineRelationshipStatus("");
        this.openOfflineStatusModal("data");
        this.workerApi = workerData.workerApi;
        await workerData.postData("SET_OFFLINE_LOCATION");
        await workerData.postData("SET_OFFLINE_RELATIONSHIPS");
        await workerData.postData("SYNC_PATIENT_RECORD");
        resetDemographics();
        this.setView();
        await useGlobalPropertyStore().loadGlobalProperty();
        this.isLoading = false;
    },
    methods: {
        setView() {
            Service.getProgramID();
        },
        programID() {
            return Service.getProgramID();
        },
        loadImage(name: any) {
            return img(name);
        },
        openOfflineStatusModal(name: any) {
            const dataToPass = { title: name };
            createModal(OfflineStatusModal, { class: "fullScreenModal" }, false, this.dataToPass);
        },
    },
});
</script>
<style scoped>
ion-card {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 1px -1px, rgba(0, 0, 0, 0) 0px 1px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
}
#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 1em;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>
