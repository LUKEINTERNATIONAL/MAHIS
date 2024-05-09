<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar class="displayNoneDesktop" />
            <div class="content_manager">
                <ion-row class="content_width">
                    <ion-col size="3" size-lg="3" size-md="4" class="displayNoneMobile">
                        <ion-card style="margin-bottom: 20px; background-color: #fff">
                            <div class="p_name_image">
                                <div class="first_letter">
                                    {{ demographics?.name.charAt(0) }}
                                </div>
                                <div class="p_name">{{ demographics?.name }}</div>
                            </div>
                            <ion-card-content>
                                <ion-row>
                                    <ion-col size="4">MRN</ion-col>
                                    <ion-col>{{ demographics?.mrn }}</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col size="4">Gendar</ion-col>
                                    <ion-col>{{ covertGender(demographics?.gender) }}</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col size="4">Age</ion-col>
                                    <ion-col>{{ formatBirthdate() }}</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col size="4">Allergies</ion-col>
                                    <ion-col size="8">
                                        <span v-for="(item, index) in selectedMedicalAllergiesList" :key="index">
                                            <span class="allergies" v-if="item.selected">{{ item.name }}</span>
                                        </span>
                                    </ion-col>
                                </ion-row>
                            </ion-card-content>
                        </ion-card>

                        <ion-card
                            class="start_new_co"
                            v-if="programAccess('NCD PROGRAM')"
                            style="margin-bottom: 20px"
                            @click="nav(NCDUserAction.url)"
                        >
                            {{ NCDUserAction.actionName }}
                        </ion-card>
                        <ion-card class="start_new_co" v-if="demographics.gender === 'F'" style="margin-bottom: 20px">
                            <router-link to="/profile">+ Enroll in ANC Program</router-link>
                        </ion-card>

                        <ion-card class="start_new_co" style="margin-bottom: 20px">
                            <router-link to="/labour/labourHome">+ Enroll in Labour and delivery program</router-link>
                        </ion-card>
                        <ion-card class="start_new_co" style="margin-bottom: 20px">
                            <router-link to="/pnc/Home"> + Enroll in PNC program</router-link>
                        </ion-card>
                        <ion-card
                            class="start_new_co"
                            v-if="programAccess('IMMUNIZATION PROGRAM')"
                            @click="nav('birthRegistration')"
                            style="margin-bottom: 20px"
                        >
                            + Enroll in Immunization program
                        </ion-card>
                        <ion-card class="start_new_co" v-if="programAccess('OPD Program')" style="margin-bottom: 20px" @click="handleOPD()">
                            {{ OPDProgramActionName }}</ion-card
                        >

                        <ion-card style="margin-bottom: 20px; background-color: #fff">
                            <ion-accordion-group :value="['first']">
                                <ion-accordion value="first" style="background-color: #fff" toggle-icon-slot="start">
                                    <ion-item slot="header" color="white">
                                        <ion-label class="side_title">Templates/Forms</ion-label>
                                    </ion-item>
                                    <ul style="list-style: none" slot="content">
                                        <li class="form_list">
                                            <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.form"></ion-icon>
                                            <div class="form_list_content">AETC Form</div>
                                        </li>
                                        <li class="form_list">
                                            <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.inpatient"></ion-icon>
                                            <div class="form_list_content">Medical Inpatient</div>
                                        </li>
                                        <li class="form_list">
                                            <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.notes"></ion-icon>
                                            <div class="form_list_content">Surgucal Notes</div>
                                        </li>
                                        <li class="form_list">
                                            <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.gynacological"></ion-icon>
                                            <div class="form_list_content">Gynacological</div>
                                        </li>
                                        <li class="form_list">
                                            <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.notes"></ion-icon>
                                            <div class="form_list_content">SOAP</div>
                                        </li>
                                        <li class="form_list">
                                            <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.monitoring"></ion-icon>
                                            <div class="form_list_content">Monitoring Chart</div>
                                        </li>
                                        <li class="form_list">
                                            <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.referal"></ion-icon>
                                            <div class="form_list_content">Referral</div>
                                        </li>
                                    </ul>
                                </ion-accordion>
                            </ion-accordion-group>
                        </ion-card>
                        <ion-card style="margin-bottom: 20px; background-color: #fff">
                            <ion-accordion-group>
                                <ion-accordion value="first" style="background-color: #fff" toggle-icon-slot="start">
                                    <ion-item slot="header" color="white">
                                        <ion-label class="side_title">AETC Clerking Sheet</ion-label>
                                    </ion-item>
                                    <ion-card-content slot="content"> </ion-card-content>
                                </ion-accordion>
                            </ion-accordion-group>
                        </ion-card>
                    </ion-col>
                    <ion-col size-sm="12" size-md="8" size-lg="9">
                        <ion-card style="background-color: #fff">
                            <div class="p_dash_header">
                                <div class="p_title">Consultation Overview</div>
                                <div class="date">
                                    <span class="diplay_space_between" id="open-dates-trigger">
                                        <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.calendar" style="margin-right: 15px"></ion-icon>
                                        <div>6th Oct, 2023</div>
                                    </span>
                                    <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.today_date"></ion-icon>
                                </div>
                            </div>

                            <ion-grid class="grid">
                                <ion-row>
                                    <ion-col class="col" style="border-top-left-radius: 4px">
                                        <VitalsGrid />
                                    </ion-col>
                                    <ion-col class="col" style="border-top-right-radius: 4px">
                                        <InvestigationsGrid />
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col class="col" style="border-bottom-left-radius: 4px">
                                        <MedicationsGrid />
                                    </ion-col>
                                    <ion-col class="col" style="border-bottom-right-radius: 4px" expand="block">
                                        <DispositionGrid />
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </div>

            <ion-popover
                mobilePopover
                trigger="programList"
                trigger-action="click"
                :show-backdrop="false"
                size="auto"
                :dismiss-on-select="true"
                alignment="center"
                class="displayNoneDesktop"
            >
                <ul style="list-style: none; line-height: 50px">
                    <li class="listPrograma" v-if="programAccess('NCD PROGRAM')" style="margin-bottom: 20px" @click="nav(NCDUserAction.url)">
                        {{ NCDUserAction.actionName }}
                    </li>
                    <li class="listPrograma" v-if="programAccess('ANC PROGRAM')" style="margin-bottom: 20px">
                        <router-link to="/profile">+ Enroll in ANC Program</router-link>
                    </li>
                    <li class="listPrograma" v-if="programAccess('ANC PROGRAM')" style="margin-bottom: 20px" >
                        + Enroll in Labour and delivery program
                    </li>
                    <li class="listPrograma" v-if="programAccess('ANC PROGRAM')" style="margin-bottom: 20px" @click="navToPncProgram">
                         + Enroll in PNC program</li>
                    <li
                        class="listPrograma"
                        v-if="programAccess('IMMUNIZATION PROGRAM')"
                        @click="nav('birthRegistration')"
                        style="margin-bottom: 20px"
                    >
                        + Enroll in Immunization program
                    </li>
                    <li class="listPrograma" v-if="programAccess('OPD Program')" style="margin-bottom: 20px" @click="handleOPD()">
                        {{ OPDProgramActionName }}
                    </li>
                </ul>
            </ion-popover>
            <ion-popover trigger="open-dates-trigger" trigger-action="click" :show-backdrop="false" size="auto">
                <ul style="list-style: none; line-height: 50px" v-for="(item, index) in visits" :key="index">
                    <li>{{ convertToDisplayDate(item) }}</li>
                </ul>
            </ion-popover>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end" class="displayNoneDesktop">
                <ion-fab-button color="primary">
                    <ion-icon :icon="chevronUpCircle"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="top">
                    <ion-fab-button data-desc="Templates/Forms">
                        <ion-icon :icon="document"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-button data-desc="Print Out & Other">
                        <ion-icon :icon="medkit"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-button data-desc="Apps" id="programList">
                        <ion-icon :icon="grid"></ion-icon>
                    </ion-fab-button>
                </ion-fab-list>
            </ion-fab>
        </ion-content>
    </ion-page>
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
    IonRow,
    IonCol,
    IonGrid,
    IonIcon,
    IonFab,
    IonFabButton,
    IonFabList,
} from "@ionic/vue";
import { defineComponent } from "vue";
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
} from "ionicons/icons";
import { modalController } from "@ionic/vue";
import { icons } from "@/utils/svg";

