<template>
  <ion-menu side="start" content-id="main" @ionDidOpen="onMenuOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content style="--background: #fff">
      <ion-accordion-group expand="inset" style="margin-inline: unset; margin-top: unset">
        <ion-accordion value="1" @click="navigationMenu('home')" toggle-icon="">
          <ion-item slot="header" color="light">
            <ion-icon :icon="homeOutline" slot="start" class="menu-icon"></ion-icon>
            <ion-label class="header lft-drpm">Home</ion-label>
          </ion-item>
        </ion-accordion>

        <ion-accordion value="2" @click="navigationMenu('scheduleImmunization')" toggle-icon="">
          <ion-item slot="header" color="light">
            <ion-icon :icon="calendarOutline" slot="start" class="menu-icon"></ion-icon>
            <ion-label class="header lft-drpm">Schedule Immunization</ion-label>
          </ion-item>
        </ion-accordion>

        <ion-accordion value="3" @click="navigationMenu('manageAppointMents')" toggle-icon="">
          <ion-item slot="header" color="light">
            <ion-icon :icon="listOutline" slot="start"></ion-icon>
            <ion-label class="header lft-drpm">Manage Appointments</ion-label>
          </ion-item>
        </ion-accordion>

        <ion-accordion value="4" @click="navigationMenu('stockManagement')" toggle-icon="">
          <ion-item slot="header" color="light">
            <ion-icon :icon="cubeOutline" slot="start"></ion-icon>
            <ion-label class="header lft-drpm">Inventory Management</ion-label>
          </ion-item>
        </ion-accordion>

        <ion-accordion value="5" @click="navigationMenu('Deduplicateclients')" toggle-icon="">
          <ion-item slot="header" color="light">
            <ion-icon :icon="peopleOutline" slot="start"></ion-icon>
            <ion-label class="header lft-drpm">De-Duplication</ion-label>
          </ion-item>
        </ion-accordion>
        <ion-accordion value="6" v-if="isSuperuser" style="border-radius: 0px">
          <ion-item slot="header" color="light">
            <ion-icon :icon="documentOutline" slot="start"></ion-icon>
            <ion-label class="header lft-drpm">Manage Records</ion-label>
          </ion-item>
          <div class="content" slot="content">
            <ion-list>
              <ion-item @click="navigationMenu('locationsManagement')" class="list-content">
                <ion-icon :icon="locationOutline" slot="start" class="sub-menu-icon"></ion-icon>
                <ion-label class="sub-menu-label">Location Management</ion-label>
              </ion-item>
              <ion-item @click="navigationMenu('OfflineRecords')" class="list-content">
                <ion-icon :icon="personOutline" slot="start" class="sub-menu-icon"></ion-icon>
                <ion-label>Client Management</ion-label>
              </ion-item>
            </ion-list>
          </div>
        </ion-accordion>
        <ion-accordion value="8">
          <ion-item slot="header" color="light">
            <ion-icon :icon="barChartOutline" slot="start"></ion-icon>
            <ion-label class="header lft-drpm">Reports</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-accordion-group>
              <ion-accordion value="first" v-if="programAttri[2].showReports">
                <ion-item slot="header">
                  <ion-icon :icon="medkitOutline" slot="start" class="sub-menu-icon"></ion-icon>
                  <ion-label class="header">OPD Reports</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item style="cursor: pointer" @click="navigationMenu('FacilityReports')" class="list-content">
                      <ion-icon :icon="businessOutline" class="sub-menu-icon" slot="start"></ion-icon>
                      <ion-label>Facility Reports</ion-label>
                    </ion-item>
                    <ion-item style="cursor: pointer" @click="navigationMenu('MoHReports')" class="list-content">
                      <ion-icon :icon="flagOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>MoH</ion-label>
                    </ion-item>
                    <ion-item style="cursor: pointer" @click="navigationMenu('ClinicalReports')" class="list-content">
                      <ion-icon :icon="medkitOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>Clinical Reports</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
              <ion-accordion value="seventh" v-if="programAttri[1].showReports">
                <ion-item slot="header">
                  <ion-icon :icon="medkitOutline" slot="start" class="sub-menu-icon"></ion-icon>
                  <ion-label class="header">NCD Reports</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item @click="navigationMenu('setSessionDate')" class="list-content">
                      <ion-icon :icon="flagOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>MoH</ion-label>
                    </ion-item>
                    <ion-item @click="navigationMenu('report')" class="list-content">
                      <ion-icon :icon="medkitOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>Clinical Reports</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
              <ion-accordion value="third" v-if="programAttri[0].showReports">
                <ion-item slot="header">
                  <ion-icon :icon="femaleOutline" slot="start" class="sub-menu-icon"></ion-icon>
                  <ion-label class="header">ANC Reports</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item @click="navigationMenu('setSessionDate')" class="list-content">
                      <ion-icon :icon="flagOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>MoH</ion-label>
                    </ion-item>
                    <ion-item @click="navigationMenu('report')" class="list-content">
                      <ion-icon :icon="medkitOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>Clinical Reports</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>

              <ion-item
                  v-if="programAttri[3].showReports"
                  @click="navigationMenu('EIPMReport')"
                  class="list-content"
                  style="cursor: pointer"
              >
                <ion-icon :icon="calendarNumberOutline" slot="start" class="sub-menu-icon"></ion-icon>
                <ion-label>EPI Monthly Report</ion-label>
              </ion-item>

              <ion-item
                  v-if="programAttri[3].showReports"
                  @click="navigationMenu('OverDueReport')"
                  class="list-content"
                  style="cursor: pointer"
              >
                <ion-icon :icon="alertCircleOutline" slot="start" class="sub-menu-icon"></ion-icon>
                <ion-label>EIR Overdue Report</ion-label>
              </ion-item>
            </ion-accordion-group>
          </div>
        </ion-accordion>
        <ion-accordion value="9" v-if="isSuperuser" style="border-radius: 0px">
          <ion-item slot="header" color="light">
            <ion-icon :icon="settingsOutline" slot="start"></ion-icon>
            <ion-label class="header lft-drpm">Settings</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-accordion-group>
              <ion-accordion value="first">
                <ion-item slot="header">
                  <ion-icon :icon="cogOutline" slot="start" class="sub-menu-icon"></ion-icon>
                  <ion-label class="header">Configurations</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item class="list-bottom menu-item" @click="navigationMenu('setSessionDate')" value="Session Date">
                      <ion-icon :icon="calendarOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>Session Date</ion-label>
                    </ion-item>
                    <ion-item class="menu-item" @click="navigationMenu('clinicaldays')" value="Session Date">
                      <ion-icon :icon="medicalOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>Clinical Days</ion-label>
                    </ion-item>
                    <ion-item class="menu-item" @click="navigationMenu('setDDE')" value="DDE">
                      <ion-icon :icon="syncOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>DDE</ion-label>
                    </ion-item>
                    <ion-item class="list-bottom menu-item" @click="navigationMenu('setSitePrefix')" value="setSitePrefix">
                      <ion-icon :icon="locationOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>Site Prefix</ion-label>
                    </ion-item>
                    <ion-item class="menu-item" @click="navigationMenu('setPreferences')" value="Preferences">
                      <ion-icon :icon="optionsOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>Preferences</ion-label>
                    </ion-item>
                    <ion-item @click="navigationMenu('setSmsConfig')" value="SMS" class="list-bottom menu-item">
                      <ion-icon :icon="chatbubbleOutline" slot="start" class="sub-menu-icon"></ion-icon>
                      <ion-label>Sms Alerts</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>

              <ion-item button @click="navigationMenu('users')">
                <ion-icon :icon="peopleOutline" slot="start" class="sub-menu-icon"></ion-icon>
                <ion-label class="header">User Management</ion-label>
              </ion-item>
            </ion-accordion-group>
          </div>
        </ion-accordion>
        <ion-accordion value="10" @click="navigationMenu('managePrinters')" toggle-icon="">
          <ion-item slot="header" color="light">
            <ion-icon :icon="printOutline" slot="start"></ion-icon>
            <ion-label class="header lft-drpm">Manage Printers</ion-label>
          </ion-item>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { IonAccordion, IonAccordionGroup, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController } from "@ionic/vue";
