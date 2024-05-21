<template>
    <ion-page>
        <ion-header>
            <div class="header position_content">
                <div style="display: flex; align-items: center" @click="nav('/home')">
                    <ion-icon slot="separator" size="large" :icon="iconsContent.arrowLeft"></ion-icon>
                    <span style="padding-left: 10px">Go back</span>
                </div>
                <div>New patient registration</div>
                <div style="display: flex; align-items: center">
                    <ion-icon slot="separator" size="large" :icon="iconsContent.help"></ion-icon>
                    <span style="padding-left: 10px"> Need any help?</span>
                </div>
            </div>
        </ion-header>
        <ion-content>
            <div class="container">
                <div class="title">
                    <div class="demographics_title">Demographics</div>
                </div>
                <div class="icon_div">
                    <ion-icon :class="iconListStatus" :icon="list" @click="setDisplayType('list')"></ion-icon>
                    <ion-icon
                        :class="iconGridStatus"
                        style="font-size: 21px; margin-top: 1.5px"
                        :icon="grid"
                        @click="setDisplayType('grid')"
                    ></ion-icon>
                </div>
            </div>
            <div v-if="registrationType == 'scan'">
                <ScanRegistration />
            </div>
            <div class="center_content" v-if="registrationType == 'manual' && registrationDisplayType == 'grid'">
                <ion-row v-if="registrationDisplayType == 'grid'">
                    <ion-col size-sm="12" size-md="6" size-lg="4">
                        <PersonalInformation />
                    </ion-col>
                    <ion-col size-sm="12" size-md="6" size-lg="4">
                        <CurrentLocation />
                        <SocialHistory v-if="checkUnderFive" />
                    </ion-col>
                    <ion-col size-sm="12" size-md="6" size-lg="4" class="regDisplayFlex">
                        <HomeLocation />
                        <GuardianInformation />
                    </ion-col>
                </ion-row>
            </div>

            <div v-if="registrationType == 'manual' && registrationDisplayType == 'list'">
                <div v-if="currentStep == 'Personal Information'">
                    <PersonalInformation />
                </div>
                <div v-if="currentStep == 'Location'">
                    <div style="display: flex; justify-content: center">
                        <div><CurrentLocation /></div>
                        <div><HomeLocation /></div>
                    </div>
                </div>
                <div v-if="currentStep == 'Social History'">
                    <SocialHistory />
                </div>
                <div v-if="currentStep == 'Guardian Information'">
                    <GuardianInformation />
                </div>
            </div>
        </ion-content>
        <div class="footer2" v-if="registrationDisplayType == 'grid'">
            <DynamicButton name="Save" iconSlot="end" :icon="iconsContent.saveWhite" @click="saveData()" />
        </div>
        <ion-footer v-if="registrationType == 'manual' && registrationDisplayType == 'list'">
            <div class="footer position_content">
                <DynamicButton name="Previous" :icon="iconsContent.arrowLeftWhite" color="medium" @click="previousStep" />
                <ion-breadcrumbs class="breadcrumbs">
                    <ion-breadcrumb @click="setCurrentStep('Personal Information')" :class="{ active: currentStep === 'Personal Information' }">
                        <span class="breadcrumb-text">Personal Information</span>
                        <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                    </ion-breadcrumb>
                    <ion-breadcrumb @click="setCurrentStep('Location')" :class="{ active: currentStep === 'Location' }">
                        <span class="breadcrumb-text">Location</span>
                        <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                    </ion-breadcrumb>
                    <ion-breadcrumb @click="setCurrentStep('Social History')" :class="{ active: currentStep === 'Social History' }">
                        <span class="breadcrumb-text">Social History</span>
                        <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                    </ion-breadcrumb>
                    <ion-breadcrumb @click="setCurrentStep('Guardian Information')" :class="{ active: currentStep === 'Guardian Information' }">
                        <span class="breadcrumb-text">Guardian Information</span>
                        <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                    </ion-breadcrumb>
                </ion-breadcrumbs>
                <DynamicButton
                    v-if="currentStep == 'Guardian Information'"
                    name="Save"
                    iconSlot="end"
                    :icon="iconsContent.saveWhite"
                    @click="saveData()"
                />
                <DynamicButton v-else name="Next" iconSlot="end" :icon="iconsContent.arrowRightWhite" @click="nextStep" />
            </div>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonBreadcrumb, IonBreadcrumbs, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import { arrowForwardCircle, grid, list } from "ionicons/icons";
