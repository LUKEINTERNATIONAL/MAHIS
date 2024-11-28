<template>
    <div style="width: 100%; display: flex; justify-content: space-between; padding: 10px">
        <div>
            <div class="diplay_space_between bmi_blood" v-if="propsContent.displayGraph && propsContent.weight.length > 0">
                <div style="cursor: pointer" :class="propsContent.activeWeight" @click="$emit('click:weight', $event)">Weight</div>
                <div style="cursor: pointer" :class="propsContent.activeHeight" @click="$emit('click:height', $event)">Height</div>
            </div>
        </div>
        <div>
            <div class="diplay_space_between">
                <ion-icon
                    style="font-size: x-large; cursor: pointer"
                    :class="propsContent.iconBg.graph"
                    :icon="propsContent.graphIcon"
                    @click="$emit('click:toggleDisplay', $event)"
                    v-if="propsContent.displayGraph"
                ></ion-icon>
                <ion-icon
                    v-else
                    style="font-size: x-large; cursor: pointer"
                    :class="propsContent.iconBg.list"
                    :icon="propsContent.listIcon"
                    @click="$emit('click:toggleDisplay', $event)"
                ></ion-icon>
            </div>
        </div>
    </div>
    <div v-if="!propsContent.displayGraph">
        <list :listData="propsContent.list" @clicked:void="$emit('click:void', $event)"></list>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent, toRaw } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import ApexChart from "vue3-apexcharts";
import List from "@/components/List.vue";
import { ObservationService } from "@/services/observation_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import { iconGraph, iconList } from "@/utils/SvgDynamicColor";
import { useWeightHeightVitalsStore } from "@/apps/Immunization/stores/VitalsStore";
import workerManager from "@/activate_worker";
import { getOfflineRecords } from "@/services/offline_service";

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
        List,
    },

    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useWeightHeightVitalsStore, ["vitalsWeightHeight"]),
    },
    data() {
        return {
            valueNumericArray: [] as any,
            obsDatetime: [] as any,
            graphIcon: iconGraph(["#006401"]),
            listIcon: iconList(["#636363"]),
            displayGraph: true,
            weight: [] as any,
            height: [] as any,
            BMI: [] as any,
            iconBg: {} as any,
            activeWeight: [] as any,
            activeHeight: [] as any,
            activeBMI: [] as any,
            list: [] as any,
        };
    },
    props: {
        propsContent: {
            default: {} as any,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        async openVoidPopover(data: any) {
            await ObservationService.voidObs(data.id.weightObsId);
            await ObservationService.voidObs(data.id.heightObsId);
            await this.updateData();
        },
        processObservations() {
            try {
                let result: any = [];
                let allDates: any = "";
                if (this.weight && this.height)
                    allDates = new Set([...this.weight?.map((w: any) => w.obs_datetime), ...this.height?.map((h: any) => h?.obs_datetime)]);
                else if (this.weight) allDates = new Set([...this.weight?.map((w: any) => w.obs_datetime)]);
                else if (this.height) allDates = new Set([...this.height?.map((h: any) => h?.obs_datetime)]);

                allDates?.forEach((datetime: any) => {
                    let weightObs = this.weight?.find((w: any) => w.obs_datetime === datetime);
                    let heightObs = this.height?.find((h: any) => h.obs_datetime === datetime);

                    result.push({
                        ids: { weightObsId: weightObs?.obs_id, heightObsId: heightObs?.obs_id },
                        obs_datetime: datetime,
                        weight: weightObs ? weightObs?.value_numeric : null,
                        height: heightObs ? heightObs?.value_numeric : null,
                    });
                });
                return result;
            } catch (error) {}
        },
        async updateData() {
            try {
                this.height = await ObservationService.getAll(this.demographics.patient_id, "Height");
                this.weight = await ObservationService.getAll(this.demographics.patient_id, "weight");
                const weight = this.formatData(this.weight);
                const height = this.formatData(this.height);
                // workerManager.workerApi;
                await workerManager.postData("UPDATE_RECORD", {
                    storeName: "patientRecords",
                    whereClause: { offlinePatientID: 1732722090271 },
                    data: {
                        vitals: {
                            height: height,
                            weight: weight,
                        },
                    },
                });
            } catch (error) {
                const data = await getOfflineRecords("patientRecords", { offlinePatientID: 1732722090271 }, false);
                this.height = data.vitals.height;
                this.weight = data.vitals.weight;
            }

            this.setListData(this.processObservations());
            this.$emit("click:weight", "");
        },
        formatData(data: any) {
            if (data) {
                return data.map((w: any) => {
                    return {
                        value_numeric: w.value_numeric,
                        obs_datetime: w.obs_datetime,
                        obs_id: w.obs_id,
                    };
                });
            }
        },
        dismiss() {
            modalController.dismiss();
        },
        toggleDisplay() {
            this.displayGraph = !this.displayGraph;
            if (this.displayGraph) {
                this.graphIcon = iconGraph(["#006401"]);
                this.listIcon = iconList(["#636363"]);
                this.iconBg.graph = "iconBg";
                this.iconBg.list = "";
            } else {
                this.graphIcon = iconGraph(["#636363"]);
                this.listIcon = iconList(["#006401"]);
                this.iconBg.graph = "";
                this.iconBg.list = "iconBg";
            }
        },
        setActiveClass(active: any) {
            this.activeHeight = "";
            this.activeBMI = "";
            this.activeWeight = "";
            if (active == "height") this.activeHeight = "_active";
            else if (active == "weight") this.activeWeight = "_active";
            else if (active == "BMI") this.activeBMI = "_active";
        },
        setListData(data: any) {
            try {
                this.list = [];
                this.list.push({
                    containSize: 2.6,
                    actionBtn: false,
                    class: "col_background display_center",
                    header: true,
                    minHeight: "--min-height: 25px;",
                    display: ["Date", "Height(cm)", "Weight(kg)", "Action"],
                });
                data.forEach((item: any) => {
                    this.list.push({
                        id: item.ids,
                        actionBtn: true,
                        minHeight: "--min-height: 25px;",
                        class: "col_background",
                        display: [HisDate.toStandardHisDisplayFormat(item.obs_datetime), item.height, item.weight],
                        btn: ["void"],
                        name: `height: ${item.height} and weight: ${item.weight} captured on ${HisDate.toStandardHisDisplayFormat(
                            item.obs_datetime
                        )} `,
                    });
                });
            } catch (error) {}
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
    min-width: 150px;
}
.graphBtn {
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #ddeedd;
    border-radius: 4px;
    padding: 4px;
    min-width: 60px;
}
._active {
    background-color: #ddeedd;
    color: #006401;
    padding: 5px;
    border-radius: 4px;
}
.iconBg {
    background: #ddeedd;
    padding: 2px;
    border-radius: 5px;
}
</style>
