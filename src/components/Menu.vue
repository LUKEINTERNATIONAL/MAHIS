<template>
  <ion-menu side="start" content-id="main">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-accordion-group expand="inset">
        <ion-accordion value="first" @click="navigationMenu('home')">
          <ion-item slot="header" color="light">
            <ion-label class="header">Home</ion-label>
          </ion-item>
        </ion-accordion>
        <ion-accordion value="second">
          <ion-item slot="header" color="light">
            <ion-label class="header">Reports</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-accordion-group>
              <ion-accordion value="first">
                <ion-item slot="header">
                  <ion-label class="header">OPD Reports</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item @click="navigationMenu('setSessionDate')" class="list-content">MoH</ion-item>
                    <ion-item @click="navigationMenu('report')" class="list-content">Clinical Reports</ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
              <ion-accordion value="second">
                <ion-item slot="header">
                  <ion-label class="header">NCD Reports</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item @click="navigationMenu('setSessionDate')" class="list-content">MoH</ion-item>
                    <ion-item @click="navigationMenu('report')" class="list-content">Clinical Reports</ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
              <ion-accordion value="third">
                <ion-item slot="header">
                  <ion-label class="header">ANC Reports</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item @click="navigationMenu('setSessionDate')" class="list-content">MoH</ion-item>
                    <ion-item @click="navigationMenu('report')" class="list-content">Clinical Reports</ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>
        </ion-accordion>
        <ion-accordion value="third" v-if="isSuperuser">
          <ion-item slot="header" color="light">
            <ion-label class="header">Settings</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-accordion-group>
              <ion-accordion value="first">
                <ion-item slot="header">
                  <ion-label class="header">Configurations</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item class="list-bottom" @click="navigationMenu('setSessionDate')" value="Session Date">
                      Session Date
                    </ion-item>
                    <ion-item @click="navigationMenu('clinicaldays')" value="Session Date">
                      Clinical Days
                    </ion-item>
                    <ion-item @click="navigationMenu('setDDE')" value="DDE">
                      DDE
                    </ion-item>
                    <ion-item class="list-bottom" @click="navigationMenu('setLocation')" value="Location">
                      Location
                    </ion-item>
                    <ion-item @click="navigationMenu('setPreferences')" value="Preferences">
                      Preferences
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
              <ion-accordion value="second">
                <ion-item slot="header">
                  <ion-label>User Management</ion-label>
                </ion-item>
                <div class="content" slot="content">
                  <ion-list>
                    <ion-item class="list-bottom" @click="navigationMenu('users')" value="users">
                    Manage users
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { IonAccordion, IonAccordionGroup, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController } from "@ionic/vue";
import { defineComponent, ref, computed, onMounted } from "vue";
import { UserService } from "@/services/user_service";

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
  setup() {
    const user_data = ref<any>(null);

    onMounted(async () => {
      await fetchUserData();
    });

    async function fetchUserData() {
      const user = await UserService.getCurrentUser();
      if (user) {
        user_data.value = user;
      }
    }

    const isSuperuser = computed(() => {
      return user_data.value?.roles.some((role: any) => role.role === 'Superuser');
    });

    function navigationMenu(url: string) {
      menuController.close();
      this.$router.push(url);
    }

    return {
      isSuperuser,
      user_data,
      navigationMenu,
    };
  },
});
</script>
