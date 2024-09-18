<template>

        <ion-row>
          <ion-col>
              <h1 style="width: 100%; text-align: left; font-weight: 400">Immunization</h1>
          </ion-col>
        </ion-row>

        <ion-fab slot="fixed" horizontal="end" vertical="top" @click="exportReportToCSV">
          <ion-fab-button>
            <ion-icon :icon="downloadOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <table class="custom-table">
          <colgroup>
            <col style="width: 20%;" />
            <col style="width: 20%;" />
            <col style="width: 20%;" />
            <col style="width: 20%;" />
            <col style="width: 20%;" />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th
                colspan="2"
                @click="selectSection('fixed')"
                :class="{ 'selected': selectedSection === 'fixed' }"
              >
                Static
              </th>
              <th
                colspan="2"
                @click="selectSection('outreach')"
                :class="{ 'selected': selectedSection === 'outreach' }"
              >
                Outreach
              </th>
            </tr>
            <tr>
              <th></th>
              <th
                @click="selectColumn('fixedLessThan1y')"
                :class="{ 'selected': selectedColumn === 'fixedLessThan1y' }"
              >
                &lt;1y
              </th>
              <th
                @click="selectColumn('fixedMoreThan1y')"
                :class="{ 'selected': selectedColumn === 'fixedMoreThan1y' }"
              >
                &gt;1y
              </th>
              <th
                @click="selectColumn('outreachLessThan1y')"
                :class="{ 'selected': selectedColumn === 'outreachLessThan1y' }"
              >
                &lt;1y
              </th>
              <th
                @click="selectColumn('outreachMoreThan1y')"
                :class="{ 'selected': selectedColumn === 'outreachMoreThan1y' }"
              >
                &gt;1y
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in tableData"
              :key="index"
            >
              <td>{{ row.label }}</td>
              <td
                :class="{
                  'selected': selectedSection === 'fixed' || selectedColumn === 'fixedLessThan1y'
                }"
              >
                 <pan @click="openPersonCardComponent(row.fixed.lessThan1yPersons)"> {{ row.fixed.lessThan1y }}</pan>
              </td>
              <td
                :class="{
                  'selected': selectedSection === 'fixed' || selectedColumn === 'fixedMoreThan1y'
                }"
              >
                <pan @click="openPersonCardComponent(row.fixed.moreThan1yPersons)"> {{ row.fixed.moreThan1y }}</pan>
              </td>
              <td
                :class="{
                  'selected': selectedSection === 'outreach' || selectedColumn === 'outreachLessThan1y'
                }"
              >
                <input
                  v-model="row.outreach.lessThan1y"
                  class="editable-input"
                />
              </td>
              <td
                :class="{
                  'selected': selectedSection === 'outreach' || selectedColumn === 'outreachMoreThan1y'
                }"
              >
                <input
                  v-model="row.outreach.moreThan1y"
                  class="editable-input"
                />
              </td>
            </tr>
          </tbody>
        </table>

  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent , IonPage, IonRow, IonCol, IonFab, IonFabButton, } from '@ionic/vue';
import NavigationMenu from './NavigationMenu.vue';
import { mapState } from "pinia";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";
import { getVaccinesAdministered, getImmunizationDrugs, exportReportToCSV } from "@/apps/Immunization/services/vaccines_service";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import { add, fileTray, downloadOutline } from 'ionicons/icons';
import PersonCardComponent from "@/apps/Immunization/components/Modals/PersonCardComponent.vue"
import { createModal } from "@/utils/Alerts";
import { PatientService } from "@/services/patient_service";