import { icons } from "@/utils/svg";
import DynamicButton from "@/components/DynamicButton.vue";
import PersonalInformation from "@/components/Registration/PersonalInformation.vue";
import GuardianInformation from "@/components/Registration/GuardianInformation.vue";
import HomeLocation from "@/components/Registration/HomeLocation.vue";
import CurrentLocation from "@/components/Registration/CurrentLocation.vue";
import SocialHistory from "@/components/Registration/SocialHistory.vue";
import ScanRegistration from "@/components/Registration/ScanRegistration.vue";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { mapState } from "pinia";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { PatientService } from "@/services/patient_service";
import { RelationsService } from "@/services/relations_service";
import { SocialHistoryService } from "@/services/social_history_service";
import { Service } from "@/services/service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { resetPatientData } from "@/services/reset_data";
import { validateField } from "@/services/validation_service";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import HisDate from "@/utils/Date";
import { useConfigurationStore } from "@/stores/ConfigurationStore";
import { UserService } from "@/services/user_service";
import { isEmpty } from "lodash";

export default defineComponent({
    components: {
        IonBreadcrumb,
        IonBreadcrumbs,
        IonIcon,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        DynamicButton,
        PersonalInformation,
        GuardianInformation,
        CurrentLocation,
        HomeLocation,
        SocialHistory,
        ScanRegistration,
    },
    data() {
        return {
            iconListStatus: "active_icon",
            iconGridStatus: "inactive_icon",
            iconsContent: icons,
            demographic: true,
            currentStep: "Personal Information",
            scanner: false,
            checkUnderFive: true,
            steps: ["Personal Information", "Guardian Information", "Location", "Social History"],
        };
    },
    props: ["registrationType"],
    computed: {
        ...mapState(useRegistrationStore, ["personInformation"]),
        ...mapState(useRegistrationStore, ["socialHistory"]),
        ...mapState(useRegistrationStore, ["homeLocation"]),
        ...mapState(useRegistrationStore, ["currentLocation"]),
        ...mapState(useRegistrationStore, ["guardianInformation"]),
        ...mapState(useConfigurationStore, ["registrationDisplayType"]),
        nationalID() {
            return getFieldValue(this.personInformation, "nationalID", "value");
        },
        firstname() {
            return getFieldValue(this.personInformation, "firstname", "value");
        },
        lastname() {
            return getFieldValue(this.personInformation, "lastname", "value");
        },
        gender() {
            return getRadioSelectedValue(this.personInformation, "gender");
        },
        birthdate() {
            return HisDate.toStandardHisFormat(getFieldValue(this.personInformation, "birthdate", "value"));
        },
        guardianFirstname() {
            return getFieldValue(this.guardianInformation, "guardianFirstname", "value");
        },
        guardianLastname() {
            return getFieldValue(this.guardianInformation, "guardianLastname", "value");
        },
        guardianMiddleName() {
            return getFieldValue(this.guardianInformation, "guardianMiddleName", "value");
        },
        guardianPhoneNumber() {
            return getFieldValue(this.guardianInformation, "guardianPhoneNumber", "value");
        },
        relationship() {
            return getFieldValue(this.guardianInformation, "relationship", "value");
        },
        current_district() {
            return getFieldValue(this.currentLocation, "current_district", "value")?.name;
        },
        current_traditional_authority() {
            return getFieldValue(this.currentLocation, "current_traditional_authority", "value")?.name;
        },
        current_village() {
            return getFieldValue(this.currentLocation, "current_village", "value")?.name;
        },
    },

    mounted() {
        this.setIconClass();
        this.disableNationalIDInput();
        this.isUnderFive();
    },
    watch: {
        personInformation: {
            handler() {
                const data = useRegistrationStore();
                data.setPersonalInformation(this.personInformation);
                data.setSocialHistory(this.socialHistory);
                data.setHomeLocation(this.homeLocation);
                data.setCurrentLocation(this.currentLocation);
                data.setGuardianInformation(this.guardianInformation);
                this.isUnderFive();
                this.disableNationalIDInput();
            },
            deep: true,
        },
    },
    setup() {
        return { arrowForwardCircle, grid, list };
    },
    methods: {
        isUnderFive() {
            if (!isEmpty(this.birthdate)) this.checkUnderFive = HisDate.getAgeInYears(this.birthdate) >= 5 ? true : false;
        },
        disableNationalIDInput() {
            if (this.registrationType == "manual") {
                modifyFieldValue(this.personInformation, "nationalID", "displayNone", true);
            } else {
                modifyFieldValue(this.personInformation, "nationalID", "displayNone", false);
            }
        },
        setCurrentStep(name: any) {
            this.currentStep = name;
        },
        nav(url: any) {
            this.$router.push(url);
        },
        nextStep() {
            const currentIndex = this.steps.indexOf(this.currentStep);
            if (currentIndex < this.steps.length - 1) {
                this.currentStep = this.steps[currentIndex + 1];
            }
        },
        previousStep() {
            const currentIndex = this.steps.indexOf(this.currentStep);
            if (currentIndex > 0) {
                this.currentStep = this.steps[currentIndex - 1];
            }
        },
        async findPatient(patientID: any) {
            const patientData = await PatientService.findByID(patientID);
            this.openNewPage(patientData);
        },
        async saveData() {
            if (await this.createPatient()) await UserService.setProgramUserActions();
        },
        async validations(data: any, fields: any) {
            if (this.nationalID != "") {
                if (await this.mwIdExists(this.nationalID)) {
                    toastWarning("The national ID is already assigned to another person");
                    return false;
                }
            }

            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },

        async createPatient() {
            const fields: any = ["nationalID", "firstname", "lastname", "birthdate", "gender"];
            const currentFields: any = ["current_district", "current_traditional_authority", "current_village"];
            if ((await this.validations(this.personInformation, fields)) && (await this.validations(this.currentLocation, currentFields))) {
                this.buildPersonalInformation();
                if (Object.keys(this.personInformation[0].selectedData).length === 0) return;
                const registration: any = new PatientRegistrationService();
                await registration.registerPatient(this.personInformation[0].selectedData, []);
                const patientID = registration.getPersonID();
                this.createNationID();
                if (Object.keys(this.guardianInformation[0].selectedData).length === 0) {
                    if (await this.validations(this.guardianInformation, ["guardianFirstname", "guardianLastname"])) {
                        this.createGuardian(patientID);
                    }
                }

                this.findPatient(patientID);
                toastSuccess("Successfully Created Patient");
                return true;
            } else {
                if (!(await this.mwIdExists(this.nationalID))) toastWarning("Please complete all required fields");
                return false;
            }
        },
        async createNationID() {
            if (this.validatedNationalID()) {
                const patient = new PatientService();
                await patient.updateMWNationalId(getFieldValue(this.personInformation, "nationalID", "value"));
            }
        },
        async mwIdExists(nid: string) {
            if (!nid) return false;
            const people = await PatientService.findByOtherID(28, nid);
            if (people.length > 0) return true;
            else return false;
        },
        validatedNationalID() {
            if (this.nationalID != "" && !getFieldValue(this.personInformation, "nationalID", "alertsError")) {
                return true;
            } else return false;
        },
        async createGuardian(patientID: any) {
            if (Object.keys(this.guardianInformation[0].selectedData).length === 0) return;
            getFieldValue(this.guardianInformation, "relationship", "selectedID");
            const guardian: any = new PatientRegistrationService();
            await guardian.registerGuardian(this.guardianInformation[0].selectedData);
            const guardianID = guardian.getPersonID();
            const selectedID = getFieldValue(this.guardianInformation, "relationship", "selectedID");
            if (selectedID) await RelationsService.createRelation(patientID, guardianID, selectedID);
        },
        async openNewPage(item: any) {
            await resetPatientData();
            const demographicsStore = useDemographicsStore();
            demographicsStore.setPatient(item);
            demographicsStore.setDemographics({
                name: item.person.names[0].given_name + " " + item.person.names[0].family_name,
                mrn: this.patientIdentifier(item),
                birthdate: item.person.birthdate,
                category: "",
                gender: item.person.gender,
                patient_id: item.patient_id,
                address: item.person?.addresses[0]?.state_province + "," + item?.person?.addresses[0]?.city_village,
                phone: item.person.person_attributes.find((attribute: any) => attribute.type.name === "Cell Phone Number")?.value,
            });
            let url = "/patientProfile";
            const patient = new PatientService();
            if (await patient.isUnderFive()) url = "/birthRegistration";
            this.$router.push(url);
        },
        patientIdentifier(item: any) {
            // return item
            const ids = item.patient_identifiers.length - 1;
            if (ids >= 0) return item.patient_identifiers[ids].identifier;
            else return "";
        },
        buildPersonalInformation() {
            this.personInformation[0].selectedData = {
                given_name: getFieldValue(this.personInformation, "firstname", "value"),
                middle_name: getFieldValue(this.personInformation, "middleName", "value"),
                family_name: getFieldValue(this.personInformation, "lastname", "value"),
                gender: this.gender,
                birthdate: getFieldValue(this.personInformation, "birthdate", "value"),
                birthdate_estimated: "false",
                home_region: getFieldValue(this.homeLocation, "homeDistrict", "value"),
                home_district: getFieldValue(this.homeLocation, "homeDistrict", "value"),
                home_traditional_authority: getFieldValue(this.homeLocation, "homeTraditionalAuthority", "value"),
                home_village: getFieldValue(this.homeLocation, "homeVillage", "value"),
                current_region: getFieldValue(this.currentLocation, "current_district", "value"),
                current_district: getFieldValue(this.currentLocation, "current_district", "value"),
                current_traditional_authority: getFieldValue(this.currentLocation, "current_traditional_authority", "value"),
                current_village: getFieldValue(this.currentLocation, "current_village", "value"),
                landmark: getFieldValue(this.currentLocation, "closestLandmark", "value"),
                cell_phone_number: getFieldValue(this.personInformation, "phoneNumber", "value"),
                occupation: getRadioSelectedValue(this.socialHistory, "occupation"),
                marital_status: getRadioSelectedValue(this.socialHistory, "maritalStatus"),
                religion: getFieldValue(this.socialHistory, "religion", "value"),
                education_level: getRadioSelectedValue(this.socialHistory, "highestLevelOfEducation"),
            };
        },
        setDisplayType(type: any) {
            const demographicsStore = useConfigurationStore();
            demographicsStore.setRegistrationDisplayType(type);
            this.setIconClass();
        },
        setIconClass() {
            this.iconListStatus = "inactive_icon";
            this.iconGridStatus = "inactive_icon";
            if (this.registrationDisplayType == "list") {
                this.iconListStatus = "active_icon";
            } else if (this.registrationDisplayType == "grid") {
                this.iconGridStatus = "active_icon";
            }
        },
    },
});
</script>
<style scoped>
.breadcrumbs {
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}
ion-toolbar {
    --opacity: 0.5;
    --background: var(--ion-background-color, #fff);
}
.header {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
}
.footer {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
}

ion-breadcrumb ion-icon {
    margin-inline: 30px;
}
.breadcrumb-active {
    color: var(--color);
}
.active {
    color: #00190e;
    display: flex;
    height: 40px;
    padding: 0px 16px;
    align-items: center;
    gap: 8px;
}
.active .breadcrumb-text {
    border-bottom: 1px solid #00190e; /* Set the desired color for the underline */
}
ion-footer {
    border-top: 1px solid #e6e6e6;
}

.icon_div {
    display: flex;
    justify-content: space-between;
    width: 70px;
    position: absolute;
    right: 70px;
    top: 20px;
}
.active_icon {
    font-size: 25px;
    background-color: #ddeedd;
    color: #6fbd70;
    border-radius: 5px;
}
.inactive_icon {
    font-size: 25px;
    color: #ccc;
}

.container {
    position: relative;
}

.title {
    text-align: center;
    margin-bottom: 10px;
}
.demographics_title {
    font-weight: 700;
    font-size: 24px;
    padding-top: 20px;
}
.demographics {
    display: flex;
    width: unset;
    justify-content: center;
}
.center_content {
    display: flex;
    justify-content: center;
}
</style>
