<template>
    <div class="modal_wrapper" style="--height: none">
        <div class="modal_title diplay_space_between">
            <span></span>
            <span @click="dismiss()" style="cursor: pointer; font-weight: 300">x</span>
        </div>
        <div>
            <div class="title">
                Does the {{ programID() != 33 ? "patient" : "client" }} have <br />
                a National ID card?
            </div>
            <div class="content">
                <ion-card class="nationalIDCard">
                    <ion-icon slot="start" :icon="iconsContent.scanner" aria-hidden="true"></ion-icon>
                    <div>
                        <ion-button style="padding-top: 10px" @click="checkDevice()" fill="solid">Yes, I need to scan it</ion-button>
                    </div>
                    <div>
                        <ion-button fill="clear" @click="nav('registration/manual')"> No ID</ion-button>
                    </div>
                </ion-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import { resetDemographics } from "@/services/reset_data";
import { Service } from "@/services/service";
import { scannedData, extractDetails } from "@/services/national_id";
import SetPersonInformation from "@/views/Mixin/SetPersonInformation.vue";
import DeviceDetection from "@/views/Mixin/DeviceDetection.vue";
export default defineComponent({
    mixins: [DeviceDetection, SetPersonInformation],
    name: "Menu",
    components: {
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
            iconsContent: icons,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        checkDevice() {
            if (this.isMobile) this.scanCode();
            else this.nav("registration/scan");
        },
        async scanCode() {
            const dataScanned: any = await scannedData();
            const dataExtracted: any = await extractDetails(dataScanned);
            await this.setPersonInformation(dataExtracted);
            this.$router.push("/registration/manual");
        },
        programID() {
            return Service.getProgramID();
        },
        dismiss() {
            modalController.dismiss();
        },
        nav(url: any) {
            this.dismiss();
            resetDemographics();
            this.$router.push(url);
        },
    },
});
</script>

<style scoped>
.title {
    text-align: center;
    padding: 50px 0px 40px 0px;
    font-weight: 700;
    font-size: 24px;
}

.content {
    display: flex;
    justify-content: center;
}
</style>