export default defineComponent({
    name: 'TableComponent',
    mixins: [SetDemographics],
    components: { IonContent, IonPage, IonFab, IonFabButton, NavigationMenu,  IonRow, IonCol, PersonCardComponent },
    data() {
      return {
        selectedSection: '', // To keep track of the selected section
        selectedColumn: '',  // To keep track of the selected column
        tableData: [] as any,
        fileTray,
        downloadOutline,
        exportReportToCSV,
        peopleArray: [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 30, dob: '1993-05-15', sex: 'Male' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', age: 28, dob: '1995-09-22', sex: 'Female' },
        // Add more people as needed
      ],
      };
    },
    watch: {
      $route: {
          async handler(data) {
            if (data.name == "EIRReport")
            await this.getDrugs()
            await this.initReport()
          },
          deep: true,
      },
    },
    computed: {
      ...mapState(EIRreportsStore, ["start_date", "end_date", "navigationPayload"]), 
    },
    async mounted() {
      await this.getDrugs()
      await this.initReport()
  },
    methods: {
      selectSection(section: string) {
        this.selectedSection = section;
        this.selectedColumn = ''; // Reset column selection when section is selected
      },
      selectColumn(column: string) {
        this.selectedColumn = column;
        this.selectedSection = ''; // Reset section selection when column is selected
      },
      async initReport() {
      const data = await getVaccinesAdministered(this.start_date, this.end_date)
      data.less_than_one_year.forEach((item: any) => {this.fillCells(item, 'lessThan1y')})
      data.greater_than_one_year.forEach((item: any) => {this.fillCells(item, 'moreThan1y')})
      },
      fillCells(AV: any, r_key: string) {
        this.tableData.forEach((t_data: any) => {
          if (t_data.drug.drug_id == AV.drug_inventory_id) {
            if (r_key in t_data.fixed) {
              let data_key = r_key+'Persons'
              let value =  t_data.fixed[r_key];
              t_data.fixed[r_key] = value+1
              t_data.fixed[data_key].push(AV)
            }
          }
        })
      },
      async getDrugs() {
        const data = await getImmunizationDrugs()
        const items = [] as any 
        data.forEach((drug: any) => {
          const row_item = {
            label: drug.name,
            fixed: { lessThan1y: 0, moreThan1y: 0, lessThan1yPersons: [], moreThan1yPersons: []},
            outreach: { lessThan1y: 0, moreThan1y: 0 },
            drug: drug
          }
          items.push(row_item)
        })
        this.tableData = items
        const store = EIRreportsStore()
        store.setImmunizationMonthlyRepoartData(this.tableData)
      },
      openPersonCardComponent(clients: []) {
        const handleModalAction = (event: CustomEvent<any>) => {
            // console.log('Action received from modal:', event.detail);
            this.openPatientProfile(event.detail.client_id)
        };

        const dataToPass = {'people': clients, heading_text: `Immunization (Client Drill Down | ${this.navigationPayload.subTxt})`}
        createModal(PersonCardComponent, { class: "large-modal" }, true, dataToPass, { 'view-client': handleModalAction });
      },
      async openPatientProfile(client_id: any) {
        const patientData = await PatientService.findByID(client_id);
        const patientData2 = await PatientService.findByNpid(patientData.patient_identifiers[0].identifier);
        this.setDemographics(patientData2[0]);
        this.$router.push("patientProfile");
      }
    },
  });
  </script>

<style scoped>
::v-deep(ion-content) {
    --background: white;
}

.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
}

.custom-table th,
.custom-table td {
  padding: 8px;
  text-align: center;
  cursor: pointer;
}

.custom-table th {
  background-color: #f3f3f3;
  border: 1px solid #f0f0f0;
}

.custom-table tr:nth-child(even) {
  background-color: white;
}

/* Make the second column line blue */
.custom-table th:nth-child(1),
.custom-table td:nth-child(1) {
  border-right: 1px solid #006401;
}

/* Make the first and second row lines in the header blue, starting from the second column */
.custom-table thead tr:nth-child(1) th:not(:first-child),
.custom-table thead tr:nth-child(2) th:not(:first-child) {
  border-bottom: 1px solid #006401;
}

/* Remove left border from the first column */
.custom-table th:first-child,
.custom-table td:first-child {
  border-left: none;
}

/* Remove top border from the first row */
.custom-table thead tr:first-child th {
  border-top: none;
}

/* Remove vertical borders from body cells */
.custom-table tbody td {
  border-left: none;
  border-right: none;
}

/* Keep the vertical border for the first column */
.custom-table tbody td:first-child {
  border-right: 1px solid #006401;
}

/* Ensure horizontal borders remain for body rows */
.custom-table tbody td {
  border-bottom: 1px solid #acabab;
}

/* Remove bottom border from the last row */
.custom-table tbody tr:last-child td {
  border-bottom: none;
}

.custom-table .selected {
  background-color: #c0c0ff;
}

.editable-input {
  width: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
  outline: none;
  font-size: 14px;
}

.editable-input:focus {
  background-color: #e0e0ff;
  border: 1px solid #006401;
}
</style>