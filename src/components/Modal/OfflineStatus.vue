<template>
    <div>
        <k-progress :percent="40" active></k-progress>
        <k-progress :percent="60" active active-color="#f12711"></k-progress>
        <k-progress :percent="80" active :color="['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']"></k-progress>
        <k-progress :percent="100" :color="['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']" :color-flow="true"></k-progress>
    </div>
</template>
<script lang="ts">
import {
    IonIcon,
    IonFab,
    IonFabButton,
    IonFabList,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonCard,
    IonButton,
    modalController,
    IonPopover,
} from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { Service } from "@/services/service";
import img from "@/utils/Img";
import ImmunizationTrendsGraph from "@/apps/Immunization/components/Graphs/ImmunizationTrendsGraph.vue";
import ImmunizationGroupGraph from "@/apps/Immunization/components/Graphs/ImmunizationGroupGraph.vue";
import { getVaccinesData } from "@/apps/Immunization/services/dashboard_service";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { mapState } from "pinia";
import { UserService } from "@/services/user_service";
import SetUser from "@/views/Mixin/SetUser.vue";
import ApiClient from "@/services/api_client";
import HisDate from "@/utils/Date";
import DynamicButton from "@/components/DynamicButton.vue";
import BasicForm from "@/components/BasicForm.vue";
import { toastSuccess, toastWarning, popoverConfirmation } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import {
    medkit,
    chevronBackOutline,
    checkmark,
    grid,
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document,
    globe,
    add,
    person,
} from "ionicons/icons";
export default defineComponent({
    name: "StockManagementModal",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        IonRow,
        IonCol,
        ImmunizationTrendsGraph,
        ImmunizationGroupGraph,
        IonCard,
        DynamicButton,
        BasicForm,
        IonIcon,
        IonFab,
        IonFabButton,
        IonFabList,
        IonButton,
        IonPopover,
    },
    data() {
        return {
            iconsContent: icons,
            reportData: [] as any,
            currentStock: [] as any,
            stockData: [] as any,
            allStock: [] as any,
            outStock: [] as any,
            filter: "" as any,
            startDate: HisDate.currentDate(),
            endDate: HisDate.currentDate(),
            options: {
                responsive: true,
                select: true,
            } as any,
            selectedButton: "all",
            isLoading: false,
            popoverOpen: false,
            event: null as any,
            stockService: {} as any,
            disabled: false,
        };
    },
});
</script>
<style scoped></style>
