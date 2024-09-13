<template>
    <ion-header :translucent="true" class="primary_color_background">
        <div class="content_manager" style="margin-top: unset">
            <ion-toolbar class="content_width primary_color_background">
                <ion-menu-button slot="start" />
                <ion-title style="cursor: pointer; line-height: 20px" @click="nav('/home')">
                    <b>MaHIS</b><small> ({{ programs?.program?.applicationName }})</small>
                </ion-title>
                <ion-title style="cursor: pointer; line-height: 20px" @click="nav('/home')">
                    <small class="facility-name">
                        {{ userFacilityName }}
                    </small>
                    <small> | {{ sessionDate }} </small>
                </ion-title>
                <ion-buttons slot="end" class="search-input-desktop" style="max-width: 800px">
                    <ToolbarSearch />
                </ion-buttons>
                <div class="notifaction_person" slot="end">
                    <ion-buttons
                        v-if="apiStatus"
                        style="cursor: pointer; margin-right: 15px; color: #74ff15"
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
                    <ion-buttons style="cursor: pointer; margin-right: 5px" slot="end" class="iconFont">
                        <ion-icon :icon="notificationsOutline"></ion-icon>
                        <!-- <ion-badge slot="start" class="badge">9</ion-badge> -->
                    </ion-buttons>
                    <ion-buttons style="cursor: pointer" slot="end" @click="openPopover($event)" class="iconFont" id="popover-button">
                        <ion-icon :icon="personCircleOutline"></ion-icon>
                    </ion-buttons>
                </div>
                <ion-popover :is-open="popoverOpen" :show-backdrop="false" :dismiss-on-select="true" :event="event" @didDismiss="popoverOpen = false">
                    <ion-content>
                        <ion-list>
                            <ion-item :button="true" :detail="false" @click="showUserProfile()" style="cursor: pointer">Profile</ion-item>
                            <ion-item :button="true" :detail="false" @click="nav('/login')" style="cursor: pointer">Logout</ion-item>
                        </ion-list>
                    </ion-content>
                </ion-popover>
            </ion-toolbar>

            <ion-buttons slot="end" class="search-input-mobile" style="max-width: 600px">
                <ToolbarSearch />
            </ion-buttons>
        </div>
    </ion-header>
    <!-- <ion-header>
        <ion-toolbar color="dark" class="compact-toolbar">
            <ion-grid class="ion-no-padding content_width" style="margin-top: -3px">
                <ion-row class="ion-align-items-center">
                    <ion-col size="6">
                        <TruncateText style="margin-left: 10px" class="date-value" :text="userFacilityName" :maxLines="1" />
                    </ion-col>
                    <ion-col size="6" class="ion-text-right">
                        <TruncateText style="margin-right: 10px" class="date-value" :text="sessionDate" :maxLines="1" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-toolbar>
    </ion-header> -->

    <userProfile :show-modal="showUserProfileModal" @close-popoover="modalClosed" />
</template>

<script lang="ts">
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
import { notificationsOutline, personCircleOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import useFacility from "@/composables/useFacility";
import { Service } from "@/services/service";
import userProfile from "@/views/UserManagement/userProfile.vue";
import { useProgramStore } from "@/stores/ProgramStore";
import { useStatusStore } from "@/stores/StatusStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import TruncateText from "@/components/TruncateText.vue";
import { useUserStore } from "@/stores/userStore";
import { icons } from "@/utils/svg";
export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonSearchbar,
        IonPage,
        IonTitle,
        IonToolbar,
        ToolbarSearch,
        IonIcon,
        IonPopover,
        userProfile,
        IonRow,
        IonCol,
        IonLabel,
        TruncateText,
    },
    data() {
        return {
            popoverOpen: false,
            iconsContent: icons,
            event: null as any,
            locationName: "",
            programName: "",
            showUserProfileModal: false,
            sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
        };
    },
    watch: {
        programs: {
            handler() {
                this.updateData();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useProgramStore, ["programs"]),
        ...mapState(useStatusStore, ["apiStatus"]),
        ...mapState(useUserStore, ["userFacilityName"]),
    },
    mounted() {
        this.updateData();
    },
    setup() {
        const { facilityName, facilityUUID, district } = useFacility();
        return { notificationsOutline, personCircleOutline, facilityName };
    },
    methods: {
        updateData() {
            this.programName = Service.getProgramName();
        },
        nav(url: any) {
            this.$router.push(url);
        },
        openPopover(e: Event) {
            this.event = e;
            this.popoverOpen = true;
        },
        showUserProfile() {
            this.showUserProfileModal = true;
        },
        modalClosed() {
            this.showUserProfileModal = false;
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
    /* justify-content: center; */
}
.compact-toolbar {
    --min-height: 11px;
}

.date-value {
    color: #ffffff;
    font-size: 14px;
}
@media (max-width: 500px) {
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
