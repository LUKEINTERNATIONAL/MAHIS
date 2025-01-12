<template>
    <ion-header>
        <ion-title class="modalTitle">You do not have DDE IDs</ion-title>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div class="container">
            <basic-form :contentData="DDERequestIds"></basic-form>
        </div>
    </ion-content>
    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="handleCancel"> Cancel </ion-button>
            </ion-col>
            <ion-col>
                <DynamicButton @click="saveDetails()" name="Save changes" fill="solid" style="float: right; margin: 2%; width: 130px" />
            </ion-col>
        </ion-row>
    </ion-footer>
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
import { useDDERequestIds } from "@/stores/DDERequestIdsStore";
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
        ...mapState(useDDERequestIds, ["DDERequestIds"]),
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
        async getData() {},
        saveDetails() {},
        handleCancel() {
            modalController.dismiss();
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
