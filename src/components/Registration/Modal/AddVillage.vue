<template>
    <div class="pim-cls-1 modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle" style="color: #1f2221d4; font-size: 16px">Add Village</div>
        </div>
        <div>
            <div class="center text_12">
                <ion-row>
                    <BasicForm :contentData="villageForm" />
                </ion-row>
            </div>
        </div>

        <div class="btnContent">
            <div class="saveBtn">
                <ion-button class="btnText" color="danger" fill="solid" @click="dismiss()" style="margin-right: 8px"> Cancel </ion-button>
                <ion-button class="btnText" fill="solid" @click="saveVillage"> Save </ion-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    IonContent,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCol,
    IonAvatar,
    IonImg,
    IonLabel,
    IonPage,
    IonFooter,
    modalController,
} from "@ionic/vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { createOutline } from "ionicons/icons";
import BasicForm from "@/components/BasicForm.vue";
import { useWeightHeightVitalsStore } from "@/apps/Immunization/stores/VitalsStore";
import DatePicker from "@/components/DatePicker.vue";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { VitalsService } from "@/services/vitals_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { Service } from "@/services/service";
import HisDate from "@/utils/Date";
import { BMIService } from "@/services/bmi_service";
import { icons } from "@/utils/svg";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { VitalsEncounter } from "@/apps/Immunization/services/vitals";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { LocationService } from "@/services/location_service";
import Validation from "@/validations/StandardValidations";
import { isPlainObject, isEmpty } from "lodash";
import { validateInputFiledData } from "@/services/group_validation";
import workerData from "@/activate_worker";
import { getOfflineRecords } from "@/services/offline_service";

onMounted(async () => {});

const props: any = defineProps({
    taData: Object,
});
const dismiss = () => {
    modalController.dismiss();
};
const saveVillage = async () => {
    if (await validateInputFiledData(villageForm.value)) {
        const villageValue = getFieldValue(villageForm.value, "Village", "value").split(",");
        const address = await LocationService.createAddress({
            address_type: "Village",
            addresses: villageValue,
            parent_location: props.taData.traditional_authority_id,
        });
        if (address) {
            Promise.all(address.village_data.map((item: any) => workerData.postData("ADD_OBJECT_STORE", { storeName: "villages", data: item })));
            toastSuccess(`Location added successfully`);
        }
        dismiss();
    } else {
        toastWarning("Please fill all the required field");
    }
};

const villageForm = ref([
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Village*",
                            value: "",
                            name: "Village",
                            eventType: "input",
                            alertsErrorMassage: "",
                            validate: false,
                            required: true,
                        },
                    ],
                },
            ],
        },
    },
] as any);
</script>
<style scoped>
.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.lbl-ct {
    white-space: nowrap;
    color: #08475e;
}
.pim-cls-1 {
    --background: #ffff;
}
ion-footer {
    --ion-toolbar-background: #fff;
}
.dashed-hr {
    border: none;
    border-top: 2px dashed #b3b3b3;
    margin: 20px 0; /* Adjust as needed */
}
.modal_wrapper {
    padding: 0px 10px;
    background: #fff;
    margin: 0 auto;
    width: 60%;
}

.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 15px;
}
.vitalsContent {
    height: 500px;
    margin: 10px;
}
.saveBtn {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 100%;
    align-items: end;
}
.btnContent {
    display: flex;
    justify-content: left;
    line-height: 60px;
}
</style>
