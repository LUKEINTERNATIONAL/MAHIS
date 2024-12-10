<template>
    <div class="pim-cls-1 modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle" style="color: #1f2221d4; font-size: 16px">Add TA</div>
        </div>
        <div>
            <div class="center text_12">
                <ion-row>
                    <BasicForm :contentData="addTA" @update:inputValue="validaterowData($event)" />
                </ion-row>
            </div>
        </div>

        <div class="btnContent">
            <div class="saveBtn">
                <ion-button class="btnText" color="danger" fill="solid" @click="dismiss()" style="margin-right: 8px"> Cancel </ion-button>
                <ion-button class="btnText" fill="solid" @click="saveTA"> Save </ion-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
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

export default defineComponent({
    name: "AddTA",
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        BasicForm,
    },
    data() {
        return {
            popoverOpen: false,
            iconContent: icons,
            event: null as any,
            BMI: "" as any,
            showPD: false as boolean,
            validationStatus: false as boolean,
            validationData: "" as any,
            districtType: "" as any,
            TAType: "" as any,
            VillageType: "" as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useRegistrationStore, ["addTA", "currentLocation", "homeLocation"]),
    },
    mounted() {
        if (localStorage.getItem("activeLocation") == "current") {
            this.districtType = "current_district";
            this.TAType = "current_traditional_authority";
            this.VillageType = "current_village";
        } else {
            this.districtType = "home_district";
            this.TAType = "home_traditional_authority";
            this.VillageType = "home_village";
        }
    },
    setup() {},
    methods: {
        dismiss() {
            modalController.dismiss();
        },
        async saveData() {
            const TAValue = getFieldValue(this.addTA, "TA", "value");
            const villageValue = getFieldValue(this.addTA, "Village", "value");
            if (Validation.isNames(TAValue) == null && Validation.isNames(villageValue) == null) {
                const address = await LocationService.createAddress(
                    this.validationData.address_type,
                    this.validationData.addresses_name,
                    this.validationData.parent_location
                );
                if (address) {
                    toastSuccess(`${this.validationData.address_type} added successfully`);
                    return true;
                } else {
                    toastWarning(`Unable to add ${this.validationData.address_type}`);
                }
            } else {
                toastWarning("Unable to save");
            }
            return false;
        },
        async saveTA() {
            if (this.validationStatus) {
                if (await this.saveData()) {
                    await this.saveVillage();
                    this.dismiss();
                }
            } else {
                toastWarning(`Please Fill all the required field with the correct value`);
            }
        },
        async saveVillage() {
            let filteredList = [];
            const TAValue = getFieldValue(this.addTA, "TA", "value");
            const villageValue = getFieldValue(this.addTA, "Village", "value");
            let districtData = [];
            if (localStorage.getItem("activeLocation") == "current") {
                districtData = getFieldValue(this.currentLocation, this.districtType, "value");
            } else {
                districtData = getFieldValue(this.homeLocation, this.districtType, "value");
            }

            filteredList = await LocationService.getTraditionalAuthorities(districtData.district_id, TAValue);
            const filteredData = filteredList.filter((item: any) => item.name.toLowerCase() == TAValue.toLowerCase());
            if (!isEmpty(filteredData)) {
                this.validationData = {
                    address_type: "Village",
                    addresses_name: villageValue,
                    parent_location: filteredData[0].traditional_authority_id,
                };
                await this.saveData();

                const TAList = await LocationService.getTraditionalAuthorities(districtData.district_id, "");
                const villageList = await LocationService.getVillages(filteredData[0].traditional_authority_id, "");
                if (localStorage.getItem("activeLocation") == "current") {
                    modifyFieldValue(this.currentLocation, this.TAType, "multiSelectData", TAList);
                    modifyFieldValue(this.currentLocation, this.VillageType, "multiSelectData", villageList);
                    modifyFieldValue(this.currentLocation, this.VillageType, "value", { name: villageValue });
                    modifyFieldValue(this.currentLocation, this.TAType, "value", filteredData[0]);
                    modifyFieldValue(this.currentLocation, this.VillageType, "displayNone", false);
                } else {
                    modifyFieldValue(this.homeLocation, this.TAType, "multiSelectData", TAList);
                    modifyFieldValue(this.homeLocation, this.VillageType, "multiSelectData", villageList);
                    modifyFieldValue(this.homeLocation, this.VillageType, "value", { name: villageValue });
                    modifyFieldValue(this.homeLocation, this.TAType, "value", filteredData[0]);
                    modifyFieldValue(this.homeLocation, this.VillageType, "displayNone", false);
                }
                modifyFieldValue(this.addTA, "TA", "value", "");
                modifyFieldValue(this.addTA, "Village", "value", "");
                if (localStorage.getItem("activeLocation") == "current") {
                    modifyFieldValue(this.currentLocation, "current_traditional_authority", "alertsErrorMassage", "");
                    modifyFieldValue(this.currentLocation, "current_village", "alertsErrorMassage", "");
                } else {
                    modifyFieldValue(this.homeLocation, "home_traditional_authority", "alertsErrorMassage", "");
                    modifyFieldValue(this.homeLocation, "home_village", "alertsErrorMassage", "");
                }
            }
        },
        async validaterowData(event: any) {
            this.validationStatus = false;

            const name = getFieldValue(this.addTA, event.name, "value");
            let districtData = [];
            if (localStorage.getItem("activeLocation") == "current") {
                districtData = getFieldValue(this.currentLocation, this.districtType, "value");
            } else {
                districtData = getFieldValue(this.homeLocation, this.districtType, "value");
            }

            if (Validation.isNames(event.value) != null) {
                modifyFieldValue(this.addTA, event.name, "alertsErrorMassage", "Please enter a valid " + event.name);
                return false;
            } else {
                modifyFieldValue(this.addTA, event.name, "alertsErrorMassage", "");
            }

            let filteredList = [];
            if (event.name == "TA") {
                filteredList = await LocationService.getTraditionalAuthorities(districtData.district_id, name);
                this.validationData = {
                    address_type: event.name,
                    addresses_name: name,
                    parent_location: districtData.district_id,
                };
            }
            const filteredData = filteredList.filter((item: any) => item.name.toLowerCase() == name.toLowerCase());
            if (!isEmpty(filteredData)) {
                modifyFieldValue(this.addTA, event.name, "alertsErrorMassage", "Can't add existing " + event.name);
                return false;
            } else {
                modifyFieldValue(this.addTA, event.name, "alertsErrorMassage", "");
            }
            this.validationStatus = true;
        },
    },
});
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
