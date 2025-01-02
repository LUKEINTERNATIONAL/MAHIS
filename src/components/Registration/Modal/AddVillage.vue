<template>
    <div class="pim-cls-1 modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle" style="color: #1f2221d4; font-size: 16px">Add Village</div>
        </div>
        <div>
            <div class="center text_12">
                <ion-row>
                    <BasicForm :contentData="addVillage" @update:inputValue="validaterowData()" />
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

export default defineComponent({
    name: "AddVillage",
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
            location: "" as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useRegistrationStore, ["addVillage", "currentLocation", "homeLocation"]),
    },
    mounted() {
        if (localStorage.getItem("activeLocation") == "current") {
            this.districtType = "current_district";
            this.TAType = "current_traditional_authority";
            this.VillageType = "current_village";
            this.location = this.currentLocation;
        } else {
            this.districtType = "home_district";
            this.TAType = "home_traditional_authority";
            this.VillageType = "home_village";
            this.location = this.homeLocation;
        }
    },
    setup() {},
    methods: {
        dismiss() {
            modalController.dismiss();
        },
        async saveData() {
            const villageValue = getFieldValue(this.addVillage, "Village", "value");
            if (Validation.isNames(villageValue) == null) {
                const address = await LocationService.createAddress({});
                if (address) {
                    toastSuccess(`${this.validationData.address_type} added successfully`);
                    return true;
                } else {
                    toastWarning(`Unable to add ${this.validationData.address_type}`);
                }
            } else {
                toastWarning(`Please Fill all the required field with the correct value`);
            }
            return false;
        },
        async saveVillage() {
            if (await this.validaterowData()) {
                await this.saveData();
                const villageValue = getFieldValue(this.addVillage, "Village", "value");
                const TAData = getFieldValue(this.location, this.TAType, "value");
                const villageList = await LocationService.getVillages(TAData.traditional_authority_id, "");
                modifyFieldValue(this.location, this.VillageType, "multiSelectData", villageList);
                modifyFieldValue(this.location, this.VillageType, "value", { name: villageValue });

                modifyFieldValue(this.addVillage, "Village", "value", "");
                if (localStorage.getItem("activeLocation") == "current") {
                    modifyFieldValue(this.currentLocation, "current_traditional_authority", "alertsErrorMassage", false);
                    modifyFieldValue(this.currentLocation, "current_village", "alertsErrorMassage", false);
                } else {
                    modifyFieldValue(this.homeLocation, "home_traditional_authority", "alertsErrorMassage", false);
                    modifyFieldValue(this.homeLocation, "home_village", "alertsErrorMassage", false);
                }

                this.dismiss();
            }
        },
        async validaterowData() {
            this.validationStatus = false;
            const name = getFieldValue(this.addVillage, "Village", "value");
            const TAData = getFieldValue(this.location, this.TAType, "value");

            if (Validation.isNames(name) != null) {
                modifyFieldValue(this.addVillage, "Village", "alertsErrorMassage", "Please enter a valid " + "Village");
                return false;
            } else {
                modifyFieldValue(this.addVillage, "Village", "alertsErrorMassage", "");
            }

            const villageList = await LocationService.getVillages(TAData.traditional_authority_id, "");

            const filteredData = villageList.filter((item: any) => item.name.toLowerCase() == name.toLowerCase());
            if (!isEmpty(filteredData)) {
                modifyFieldValue(this.addVillage, "Village", "alertsErrorMassage", "Can't add existing " + "Village");
                return false;
            } else {
                modifyFieldValue(this.addVillage, "Village", "alertsErrorMassage", "");
            }
            this.validationData = {
                address_type: "Village",
                addresses_name: name,
                parent_location: TAData.traditional_authority_id,
            };
            return true;
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
