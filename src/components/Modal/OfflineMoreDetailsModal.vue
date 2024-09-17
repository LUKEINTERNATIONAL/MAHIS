<template>
    <ion-header style="display: flex; justify-content: space-between">
        <ion-title class="modalTitle">More Offline Details</ion-title>
        <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="iconsContent.cancel"></ion-icon>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div class="">
            <ion-accordion-group ref="accordionGroup" class="" value="first">
                <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                    <ion-item slot="header" color="light">
                        <ion-label class="previousLabel">Personal Details</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content" style="padding-bottom: 200px">
                        <div class="">
                            <ul>
                                <li>Fullname: {{ clientData.personInformation.given_name + " " + clientData.personInformation.family_name }}</li>
                                <li>Gender: {{ clientData.personInformation.gender }}</li>
                                <li>Birthday: {{ clientData.personInformation.birthday }}</li>
                                <li>
                                    Currently Address:
                                    {{
                                        clientData.personInformation.current_district +
                                        " " +
                                        clientData.personInformation.current_traditional_authority +
                                        " " +
                                        clientData.personInformation.current_village
                                    }}
                                </li>
                                <li>
                                    Home Address:
                                    {{
                                        clientData.personInformation.home_district +
                                        " " +
                                        clientData.personInformation.home_traditional_authority +
                                        " " +
                                        clientData.personInformation.home_village
                                    }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </ion-accordion>
                <ion-accordion value="second" toggle-icon-slot="start" class="custom_card">
                    <ion-item slot="header" color="light">
                        <ion-label class="previousLabel">Guardian Details</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <div>
                            <div slot="content"></div>
                        </div>
                    </div>
                </ion-accordion>
                <ion-accordion value="third" toggle-icon-slot="start" class="custom_card">
                    <ion-item slot="header" color="light">
                        <ion-label class="previousLabel">Vitals</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content" style="padding-bottom: 120px"></div>
                </ion-accordion>
            </ion-accordion-group>
        </div>
    </ion-content>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonFooter,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonInput,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useFollowUpStoreStore } from "@/apps/Immunization/stores/FollowUpStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import { ObservationService } from "@/services/observation_service";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { PatientService } from "@/services/patient_service";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
    modifyCheckboxData,
} from "@/services/data_helpers";
import { RelationsService } from "@/services/relations_service";
import DynamicButton from "@/components/DynamicButton.vue";
import { ConceptService } from "@/services/concept_service";
import { formatRadioButtonData, formatCheckBoxData, formatInputFiledData } from "@/services/formatServerData";
import { AppEncounterService } from "@/services/app_encounter_service";
import { PersonService } from "@/services/person_service";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { validateInputFiledData, validateRadioButtonData, validateCheckBoxData } from "@/services/group_validation";
import { RelationshipService } from "@/services/relationship_service";
import Relationship from "@/views/Mixin/SetRelationship.vue";
import { DrugOrderService } from "@/services/drug_order_service";
import { Address } from "../../interfaces/address";

export default defineComponent({
    mixins: [Relationship],
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        BasicInputField,
        BasicForm,
        PreviousVitals,
        customDatePicker,
        DynamicButton,
        IonFooter,
    },
    data() {
        return {
            iconsContent: icons,
        };
    },
    props: {
        clientData: "" as any,
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useFollowUpStoreStore, [
            "changeGuardianInfo",
            "vaccineAdverseEffects",
            "protectedAtBirth",
            "serious",
            "outcome",
            "firstDecision",
        ]),
    },
    async mounted() {},
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        handleInputData(event: any) {
            // if (event.name == "SeriousCheck") {
            //     if(displayNext)
            // }
            console.log("🚀 ~ handleInputData ~ event:", event);
        },

        dismiss() {
            modalController.dismiss();
        },
    },
});
</script>

<style scoped>
.vitals_title {
    margin-bottom: 50px;
}
.input-with-icon {
    position: relative;
}
.input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: gray; /* Adjust the color as needed */
}
ion-col {
    padding-bottom: 15px;
}
h5 {
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 10px;
}
.vitalsContent {
    height: 500px;
}
.saveBtn {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 330px;
    align-items: center;
}
.btnContent {
    display: flex;
    justify-content: center;
    line-height: 60px;
}
.custom_card {
    margin-bottom: 20px;
}
</style>
