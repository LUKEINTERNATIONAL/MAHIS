<template>
    <ion-header :translucent="true" class="primary_color_background">
        <div class="content_manager" style="margin-top: unset">
            <ion-toolbar class="content_width primary_color_background">
                <ion-menu-button slot="start" />
                <ion-title slot="start" style="cursor: pointer; padding-left: 0; line-height: 20px; padding: 0px">
                    <div style="display: block">
                        <div style="font-size: 16px" @click="nav('/home')">
                            <b>MaHIS</b><small> ({{ activeProgram?.name }})</small>
                        </div>
                        <div :style="screenWidth <= 500 && userFacilityName.length > 23 ? 'display: block' : 'display: flex'">
                            <div class="facility-name" style="font-size: 68%">{{ userFacilityName }}</div>
                            <div style="font-size: 68%" @click="openSessionDateModal">
                                <span
                                    v-if="(screenWidth > 500 && userFacilityName.length > 23) || userFacilityName.length <= 23"
                                    style="margin-left: 5px"
                                    >|</span
                                >
                                <span style="color: #74ff15" v-if="HisDate.toStandardHisDisplayFormat(apiDate) == displaySessionDate">{{
                                    " " + displaySessionDate
                                }}</span>
                                <span style="color: #f00" v-else> {{ " " + displaySessionDate }}</span>
                            </div>
                        </div>
                    </div>
                </ion-title>
                <div slot="end" class="search-input-desktop" style="width: 100%" v-if="screenWidth > 980">
                    <ToolbarSearch />
                </div>
                <div class="notifaction_person" slot="end">
                    <ion-buttons style="cursor: pointer; margin-right: 10px" slot="end" class="iconFont">
                        <ve-progress
                            v-if="syncingCountPercentage < 100"
                            @click="openSyncModal"
                            font-color="#ffffff"
                            :color="!apiStatus && !isSyncingDone ? '#f00' : '#74ff15'"
                            :thickness="2"
                            font-size="7px"
                            :size="28"
                            :progress="syncingCountPercentage"
                        >
                            <template #default="{ counterTick }">
                                <div v-if="counterTick.currentValue < 100" style="top: -6px; position: relative">{{ counterTick.currentValue }}%</div>
                                <div v-if="counterTick.currentValue == 100" style="top: -6px; position: relative">Done</div>
                            </template>
                        </ve-progress>
                        <ion-icon
                            v-if="syncingCountPercentage == 100"
                            @click="openSyncModal"
                            :icon="cloudDone"
                            style="--ionicon-stroke-width: 80px; font-size: 28px; font-weight: 700; color: #74ff15"
                        ></ion-icon>
                    </ion-buttons>
                    <ion-buttons
                        v-if="apiStatus"
                        style="cursor: pointer; margin-right: 10px; color: #74ff15"
                        slot="end"
                        class="iconFont"
                        id="popover-button"
                    >
                        <ion-icon :icon="iconsContent.wifiOn"></ion-icon>
                    </ion-buttons>
                    <ion-buttons
                        v-if="!apiStatus"
                        style="cursor: pointer; margin-right: 15px; color: #f00"
                        slot="end"
                        class="iconFont"
                        id="popover-button"
                    >
                        <ion-icon :icon="iconsContent.WifiOff"></ion-icon>
                    </ion-buttons>

                    <ion-buttons style="cursor: pointer" slot="end" @click="openPopover" class="iconFont" id="popover-button">
                        <ion-icon :icon="personCircleOutline"></ion-icon>
                    </ion-buttons>
                </div>
                <ion-popover
                    :is-open="popoverOpen"
                    :show-backdrop="false"
                    :dismiss-on-select="true"
                    :event="popoverEvent"
                    @didDismiss="popoverOpen = false"
                >
                    <ion-content>
                        <ion-list>
                            <ion-item :button="true" :detail="false" @click="showUserProfile" style="cursor: pointer">
                                <ion-icon :icon="personCircleOutline" slot="start"></ion-icon>
                                <span class="rght-drpm">{{ userName }}</span>
                            </ion-item>
                            <ion-item :button="true" @click="openSyncModal" style="cursor: pointer">
                                <ion-icon :icon="documentOutline" slot="start"></ion-icon>
                                <span class="rght-drpm">Syncing status</span>
                            </ion-item>
                            <ion-item :button="true" :detail="false" @click="logout" style="cursor: pointer">
                                <ion-icon :icon="logOutOutline" slot="start"></ion-icon>
                                <span class="rght-drpm">Logout</span>
                            </ion-item>
                        </ion-list>
                    </ion-content>
                </ion-popover>
            </ion-toolbar>

            <div slot="end" v-if="screenWidth <= 980" style="width: 100%">
                <ToolbarSearch />
            </div>
        </div>
    </ion-header>

    <userProfile :show-modal="showUserProfileModal" @close-popoover="modalClosed" />
