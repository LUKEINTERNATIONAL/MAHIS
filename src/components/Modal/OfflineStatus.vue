<template>
    <div class="" style="display: block">
        <div class="title">Loading Offline Records</div>
        <div class="container">
            <div class="sub_title">
                Relationships
                <span class="count"> ({{ offlineRelationshipStatus?.total_relationships }}/{{ offlineRelationshipStatus?.total }})</span>
            </div>
            <k-progress
                :percent="fractionToPercentage(offlineRelationshipStatus?.total_relationships, offlineRelationshipStatus?.total)"
                :active="!offlineRelationshipStatus?.total_relationships == offlineRelationshipStatus?.total"
                active-color="#fff"
                color="rgb(107, 199, 107)"
            ></k-progress>
            <div class="sub_title">
                Districts <span class="count"> ({{ offlineDistrictStatus?.total_districts }}/{{ offlineDistrictStatus?.total }})</span>
            </div>
            <k-progress
                :percent="fractionToPercentage(offlineDistrictStatus?.total_districts, offlineDistrictStatus?.total)"
                :active="!offlineDistrictStatus?.total_districts == offlineDistrictStatus?.total"
                active-color="#fff"
                color="rgb(107, 199, 107)"
            ></k-progress>
            <div class="sub_title">
                TAs <span class="count"> ({{ offlineTAsStatus?.total_TAs }}/{{ offlineTAsStatus?.total }})</span>
            </div>
            <k-progress
                :percent="fractionToPercentage(offlineTAsStatus?.total_TAs, offlineTAsStatus?.total)"
                :active="!offlineTAsStatus?.total_TAs == offlineTAsStatus?.total"
                active-color="#fff"
                color="rgb(107, 199, 107)"
            ></k-progress>
            <div class="sub_title">
                Villages <span class="count"> ({{ offlineVillageStatus?.total_village }}/{{ offlineVillageStatus?.total }})</span>
            </div>
            <k-progress
                :percent="fractionToPercentage(offlineVillageStatus?.total_village, offlineVillageStatus?.total)"
                :active="!offlineVillageStatus?.total_village == offlineVillageStatus?.total"
                active-color="#fff"
                color="rgb(107, 199, 107)"
            ></k-progress>
        </div>
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
import { text } from "ionicons/icons";
import { Relationship } from "../../interfaces/relationship";
import workerData from "@/activate_worker";
import { useStatusStore } from "@/stores/StatusStore";
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
import get from "localbase/localbase/api/actions/get";
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
            workerApi: null as any,
            payload: {} as any,
        };
    },
    computed: {
        ...mapState(useStatusStore, ["offlineVillageStatus", "offlineDistrictStatus", "offlineTAsStatus", "offlineRelationshipStatus"]),
    },
    watch: {
        dataToPass: {
            handler() {
                this.payload = this.workerApi.data.payload;
                console.log("🚀 ~ handler ~ this.payload:", this.payload);
            },
            deep: true,
        },
    },
    props: {
        payloadData: {
            default: {} as any,
        },
    },
    methods: {
        async getData() {
            this.workerApi = workerData.workerApi;
        },
        fractionToPercentage(numerator: any, denominator: any) {
            // this.controlModal();
            if (denominator === 0) {
                return 0;
            }
            let percentage = (numerator / denominator) * 100;
            return `${percentage.toFixed(2)}`; // Keeps two decimal places
        },
        controlModal() {
            if (
                this.offlineVillageStatus?.total_village &&
                this.offlineTAsStatus?.total_TAs &&
                this.offlineDistrictStatus?.total_districts &&
                this.offlineVillageStatus?.total_village == this.offlineVillageStatus?.total &&
                this.offlineDistrictStatus?.total_districts == this.offlineDistrictStatus?.total &&
                this.offlineTAsStatus?.total_TAs == this.offlineTAsStatus?.total
            ) {
                modalController.dismiss();
            }
            const status = useStatusStore();
            status.setOfflineVillageStatus("");
            status.setOfflineDistrictStatus("");
            status.setOfflineTAsStatus("");
        },
    },
});
</script>
<style scoped>
.container {
    padding-top: 30px;
}
.title {
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #00190e;
    margin-top: 10px;
}
.sub_title {
    font-size: 14px;
    font-weight: 700;
}
.count {
    padding-top: 3px;
    padding-left: 3px;
    font-size: 10px;
}
</style>
