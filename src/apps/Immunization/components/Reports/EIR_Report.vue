<template>
  <ion-page>
    <NavigationMenu/>
    <ion-content class="ion-padding">
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
              Fixed
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
              {{ row.fixed.lessThan1y }}
            </td>
            <td
              :class="{
                'selected': selectedSection === 'fixed' || selectedColumn === 'fixedMoreThan1y'
              }"
            >
              {{ row.fixed.moreThan1y }}
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
    </ion-content>
  </ion-page>

  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonContent , IonPage} from '@ionic/vue';
  import NavigationMenu from './NavigationMenu.vue';
  
  export default defineComponent({
    name: 'TableComponent',
    components: { IonContent, IonPage, NavigationMenu },
    data() {
      return {
        selectedSection: '', // To keep track of the selected section
        selectedColumn: '',  // To keep track of the selected column
        tableData: [
          {
            label: 'OTD {some text}',
            fixed: { lessThan1y: 4, moreThan1y: 34 },
            outreach: { lessThan1y: 0, moreThan1y: 0 },
          },
          {
            label: 'Early {some text}',
            fixed: { lessThan1y: 23, moreThan1y: 23 },
            outreach: { lessThan1y: 0, moreThan1y: 0 },
          },
          {
            label: 'LLTM {some text}',
            fixed: { lessThan1y: 23, moreThan1y: 23 },
            outreach: { lessThan1y: 0, moreThan1y: 0 },
          },
          {
            label: 'GMPV {some text}',
            fixed: { lessThan1y: 10, moreThan1y: 1 },
            outreach: { lessThan1y: 0, moreThan1y: 0 },
          },
          {
            label: 'OPPV {some text}',
            fixed: { lessThan1y: 4, moreThan1y: 2 },
            outreach: { lessThan1y: 0, moreThan1y: 0 },
          },
          {
            label: 'OPPV {more text}',
            fixed: { lessThan1y: 10, moreThan1y: 23 },
            outreach: { lessThan1y: 0, moreThan1y: 0 },
          },
          {
            label: '{unclear text}',
            fixed: { lessThan1y: 9, moreThan1y: 23 },
            outreach: { lessThan1y: 0, moreThan1y: 0 },
          },
        ],
      };
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
    },
  });
  </script>
  
  

  <style scoped>
  ::v-deep ion-content {
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
    border-bottom: 1px solid #f0f0f0;
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
  }
  </style>
  