<template>
    <ion-page :class="{ loading: isLoading }">
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <ion-header>
            <div class="header position_content">
                <div style="display: flex; align-items: center" @click="nav('/home')">
                    <ion-icon slot="separator" size="large" :icon="iconsContent.arrowLeft"></ion-icon>
                    <span style="padding-left: 10px">Go back</span>
                </div>
                <div></div>
                <div style="display: flex; align-items: center">
                    <ion-icon slot="separator" size="large" :icon="iconsContent.help"></ion-icon>
                    <span style="padding-left: 10px"> Need any help?</span>
                </div>
            </div>
        </ion-header>
        <ion-content>
            <div class="container">
                <div class="title">
                    <div class="demographics_title">New {{ programID() != 33 ? "patient" : "client" }} registration</div>
                </div>
                <div class="icon_div displayNoneMobile">
                    <ion-icon :class="iconListStatus" :icon="list" @click="setDisplayType('list')"></ion-icon>
                    <ion-icon
                        :class="iconGridStatus"
                        style="font-size: 21px; margin-top: 1.5px"
                        :icon="grid"
                        @click="setDisplayType('grid')"
                    ></ion-icon>
                </div>
            </div>
            <div class="center_content" v-if="registrationDisplayType == 'grid' && screenWidth > 991">
                <div v-if="registrationDisplayType == 'grid'" class="flex-container">
                    <div class="flex-item">
                        <PersonalInformation />
                    </div>
                    <div class="flex-item">
                        <Country />
                        <CurrentLocation v-if="regSelectedCountry == 'Malawi'" />
                        <HomeLocation v-if="regSelectedCountry == 'Malawi'" />
                    </div>
                    <div class="flex-item">
                        <SocialHistory v-if="checkUnderFourteen" />
                        <BirthRegistration v-if="checkUnderNine" />
                        <GuardianInformation />
                    </div>
                </div>
            </div>

            <div v-if="registrationDisplayType == 'list' || screenWidth <= 991">
                <div v-if="currentStep == 'Personal Information'">
                    <PersonalInformation />
                </div>
                <div v-if="currentStep == 'Location'">
                    <div style="justify-content: center">
                        <div><Country /></div>
                        <div v-if="regSelectedCountry == 'Malawi'"><CurrentLocation /></div>
                        <div v-if="regSelectedCountry == 'Malawi'"><HomeLocation /></div>
                    </div>
                </div>
                <div v-if="currentStep == 'Social History'">
                    <SocialHistory v-if="checkUnderFourteen" />
                    <BirthRegistration v-if="checkUnderFive" />
                </div>
                <div v-if="currentStep == 'Guardian Information'">
                    <GuardianInformation />
                </div>
            </div>
        </ion-content>
        <div class="footer2" v-if="registrationDisplayType == 'grid' && screenWidth > 991">
            <DynamicButton name="Save" iconSlot="end" :icon="iconsContent.saveWhite" :disabledValue="disableSaveBtn" @click="createPatient()" />
        </div>
        <ion-footer v-if="registrationDisplayType == 'list' || screenWidth <= 991">
            <div class="footer position_content">
                <DynamicButton name="Cancel" v-if="currentStep == 'Personal Information'" color="danger" @click="cancel($event)" />
                <DynamicButton name="Previous" v-else :icon="iconsContent.arrowLeftWhite" color="medium" @click="previousStep" />
                <ion-breadcrumbs class="breadcrumbs displayNoneMobile">
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
                    @click="createPatient()"
                />
                <DynamicButton v-else name="Next" :disabledValue="false" iconSlot="end" :icon="iconsContent.arrowRightWhite" @click="nextStep" />
            </div>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonBreadcrumb, IonBreadcrumbs, IonIcon } from "@ionic/vue";
