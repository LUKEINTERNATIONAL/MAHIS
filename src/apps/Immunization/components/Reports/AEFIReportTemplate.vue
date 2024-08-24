<template>
    <ion-page>
      <NavigationMenu/>
      <ion-content class="ion-padding">

      </ion-content>
    </ion-page>
  
    </template>
    
    <script lang="ts">
    import { defineComponent } from 'vue';
    import { IonContent , IonPage} from '@ionic/vue';
    import NavigationMenu from './NavigationMenu.vue';
    import { mapState } from "pinia";
    import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
    
    export default defineComponent({
      name: 'TableComponent',
      components: { IonContent, IonPage, NavigationMenu },
      data() {
        return {

        };
      },
      watch: {
        $route: {
            async handler(data) {
              //if (data.name == "EIRReport")

            },
            deep: true,
        },
      },
      computed: {
        
      },
      async mounted() {

    },
      methods: {

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
    