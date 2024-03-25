<template>
    <div class="modal_wrapper">
        <div class="modal_title diplay_space_between">
            <div class="diplay_space_between" style="min-width: 270px">
                <span>Vitals</span>
            </div>
            <span @click="dismiss()" style="cursor: pointer; font-weight: 300">x</span>
        </div>
        <div>
            <previousVitals />
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import previousVitals from "@/components/previousVisits/previousVitals.vue";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import ApexChart from "vue3-apexcharts";

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
        ApexChart,
        previousVitals,
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
        dismiss() {
            modalController.dismiss();
        },
    },
});
</script>

<style scoped>
.bmi_blood {
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #ddeedd;
    border-radius: 4px;
    padding: 4px;
    min-width: 190px;
}
._bmi {
    background-color: #ddeedd;
    color: #006401;
    padding: 5px;
    border-radius: 4px;
}
</style>
