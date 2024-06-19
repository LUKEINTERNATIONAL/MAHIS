<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepper-title="Lab test and imaging"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
            ></Stepper>
        </ion-content>
      <BasicFooter @finishBtn="saveData()" />

    </ion-page>
</template>

<script lang="ts">
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import UltrasoundScan from "@/apps/ANC/components/lab_tests/UltrasoundScan.vue";
import { icons } from "@/utils/svg";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import UrineTest from "@/apps/ANC/components/lab_tests/UrineTest.vue";
import TB from "@/apps/ANC/components/lab_tests/TB.vue";
import Stepper from "@/components/Stepper.vue";
import { useLabTestsStore } from "../store/LabTestsStore";
import { mapState } from "pinia";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { formatInputFiledData, formatCheckBoxData, formatRadioButtonData } from "@/services/formatServerData";
import { useTBScreeningStore } from "../store/TBScreeningStore";
import { useUrineTestStore } from "../store/UrineTestStore";
import { Service } from "@/services/service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import {TBScreeningInstance, UltrasoundInstance, UrineTestInstance} from "@/apps/ANC/service/labtests_service"
import { resetPatientData } from "@/services/reset_data";
import BasicFooter from "@/components/BasicFooter.vue";
export default defineComponent({
    name: "Lab",
    components: {BasicFooter, IonPage, DemographicBar, Toolbar, IonContent, UltrasoundScan, UrineTest, TB, Stepper },
    data() {
        return {
            iconsContent: icons,
            isOpen: false,
            wizardData: [
                {
                    title: "Ultrasound Scan",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Urine test",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "TB Screening",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 3,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Ultrasound Scan",
                    component: "UltrasoundScan",
                    value: "1",
                },
                {
                    title: "Urine test",
                    component: "UrineTest",
                    value: "2",
                },
                {
                    title: "TB Screening",
                    component: "TB",
                    value: "3",
                },
            ],
        };
    },
    mounted() {},
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useLabTestsStore, ["reason", "ultrasound", "amniotic", "placenta"]),
        ...mapState(useTBScreeningStore, ["reasons", "tbTest"]),
        ...mapState(useUrineTestStore, ["urineTest", "protein", "nitrites", "culture", "gram", "leukocytes", "glucose"]),
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },
    methods: {
        markWizard() {},
        saveData() {
            if (this.ultrasound) {
               this.saveUltrasound();
               this.saveUrineTest();
               this.saveTBscreening();
                resetPatientData();
            this.$router.push("ANChome");
                toastSuccess("Lab tests data saved successfully");
            } else {
                toastWarning("Please complete all required fields");
            }
            // // Simulate saving data
            // this.loading = true; // Show the spinner while data is being saved
            // setTimeout(() => {
            //   // After some time (simulating a server request), hide the spinner
            //   this.loading = false;
            //   // Redirect to counselling page
            //   this.$router.push('counselling');
            // }, 8000); // Simulate a 2-second delay
        },

        async buildUltrasound() {
       return [
         ...(await formatRadioButtonData(this.ultrasound)),
         ...(await formatInputFiledData(this.ultrasound)),
         ...(await formatRadioButtonData(this.reason)),
         ...(await formatInputFiledData(this.reason)),
         ...(await formatRadioButtonData(this.amniotic)),
         ...(await formatRadioButtonData(this.placenta)),
        ]
    },

    async buildTBscreening() {
       return [
         ...(await formatRadioButtonData(this.tbTest)),
         ...(await formatInputFiledData(this.tbTest)),
         ...(await formatCheckBoxData(this.reasons)),
         ...(await formatInputFiledData(this.reasons)),
 
        ]
    },

    async buildUrineTest() {
       return [
         ...(await formatInputFiledData(this.urineTest)),
         ...(await formatRadioButtonData(this.urineTest)),
         ...(await formatCheckBoxData(this.urineTest)),
         ...(await formatRadioButtonData(this.culture)),
         ...(await formatRadioButtonData(this.gram)),
         ...(await formatRadioButtonData(this.nitrites)),
         ...(await formatRadioButtonData(this.leukocytes)),
         ...(await formatRadioButtonData(this.protein)),
         ...(await formatRadioButtonData(this.glucose)),
        ]
    },

    async saveUltrasound () {
        const data: any = await this.buildUltrasound();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const ultrasoundInstance = new UltrasoundInstance();
            ultrasoundInstance.push(this.demographics.patient_id, userID, data)
            toastSuccess("Ultrasound scan data saved successfully");
        }

        else {
            toastWarning("Could not find concepts");
        }


    },

    async saveTBscreening () {
        const data: any = await this.buildTBscreening();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const tbscreeningInstance = new TBScreeningInstance();
            tbscreeningInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("TB screening data saved successfully");
        }

        else {
            toastWarning("Could not find concepts");
        }

    },
    async saveUrineTest () {
        const data: any = await this.buildUrineTest();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const urineTestInstance = new UrineTestInstance();
            urineTestInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("Urine Test data saved successfully");
        }

        else {
            toastWarning("Could not find concepts");
        }
    },

    },
});
</script>

<style scoped></style>
