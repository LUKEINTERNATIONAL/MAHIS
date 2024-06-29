<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <div class="positionCenter">
                <ion-card class="registration_ion_card">
                    <div class="card_content">
                        <div class="card_hearder">Set Session Date</div>
                        <basic-form :contentData="sessionDate" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
                        <div>
                            <DynamicButton @click="onSubmit()" name="Save" fill="solid" iconSlot="icon-only" style="float: right" />
                            <DynamicButton
                                v-if="date"
                                @click="resetSessionDate()"
                                name="Rest"
                                fill="solid"
                                iconSlot="icon-only"
                                style="float: right"
                            />
                        </div>
                    </div>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonFooter, IonPage } from "@ionic/vue";
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
import { calculator } from "ionicons/icons";
import BasicForm from "@/components/BasicForm.vue";
import Toolbar from "@/components/Toolbar.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { icons } from "@/utils/svg";
import FacilityInformationBar from "@/components/FacilityInformationBar.vue";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
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
    },
    data() {
        return {
            cardData: {} as any,
            inputField: "" as any,
            setName: "" as any,
            initialPersonalData: [] as any,
            iconsContent: icons,
            apiDate: "" as string,
            date: "" as string,
        };
    },
    computed: {
        ...mapState(useConfigStore, ["sessionDate"]),
    },
    async mounted() {
        this.apiDate = await Service.getApiDate();
        this.date = getFieldValue(this.sessionDate, "sessionDate", "value");
    },

    methods: {
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
