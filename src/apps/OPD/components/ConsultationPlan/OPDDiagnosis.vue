<template>
  <div class="custom_card" style="padding: 10px">
    <DashBox :status="no_item" :content="'No Diagnosis added'" />

    <span v-if="display_item">
<!--      <div style="font-weight: 700; margin-left:2.5%">Diagnosis list</div>-->
            <list :listData="OPDdiagnosis[0].selectedData" @clicked:edit="editDiagnosis($event)" @clicked:delete="deleteDiagnosis"> </list>
            <div v-if="primaryDiagnosisExists" style="color: red; margin-top: 10px;">
  In order to update the diagnosis list, please remove/delete the primary diagnosis only and then re-add or change it along with the secondary and differential diagnoses.
  </div>
    </span>
    <ion-row v-if="search_item">
      <basic-form
          :initialData="initialData"
          :contentData="OPDdiagnosis"
          @update:selected="handleInputData"
          @update:inputValue="handleInputData"
          :disabled="primaryDiagnosisExists"
          @clicked:button="addNewRow"
          @search-change="getDiagnosis"
      >
      </basic-form>
    </ion-row>
    <ion-row v-if="addItemButton" style="margin-top: 10px">
      <DynamicButton fill="clear" :icon="iconsContent.plus" iconSlot="icon-only" @clicked:btn="displayInputFields()" name="Add new Diagnosis" />
    </ion-row>
  </div>
  <ion-row>
    <ion-accordion-group ref="accordionGroup" class="previousView">
      <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
        <ion-item slot="header" color="light">
          <ion-label class="previousLabel">Previous Diagnosis</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
          <previousDiagnosis />
        </div>
      </ion-accordion>
    </ion-accordion-group>
  </ion-row>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { PatientDiagnosisService } from "@/services/patient_diagnosis_service";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useOPDDiagnosisStore } from "@/apps/OPD/stores/DiagnosisStore";