import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";

import DispositionGrid from "@/components/PatientProfileGrid/OutcomeGrid.vue";
import InvestigationsGrid from "@/components/PatientProfileGrid/InvestigationsGrid.vue";
import MedicationsGrid from "@/components/PatientProfileGrid/MedicationsGrid.vue";
import VitalsGrid from "@/components/PatientProfileGrid/VitalsGrid.vue";

import { useDemographicsStore } from "@/stores/DemographicStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { PatientService } from "@/services/patient_service";
import { UserService } from "@/services/user_service";
import { Service } from "@/services/service";
import { ObservationService } from "@/services/observation_service";
import { useVitalsStore } from "@/stores/VitalsStore";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { toastWarning } from "@/utils/Alerts";

import { ref } from "vue";
import DynamicButton from "@/components/DynamicButton.vue";
export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        DemographicBar,
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
        DispositionGrid,
        InvestigationsGrid,
        MedicationsGrid,
        VitalsGrid,
        IonRow,
        IonCol,
        IonGrid,
        IonIcon,
        DynamicButton,
        IonFab,
        IonFabButton,
        IonFabList,
    },
    data() {
        return {
            iconsContent: icons,
            isModalOpen: false,
            url: "" as any,
            NCDProgramActionName: "+ Enroll in NCD Program" as any,
            OPDProgramActionName: "+ Start New OPD consultation" as any,
            visits: [] as any,
            NCDUserAction: [] as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics", "patient"]),
        ...mapState(useTreatmentPlanStore, ["selectedMedicalAllergiesList"]),
        ...mapState(useEnrollementStore, ["NCDNumber"]),
        ...mapState(useGeneralStore, ["activities", "userActions"]),
        ...mapState(useVitalsStore, ["vitals"]),
    },
    async mounted() {
        const patient = new PatientService();
        this.visits = await PatientService.getPatientVisits(patient.getID(), false);
        await UserService.setProgramUserActions();
        this.setNCDValue();
    },
    watch: {
        demographics: {
            handler() {
                this.setNCDValue();
            },
            deep: true,
        },
        userActions: {
            handler() {
                this.setNCDValue();
            },
            deep: true,
        },
    },
    setup() {
        const modal = ref();

        return {
            chevronBackOutline,
            checkmark,
            grid,
            chevronDownCircle,
            chevronForwardCircle,
            chevronUpCircle,
            colorPalette,
            document,
            globe,
            medkit,
        };
    },

    methods: {
        convertToDisplayDate(date: any) {
            return HisDate.toStandardHisDisplayFormat(date);
        },
        programAccess(programName: string): boolean {
            const accessPrograms: any = sessionStorage.getItem("userPrograms");
            const programs: any = JSON.parse(accessPrograms);
            if (programs.some((program: any) => program.name === programName)) {
                return true;
            } else {
                return false;
            }
        },
        async setNCDValue() {
            await UserService.setUserActivities();
            sessionStorage.setItem("app", JSON.stringify({ programID: 32, applicationName: "NCD" }));
            if (this.userActions.length > 0) [{ NCDUserAction: this.NCDUserAction }] = this.userActions;
        },
        setOPDValue() {
            sessionStorage.setItem("app", JSON.stringify({ programID: 14, applicationName: "OPD" }));
            const patient = new PatientService();
            if (patient.getNcdNumber() != "Unknown") {
                if (sessionStorage.getItem("saveProgressStatus") == "true") {
                    this.OPDProgramActionName = "+ Continue OPD consultation";
                } else {
                    this.OPDProgramActionName = "+ Start new OPD consultation";
                }
                this.url = "OPDvitals";
            } else {
                this.url = "OPDvitals";
                this.OPDProgramActionName = "+ Start new OPD OPD Program";
            }
        },
        openModal() {
            this.isModalOpen = true;
        },
        dismiss() {
            modalController.dismiss();
        },
        async nav(url: any) {
            await UserService.setProgramUserActions();
            this.$router.push(url);
        },
        async updateNCDData() {
            const array = ["Height", "Weight", "Systolic", "Diastolic", "Temp", "Pulse", "SP02", "Respiratory rate"];

            // An array to store all promises
            const promises = array.map(async (item: any) => {
                if (
                    HisDate.toStandardHisFormat(await ObservationService.getFirstObsDatetime(this.demographics.patient_id, item)) ==
                    HisDate.currentDate()
                ) {
                    modifyFieldValue(
                        this.vitals,
                        item,
                        "value",
                        await ObservationService.getFirstValueNumber(this.demographics.patient_id, item, HisDate.currentDate())
                    );
                }
            });

            // Wait for all promises to resolve
            await Promise.all(promises);
        },
        handleOPD() {
            this.setOPDValue();
            this.$router.push(this.url);
        },
        covertGender(gender: any) {
            return ["Male", "M"].includes(gender) ? "Male" : ["Female", "F"].includes(gender) ? "Female" : "";
        },
        formatBirthdate() {
            return HisDate.getBirthdateAge(this.demographics?.birthdate);
        },
    },
});
</script>

