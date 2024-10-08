<template>
    <ion-header :translucent="true" class="primary_color_background">
        <div class="content_manager" style="margin-top: unset">
            <ion-toolbar class="content_width primary_color_background">
                <ion-menu-button slot="start" />
                <ion-title slot="start" style="cursor: pointer; padding-left: 0; line-height: 20px; padding: 0px" @click="nav('/home')">
                    <div style="display: block">
                        <div style="font-size: 16px">
                            <b>MaHIS</b><small> ({{ programs?.program?.applicationName }})</small>
                        </div>
                        <div>
                            <small class="facility-name" style="font-size: 68%">
                                {{ userFacilityName }}
                            </small>
                            <small style="font-size: 68%"> | {{ sessionDate }} </small>
                        </div>
                    </div>
                </ion-title>
                <div slot="end" class="search-input-desktop" style="width: 100%" v-if="screenWidth > 980">
                    <ToolbarSearch />
                </div>
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
                            <ion-item :button="true" :detail="false" @click="showUserProfile()" style="cursor: pointer">
                                <ion-icon :icon="personCircleOutline" slot="start"></ion-icon>
                                <span class="rght-drpm">{{ user_name }}</span>
                            </ion-item>
                            <ion-item :button="true" :detail="false" @click="nav('/login')" style="cursor: pointer">
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
import { notificationsOutline, personCircleOutline, logOutOutline } from "ionicons/icons";
import { defineComponent, ref } from "vue";
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
import ScreenSizeMixin from "@/views/Mixin/ScreenSizeMixin.vue";
export default defineComponent({
    mixins: [ScreenSizeMixin],
    name: "Toolbar",
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
        const user_name = ref()
        return {
            popoverOpen: false,
            iconsContent: icons,
            event: null as any,
            locationName: "",
            programName: "",
            showUserProfileModal: false,
            sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
            user_name,
        };
    },
    watch: {
        programs: {
            handler() {
                this.updateData();
            },
            deep: true,
        },
        user_ID: {
            handler() {
                this.assignUserName()
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useProgramStore, ["programs"]),
        ...mapState(useStatusStore, ["apiStatus"]),
        ...mapState(useUserStore, ["userFacilityName", "user_ID"]),
    },
    mounted() {
        this.updateData();
        this.assignUserName()
    },
    setup() {
        const { facilityName, facilityUUID, district } = useFacility();
        return { notificationsOutline, personCircleOutline, facilityName, logOutOutline };
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
        getUserName() {
            const store = useUserStore();
            const user = store.getUser()
            return user.username
        },
        assignUserName() {
            this.user_name = this.getUserName();
        }
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
    /* justify-content: center; */
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
