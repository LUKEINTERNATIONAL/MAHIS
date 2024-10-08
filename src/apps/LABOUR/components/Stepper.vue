<template>
    <ion-row>
        <ion-col size="1" size-lg="1"></ion-col>
        <ion-col size="3" size-lg="3">
            <ion-card class="wizard_card">
                <div class="wizard_title">
                    <strong> {{ stepperTitle }}</strong>
                </div>
                <ion-card-content>
                    <div id="wizard_verticle" class="form_wizard wizard_verticle">
                        <ul class="list-unstyled wizard_steps anchor">
                            <li v-for="(item, index) in wizardData" :key="index" :class="item.last_step">
                                <a class="done" isdone="1" rel="1">
                                    <span :class="item.class">
                                        <ion-icon v-if="item.checked" :icon="checkmark" class="checked_step"></ion-icon>
                                        <span v-if="!item.checked" class="">{{ item.number }} </span>
                                        <span class="wizard_text">{{ item.title }}</span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </ion-card-content>
            </ion-card>
        </ion-col>

        <ion-col size="7" size-lg="7" class="rightCol">
            <div class="back_profile" @click="openModal()">
                <ion-icon style="font-size: 20px" :icon="chevronBackOutline"> </ion-icon>
                <span style="cursor: pointer"> Back to profile</span>
            </div>

            <div class="accordion_group">
                <ion-accordion-group @ionChange="accordionGroupChange($event)" :value="['1']">
                    <ion-accordion v-for="(item, index) in StepperData" :key="index" :value="item.value">
                        <ion-item slot="header">
                            <ion-label>{{ item.title }}</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <component :is="item.component"> </component>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
                <hr style="background: rgba(0, 0, 0, 0.13)" />
            </div>
        </ion-col>
    </ion-row>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonModal,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import Diagnosis from "@/apps/NCD/components/ConsultationPlan/Diagnosis.vue";
import ComplicationsScreening from "@/apps/NCD/components/ConsultationPlan/ComplicationsScreening.vue";
import ConfirmDiagnosis from "@/apps/NCD/components/ConsultationPlan/ConfirmDiagnosis.vue";
import Outcome from "@/apps/NCD/components/ConsultationPlan/Outcome.vue";
import Investigations from "@/components/Investigations.vue";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import DynamicButton from "@/components/DynamicButton.vue";
import LabourVitals from "@/apps/LABOUR/components/repeatable things/LabourVitals.vue";
import Labour from "@/apps/LABOUR/components/obstetric details/Labour.vue";
import QuickCheck from "@/apps/LABOUR/components/physical exam/QuickCheck.vue";
import PhysicalExamination from "@/apps/LABOUR/components/physical exam/PhysicalExamination.vue";
import PelvicAssessment from "@/apps/LABOUR/components/physical exam/PelvicAssessment.vue";
import PatientReferral from "@/apps/LABOUR/components/repeatable things/PatientReferral.vue";
import FirstVaginalExamination from "@/apps/LABOUR/components/physical exam/FirstVaginalExamination.vue";
import SecondStageDelivery from "@/apps/LABOUR/components/delivery details/SecondStageDelivery.vue";
import ThirdStageDelivery from "@/apps/LABOUR/components/delivery details/ThirdStageDelivery.vue";
import end from "@/apps/LABOUR/components/repeatable things/end.vue";
import Obstetric from "./obstetric details/Obstetric.vue";
import OtherExams from "@/apps/LABOUR/components/repeatable things/OtherExams.vue";
import ImmidiatePostnatalChecksForChild from "@/apps/LABOUR/components/delivery details/ImmidiatePostnatalChecksForChild.vue";
import ImmidiatePostnatalChecksForMother from "@/apps/LABOUR/components/delivery details/ImmidiatePostnatalChecksForMother.vue";

export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonAccordion,
        IonAccordionGroup,
        DynamicButton,
        IonItem,
        IonLabel,
        Diagnosis,
        ComplicationsScreening,
        ConfirmDiagnosis,
        Outcome,
        Obstetric,
        Investigations,
        IonModal,
        Labour,
        QuickCheck,
        PhysicalExamination,
        PelvicAssessment,
        PatientReferral,
        FirstVaginalExamination,
        SecondStageDelivery,
        ThirdStageDelivery,
        end,
        OtherExams,
        LabourVitals,
        ImmidiatePostnatalChecksForChild,
        ImmidiatePostnatalChecksForMother,
    },
    data() {
        return {
            isOpen: false,
            iconsContent: icons,
        };
    },
    props: {
        wizardData: {
            default: [] as any,
        },
        StepperData: {
            default: [] as any,
        },
        stepperTitle: {
            type: String,
            default: "",
        },
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },
    methods: {
        accordionGroupChange(ev: AccordionGroupCustomEvent) {
            this.wizardData.forEach((item: any) => {
                if (ev.target.className == "md accordion-group-expand-compact") {
                    item.class = "common_step";
                    item.checked = false;
                    if (item.number == ev.detail.value) {
                        item.class = "open_step common_step";
                    }
                }
            });
            this.$emit("updateStatus", ev);
        },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
.centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
}
ion-item[slot="header"] {
    font-size: 20px;
    padding-top: 25px;
    font-weight: 600;
}

ion-accordion {
    margin: 0 auto;
}

ion-accordion.accordion-expanding,
ion-accordion.accordion-expanded {
    width: calc(100% - 32px);

    margin: 16px auto;
}

ion-accordion.accordion-collapsing ion-item[slot="header"],
ion-accordion.accordion-collapsed ion-item[slot="header"] {
    --color: var(--ion-color-light-contrast);
}

ion-accordion.accordion-expanding ion-item[slot="header"],
ion-accordion.accordion-expanded ion-item[slot="header"] {
    --background: #8a8a8a;
    --color: var(--ion-color-primary-contrast);
}
.back_profile {
    display: flex;
    justify-content: space-between;
    width: 140px;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    position: fixed;
    z-index: 1000;
}
.wizard_card {
    position: fixed;
    width: 100%;
    max-width: 300px;
    background-color: #fff;
    top: 150px;
}
.rightCol {
    top: 100px;
    width: 90%;
}
.accordion_group {
    position: fixed;
    height: 78vh;
    width: 58%;
    overflow-y: auto;
    top: 200px;
}
.accordion_group::-webkit-scrollbar {
    display: none;
}

.accordion_group {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
