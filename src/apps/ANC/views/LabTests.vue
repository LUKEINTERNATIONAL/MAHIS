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
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"

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
import {
  LabTestsService,
  TBScreeningInstance,
  UltrasoundInstance,
  UrineTestInstance
} from "@/apps/ANC/service/labtests_service"
import { resetPatientData } from "@/services/reset_data";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
export default defineComponent({
    name: "Lab",
  mixins: [SetUserRole, SetEncounter],

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
        ...mapState(useLabTestsStore, ["reason", "ultrasound"]),
        ...mapState(useTBScreeningStore, ["reasons", "tbTest"]),
        ...mapState(useUrineTestStore, ["urineTest", "protein", "nitrites", "culture", "gram", "leukocytes", "glucose"]),
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },
    methods: {
        markWizard() {},
      getFormatedData(data: any) {
        return data.map((item: any) => {
          return item?.data;
        });
      },
        async saveData() {
          await this.saveLabTests();
          resetPatientData()
          this.$router.push("contact")
        },

    async buildTBscreening() {
       return [
         ...(await formatRadioButtonData(this.tbTest)),
         ...(await formatInputFiledData(this.tbTest)),
         ...(await formatCheckBoxData(this.reasons)),
         ...(await formatInputFiledData(this.reasons)),
 
        ]
    },

    async buildLabTests() {
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
         ...(await formatRadioButtonData(this.tbTest)),
         ...(await formatInputFiledData(this.tbTest)),
         ...(await formatCheckBoxData(this.reasons)),
         ...(await formatInputFiledData(this.reasons)),
        ]
    },
      async saveLabTests() {
        if (this.ultrasound.length > 0 && this.tbTest.length > 0 && this.urineTest.length >0) {
          const userID: any = Service.getUserID();
          const  labTests= new LabTestsService(this.demographics.patient_id, userID);
          const encounter = await labTests.createEncounter();
          if (!encounter) return toastWarning("Unable to create Lab tests encounter");
          const patientStatus = await labTests.saveObservationList(await this.buildLabTests());
          if (!patientStatus) return toastWarning("Unable to create patient Lab tests details!");
          toastSuccess("Lab tests have been created");
        }
        console.log(await this.buildLabTests())
      },

    // async saveUltrasound () {
    //     const data: any = await this.buildUltrasound();
    //     if (data.length > 0) {
    //         const userID: any = Service.getUserID();
    //         const ultrasoundInstance = new UltrasoundInstance();
    //         ultrasoundInstance.push(this.demographics.patient_id, userID, data)
    //         toastSuccess("Ultrasound scan data saved successfully");
    //     }
    //
    //     else {
    //         toastWarning("Could not find concepts");
    //     }
    //
    //
    // },
    //
    // async saveTBscreening () {
    //     const data: any = await this.buildTBscreening();
    //     if (data.length > 0) {
    //         const userID: any = Service.getUserID();
    //         const tbscreeningInstance = new TBScreeningInstance();
    //         tbscreeningInstance.push(this.demographics.patient_id, userID, data);
    //         toastSuccess("TB screening data saved successfully");
    //     }
    //
    //     else {
    //         toastWarning("Could not find concepts");
    //     }
    //
    // },
    // async saveUrineTest () {
    //     const data: any = await this.buildUrineTest();
    //     if (data.length > 0) {
    //         const userID: any = Service.getUserID();
    //         const urineTestInstance = new UrineTestInstance();
    //         urineTestInstance.push(this.demographics.patient_id, userID, data);
    //         toastSuccess("Urine Test data saved successfully");
    //     }
    //
    //     else {
    //         toastWarning("Could not find concepts");
    //     }
    // },

    },
});
</script>

<style scoped></style>
