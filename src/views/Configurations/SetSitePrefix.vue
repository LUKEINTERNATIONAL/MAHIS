<template>
    <ion-page :class="{ loading: isLoading }">
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content :fullscreen="true">
            <div class="positionCenter">
                <ion-card class="registration_ion_card">
                    <div class="card_content">
                        <div class="card_hearder">Set Site Prefix</div>
                        <basic-form :contentData="sitePrefix" @clicked:button="handleSave"> </basic-form>
                    </div>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonFooter, IonPage, IonToggle } from "@ionic/vue";
import { defineComponent } from "vue";
import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useConfigStore } from "@/stores/ConfigStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import { getFieldValue, getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";
import dayjs from "dayjs";
import { Service } from "@/services/service";
import { calculator, search } from "ionicons/icons";
import BasicForm from "@/components/BasicForm.vue";
import Toolbar from "@/components/Toolbar.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { icons } from "@/utils/svg";
import FacilityInformationBar from "@/components/FacilityInformationBar.vue";
import { PatientDemographicsExchangeService } from "@/services/patient_demographics_exchange_service";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { useGlobalPropertyStore } from "@/stores/GlobalPropertyStore";
import { useSitePrefix } from "@/stores/SitePrefix";
import { GlobalPropertyService } from "@/services/global_property_service";
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
        BasicForm,
        Toolbar,
        DynamicButton,
        IonFooter,
        IonPage,
        FacilityInformationBar,
        IonToggle,
    },
    data() {
        return {
            cardData: {} as any,
            inputField: "" as any,
            isDDEEnabled: true as any,
            setName: "" as any,
            initialPersonalData: [] as any,
            iconsContent: icons,
            apiDate: "" as string,
            date: "" as string,
            DDE: {} as any,
            isLoading: false,
        };
    },
    computed: {
        ...mapState(useConfigStore, ["sessionDate"]),
        ...mapState(useGlobalPropertyStore, ["globalPropertyStore"]),
        ...mapState(useSitePrefix, ["sitePrefix"]),
    },
    watch: {
        globalPropertyStore: {
            async handler() {
                await this.setSitePrefixStatus();
            },
            deep: true,
        },
        $route: {
            async handler() {
                await this.setSitePrefixStatus();
            },
            deep: true,
        },
    },

    async mounted() {
        await this.setSitePrefixStatus();
    },

    methods: {
        async setSitePrefixStatus() {
            const location_id = localStorage.getItem("locationID");
            const sitePrefix = await GlobalPropertyService.get(`site_prefix_${location_id}`);
            modifyFieldValue(this.sitePrefix, "site_prefix", "value", sitePrefix);
        },

        async handleSave() {
            const sitePrefix = getFieldValue(this.sitePrefix, "site_prefix", "value");
            if (sitePrefix) {
                const location_id = localStorage.getItem("locationID");
                const site = useGlobalPropertyStore();
                await site.setGlobalProperty(`site_prefix_${location_id}`, sitePrefix);
                toastSuccess(`Successfully set site prefix to ${sitePrefix}`);
            }
        },
    },
});
</script>

<style scoped>
.ddeStatusContent {
    font-weight: 700;
    font-size: 16px;
    padding: 2px;
}
.ddeStatusHeader {
    font-size: 16px;
    padding: 2px;
}
.demographics_title {
    font-weight: 700;
    font-size: 24px;
}
.gender {
    display: flex;
    justify-content: space-between;
    max-width: 170px;
    padding-top: 10px;
}
.gender_title {
    margin-top: 30px;
}
.positionCenter {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
