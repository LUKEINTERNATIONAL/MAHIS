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
                            <DynamicButton v-if="date" @click="resetSessionDate" name="Rest" fill="solid" iconSlot="icon-only" style="float: right" />
                        </div>
                    </div>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonFooter, IonPage } from "@ionic/vue";
import { ref, onMounted } from "vue";
import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useConfigStore } from "@/stores/ConfigStore";
import { storeToRefs } from "pinia";
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

// Store setup
const configStore = useConfigStore();
const { sessionDate } = storeToRefs(configStore);

// Refs
const cardData = ref({});
const inputField = ref("");
const setName = ref("");
const initialPersonalData = ref([]);
const iconsContent = ref(icons);
const apiDate = ref("");
const date = ref("");

// Methods
const openModal = () => {
    createModal(DispositionModal);
};

const validateFieldWrapper = (event: any) => {
    return validateField(sessionDate.value, event.name, event.name);
};

const handleInputData = async () => {
    date.value = getFieldValue(sessionDate.value, "sessionDate", "value");
    try {
        await Service.setSessionDate(date.value);
        modifyFieldValue(sessionDate.value, "sessionDate", "value", date.value);
        toastSuccess(`Successfully Back dated to ${formatDate(date.value)}`);
    } catch (e) {
        toastWarning(`${e}`);
    }
};

const formatDate = (dateString: string) => {
    return HisDate.toStandardHisDisplayFormat(dateString);
};

const resetSessionDate = async () => {
    try {
        await Service.resetSessionDate();
        modifyFieldValue(sessionDate.value, "sessionDate", "value", "");
        toastSuccess(`Session date has been reset to ${formatDate(apiDate.value)}`);
    } catch (e) {
        toastWarning(`${e}`);
    }
};

// Lifecycle hooks
onMounted(async () => {
    apiDate.value = await Service.getApiDate();
    date.value = getFieldValue(sessionDate.value, "sessionDate", "value");
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
