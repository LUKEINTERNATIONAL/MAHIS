<template>
    <div class="pim-cls-1 modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle" style="color: #1f2221d4; font-size: 16px">Add TA</div>
        </div>
        <div>
            <div class="center text_12">
                <ion-row>
                    <BasicForm :contentData="village_form" />
                </ion-row>
            </div>
        </div>

        <div class="btnContent">
            <div class="saveBtn">
                <ion-button class="btnText" color="danger" fill="solid" @click="dismiss()" style="margin-right: 8px"> Cancel </ion-button>
                <ion-button class="btnText" fill="solid" @click="updateTA"> Save </ion-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { modalController } from "@ionic/vue";
import BasicForm from "@/components/BasicForm.vue";
import { modifyFieldValue, getFieldValue } from "@/services/data_helpers";
import { icons } from "@/utils/svg";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { LocationService } from "@/services/location_service";
import workerData from "@/activate_worker";
import { getOfflineRecords } from "@/services/offline_service";
import { validateInputFiledData } from "@/services/group_validation";
import { ref, onMounted } from "vue";
import { Service } from "@/services/service";

onMounted(async () => {
    await setData();
});
const props: any = defineProps({
    villageData: Object,
});
const setData = async () => {
    modifyFieldValue(village_form.value, "Village", "value", props.villageData.name);
};
const dismiss = () => {
    modalController.dismiss();
};
const updateTA = async () => {
    if (await validateInputFiledData(village_form.value)) {
        const VillageValue = getFieldValue(village_form.value, "Village", "value");

        const address = await Service.putJson(`villages/${props.villageData.village_id}`, {
            id: props.villageData.village_id,
            name: VillageValue,
            ta_id: props.villageData.traditional_authority_id,
        });

        if (address) {
            await workerData.postData("UPDATE_RECORD", {
                storeName: "villages",
                data: address.data,
                whereClause: { village_id: props.villageData.village_id },
            });
            toastSuccess(`Village updated successfully`);
        }
        dismiss();
    } else {
        toastWarning("Please fill all the required field");
    }
};

const village_form = ref([
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
