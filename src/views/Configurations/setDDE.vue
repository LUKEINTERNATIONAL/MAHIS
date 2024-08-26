<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <div class="positionCenter">
                <ion-card class="registration_ion_card">
                    <div class="card_content">
                        <div class="card_hearder">Set DDE</div>
                        <ion-toggle :enable-on-off-labels="true" v-model="globalPropertyStore.dde_enabled">Enable DDE</ion-toggle>
                    </div>
                </ion-card>
            </div>
            <div class="positionCenter" v-if="globalPropertyStore.dde_enabled == 'true'">
                <ion-card class="registration_ion_card">
                    <div class="card_content">
                        <div class="card_hearder">{{ DDE.title }}</div>
                        <ion-row>
                            <ion-col>
                                <ion-row class="ddeStatusHeader">Location ID</ion-row>
                            </ion-col>
                            <ion-col>
                                <ion-row class="ddeStatusContent">{{ DDE.id }}</ion-row>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-row class="ddeStatusHeader">Estimated days left</ion-row>
                            </ion-col>
                            <ion-col>
                                <ion-row class="ddeStatusContent">{{ DDE.avg }}</ion-row>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-row class="ddeStatusHeader">Unassigned</ion-row>
                            </ion-col>
                            <ion-col>
                                <ion-row class="ddeStatusContent">{{ DDE.unassigned }}</ion-row>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-row class="ddeStatusHeader">Assigned</ion-row>
                            </ion-col>
                            <ion-col>
                                <ion-row class="ddeStatusContent">{{ DDE.assigned }}</ion-row>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-row class="ddeStatusHeader">Average consumption per day</ion-row>
                            </ion-col>
                            <ion-col>
                                <ion-row class="ddeStatusContent">{{ DDE.daysLeft }}</ion-row>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-row class="ddeStatusHeader">Last update</ion-row>
                            </ion-col>
                            <ion-col>
                                <ion-row class="ddeStatusContent">{{ DDE.lastUpdated }}</ion-row>
                            </ion-col>
                        </ion-row>
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
        };
    },
    computed: {
        ...mapState(useConfigStore, ["sessionDate"]),
        ...mapState(useGlobalPropertyStore, ["globalPropertyStore"]),
    },
    watch: {
        globalPropertyStore: {
            async handler() {
                await this.setDDEStatus();
            },
            deep: true,
        },
    },
    async mounted() {
        this.apiDate = await Service.getApiDate();
        this.ddeData();
        this.date = getFieldValue(this.sessionDate, "sessionDate", "value");
    },

    methods: {
        async setDDEStatus() {
            const dde = useGlobalPropertyStore();
            await dde.setGlobalProperty("dde_enabled", this.globalPropertyStore.dde_enabled);
            console.log("ddd", this.globalPropertyStore.dde_enabled);
        },
        async ddeData() {
            const data = await PatientDemographicsExchangeService.getRemainingNpids();
            const stats = data["npid_status"][0];
            const unassigned = stats["unassigned"];
            const avg = stats["avg_consumption_rate_per_day"] || 1;
            this.DDE = {
                id: stats["location_id"],
                avg: avg,
                unassigned: stats["unassigned"],
                assigned: stats["assigned"],
                daysLeft: Math.floor(unassigned / avg),
                lastUpdated: dayjs(stats["date_last_updated"]).format("DD/MMM/YYYY HH:mm:ss"),
                title: stats["location_name"] + " DDE NPID Status",
            };
        },
        openModal() {
            createModal(DispositionModal);
        },
        S(event: any) {
            return validateField(this.sessionDate, event.name, (this as any)[event.name]);
        },
        handleInputData() {},
        async resetSessionDate() {
            modifyFieldValue(this.sessionDate, "sessionDate", "value", "");
            try {
                await Service.resetSessionDate();
                toastSuccess(`Session date has been reset to ${this.formatDate(this.apiDate)}`);
                this.redirect();
            } catch (e) {
                toastWarning(`${e}`);
            }
        },
        redirect() {
            this.$router.back();
        },
        async onSubmit() {
            this.date = getFieldValue(this.sessionDate, "sessionDate", "value");
            console.log("🚀 ~ onSubmit ~ date:", this.date);
            try {
                await Service.setSessionDate(this.date);
                toastSuccess(`Successfully Back dated to ${this.formatDate(this.date)}`);
                this.redirect();
            } catch (e) {
                toastWarning(`${e}`);
            }
        },
        formatDate(date: string) {
            return HisDate.toStandardHisDisplayFormat(date);
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
