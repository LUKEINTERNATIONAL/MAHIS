<template>
    <ion-page>
        <ion-header>
            <div class="header position_content">
                <div style="display: flex; align-items: center" @click="nav('/home')">
                    <ion-icon slot="separator" size="large" :icon="iconsContent.arrowLeft"></ion-icon>
                    <span style="padding-left: 10px">Go back</span>
                </div>
                <div></div>
                <div style="display: flex; align-items: center">
                    <ion-icon slot="separator" size="large" :icon="iconsContent.help"></ion-icon>
                    <span style="padding-left: 10px"> Need any help?</span>
                </div>
            </div>
        </ion-header>
        <ion-content style="--background: #fff">
            <div class="flex flex-col gap-2 mx-4 my-2">
                <div class="header">National id scanning</div>
                <!-- <ScannerReader @scannerData="onDecode" class="w-fit" /> -->
                <div class="flex flex-col gap-2 items-center justify-center mt-6 w-full">
                    <input
                        ref="barcodeInput"
                        autocomplete="off"
                        type="text"
                        class="w-full ml-4 p-2 rounded-lg bg-white"
                        style="width: 80vw; margin-left: 8px"
                        placeholder="Enter QR-code here"
                        v-model="barcode"
                    />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonItem, IonButton } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { icons } from "@/utils/svg";
import DynamicButton from "@/components/DynamicButton.vue";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { mapState, mapActions } from "pinia";

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        DynamicButton,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonButton,
    },
    data() {
        return {
            iconsContent: icons,
            platform: "" as any,
            barcode: "" as any,
        };
    },
    props: {
        status: {
            type: Boolean,
            default: true,
        },
        listData: {
            default: [] as any,
        },
        classNames: {
            default: "solid_bottom_border white" as any,
        },
    },
    computed: {
        ...mapState(useRegistrationStore, ["personInformation"]),
    },
    mounted() {},
    methods: {
        nav(url: any) {
            this.$router.push(url);
        },
    },
});
</script>

<style scoped>
.content {
    margin: 0 auto;
    width: 844px;
    width: 47vw;
    align-items: center;
}

.header {
    color: var(--text_color, #00190e);
    text-align: center;
    /* h1 */
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 50px;
    margin-bottom: 20px;
}

.camera {
    align-items: center;
    width: 45vw;
    height: 350px;
    margin: 0 auto;
    border-radius: 16px;
}

.tree_dots {
    font-size: 30px;
    font-weight: 700;
    color: #000;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 10px;
}

.scan_status {
    color: var(--text_color, #00190e);
    text-align: center;
    /* title-xs */
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    /* 24px */
    padding-bottom: 50px;
}

.scan_card {
    display: flex;
    width: 392px;
    height: 149px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.scan_instraction {
    display: flex;
    width: 392px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;

    color: var(--Secondary, #636363);
    /* text-md */
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    /* 21px */
}

.checklist {
    list-style-type: none;
    padding-left: 0;
}

.checklist li:before {
    content: "\2713";
    /* Unicode character for a check mark */
    color: green;
    /* Change the color of the check mark if needed */
    margin-right: 5px;
    /* Add some spacing between the check mark and the text */
}
</style>
