<template>
    <ion-header>
        <ion-title class="modalTitle">Edit Patient Demographics</ion-title>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Personal information</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" style="padding-bottom: 200px">
                    <PersonalInformation :editable="true" />
                </div>
            </ion-accordion>
            <ion-accordion value="second" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Guardian</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" style="padding-bottom: 200px">
                    <div class="">
                        <GuardianInformation :editable="true" />
                    </div>
                </div>
            </ion-accordion>
            <ion-accordion value="third" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Social history</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" style="padding-bottom: 120px">
                    <SocialHistory :editable="true" />
                </div>
            </ion-accordion>
            <ion-accordion value="four" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Current location</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" style="padding-bottom: 120px">
                    <CurrentLocation :editable="true" />
                </div>
            </ion-accordion>
            <ion-accordion value="five" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Home location</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" style="padding-bottom: 120px">
                    <HomeLocation :editable="true" />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <hr class="dashed-hr" style="margin-bottom: 0px !important" />
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
import { defineComponent, ref, computed, onMounted } from "vue";
import {
    modalController,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonSearchbar,
    IonPopover,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonFooter,
} from "@ionic/vue";
import { notificationsOutline, personCircleOutline, createOutline, clipboardOutline, calendarOutline } from "ionicons/icons";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { mapState, mapActions } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import HisDate from "@/utils/Date";
import { modifyFieldValue, modifyRadioValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import BasicInputField from "@/components/BasicInputField.vue";
import { PersonService } from "@/services/person_service";
import { PatientService } from "@/services/patient_service";
import { RelationshipService } from "@/services/relationship_service";
import { RelationsService } from "@/services/relations_service";
import { LocationService } from "@/services/location_service";
import DynamicButton from "@/components/DynamicButton.vue";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import vSelect from "vue-select";
import VueMultiselect from "vue-multiselect";
import DateInputField from "@/components/DateInputField.vue";
import { useFollowUpStoreStore } from "@/apps/Immunization/stores/FollowUpStore";
import "vue-select/dist/vue-select.css";
import PersonalInformation from "@/components/Registration/PersonalInformation.vue";
import GuardianInformation from "@/components/Registration/GuardianInformation.vue";
import HomeLocation from "@/components/Registration/HomeLocation.vue";
import CurrentLocation from "@/components/Registration/CurrentLocation.vue";
import SocialHistory from "@/components/Registration/SocialHistory.vue";
import BirthRegistration from "@/components/Registration/BirthRegistration.vue";
import { useWorkerStore } from "@/stores/workerStore";
export default defineComponent({
    name: "Home",
    username: "",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonSearchbar,
        IonPage,
        IonTitle,
        IonToolbar,
        ToolbarSearch,
        IonIcon,
        IonPopover,
        IonRow,
        IonCol,
        IonLabel,
        IonInput,
        IonDatetime,
        IonSelect,
        IonSelectOption,
        IonFooter,
        DynamicButton,
        BasicInputField,
        vSelect,
        VueMultiselect,
        DateInputField,
        BasicForm,
        PersonalInformation,
        GuardianInformation,
        CurrentLocation,
        HomeLocation,
        SocialHistory,
        BirthRegistration,
    },
    data() {
        return {
            popoverOpen: false,
        };
    },
    computed: {
        ...mapState(useFollowUpStoreStore, ["changeGuardianInfo", "vaccineAdverseEffects", "protectedAtBirth"]),
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useRegistrationStore, ["personInformation", "socialHistory", "homeLocation", "currentLocation", "guardianInformation"]),
    },
    watch: {
        patient: {
            handler() {},
            immediate: true,
        },
    },
    setup() {
        return { notificationsOutline, personCircleOutline, createOutline, clipboardOutline, calendarOutline };
    },
    methods: {
        handleCancel() {
            modalController.dismiss();
        },
        async saveDetails() {
            try {
                await this.updateDemographics();
                await this.updateGuardian();
                await this.updatePatientDemographics();
                toastSuccess("Successfully Updated Patient");
                this.handleCancel();
            } catch (error) {
                toastWarning("Failed to save details");
            }
        },
        async getRegion(name: any) {
            let districts = [];
            for (let i of [1, 2, 3]) {
                if ((i = 1)) districts = await LocationService.getDistricts(i);
                if (districts.some((district: any) => district.name.trim() === name)) {
                    return "Central Region";
                }
                if ((i = 2)) districts = await LocationService.getDistricts(i);
                if (districts.some((district: any) => district.name.trim() === name)) {
                    return "Northern Region";
                }
                if ((i = 3)) districts = await LocationService.getDistricts(i);
                if (districts.some((district: any) => district.name.trim() === name)) {
                    return "Southern Region";
                }
                if ((i = 4)) districts = await LocationService.getDistricts(i);
                if (districts.some((district: any) => district.name.trim() === name)) {
                    return "Foreign";
                }
            }
        },
        async updateDemographics() {
            const updatedData = {
                person_id: this.patient.patientID,
                given_name: getFieldValue(this.personInformation, "firstname", "value"),
                family_name: getFieldValue(this.personInformation, "lastname", "value"),
                middle_name: getFieldValue(this.personInformation, "middleName", "value"),
                gender: getRadioSelectedValue(this.personInformation, "gender"),
                birthdate: getFieldValue(this.personInformation, "birthdate", "value"),
                cell_phone_number: getFieldValue(this.personInformation, "phoneNumber", "value"),
                birthdate_estimated: false,
                home_region: await this.getRegion(getFieldValue(this.homeLocation, "home_district", "value")?.name),
                home_district: getFieldValue(this.homeLocation, "home_district", "value")?.name,
                home_traditional_authority: getFieldValue(this.homeLocation, "home_traditional_authority", "value")?.name,
                home_village: getFieldValue(this.homeLocation, "home_village", "value")?.name,
                current_region: await this.getRegion(getFieldValue(this.currentLocation, "current_district", "value")?.name),
                current_district: getFieldValue(this.currentLocation, "current_district", "value")?.name,
                current_traditional_authority: getFieldValue(this.currentLocation, "current_traditional_authority", "value")?.name,
                current_village: getFieldValue(this.currentLocation, "current_village", "value")?.name,
                landmark: getFieldValue(this.currentLocation, "current_village", "value")?.name,
                occupation: getRadioSelectedValue(this.socialHistory, "occupation"),
                religion: getFieldValue(this.socialHistory, "religion", "value")?.name,
                marital_status: getRadioSelectedValue(this.socialHistory, "maritalStatus"),
                education_level: getRadioSelectedValue(this.socialHistory, "highestLevelOfEducation"),
                facility_name: "",
                patient_type: "",
            };
            await this.updatePerson(this.patient.patientID, updatedData);
        },
        async updateGuardian() {
            let guardianDetails: any = {
                given_name: getFieldValue(this.guardianInformation, "guardianFirstname", "value"),
                family_name: getFieldValue(this.guardianInformation, "guardianLastname", "value"),
                middle_name: getFieldValue(this.guardianInformation, "guardianMiddleName", "value"),
                cell_phone_number: getFieldValue(this.guardianInformation, "guardianPhoneNumber", "value"),
                gender: "",
                birthdate: "",
                birthdate_estimated: false,
                home_district: "",
                home_traditional_authority: "",
                home_village: "",
                current_district: "",
                current_traditional_authority: "",
                current_village: "",
                landmark: "",
                occupation: "",
                religion: "",
                marital_status: "",
                education_level: "",
                facility_name: "",
                patient_type: "",
                national_id: "",
            };

            let data = await RelationshipService.getRelationships(this.patient.patientID);
            const selectedID = getFieldValue(this.guardianInformation, "relationship", "value")?.id;
            if (selectedID) {
                if (data.length > 0) {
                    const guardianData = await RelationshipService.getRelationships(this.patient.patientID);
                    await RelationsService.amendRelation(this.patient.patientID, data[0].person_b, data[0].relationship_id, selectedID);
                    await this.updatePerson(guardianData[0]?.person_b, guardianDetails);
                } else {
                    const guardian: any = new PatientRegistrationService();
                    await guardian.registerGuardian(guardianDetails);
                    const guardianID = guardian.getPersonID();
                    await RelationsService.createRelation(this.patient.patientID, guardianID, selectedID);
                }
            }
        },
        async updatePerson(personID: any, updatedData: any) {
            const personService = new PersonService(updatedData);
            const data = await personService.update(personID);
        },
        async updatePatientDemographics() {
            const item = await PatientService.findByID(this.patient.patientID);
            useDemographicsStore().setPatientRecord(item);
        },
        patientIdentifier(item: any) {
            // return item
            const ids = item.patient_identifiers.length - 1;
            if (ids >= 0) return item.patient_identifiers[ids].identifier;
            else return "";
        },
    },
});
</script>

<style scoped>
.custom-dropdown .vs__selected-options,
.custom-dropdown .vs__dropdown-option {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.custom-dropdown .vs__dropdown-menu {
    max-height: 150px;
    overflow-y: auto;
    background-color: red;
}
.PI-cls-1 {
    cursor: pointer;
}
.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.form-row {
    display: flex;
    align-items: center;
}
.lbl-ct {
    white-space: nowrap;
    color: #636363;
    flex: 1;
}
pim-cls-1 {
    --background: #ffff;
}
.custom-toolbar-cls {
    --background: #ffff;
}
ion-footer {
    --ion-toolbar-background: #fff;
}
ion-modal {
    --width: 94%;
    --height: 70%;
    --border-radius: 10px;
}
.dashed-hr {
    border: none;
    border-top: 1px dashed #b3b3b3;
    margin: 20px 0;
}
.modal_wrapper {
    padding: 0px 1px;
    background: #fff;
}
.PI-cls-1 {
    color: #1f2221d4;
}
.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: center;
    margin: 10px;
}
ion-accordion {
    margin-bottom: 15px;
}
</style>