import { defineComponent, ref, computed, onMounted, onUpdated, watch } from "vue";
import {
  homeOutline,
  calendarOutline,
  listOutline,
  cubeOutline,
  settingsOutline,
  documentOutline,
  peopleOutline,
  barChartOutline,
  printOutline,
  locationOutline,
  personOutline,
  medkitOutline,
  businessOutline,
  flagOutline,
  heartOutline,
  femaleOutline,
  calendarNumberOutline,
  alertCircleOutline,
  cogOutline,
  medicalOutline,
  syncOutline,
  optionsOutline,
  chatbubbleOutline,
} from "ionicons/icons";
import { UserService } from "@/services/user_service";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { mapState } from "pinia";

export default defineComponent({
  name: "Menu",
  components: {
    IonAccordionGroup,
    IonAccordion,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
  },
  data() {
    return {
      programAttri: [
        {
          programId: 12,
          showReports: false,
        },
        {
          programId: 32,
          showReports: false,
        },
        {
          programId: 14,
          showReports: false,
        },
        {
          programId: 33,
          showReports: false,
        },
      ],
      selectedItem: null as string | null,
    };
  },
  watch: {
    currentProgramId: {
      async handler(data) {
        this.showPogramReports();
      },
      deep: true,
    },
  },
  async mounted() {
    this.showPogramReports();
  },
  computed: {
    ...mapState(useUserStore, ["currentProgramId"]),
  },
  setup() {
    const router = useRouter();
    const user_data = ref<any>(null);
    onMounted(async () => {
      // await fetchUserData();
    });
    async function fetchUserData() {
      const user = await UserService.getCurrentUser();
      if (user) {
        user_data.value = user;
      }
    }
    const isSuperuser = computed(() => {
      return user_data.value?.roles.some((role: any) => role.role === "Superuser" || role.role === "Superuser,Superuser,");
    });
    async function onMenuOpen() {
      await fetchUserData();
    }
    function navigationMenu(url: string) {
      try {
        menuController.close();
        router.push(url).then(() => {});
      } catch (error) {
        console.error(error)
      }
    }
    return {
      isSuperuser,
      user_data,
      navigationMenu,
      onMenuOpen,
      homeOutline,
      calendarOutline,
      listOutline,
      cubeOutline,
      documentOutline,
      peopleOutline,
      barChartOutline,
      settingsOutline,
      printOutline,
      locationOutline,
      personOutline,
      medkitOutline,
      businessOutline,
      flagOutline,
      heartOutline,
      femaleOutline,
      calendarNumberOutline,
      alertCircleOutline,
      cogOutline,
      medicalOutline,
      syncOutline,
      optionsOutline,
      chatbubbleOutline,
    };
  },
  methods: {
    showPogramReports(): void {
      this.programAttri.forEach((PA: any) => {
        if (PA.programId == this.currentProgramId) {
          PA.showReports = true;
        } else {
          PA.showReports = false;
        }
      });
    },
    selectItem(item: string) {
      this.selectedItem = item;
      this.navigationMenu(item);
    },
  },
});
</script>
<style scoped>
/* Adjust the width of the menu */
ion-menu {
  --width: 340px; /* Set the desired width */
}

/* Optional: Add a max-width for responsiveness */
@media (max-width: 768px) {
  ion-menu {
    --width: 250px;
  }
}

ion-item.list-content:hover {
  --background: #f0f4ff;
  --color: #1a73e8;
  transition: background 0.3s ease, color 0.3s ease;
}

ion-item.list-content.selected {
  --background: #e8f0fe;
  --color: #1a73e8;
}

ion-accordion {
  margin: 0 auto;
  border-radius: 0px;
  background-color: #fff;
  font-weight: 700;
}
ion-item {
  --background: #fff;
  --color: #7b7b7b !important;
}
ion-label {
  font-weight: 700;
  --color: #7b7b7b !important;
}
.sub-menu-icon {
  margin-right: 12px; /* Adjust the value to increase or decrease the gap */
}

ion-accordion.accordion-expanding,
ion-accordion.accordion-expanded {
  width: calc(100% - 32px);
  margin: 16px auto;
  background-color: #fff;
}
.list-md {
  background: unset;
}

.lft-drpm {
  margin-left: 10px;
}

.menu-item {
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #5a5a5a;
}

.menu-item:hover {
  --background: #f0f4ff;
  --color: #1a73e8;
  transition: background 0.3s ease, color 0.3s ease;
}

</style>