</template>

<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonRow,
    IonCol,
    IonLabel,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonSearchbar,
    IonPopover,
} from "@ionic/vue";
import { notificationsOutline, personCircleOutline, logOutOutline, documentOutline, sync, cloudDone } from "ionicons/icons";
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import useFacility from "@/composables/useFacility";
import { Service } from "@/services/service";
import userProfile from "@/views/UserManagement/userProfile.vue";
import { useProgramStore } from "@/stores/ProgramStore";
import { useStatusStore } from "@/stores/StatusStore";
import { storeToRefs } from "pinia";
import HisDate from "@/utils/Date";
import TruncateText from "@/components/TruncateText.vue";
import { useUserStore } from "@/stores/userStore";
import { icons } from "@/utils/svg";
import { useWindowSize } from "@/composables/screenSize";
import { createModal } from "@/utils/Alerts";
import SyncingStatusModal from "./Modal/SyncingStatusModal.vue";
import SessionDate from "@/components/Modal/SessionDate.vue";
import { useConfigStore } from "@/stores/ConfigStore";
import { VeProgress } from "vue-ellipse-progress";
import { getFieldValue, getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";

// Component setup
const router = useRouter();
const { facilityName, facilityUUID, district } = useFacility();
const { screenWidth } = useWindowSize();

// Store refs
const programStore = useProgramStore();
const statusStore = useStatusStore();
const userStore = useUserStore();
const configStore = useConfigStore();

const { activeProgram } = storeToRefs(programStore);
const { apiStatus, isSyncingDone, syncingCountPercentage } = storeToRefs(statusStore);
const { userFacilityName, user_ID } = storeToRefs(userStore);
const { sessionDate } = storeToRefs(configStore);

// Local refs
const popoverOpen = ref(false);
const popoverEvent = ref(null);
const locationName = ref("");
const apiDate = ref("");
const showUserProfileModal = ref(false);
const displaySessionDate = ref(HisDate.toStandardHisDisplayFormat(Service.getSessionDate()));
const userName = ref("");
const iconsContent = icons;

// Methods
const logout = () => {
    localStorage.setItem("apiKey", "");
    nav("/login");
};

const openSyncModal = () => {
    createModal(SyncingStatusModal);
};

const openSessionDateModal = () => {
    createModal(SessionDate, { class: "mediumModal" });
};

const nav = (url: string) => {
    router.push(url);
};

const openPopover = (e: any) => {
    popoverEvent.value = e;
    popoverOpen.value = true;
};

const showUserProfile = () => {
    showUserProfileModal.value = true;
};

const modalClosed = () => {
    showUserProfileModal.value = false;
};

const getUserName = () => {
    const store = useUserStore();
    const user = store.getUser();
    return user.username;
};

const assignUserName = () => {
    userName.value = getUserName();
};

watch(
    () => sessionDate.value,
    () => {
        displaySessionDate.value =
            getFieldValue(sessionDate.value, "sessionDate", "value") || HisDate.toStandardHisDisplayFormat(Service.getSessionDate());
    },
    { deep: true }
);

watch(
    () => user_ID.value,
    () => {
        assignUserName();
    },
    { deep: true }
);

// Mounted
onMounted(async () => {
    apiDate.value = await Service.getApiDate();
    assignUserName();
});
</script>

<style scoped>
.rotating-icon {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

.rght-drpm {
    margin-left: 10px;
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

.iconFont {
    font-size: 30px;
}

.badge {
    position: relative;
    background: #c82424;
    border: 2px solid #fff;
    border-radius: 50%;
    min-width: 25px;
    padding: 5px;
    display: inline-block;
    font-size: 10px;
    text-align: center;
    top: -12px;
    left: -18px;
    color: #fff;
}

.notifaction_person {
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
    align-items: center;
}

.compact-toolbar {
    --min-height: 11px;
}

.date-value {
    color: #ffffff;
    font-size: 14px;
}

@media (max-width: 200px) {
    .facility-name {
        display: inline-block;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: bottom;
    }
}
</style>
