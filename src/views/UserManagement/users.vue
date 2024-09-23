<template>
    <ion-page>
      <NavigationMenu/>
      <ion-content :fullscreen="true">
          <dataTable 
            :colums="data_table_properties[0].columns" 
            :items="_items_" 
            :search_fields="_search_fields_" 
            @click-row="clickRow" 
          />
          <!-- <editUserModal 
            :is_open="isPopooverOpen" 
            :user_id="user_id" 
            @close-popoover="modalClosed" 
          /> -->
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { chevronBackOutline } from "ionicons/icons";
  import {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonIcon,
  } from "@ionic/vue";
  import Toolbar from "@/components/Toolbar.vue";
  import dataTable from "@/components/dataTable.vue";
  import editUserModal from "./editUserModal.vue";
  import { UserService } from "@/services/user_service";
  import NavigationMenu from '@/apps/Immunization/components/Reports/NavigationMenu.vue';
  import router from "@/router";
  import { ref, onMounted } from "vue";
  import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
  
  export default defineComponent({
    name: "Home",
    components: {
      IonContent,
      IonPage,
      IonRow,
      IonCol,
      IonIcon,
      Toolbar,
      dataTable,
      editUserModal,
      NavigationMenu,
    },
    setup() {
      const isPopooverOpen = ref(false);
      const user_data = ref([]);
      const _search_fields_ = ref([
        {
          value: "username",
          name: "username",
          selected: true,
        },
      ]);
      const user_id = ref("");
      const _items_ = ref<[]>([]);
  
      const data_table_properties = [
        {
          columns: [
            { text: "userId", value: "userId", sortable: true },
            { text: "Username", value: "username", sortable: true },
            { text: "First name", value: "firstname", sortable: true },
            { text: "Last name", value: "lastname", sortable: true },
            { text: "Gender", value: "gender", sortable: true },
            { text: "Role", value: "role", sortable: true },
            { text: "Programs", value: "programs", sortable: true },
          ],
          items: _items_,
          search_fields: _search_fields_,
        },
      ];
  
      onMounted(async () => {
        initNavData()
        await getUsers();
      });
  
      async function getUsers() {
        const userData = await UserService.getAllUsers();
        user_data.value = userData.map((item: any) => ({
          username: item.username,
          label: item.username,
          value: item.user_id,
          other: item,
        }));
  
        _items_.value = userData.map((item: any) => ({
          userId: item.user_id,
          username: item.username,
          roles: userRolesStr(item.roles),
          programs: userProgramsStr(item.programs),
          gender: item.person.gender,
          status: item.deactivated_on,
          firstName: userFirstname(item.person.names),
          lastName: userLastname(item.person.names),
        }));
      }
  
      function userRolesStr(items: any) {
        return items.map((item: any) => item.role)
      }
  
      function userFirstname(items: any) {
        return items.length > 0 ? items[items.length - 1].given_name : "";
      }
  
      function userLastname(items: any) {
        return items.length > 0 ? items[items.length - 1].family_name : "";
      }
  
      function userProgramsStr(items: any) {
        return items.map((item: any) => item.name)
      }
  
      function clickRow(data: any) {
        isPopooverOpen.value = true;
        user_id.value = data.userId;
      }
  
      function modalClosed() {
        isPopooverOpen.value = false;
        getUsers();
      }
  
      function nav(url: string) {
        router.push(url);
      }

      function initNavData() {
        const store = EIRreportsStore()
        store.setNavigationPayload('Manage Users', true, false, '/', 'home', '')
      }
  
      return {
        isPopooverOpen,
        user_id,
        _items_,
        _search_fields_,
        data_table_properties,
        clickRow,
        modalClosed,
        nav,
        chevronBackOutline,
        initNavData,
        getUsers
      };
    },
    watch: {
        $route: {
        async handler(data) {
          if (data.name == "users")
          this.initNavData()
          await this.getUsers();
        },
            deep: true,
        },
    },
  });
  </script>
  
  <style scoped>
  .back_profile {
    display: flex;
    justify-content: space-between;
    width: 140px;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    margin: 1%;
  }
  
  .text-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .content-container {
    overflow: auto;
  }
  
  .hide-overflow {
    overflow: hidden;
  }
  </style>