import { defineComponent, toRaw } from "vue";
import { arrowForwardCircle, grid, list } from "ionicons/icons";
import { icons } from "@/utils/svg";
import DynamicButton from "@/components/DynamicButton.vue";
import PersonalInformation from "@/components/Registration/PersonalInformation.vue";
import GuardianInformation from "@/components/Registration/GuardianInformation.vue";
import HomeLocation from "@/components/Registration/HomeLocation.vue";
import Country from "@/components/Registration/Country.vue";
import CurrentLocation from "@/components/Registration/CurrentLocation.vue";
import SocialHistory from "@/components/Registration/SocialHistory.vue";
import BirthRegistration from "@/components/Registration/BirthRegistration.vue";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { mapState } from "pinia";
import { PatientService } from "@/services/patient_service";
import { Service } from "@/services/service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { resetPatientData } from "@/services/reset_data";
import { validateField } from "@/services/validation_service";
import { toastSuccess, toastWarning, popoverConfirmation, toastDanger } from "@/utils/Alerts";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import HisDate from "@/utils/Date";
import { useConfigurationStore } from "@/stores/ConfigurationStore";
import { isEmpty } from "lodash";
import { useBirthRegistrationStore } from "@/apps/Immunization/stores/BirthRegistrationStore";
import { formatInputFiledData } from "@/services/formatServerData";
import { validateInputFiledData } from "@/services/group_validation";
import ScreenSizeMixin from "@/views/Mixin/ScreenSizeMixin.vue";
import { resetDemographics } from "@/services/reset_data";
import Districts from "@/views/Mixin/SetDistricts.vue";
import PersonMatchView from "@/components/PersonMatchView.vue";
import { createModal } from "@/utils/Alerts";
import { useWebWorkerFn } from "@vueuse/core";
import db from "@/db";
import { alertConfirmation } from "@/utils/Alerts";
import { PatientDemographicsExchangeService } from "@/services/patient_demographics_exchange_service";
import { useGlobalPropertyStore } from "@/stores/GlobalPropertyStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { getOfflineRecords } from "@/services/offline_service";
import { useStatusStore } from "@/stores/StatusStore";
import { useWorkerStore } from "@/stores/workerStore";
import { getOfflineVaccineSchedule } from "@/apps/Immunization/services/vaccines_service";
import { RegistrationService } from "@/services/registration_service";
import { saveOfflinePatientData } from "@/services/offline_service";
export default defineComponent({
    mixins: [ScreenSizeMixin, Districts],
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
        Country,
        HomeLocation,
        SocialHistory,
        BirthRegistration,
    },
    data() {
        return {
            ddeId: null as any,
            iconListStatus: "active_icon",
            deduplicationData: "active_icon",
            iconGridStatus: "inactive_icon",
            iconsContent: icons,
            demographic: true,
            currentStep: "Personal Information",
            scanner: false,
            checkUnderOne: false,
            isLoading: false,
            checkUnderFourteen: true,
            checkUnderNine: false,
            checkUnderFive: false,
            checkUnderSixWeeks: false,
            steps: ["Personal Information", "Location", "Social History", "Guardian Information"],
            disableSaveBtn: false,
            workerStore: useWorkerStore() as any,
        };
    },
    props: ["registrationType"],
    computed: {
        ...mapState(useGeneralStore, ["NCDUserActions", "regSelectedCountry"]),
        ...mapState(useGlobalPropertyStore, ["globalPropertyStore"]),
        ...mapState(useRegistrationStore, [
            "personInformation",
            "socialHistory",
            "currentLocation",
            "homeLocation",
            "guardianInformation",
            "country",
        ]),
        ...mapState(useConfigurationStore, ["registrationDisplayType"]),
        ...mapState(useBirthRegistrationStore, ["birthRegistration"]),
        ...mapState(useStatusStore, ["apiStatus"]),
        nationalID() {
            return getFieldValue(this.personInformation, "nationalID", "value");
        },
        birthID() {
            return getFieldValue(this.birthRegistration, "Serial Number", "value");
        },
        firstname() {
            return getFieldValue(this.personInformation, "firstname", "value");
        },
        lastname() {
            return getFieldValue(this.personInformation, "lastname", "value");
        },
        phoneNumber() {
            return getFieldValue(this.personInformation, "phoneNumber", "value");
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
        "Other (specify)"() {
            return getFieldValue(this.currentLocation, "Other (specify)", "value");
        },
    },

    async mounted() {
        resetDemographics();
        this.setIconClass();
        this.disableNationalIDInput();
        this.checkAge();
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
                this.checkAge();
                this.disableNationalIDInput();
            },
            deep: true,
        },
        $route: {
            async handler(data) {
                this.currentStep = "Personal Information";
                // await await resetPatientData();
                if (data.name == "registration") resetDemographics();
                await this.getLocationData();
                modifyFieldValue(this.country, "country", "multiSelectData", this.countriesList);
                modifyFieldValue(this.currentLocation, "current_district", "multiSelectData", this.districtList);
                modifyFieldValue(this.homeLocation, "home_district", "multiSelectData", this.districtList);
            },
            deep: true,
        },
    },
    setup() {
        return { arrowForwardCircle, grid, list };
    },
    methods: {
        async cancel(event: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to cancel registration?`, "", {
                confirmBtnLabel: "Yes",
                icon: "",
                showBackdrop: true,
            });
            if (deleteConfirmed) {
                this.nav("/home");
            }
        },
        programID() {
            return Service.getProgramID();
        },
        async getRegion(name: any) {
            if (name) {
                let districts = [];
                for (let i of [1, 2, 3]) {
                    if ((i = 1)) districts = await this.getDistricts(i);
                    if (districts.some((district: any) => district.name.trim() === name)) {
                        return "Central Region";
                    }
                    if ((i = 2)) districts = await this.getDistricts(i);
                    if (districts.some((district: any) => district.name.trim() === name)) {
                        return "Northern Region";
                    }
                    if ((i = 3)) districts = await this.getDistricts(i);
                    if (districts.some((district: any) => district.name.trim() === name)) {
                        return "Southern Region";
                    }
                    if ((i = 4)) districts = await this.getDistricts(i);
                    if (districts.some((district: any) => district.name.trim() === name)) {
                        return "Foreign";
                    }
                }
            }
        },
        checkAge() {
            if (!isEmpty(this.birthdate)) {
                this.checkUnderFourteen = HisDate.getAgeInYears(this.birthdate) >= 14 ? true : false;
                this.checkUnderNine = HisDate.ageInMonths(this.birthdate) < 9 ? true : false;
                this.checkUnderFive = HisDate.getAgeInYears(this.birthdate) < 5 ? true : false;
                this.checkUnderSixWeeks = HisDate.dateDiffInDays(HisDate.currentDate(), this.birthdate) < 42 ? true : false;
            }
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
        async nextStep() {
            if (this.checkUnderFourteen || this.checkUnderFive)
                this.steps = ["Personal Information", "Location", "Social History", "Guardian Information"];
            else this.steps = ["Personal Information", "Location", "Guardian Information"];
            const currentIndex = this.steps.indexOf(this.currentStep);
            if (currentIndex < this.steps.length - 1) {
                if (this.currentStep === "Personal Information") {
                    const fields: any = ["nationalID", "firstname", "lastname", "birthdate", "gender"];
                    if (await this.validations(this.personInformation, fields)) {
                        this.currentStep = this.steps[currentIndex + 1];
                    } else {
                        toastWarning("Please fill fileds correctly before you proceed!");
                    }
                } else if (this.currentStep === "Location") {
                    const currentFields: any = ["current_district", "current_traditional_authority", "current_village"];
                    if (
                        ((await this.validations(this.currentLocation, currentFields)) && (await validateInputFiledData(this.homeLocation))) ||
                        this.regSelectedCountry != "Malawi"
                    ) {
                        this.currentStep = this.steps[currentIndex + 1];
                    } else {
                        toastWarning("Please fill fileds correctly before you proceed!");
                    }
                } else if (this.currentStep === "Social History") {
                    if (this.checkUnderFive || this.checkUnderOne) {
                        if (await validateInputFiledData(this.birthRegistration)) {
                            this.currentStep = this.steps[currentIndex + 1];
                        } else {
                            toastWarning("Please fill fileds correctly before you proceed!");
                        }
                    } else {
                        this.currentStep = this.steps[currentIndex + 1];
                    }
                }
                //this.currentStep = this.steps[currentIndex + 1];
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
            await useDemographicsStore().setPatientRecord(patientData);
            this.setURLs();
        },

        validateGaudiarnInfo() {
            if (!this.checkUnderFourteen) {
                return validateInputFiledData(this.guardianInformation);
            }
            return true;
        },
        async validations(data: any, fields: any) {
            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },
        async validateLocation() {
            if (this.regSelectedCountry == "Malawi") {
                if ((await validateInputFiledData(this.homeLocation)) && (await validateInputFiledData(this.currentLocation))) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        async possibleDuplicates() {
            try {
                const ddeInstance = new PatientDemographicsExchangeService();
                this.deduplicationData = await ddeInstance.checkPotentialDuplicates(toRaw(this.personInformation[0].selectedData));
                if (this.deduplicationData.length > 0) {
                    const response: any = await createModal(PersonMatchView, { class: "fullScreenModal" }, true, {
                        to_be_registered: toRaw(this.personInformation[0].selectedData),
                        deduplicationData: this.deduplicationData,
                    });
                    if (response != "dismiss" && response != "back") {
                        const result = await ddeInstance.importPatient(response?.person?.id);
                        await this.findPatient(result.patient_id);
                        return true;
                    } else if (response == "back") {
                        return true;
                    }
                    return false;
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }
        },
        async createPatient() {
            const ddeIds: any = await getOfflineRecords("dde").then((data: any) => data?.[0]);
            if (ddeIds?.ids?.length > 0 || this.apiStatus) {
                this.ddeId = ddeIds?.ids[0]?.npid || "";

                const fields: any = ["nationalID", "firstname", "lastname", "birthdate", "gender"];
                const currentFields: any = ["current_district", "current_traditional_authority", "current_village"];
                const selectedLandmark = getFieldValue(this.currentLocation, "closestLandmark", "value");
                const isOtherSelected = selectedLandmark?.name === "Other";

                if (isOtherSelected) {
                    currentFields.push("Other (specify)");
                }
                if (
                    (await this.validations(this.personInformation, fields)) &&
                    (await this.validateLocation()) &&
                    (await this.validateBirthData()) &&
                    this.validateGaudiarnInfo()
                ) {
                    await this.buildPersonalInformation();
                    this.disableSaveBtn = true;
                    this.isLoading = true;

                    if (this.globalPropertyStore.dde_enabled === "true" && this.apiStatus) {
                        if (await this.possibleDuplicates()) {
                            this.disableSaveBtn = false;
                            this.isLoading = false;
                            return;
                        }
                    }

                    if (Object.keys(this.personInformation[0].selectedData).length === 0) return;
                    const patientData = await this.buildPatientRecord();
                    if (ddeIds?.ids?.length > 0) {
                        ddeIds.ids = ddeIds.ids.slice(1);
                        this.workerStore.postData("OVERRIDE_OBJECT_STORE", { storeName: "dde", data: ddeIds });
                    }

                    if ((this.apiStatus && this.programID() != 33) || (this.apiStatus && ddeIds?.ids?.length == 0)) {
                        this.workerStore.postData("SYNC_DDE");
                        const result = await new RegistrationService().saveDemographicsRecord(patientData);
                        await useDemographicsStore().setPatientRecord(result);
                        this.workerStore.postData("SYNC_ALL_DATA");
                        await this.setURLs();
                    } else if (ddeIds?.ids?.length > 0) {
                        await saveOfflinePatientData(patientData);
                        this.$router.push("/patientProfile");
                    } else {
                        toastDanger("DDE IDs are not available. Please connect to the server to sync the IDs.");
                    }
                } else {
                    toastWarning("Please complete all required fields");
                }
            } else {
                toastDanger("DDE IDs are not available. Please connect to the server to sync the IDs.");
            }
        },
        async buildPatientRecord() {
            const Weight = getFieldValue(this.birthRegistration, "Weight", "value");
            let vitals: any = {
                saved: [],
                unsaved: [],
            };
            if (Weight) {
                vitals.unsaved = [
                    {
                        concept_id: 5089,
                        obs_datetime: HisDate.currentDate(),
                        value_numeric: Weight,
                    },
                ];
            }
            const birthdate = this.personInformation[0].selectedData.birthdate;
            const gender = this.personInformation[0].selectedData.gender;
            const offlineRecord: any = {
                patientID: "",
                ID: this.ddeId,
                NcdID: "",
                personInformation: toRaw(this.personInformation[0].selectedData),
                guardianInformation: {
                    saved: [],
                    unsaved: [toRaw(this.guardianInformation[0].selectedData)],
                },
                birthRegistration: toRaw(await formatInputFiledData(this.birthRegistration)),
                otherPersonInformation: {
                    nationalID: this.validatedNationalID(),
                    birthID: this.validatedBirthID(),
                    relationshipID: getFieldValue(this.guardianInformation, "relationship", "value")?.id,
                },
                vitals: vitals,
                vaccineSchedule: await getOfflineVaccineSchedule(gender, birthdate),
                vaccineAdministration: {
                    orders: [],
                    obs: [],
                    voided: [],
                },
                saveStatusPersonInformation: "pending",
                saveStatusGuardianInformation: "pending",
                saveStatusBirthRegistration: "pending",
                saveStatusVitals: "pending",
                date_created: "",
                creator: "",
            };
            return offlineRecord;
        },
        checkWeightForAge(age: any, weight: any) {
            let isValid = false;
            if (age >= 0 && age < 1 && weight >= 0.5 && weight <= 13.1) {
                isValid = true;
            } else if (age >= 1 && age < 2 && weight > 13.1 && weight <= 15) {
                isValid = true;
            } else if (age >= 2 && age < 3 && weight > 15 && weight <= 20.9) {
                isValid = true;
            } else if (age >= 3 && age < 4 && weight > 20.9 && weight <= 24.1) {
                isValid = true;
            } else if (age >= 4 && age < 5 && weight > 24.1 && weight <= 28) {
                isValid = true;
            }
            return isValid;
        },
        async validateBirthData() {
            if (this.checkUnderNine) {
                const result = this.checkWeightForAge(
                    HisDate.getAgeInYears(this.birthdate),
                    getFieldValue(this.birthRegistration, "Weight", "value")
                );
                if (!result) {
                    const confirm = await alertConfirmation(
                        `Do you want to continue with this weight (${getFieldValue(
                            this.birthRegistration,
                            "Weight",
                            "value"
                        )}) for age (${HisDate.getAgeInYears(this.birthdate)})`
                    );
                    if (confirm) return true;
                    else return false;
                }
                return validateInputFiledData(this.birthRegistration);
            } else {
                return true;
            }
        },
        validatedNationalID() {
            if (this.nationalID != "" && !getFieldValue(this.personInformation, "nationalID", "alertsErrorMassage")) {
                return this.nationalID;
            } else return "";
        },
        validatedBirthID() {
            if (this.birthID != "" && !getFieldValue(this.birthRegistration, "Serial Number", "alertsErrorMassage")) {
                return this.birthID;
            } else return "";
        },
        async setURLs() {
            await resetPatientData();
            this.isLoading = false;
            this.disableSaveBtn = false;
            let url = "";
            if (this.programID() == 32 && this.apiStatus) {
                url = "/consultationPlan";
            } else {
                url = "/patientProfile";
            }
            this.$router.push(url);
        },
        patientIdentifier(item: any) {
            // return item
            const ids = item.patient_identifiers.length - 1;
            if (ids >= 0) return item.patient_identifiers[ids].identifier;
            else return "";
        },
        async buildPersonalInformation() {
            const closestLandmark = getFieldValue(this.currentLocation, "closestLandmark", "value")?.name;
            const otherLandmark = getFieldValue(this.currentLocation, "Other (specify)", "value");
            const landmark = closestLandmark === "Other" ? otherLandmark : closestLandmark;
            this.personInformation[0].selectedData = {
                given_name: getFieldValue(this.personInformation, "firstname", "value"),
                middle_name: getFieldValue(this.personInformation, "middleName", "value"),
                family_name: getFieldValue(this.personInformation, "lastname", "value"),
                gender: this.gender,
                birthdate: getFieldValue(this.personInformation, "birthdate", "value"),
                birthdate_estimated: "false",
                home_region:
                    (await this.getRegion(getFieldValue(this.homeLocation, "home_district", "value")?.name)) ||
                    (await this.getRegion(getFieldValue(this.country, "country", "value")?.name)),
                home_district: getFieldValue(this.homeLocation, "home_district", "value")?.name,
                home_traditional_authority: getFieldValue(this.homeLocation, "home_traditional_authority", "value")?.name,
                home_village: getFieldValue(this.homeLocation, "home_village", "value")?.name,
                current_region: await this.getRegion(this.current_district),
                current_district: this.current_district,
                current_traditional_authority: this.current_traditional_authority,
                current_village: this.current_village,
                country: getFieldValue(this.country, "country", "value")?.name,
                landmark: landmark,
                cell_phone_number: getFieldValue(this.personInformation, "phoneNumber", "value"),
                occupation: getRadioSelectedValue(this.socialHistory, "occupation"),
                marital_status: getRadioSelectedValue(this.socialHistory, "maritalStatus"),
                religion: getFieldValue(this.socialHistory, "religion", "value")?.name,
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
    font-size: 22px;
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
.flex-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
}

.flex-item {
    color: white;
    flex: 1 1 100px;
    text-align: center;
    border-radius: 5px;
    box-sizing: border-box;
}
</style>
