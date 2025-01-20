<template>
    <div class="modal_wrapper">
        <div>
            <list :listData="list"></list>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
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
import { AppEncounterService } from "@/services/app_encounter_service";
import { isEmpty } from "lodash";

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
        ...mapState(useDemographicsStore, ["patient"]),
    },
    data() {
        return {
            valueNumericArray: [] as any,
            obsDatetime: [] as any,
            graphIcon: iconGraph(["#006401"]),
            listIcon: iconList(["#636363"]),
            displayGraph: true,
            orders: [] as any,
            height: [] as any,
            BMI: [] as any,
            iconBg: {} as any,
            activeWeight: [] as any,
            activeHeight: [] as any,
            activeBMI: [] as any,
            list: [] as any,
            series: [
                {
                    name: "",
                    data: [],
                },
            ],
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    async mounted() {
        const obsP = await ObservationService.getAll(this.patient.patientID, "Primary diagnosis");
        const obsS = await ObservationService.getAll(this.patient.patientID, "Secondary diagnosis");
        const obsD = await ObservationService.getAll(this.patient.patientID, "Attempted/ Differential diagnosis");
        const obs = [...(obsP || []), ...(obsS || []), ...(obsD || [])];
        const diagnosis = !isEmpty(obs)
            ? Promise.all(
                  obs.map(async (ob: any) => {
                      return {
                          name: await ObservationService.getConceptName(ob["value_coded"]),
                          obs_date: ob.obs_datetime,
                      };
                  })
              )
            : [];
        this.setListData(await diagnosis);
    },
    methods: {
        dismiss() {
            modalController.dismiss();
        },
        handleIcon() {},
        setActivClass(active: any) {
            this.activeHeight = "";
            this.activeBMI = "";
            this.activeWeight = "";
            if (active == "height") this.activeHeight = "_active";
            else if (active == "weight") this.activeWeight = "_active";
            else if (active == "BMI") this.activeBMI = "_active";
        },
        setListData(data: any) {
            this.list = [];
            this.list.push({
                actionBtn: false,
                class: "col_background",
                header: true,
                minHeight: "--min-height: 25px;",
                display: ["Date", "Diagnosis", "Notes"],
            });
            data.forEach((item: any) => {
                this.list.push({
                    actionBtn: false,
                    minHeight: "--min-height: 25px;",
                    class: "col_background",
                    display: [HisDate.toStandardHisFormat(item.obs_date), item.name, ""],
                });
            });
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
.graphBtn {
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #ddeedd;
    border-radius: 4px;
    padding: 4px;
    min-width: 90px;
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
