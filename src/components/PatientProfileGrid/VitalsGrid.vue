<template>
    <div class="" style="padding-bottom: 5px">
        <div class="text_header_16">
            <span style="margin-right: 10px">Clinical Notes </span>
            <ion-icon
                v-if="clinicalNotes.length > 0"
                style="cursor: pointer"
                slot="start"
                aria-hidden="true"
                :icon="iconsContent.notes_expand"
                @click="openNotesModal()"
            ></ion-icon>
        </div>
        <span v-if="BMI.result">
            <div class="vitals_overview">
                <div>Vitals</div>
                <div id="vitals_dialog">
                    <ion-icon
                        slot="start"
                        aria-hidden="true"
                        style="cursor: pointer"
                        :icon="iconsContent.vitals_graph"
                        @click="openVitalsModal()"
                    ></ion-icon>
                </div>
            </div>
            <div class="v_result">
                <div class="obese" :style="'background-color:' + BMI.color[0]">
                    <div>
                        <ion-icon slot="start" aria-hidden="true" :icon="vitalsIcon"></ion-icon>
                    </div>
                    <div :style="'margin-left:40px; color:' + BMI.color[1]">
                        <span style="font-weight: 700"> {{ BMI.index }}</span> {{ BMI.result }}
                    </div>
                </div>
                <div class="bmi">
                    <div>
                        <ion-icon :icon="iconsContent.bmi_rusults"></ion-icon>
                    </div>
                    <div style="margin-left: 40px">{{ Systolic?.value_text }} / {{ Diastolic?.value_text }}</div>
                </div>
            </div>
        </span>
        <div v-if="clinicalNotes.length > 0">
            Notes
            <ul class="notes_content">
                <li v-for="(item, index) in clinicalNotes" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div
            class="no_content"
            v-if="clinicalNotes.length == 0 && !vitals[0].alerts[0].backgroundColor && !vitals[2].data.rowData[0].colData[0].value"
        >
            <div>
                <div class="no_content_title">No notes added today.</div>
                <div class="start_consultation">Start new consultation</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonCard, IonCardContent } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import { mapState } from "pinia";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";

import VitalsModal from "@/components/ProfileModal/VitalsModal.vue";
import NotesModal from "@/components/ProfileModal/NotesModal.vue";
import { createModal } from "@/utils/Alerts";
import { useVitalsStore } from "@/stores/VitalsStore";
import { ObservationService } from "@/services/observation_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import HisDate from "@/utils/Date";
import { BMIService } from "@/services/bmi_service";

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
        IonCard,
        IonCardContent,
    },
    data() {
        return {
            iconsContent: icons,
            BMI: "" as any,
            Height: "" as any,
            weight: "" as any,
            Systolic: "" as any,
            Diastolic: "" as any,
            vitalsIcon: "" as any,
            clinicalNotes: this.transformClinicalNotes(),
        };
    },
    async mounted() {
        this.weight = (await ObservationService.getFirstObs(this.patient.patientID, "weight")) || "";
        this.Height = (await ObservationService.getFirstObs(this.patient.patientID, "Height")) || "";
        this.Systolic = (await ObservationService.getFirstObs(this.patient.patientID, "Systolic")) || "";
        this.Diastolic = (await ObservationService.getFirstObs(this.patient.patientID, "Diastolic")) || "";
        this.BMI = await BMIService.getBMI(
            parseInt(this.weight.value_numeric),
            parseInt(this.Height.value_numeric),
            this.patient.personInformation.gender,
            HisDate.calculateAge(this.patient.personInformation.birthdate, this.weight.obs_datetime)
        );
        this.vitalsIcon = BMIService.iconBMI(this.BMI.color);
    },
    computed: {
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useDemographicsStore, ["patient"]),
    },
    methods: {
        openNotesModal() {
            createModal(NotesModal);
        },
        transformClinicalNotes(): string[] {
            const treatmentPlanStore = useTreatmentPlanStore();
            const input = treatmentPlanStore.getNonPharmalogicalTherapyAndOtherNotes();
            const lines: string[] = [];
            let startIndex = 0;

            for (let i = 0; i < input.length; i++) {
                if (input[i] === "\n" || input[i] === "\r") {
                    const line = input.substring(startIndex, i);
                    if (line.length > 0) {
                        //const processedLine = line.startsWith('• ') ? line : '• ' + line
                        lines.push(line);
                        startIndex = i + 1;
                    }
                }
            }

            const lastLine = input.substring(startIndex);
            if (lastLine.length > 0) {
                //const processedLastLine = lastLine.startsWith('• ') ? lastLine : '• ' + lastLine;
                lines.push(lastLine);
            }
            return lines;
        },
        openVitalsModal() {
            createModal(VitalsModal);
        },
    },
});
</script>

<style scoped></style>