<style scoped>
ion-fab-button[data-desc] {
    position: relative;
}

ion-fab-button[data-desc]::after {
    position: absolute;
    content: attr(data-desc);
    z-index: 1;
    right: 50px;
    bottom: 7px;
    color: var(--ion-color-contrast, rgb(112, 109, 109));
    background-color: var(--ion-color-base, #fff);
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}
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

.first_letter {
    background-color: #e6e6e6;
    padding: 20px;
    margin-right: 20px;
    font-size: 24px;
    border-radius: 4px;
    color: #636363 !important;
}
.p_name_image {
    font-size: 24px;
    padding: 0px;
    margin-left: 15px;
    color: #00190e;
    display: flex;
    font-weight: 700;
    height: 64px;
    margin-top: 15px;
    overflow: hidden;
}
.p_name {
    max-width: 180px;
}
.p_dash_header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: solid #cccccc 1px;
}
.p_title {
    font-weight: 700;
    font-size: 24px;
    color: #00190e;
}
.col {
    border: solid 1px #ccc;
    padding: 20px;
    width: 600px;
    height: 37.4vh;
}
.row {
    border-radius: 4px;
    border: solid 1px #ccc;
}
.grid {
    padding: 20px;
}

.date {
    display: flex;
    font-weight: 600;
    color: #00190e;
    align-items: center;
    justify-content: space-between;
    width: 200px;
}
ion-item[slot="header"] {
    padding-top: 1px;
}
.side_title {
    font-size: 14px;
}

.form_list {
    display: flex;
}
.form_list_content {
    padding-left: 10px;
    color: #00190e;
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 15px;
}
.start_new_co {
    background-color: #ddeedd;
    color: #006401;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-left: 7px;
    font-weight: 500;
    cursor: pointer;
}
.allergies {
    background: #fecdca;
    color: #b42318;
    padding: 1px 8px;
    border-radius: 4px;
    margin-right: 5px;
    display: inline-block;
    margin-bottom: 5px;
}
</style>