import { mapState } from "pinia";
import {toastWarning, popoverConfirmation, toastDanger} from "@/utils/Alerts";
import List from "@/components/List.vue";
import BasicForm from "@/components/BasicForm.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { Service } from "@/services/service";
import previousDiagnosis from "@/apps/OPD/components/ConsultationPlan/previousVisits/previousDiagnosis.vue";
import { Diagnosis } from "../../services/diagnosis";
import { getFieldValue, modifyFieldValue } from "@/services/data_helpers";

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
    IonInput,
    IonPopover,
    DashBox,
    SelectionPopover,
    BasicInputField,
    List,
    BasicForm,
    DynamicButton,
    previousDiagnosis,
  },
  data() {
    return {
      iconsContent: icons,
      no_item: false,
      search_item: false,
      display_primary: true,
      display_item: false,
      addItemButton: true,
      selectedText: "" as any,
      conditionStatus: "" as any,
      data: [] as any,
      diagnosisData: [] as any,
      popoverOpen: false,
      event: "" as any,
      selectedCondition: "" as any,
      selected: null,
      diagnoses: [] as any,
      initialData:[] as any,
    };
  },
  setup() {
    return { checkmark, pulseOutline };
  },
  computed: {
    ...mapState(useOPDDiagnosisStore, ["OPDdiagnosis"]),
    primaryDiagnosisExists() {
      return this.OPDdiagnosis[0].selectedData.some((diagnosis: any) => diagnosis.data.concept_id === 6542);
    },
    primaryInputField() {
      return this.OPDdiagnosis[0].data.rowData[0].colData;
    },
    secondaryInputField() {
      return this.OPDdiagnosis[2].data.rowData[0].colData;
    },
    differentialInputField() {
      return this.OPDdiagnosis[3].data.rowData[0].colData;
    },
  },
  watch: {
    OPDdiagnosis: {
      handler() {
        this.setDashedBox();
      },
      deep: true,
    },
  },
  async mounted() {
    this.updateDiagnosisStores();
    const OPDDiagnosis=useOPDDiagnosisStore()
    this.initialData=OPDDiagnosis.getInitial()
    this.setDashedBox();
    await this.getDiagnosis("");
  },
  methods: {
    displayInputFields() {
      this.conditionStatus = "";
      this.selectedText = "";
      this.no_item = false;
      this.addItemButton = false;
      this.search_item = true;
    },
    async validaterowData(col = { name: "secondaryDiagnosis" }) {
      modifyFieldValue(this.OPDdiagnosis, "secondaryDiagnosis", "alertsErrorMassage", "");
      modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "alertsErrorMassage", "");
      modifyFieldValue(this.OPDdiagnosis, "differentialDiagnosis", "alertsErrorMassage", "");

      const primaryDiagnosis = getFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "value");
      const secondaryDiagnosis = getFieldValue(this.OPDdiagnosis, "secondaryDiagnosis", "value");
      const differentialDiagnosis = getFieldValue(this.OPDdiagnosis, "differentialDiagnosis", "value");

      if (primaryDiagnosis.name) {
        const primaryExists = this.OPDdiagnosis[0].selectedData.some((obj: any) => obj.data.concept_id === 6542);
        if (primaryExists) {
          modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "alertsErrorMassage", "Only one primary diagnosis can be added. Delete the existing one to change.");
          toastDanger("Only one primary diagnosis is allowed. Delete one added if you want to change");
          return false;
        }
      }

      const secondaryExists = secondaryDiagnosis && secondaryDiagnosis.length > 0;
      const differentialExists = differentialDiagnosis && differentialDiagnosis.length > 0;

      if (secondaryExists && secondaryDiagnosis.some((sd: any) => sd.name === primaryDiagnosis.name)) {
        modifyFieldValue(this.OPDdiagnosis, "secondaryDiagnosis", "alertsErrorMassage", `${primaryDiagnosis.name} is already selected as primary diagnosis.`);
        return false;
      }

      if (differentialExists && differentialDiagnosis.some((dd: any) => dd.name === primaryDiagnosis.name)) {
        modifyFieldValue(this.OPDdiagnosis, "differentialDiagnosis", "alertsErrorMassage", `${primaryDiagnosis.name} is already selected as primary diagnosis.`);
        return false;
      }

      if (secondaryExists && differentialExists) {
        const hasOverlap = secondaryDiagnosis.some((sd:any) => differentialDiagnosis.some((dd:any) => dd.name === sd.name));
        if (hasOverlap) {
          modifyFieldValue(this.OPDdiagnosis, "secondaryDiagnosis", "alertsErrorMassage", "Secondary and differential diagnoses cannot overlap.");
          return false;
        }
      }

      if (!primaryDiagnosis?.name) {
        modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "alertsErrorMassage", "Primary diagnosis is required.");
        return false;
      }
      return true;
    },



    async addNewRow() {
      if (await this.validaterowData()) {
        this.buildDiagnosis();

        this.search_item = false;
        this.display_item = true;
        this.addItemButton = true;
        this.display_primary = false;

        this.OPDdiagnosis[0].data.rowData[0].colData[0].value = "";
        this.OPDdiagnosis[2].data.rowData[0].colData[0].value = "";
        this.OPDdiagnosis[3].data.rowData[0].colData[0].value = "";




        modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "inputFieldDisplayNone", false);
        modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "colSize", "");
      }
    },

    buildDiagnosis() {
      const diagnosis = [];
      const existingDiagnoses = this.OPDdiagnosis[0].selectedData.map((d: { name: string }) => d.name);

      if (this.primaryInputField[0]?.value?.name && !existingDiagnoses.includes(this.primaryInputField[0].value.name)) {
        const primaryExists = this.OPDdiagnosis[0].selectedData.some((obj: any) => obj.data.concept_id === 6542);

        if (!primaryExists) {
          diagnosis.push({
            actionBtn: true,
            btn: ["delete"],
            name: this.primaryInputField[0].value.name,
            id: this.primaryInputField[0].value.concept_id,
            display: [this.primaryInputField[0].value.name, "Primary diagnosis"],
            data: {
              concept_id: 6542,
              value_coded: this.primaryInputField[0].value.concept_id,
              obs_datetime: Service.getSessionDate(),
            },
          });
        } else {
          toastDanger("Only one primary diagnosis is allowed")
          return false;
        }
      }

      if (this.secondaryInputField[0].value) {
        this.secondaryInputField[0].value.forEach((item: any) => {
          if (!existingDiagnoses.includes(item.name)) {
            diagnosis.push({
              actionBtn: true,
              btn: ["delete"],
              name: item.name,
              id: item.concept_id,
              display: [item.name, "Secondary diagnosis"],
              data: {
                concept_id: 6543,
                value_coded: item.concept_id,
                obs_datetime: Service.getSessionDate(),
              },
            });
          }
        });
      }

      if (this.differentialInputField[0].value) {
        this.differentialInputField[0].value.forEach((item: any) => {
          if (!existingDiagnoses.includes(item.name)) {
            diagnosis.push({
              actionBtn: true,
              btn: ["delete"],
              name: item.name,
              id: item.concept_id,
              display: [item.name, "Differential diagnosis"],
              data: {
                concept_id: 10201,
                value_coded: item.concept_id,
                obs_datetime: Service.getSessionDate(),
              },
            });
          }
        });
      }

      if (diagnosis.length > 0) {
        this.OPDdiagnosis[0].selectedData = [...this.OPDdiagnosis[0].selectedData, ...diagnosis];
      }

      return true;
    },



    compareArrays(array1: any, array2: any) {
      return array1.reduce((result: any, obj1: any) => {
        const match = array2.find((obj2: any) => obj2.name === obj1.name);
        if (match) result.push(match.display[1]);
        return result;
      }, []);
    },
    updateDiagnosisStores() {
      const diagnosisStore = useOPDDiagnosisStore();
      diagnosisStore.setOPDDiagnosis(this.OPDdiagnosis);
    },
    openPopover(e: any) {
      this.event = e;
      this.popoverOpen = true;
    },
    async handleInputData(col: any) {
      modifyFieldValue(this.OPDdiagnosis, "secondaryDiagnosis", "alertsErrorMassage", "");
      modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "alertsErrorMassage", "");
      modifyFieldValue(this.OPDdiagnosis, "differentialDiagnosis", "alertsErrorMassage", "");
      await this.getDiagnosis(col.value);
      this.validaterowData(col);
    },
    async getDiagnosis(value: any) {
      this.diagnoses = await PatientDiagnosisService.getDiagnosis(value, 1, 5);
      modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "multiSelectData", this.diagnoses);
      modifyFieldValue(this.OPDdiagnosis, "secondaryDiagnosis", "multiSelectData", this.diagnoses);
      modifyFieldValue(this.OPDdiagnosis, "differentialDiagnosis", "multiSelectData", this.diagnoses);
      return this.diagnoses;
    },
    editDiagnosis(test: any) {
      this.deleteDiagnosis(test);
      this.selectedText = test.name;
      this.OPDdiagnosis[0].data.rowData[0].colData[0].value = test.name;
      this.addItemButton = false;
      this.search_item = true;
      this.updateDiagnosisStores();
    },
    async openDeletePopover(e: any) {
      const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${e.name} ?`, e.event);
      if (deleteConfirmed) {
        this.deleteDiagnosis(e.name);
      }
    },
    deleteDiagnosis(OPDdiagnosis: any) {
      const originalData = this.OPDdiagnosis[0].selectedData;
      const diagnosisToRemove = OPDdiagnosis.name;
      const filteredData = originalData.filter((item: any) => item.display[0] !== diagnosisToRemove);
      const removedItems = originalData.filter((item: any) => item.display[0] === diagnosisToRemove);
      this.OPDdiagnosis[0].selectedData = filteredData;

      if (removedItems[0].data.concept_id == 6542) {
        modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "inputFieldDisplayNone", false);
        modifyFieldValue(this.OPDdiagnosis, "primaryDiagnosis", "colSize", "");
      }

      console.log("Removed Items:", removedItems[0].data.concept_id);
    },
    setDashedBox() {
      if (this.primaryInputField[0]?.value?.name || this.primaryInputField[1]?.value?.name) {
        this.addItemButton = false;
        this.search_item = true;
        this.no_item = false;
      }
      if (this.OPDdiagnosis[0].selectedData.length > 0) {
        this.display_item = true;
        this.no_item = false;
      } else if (!this.search_item) {
        this.no_item = true;
      }
      this.addItemButton = !this.primaryDiagnosisExists;
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.action_buttons {
  color: var(--ion-color-primary);
  display: flex;
  align-items: center;
  float: right;
  max-width: 70px;
}
.modify_buttons {
  padding-left: 20px;
}
.item_no_border {
  --border-color: transparent;
}
.search_result {
  padding: 10px;
}
.previousView {
  margin-top: 70px;
  margin-bottom: 20px;
}
</style>