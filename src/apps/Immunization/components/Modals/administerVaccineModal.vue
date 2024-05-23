<template>
    <div class="modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle">Administer Vaccine</div>
        </div>
        <div class="">
            <basic-form :contentData="administerVaccine"></basic-form>
        </div>

        <customDatePicker v-if="showPD" />
        <div class="btnContent">
            <div class="saveBtn" v-if="showDateBtns">
                <div>
                    <ion-button @click="dismiss" class="btnText" fill="solid">
                        Done today
                        <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon>
                    </ion-button>
                </div>
                <div>or</div>
                <div>
                    <ion-button class="btnText" fill="solid" @click="showCPD">
                        Done earlier
                        <ion-icon slot="end" size="small" :icon="iconsContent.calenderWithPenEdit"></ion-icon>
                    </ion-button>
                </div>
            </div>

            <div class="saveBtn" v-if="!showDateBtns">
                <ion-row>
                    <ion-col>
                        <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px;">
                            Cancel
                            <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon>
                        </ion-button>
                    </ion-col>

                    <ion-col>
                        <ion-button @click="dismiss" class="btnText" fill="solid" style="width: 130px;">
                            save
                            <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";;
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import BasicForm from "@/components/BasicForm.vue";
import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";

export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        BasicInputField,
        BasicForm,
        PreviousVitals,
        customDatePicker,
    },
    data() {
        return {
            iconsContent: icons,
            showPD: false as boolean,
            showDateBtns: true as boolean,
        };
    },
    computed: {
        ...mapState(useAdministerVaccineStore, ["administerVaccine"]),
    },
    async mounted() {
        
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        showCPD() {
            this.showPD = true as boolean;
            this.showDateBtns = false as boolean;
        },
        dismiss() {
            modalController.dismiss();
        },
    },
});
</script>

<style scoped>
.vitals_title {
    margin-bottom: 50px;
}
.input-with-icon {
    position: relative;
}
.input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: gray; /* Adjust the color as needed */
}
ion-col {
    padding-bottom: 15px;
}
h5 {
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
    margin: 20px;
    line-height: 60px;
}
.vitalsContent {
    height: 500px;
}
.saveBtn {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 330px;
    align-items: center;
}
.btnContent {
    display: flex;
    justify-content: center;
    line-height: 60px;
}

#cbtn {
  --background: #B42318;
}
</style>
