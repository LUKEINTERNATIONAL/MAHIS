<template>
    <div class="pim-cls-1 modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle" style="color: #1f2221d4; font-size: 16px">Add TA</div>
        </div>
        <div>
            <div class="center text_12">
                <ion-row>
                    <BasicForm :contentData="TA_form" />
                </ion-row>
            </div>
        </div>

        <div class="btnContent">
            <div class="saveBtn">
                <ion-button class="btnText" color="danger" fill="solid" @click="dismiss()" style="margin-right: 8px"> Cancel </ion-button>
                <ion-button class="btnText" fill="solid" @click="saveData"> Save </ion-button>
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

onMounted(async () => {
    await setDistrict();
});

const setDistrict = async () => {
    modifyFieldValue(TA_form.value, "TA_district", "multiSelectData", await getOfflineRecords("districts"));
};
const dismiss = () => {
    modalController.dismiss();
};
const saveData = async () => {
    if (await validateInputFiledData(TA_form.value)) {
        const TAValue = getFieldValue(TA_form.value, "TA", "value");
        const villageValue = getFieldValue(TA_form.value, "Village", "value").split(",");
        const district_id = getFieldValue(TA_form.value, "TA_district", "value").district_id;

        const address = await LocationService.createAddress({
            address_type: "Village",
            addresses: villageValue,
            parent_location: district_id,
            ta_name: TAValue,
        });
        if (address) {
            await workerData.postData("ADD_OBJECT_STORE", { storeName: "TAs", data: address.ta_data });
            Promise.all(address.village_data.map((item: any) => workerData.postData("ADD_OBJECT_STORE", { storeName: "villages", data: item })));
            toastSuccess(`Location added successfully`);
        }
        dismiss();
    } else {
        toastWarning("Please fill all the required field");
    }
};

const TA_form = ref([
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "District*",
                            icon: icons.search,
                            value: "",
                            name: "TA_district",
                            setName: "TALocation",
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            popOver: true,
                            trackBy: "district_id",
                            multiSelectData: [],
                            id: "",
                            idName: "district_id",
                            validationFunctionName: "required",
                        },
                    ],
                },
            ],
        },
    },
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "TA*",
                            value: "",
                            name: "TA",
                            eventType: "input",
                            alertsErrorMassage: "",
                            validationFunctionName: "required",
                        },
                    ],
                },
            ],
        },
    },
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
                            validationFunctionName: "required",
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
