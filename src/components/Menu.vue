<template>
    <ion-menu side="start" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-accordion-group expand="inset">
                <ion-accordion value="first" @click="navigationMenu('home')" toggle-icon="">
                    <ion-item slot="header" color="light">
                        <ion-label class="header">Home</ion-label>
                    </ion-item>
                </ion-accordion>

                <ion-accordion value="fourth" @click="navigationMenu('stockManagement')" toggle-icon="">
                    <ion-item slot="header" color="light">
                        <ion-label class="header">Stock Management</ion-label>
                    </ion-item>
                </ion-accordion>
                <ion-accordion value="fifth" @click="navigationMenu('scheduleImmunization')" toggle-icon="">
                    <ion-item slot="header" color="light">
                        <ion-label class="header">Schedule Immunization</ion-label>
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
                                      <ion-item style="cursor: pointer" @click="navigationMenu('FacilityReports')" class="list-content">Facility Reports</ion-item>
                                      <ion-item style="cursor: pointer" @click="navigationMenu('MoHReports')" class="list-content">MoH</ion-item>
                                        <ion-item style="cursor: pointer" @click="navigationMenu('ClinicalReports')" class="list-content"
                                            >Clinical Reports</ion-item
                                        >
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
                            <ion-accordion value="fourth">
                                <ion-item slot="header">
                                    <ion-label class="header">EIR Reports</ion-label>
                                </ion-item>
                                <div class="content" slot="content">
                                    <ion-list>
                                        <ion-item @click="navigationMenu('EIPMReport')" class="list-content" style="cursor: pointer"
                                            >Indicators And Performance Metrics</ion-item
                                        >
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
                                        <ion-item @click="navigationMenu('clinicaldays')" value="Session Date"> Clinical Days </ion-item>
                                        <ion-item @click="navigationMenu('setDDE')" value="DDE"> DDE </ion-item>
                                        <ion-item class="list-bottom" @click="navigationMenu('setLocation')" value="Location"> Location </ion-item>
                                        <ion-item @click="navigationMenu('setPreferences')" value="Preferences"> Preferences </ion-item>
                                        <ion-item @click="navigationMenu('setSmsConfig')" value="SMS" class="list-bottom">Sms Alerts</ion-item>
                                    </ion-list>
                                </div>
                            </ion-accordion>
                            <ion-item button @click="navigationMenu('users')" color="light">
                                <ion-label>User Management</ion-label>
                            </ion-item>
                        </ion-accordion-group>
                    </div>
                </ion-accordion>
                <ion-accordion value="six" toggle-icon="" toggle-icon-slot="start" :readonly="true">
                    <ion-item slot="header" color="light">
                        <ion-label class="header" style="color: var(--ion-color-primary)" v-if="apiStatus">Online </ion-label>
                        <ion-label class="header" style="color: rgb(223, 78, 69)" v-if="!apiStatus">Offline</ion-label>
                    </ion-item>
                </ion-accordion>
                <ion-accordion value="fifth" @click="navigationMenu('manageAppointMents')">
                    <ion-item slot="header" color="light">
                        <ion-label class="header">Manage Appointments</ion-label>
                    </ion-item>
                </ion-accordion>
            </ion-accordion-group>
        </ion-content>
    </ion-menu>
</template>

<script lang="ts">
import { IonAccordion, IonAccordionGroup, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController } from "@ionic/vue";
import { defineComponent, ref, computed, onMounted, onUpdated } from "vue";
import { UserService } from "@/services/user_service";
import { useRouter } from "vue-router";
import { useStatusStore } from "@/stores/StatusStore";
import { storeToRefs } from "pinia";

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
        const router = useRouter();
        const user_data = ref<any>(null);
        const status = useStatusStore();
        const { apiStatus } = storeToRefs(status);
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
            return user_data.value?.roles.some((role: any) => role.role === "Superuser");
        });

        function navigationMenu(url: string) {
            menuController.close();
            router.push(url).then(() => {
                if (url === "users") {
                    router.go(0);
                }
            });
        }

        return {
            apiStatus,
            isSuperuser,
            user_data,
            navigationMenu,
        };
    },
});
</script>
