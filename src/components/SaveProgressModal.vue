<template>
    <div class="modal_wrapper">
        <div class="modal_title diplay_space_between">
            <span></span>
            <span @click="dismiss()" style="cursor: pointer; font-weight: 300">x</span>
        </div>
        <div class="center">
            <span v-html="iconsContent.triageWarning"></span>
        </div>
        <div class="center">
            <h4><b>Save the progress</b></h4>
        </div>
        <div class="center text_12">
            <p style="text-align: center">
                Save the updates for the consultation. You’ll be able to complete <br />
                it later. Click “Save” to save the progress.
            </p>
        </div>
        <br />
        <div class="triage_modal_btn center">
            <div class="center_btn">
                <ion-button class="primary_btn" @click="nav('patientProfile', 'save')"
                    >Save</ion-button
                >
                <span @click="nav('patientProfile', 'not_save')" style="cursor: pointer">
                    Don't Save</span
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import { resetPatientData } from "@/services/reset_data";
import { useGeneralStore } from "@/stores/GeneralStore";
import { mapState } from "pinia";

export default defineComponent({
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
    computed: {
        ...mapState(useGeneralStore, ["saveProgressStatus"]),
    },
    methods: {
        dismiss() {
            modalController.dismiss();
        },
        nav(url: any, action: any) {
            if (action == "not_save") resetPatientData();
            else {
                const demographicsStore = useGeneralStore();
                demographicsStore.setSaveProgressStatus(false);
            }
            this.dismiss();
            this.$router.push(url);
        },
    },
});
</script>

<style scoped>
.center {
    display: flex;
    justify-content: space-around;
}
.center_btn {
    display: flex;
    align-items: center;
    width: 170px;
    justify-content: space-between;
}
.text_12 {
    font-size: 12px;
}
</style>
