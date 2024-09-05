<template>
    <RoleSelectionModal :isOpen="isRoleSelectionModalOpen" @update:isOpen="isRoleSelectionModalOpen = $event" />
    <div style="display: flex; align-items: center">
        <ion-input
            @ionInput="handleInput"
            fill="outline"
            :value="searchValue"
            placeholder="Add or search for a client by MRN, name, or by scanning a barcode/QR code."
            class="searchField"
        >
            <ion-label style="display: flex" slot="start">
                <ion-icon :icon="search" style="color: #000" aria-hidden="true"></ion-icon>
            </ion-label>
            <ion-label style="display: flex" slot="end">
                <ion-buttons style="cursor: pointer; color: #74ff15" slot="end" class="iconFont">
                    <ion-icon :icon="iconContent.addPerson" @click="nav('registration/manual')" aria-hidden="true"></ion-icon>
                </ion-buttons>
            </ion-label>
            <ion-label style="display: flex" slot="end" v-if="isMobile">
                <ion-buttons style="cursor: pointer; color: #74ff15" slot="end" class="iconFont">
                    <ion-icon :icon="iconContent.scan" @click="scanCode()" aria-hidden="true"></ion-icon>
                </ion-buttons>
            </ion-label>
        </ion-input>
    </div>

    <ion-popover
        :is-open="popoverOpen"
        :event="event"
        @didDismiss="popoverOpen = false"
        :keyboard-close="false"
        :show-backdrop="false"
        :dismiss-on-select="false"
    >
        <div style="width: 1300px" class="sticky-table">
            <ion-row class="search_header">
                <ion-col style="max-width: 188px; min-width: 188px" class="sticky-column">Fullname</ion-col>
                <ion-col style="max-width: 120px; min-width: 120px">Birthdate</ion-col>
                <ion-col style="max-width: 90px; min-width: 90px; max-width: 90px">Gender</ion-col>
                <ion-col style="max-width: 330px; min-width: 330px">Current Address</ion-col>
                <ion-col style="max-width: 330px; min-width: 330px">Home Address</ion-col>
                <ion-col style="max-width: 100px; min-width: 100px">Phone</ion-col>
                <ion-col style="max-width: 25px"></ion-col>
            </ion-row>
            <ion-row class="search_result clickable-row" v-for="(item, index) in patients" :key="index" @click="openNewPage('patientProfile', item)">
                <ion-col style="max-width: 188px; min-width: 188px" class="sticky-column">{{
                    item.person.names[0].given_name + " " + item.person.names[0].family_name
                }}</ion-col>
                <ion-col style="max-width: 120px; min-width: 120px">{{ item.person.birthdate }}</ion-col>
                <ion-col style="max-width: 90px; min-width: 90px; max-width: 90px">{{ item.person.gender }}</ion-col>
                <ion-col style="max-width: 330px; min-width: 330px"
                    >{{ item?.person?.addresses[0]?.state_province }}, {{ item?.person?.addresses[0]?.township_division }},{{
                        item?.person?.addresses[0]?.city_village
                    }}</ion-col
                >
                <ion-col style="max-width: 330px; min-width: 330px"
                    >{{ item?.person?.addresses[0]?.address2 }}, {{ item?.person?.addresses[0]?.county_district }},{{
                        item?.person?.addresses[0]?.neighborhood_cell
                    }}</ion-col
                >
                <ion-col style="max-width: 150px; min-width: 150px">{{ getPhone(item) }}</ion-col>
                <ion-col style="max-width: 25px"><ion-icon :icon="checkmark" class="selectedPatient"></ion-icon> </ion-col>
            </ion-row>
            <ion-row
                v-show="!patients"
                class="search_result clickable-row"
                v-for="(item, index) in offlineFilteredPatients"
                :key="index"
                @click="setOfflineDemo(item)"
            >
                <ion-col style="max-width: 188px; min-width: 188px" class="sticky-column">{{
                    item.personInformation.given_name + " " + item.personInformation.family_name
                }}</ion-col>
                <ion-col style="max-width: 120px; min-width: 120px">{{ item.personInformation.birthdate }}</ion-col>
                <ion-col style="max-width: 90px; min-width: 90px; max-width: 90px">{{ item.personInformation.gender }}</ion-col>
                <ion-col style="max-width: 330px; min-width: 330px"
                    >{{ item?.personInformation?.current_district }}, {{ item?.personInformation?.current_traditional_authority }},{{
                        item?.personInformation?.current_village
                    }}</ion-col
                >
                <ion-col style="max-width: 330px; min-width: 330px"
                    >{{ item?.personInformation?.home_district }}, {{ item?.personInformation?.home_traditional_authority }},{{
                        item?.personInformation?.home_village
                    }}</ion-col
                >
                <ion-col style="max-width: 150px; min-width: 150px">{{ item?.personInformation?.cell_phone_number }}</ion-col>
                <ion-col style="max-width: 25px"><ion-icon :icon="checkmark" class="selectedPatient"></ion-icon> </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-start ion-align-items-center">
                <Pagination
                    :disablePrevious="page - 1 == 0"
                    :disableNext="patients?.length < paginationSize"
                    :page="page"
                    :onClickNext="nextPage"
                    :onClickPrevious="previousPage"
                />
            </ion-row>

            <ion-row class="sticky-column">
                <ion-col size="1.5" class="sticky-column">
                    <DynButton
                        :icon="add"
                        :name="programID() != 33 ? 'Add Patient' : 'Add Client'"
                        :fill="'clear'"
                        @click="openCheckPaitentNationalIDModal"
                    />
                </ion-col>
                <ion-col size="2" class="sticky-column">
                    <div>
                        <img id="hand" src="../../public/images/hand.svg" />
                        <img id="handinfo" src="../../public/images/swipeinfo.png" />
                    </div>
                </ion-col>
            </ion-row>
        </div>
    </ion-popover>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonSearchbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonPopover,
    popoverController,
    IonRow,
    IonButton,
    IonCol,
    IonInput,
    isPlatform,
} from "@ionic/vue";
import { defineComponent, onMounted } from "vue";
import { PatientService } from "@/services/patient_service";
import { checkmark, add, camera, search } from "ionicons/icons";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useGlobalPropertyStore } from "@/stores/GlobalPropertyStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { useVitalsStore } from "@/stores/VitalsStore";
import DynButton from "@/components/DynamicButton.vue";
import CheckPatientNationalID from "@/components/CheckPatientNationalID.vue";
import { resetPatientData } from "@/services/reset_data";
import { resetNCDPatientData } from "@/apps/NCD/config/reset_ncd_data";
import { resetOPDPatientData } from "@/apps/OPD/config/reset_opd_data";
import { mapState } from "pinia";
import Validation from "@/validations/StandardValidations";
import { UserService } from "@/services/user_service";
import { Service } from "@/services/service";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import Pagination from "./Pagination.vue";
import RoleSelectionModal from "@/apps/OPD/components/RoleSelectionModal.vue";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";
import DeviceDetection from "@/views/Mixin/DeviceDetection.vue";
import { scannedData, extractDetails } from "@/services/national_id";
import db from "@/db";
import { Patient } from "@/interfaces/patient";
import { PatientDemographicsExchangeService } from "@/services/patient_demographics_exchange_service";
import { isEmpty } from "lodash";
import { IncompleteEntityError, BadRequestError } from "@/services/service";
import { alertConfirmation, toastDanger, toastSuccess, toastWarning, createModal } from "@/utils/Alerts";
import { isUnknownOrEmpty, isValueEmpty } from "@/utils/Strs";
import PersonField from "@/utils/HisFormHelpers/PersonFieldHelper";
import SetPersonInformation from "@/views/Mixin/SetPersonInformation.vue";
import { icons } from "@/utils/svg";

export default defineComponent({
    name: "Home",
    mixins: [SetDemographics, DeviceDetection, SetPersonInformation],
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonSearchbar,
        IonPage,
        IonTitle,
        IonToolbar,
        IonIcon,
        IonPopover,
        DynButton,
        IonRow,
        IonCol,
        Pagination,
        RoleSelectionModal,
        IonButton,
        IonInput,
    },
    setup() {
        return { checkmark, add, search, camera };
    },
    data() {
        return {
            iconContent: icons,
            ddeInstance: {} as any,
            popoverOpen: false,
            event: null,
            patients: [] as any,
            offlinePatients: [] as any,
            offlineFilteredPatients: [] as any,
            showPopover: true,
            page: 1,
            searchText: "",
            searchValue: "",
            paginationSize: 7,
            isRoleSelectionModalOpen: false,
            localPatient: {} as any, // Patient found without dde
            useDDE: true as boolean,
            ddeEnabled: true as boolean,
            patient: {} as any,
            facts: {
                hasHighViralLoad: false as boolean,
                patientFound: false as boolean,
                npidHasDuplicates: false as boolean,
                npidHasOverFiveDuplicates: false as boolean,
                userRoles: [] as string[],
                scannedNpid: "" as string,
                currentNpid: "" as string,
                hasInvalidNpid: false as boolean,
                enrolledInProgram: false as boolean,
                programName: "N/A" as string,
                currentOutcome: "" as string,
                programs: [] as string[],
                identifiers: [] as string[],
                patientType: "N/A" as string,
                patientTypeLastUpdated: "" as string,
                anc: {
                    lmpMonths: -1,
                    canInitiateNewPregnancy: false,
                    currentPregnancyIsOverdue: false,
                },
                dde: {
                    localNpidDiff: "",
                    remoteNpidDiff: "",
                    voidedNpids: {
                        cols: [] as string[],
                        rows: [] as any,
                    },
                    hasDemographicConflict: false,
                    localDiffs: {},
                    diffRows: [],
                    diffRowColors: [] as Array<{ indexes: number[]; class: string }>,
                } as any,
                demographics: {
                    patientIsComplete: false as boolean,
                    hasInvalidDemographics: false as boolean,
                    invalidDemographics: [] as string[],
                    givenName: "" as string,
                    familyName: "" as string,
                    patientName: "" as string,
                    landmark: "" as string,
                    phoneNumber: "" as string,
                    currentDistrict: "" as string,
                    currentTA: "" as string,
                    currentVillage: "" as string,
                    ancestryDistrict: "" as string,
                    ancestryTA: "" as string,
                    ancestryVillage: "" as string,
                    gender: "" as string,
                    birthdate: "" as string,
                } as any,
                globalProperties: {
                    useFilingNumbers: false,
                    ddeEnabled: false,
                } as any,
            },
        };
    },
    watch: {
        page() {
            this.searchDemographicPayload(this.searchText);
        },
        searchText() {
            this.page = 1;
        },
    },
    computed: {
        ...mapState(useGlobalPropertyStore, ["globalPropertyStore"]),
        ...mapState(useGeneralStore, ["NCDUserActions"]),
    },
    async mounted() {
        this.ddeInstance = new PatientDemographicsExchangeService();
        this.offlinePatients = await db.collection("patientRecords").get();
    },
    methods: {
        nav(url: any) {
            this.$router.push(url);
        },
        async scanCode() {
            const dataScanned: any = await scannedData();
            const dataExtracted: any = await extractDetails(dataScanned);
            if (await this.searchByNpid(dataScanned + "$")) {
                this.searchValue = dataScanned;
            } else if (dataExtracted && (await this.searchByMWNationalID(dataExtracted?.idNumber))) {
                this.searchValue = dataScanned?.idNumber;
            } else if (dataExtracted) {
                await this.setPersonInformation(dataExtracted);
                this.$router.push("/registration/manual");
            }
            this.searchValue = dataScanned;
        },
        programID() {
            return Service.getProgramID();
        },
        async handleInput(ev: any) {
            this.searchText = ev.target.value;
            this.patients = [];
            this.popoverOpen = false;
            if (this.searchText.length > 0) {
                this.openPopover(ev);
                await this.searchDemographicPayload(this.searchText);
            }
        },
        async setID(scannedID: any) {
            const sitePrefix = await this.globalPropertyStore.sitePrefix;
            return {
                ARVNumber: `${sitePrefix}-ARV-${scannedID}`,
                NCDNumber: `${sitePrefix}-NCD-${scannedID}`,
            };
        },
        async searchDemographicPayload(searchText: any) {
            await this.searchByName(searchText);
            await this.searchByOtherIds(searchText);
            await this.searchByMWNationalID(searchText);
            await this.searchByNpid(searchText);
        },
        async searchByName(searchText: any) {
            const splittedArray = searchText.split(" ");
            const payload = {
                given_name: splittedArray[0],
                family_name: splittedArray.length >= 2 ? splittedArray[1] : "",
                gender: splittedArray.length >= 3 ? splittedArray[2] : "",
                page: this.page.toString(),
                per_page: this.paginationSize.toString(),
            };
            this.offlineFilteredPatients = [];

            // DDE enabled search
            if (this.globalPropertyStore.dde_enabled && payload.given_name && payload.family_name && payload.gender) {
                return (this.patients = await this.ddeInstance.searchDemographics(payload));
            }
            // Regular search
            this.patients = await PatientService.search(payload);
            if (this.patients && this.patients?.length > 0) {
                this.callswipeleft();
            } else {
                this.offlineFilteredPatients = await this.searchOfflinePatients(payload);
            }
        },
        async searchByNpid(searchText: any) {
            if (/.+\$$/i.test(`${searchText}`)) {
                searchText = `${searchText || ""}`.replace(/\$/gi, "");
                const idData = await PatientService.findByNpid(searchText as any);
                if (idData && idData.length > 0) {
                    this.patients.push(...idData);
                    if (this.patients.length == 1) {
                        this.openNewPage("patientProfile", this.patients[0]);
                        this.popoverOpen = false;
                    }
                    return true;
                } else {
                    return false;
                }
            }
        },
        async searchByOtherIds(searchText: any) {
            if (Validation.isWholeNumber(searchText) === null) {
                const IDs: any = await this.setID(searchText);
                if (Service.getProgramID() == 1) {
                    const artData = await PatientService.findByOtherID(4, IDs["ARVNumber"]);
                    if (artData.length > 0) this.patients.push(...artData);
                }
                if (Service.getProgramID() == 32) {
                    const ncdData = await PatientService.findByOtherID(31, IDs["NCDNumber"]);
                    if (ncdData.length > 0) this.patients.push(...ncdData);
                }
            }
        },
        async searchByMWNationalID(searchText: any) {
            if (Validation.isMWNationalID(searchText) == null) {
                const nationalID = await PatientService.findByOtherID(28, searchText);
                if (nationalID && nationalID.length > 0) {
                    this.patients.push(...nationalID);
                    this.openNewPage("patientProfile", this.patients[0]);
                    return true;
                } else return false;
            }
            return false;
        },
        callswipeleft() {
            const handElement = document.getElementById("hand");
            const handInfo = document.getElementById("handinfo") as HTMLDivElement;
            if (handElement) {
                handElement.addEventListener("animationend", () => {
                    handElement.style.display = "none";
                    handInfo.style.display = "none";
                });
            }
        },
        patientIdentifier(identifiers: any) {
            return identifiers.patient_identifiers
                .filter((identifier: any) => identifier.identifier_type === 3)
                .map((identifier: any) => identifier.identifier)
                .join(", ");
        },
        setOfflineDemo(data: any) {
            this.popoverOpen = false;
            resetPatientData();
            this.setOfflineDemographics(data);
            let url = "/patientProfile";
            this.$router.push(url);
        },
        async openNewPage(url: any, item: any) {
            this.popoverOpen = false;
            this.setDemographics(item);
            if (Service.getProgramID() == 32 || Service.getProgramID() == 33) {
                resetNCDPatientData();
            } else if (Service.getProgramID() == 14) {
                resetOPDPatientData();
            }
            resetPatientData();

            const store = useAdministerVaccineStore();
            store.setVaccineReload(!store.getVaccineReload());
            const userProgramsData: any = localStorage.getItem("userPrograms");
            const userPrograms: any = JSON.parse(userProgramsData);
            const roleData: any = localStorage.getItem("userRoles");
            const roles: any = JSON.parse(roleData);
            UserService.setProgramUserActions();

            if (roles.some((role: any) => role.role === "Lab" && roles.some((role: any) => role.role === "Pharmacist"))) {
                this.isRoleSelectionModalOpen = true;
            } else if (roles.some((role: any) => role.role === "Pharmacist")) {
                this.$router.push("dispensation");
            } else if (roles.some((role: any) => role.role === "Lab")) {
                this.$router.push("OPDConsultationPlan");
            } else if (userPrograms.length == 1) {
                let NCDUserAction: any = "";
                if (this.NCDUserActions.length > 0) [{ NCDUserAction: NCDUserAction }] = this.NCDUserActions;
                if (NCDUserAction && userPrograms.length == 1 && userPrograms.some((userProgram: any) => userProgram.name === "NCD PROGRAM")) {
                    this.$router.push(NCDUserAction.url);
                } else if (userPrograms.length == 1 && userPrograms.some((userProgram: any) => userProgram.name === "OPD PROGRAM")) {
                    this.$router.push("OPDvitals");
                } else {
                    this.$router.push(url);
                }
            } else {
                this.$router.push(url);
            }
        },
        getPhone(item: any) {
            return item.person.person_attributes.find((attribute: any) => attribute.type.name === "Cell Phone Number")?.value;
        },
        openPopover(e: any) {
            this.event = e;
            this.popoverOpen = true;
        },
        openCheckPaitentNationalIDModal() {
            this.popoverOpen = false;
            resetPatientData();
            createModal(CheckPatientNationalID, { class: "nationalIDModal" });
        },
        onDismiss() {
            console.log("Popover dismissed");
        },
        nextPage() {
            this.page++;
        },
        previousPage() {
            this.page--;
        },
        searchOfflinePatients(searchCriteria: any) {
            return this.offlinePatients.filter((patient: any) => {
                const personInfo = patient.personInformation;

                return (
                    (!searchCriteria.given_name || personInfo.given_name.toLowerCase().includes(searchCriteria.given_name.toLowerCase())) &&
                    (!searchCriteria.family_name || personInfo.family_name.toLowerCase().includes(searchCriteria.family_name.toLowerCase())) &&
                    (!searchCriteria.gender || personInfo.gender === searchCriteria.gender)
                );
            });
        },
        async searchOffline(searchText: any) {
            this.offlinePatients;
            return {
                patient_id: 25,
                date_created: "2024-07-26T11:41:27.000+02:00",
                person: {
                    gender: "M",
                    birthdate: "2024-07-26",
                    names: [
                        {
                            given_name: "test",
                            middle_name: "",
                            family_name: "ppea",
                        },
                    ],
                    addresses: [
                        {
                            address1: null,
                            address2: null,
                            city_village: "Chidothi",
                            state_province: "Dowa ",
                            postal_code: null,
                            county_district: null,
                            neighborhood_cell: null,
                            region: null,
                            subregion: null,
                            township_division: "Mponela Urban",
                        },
                    ],
                    person_attributes: [
                        {
                            value: "",
                            type: {
                                person_attribute_type_id: 12,
                                name: "Cell Phone Number",
                            },
                        },
                        {
                            person_attribute_id: 272,
                            value: "",
                            type: {
                                person_attribute_type_id: 13,
                                name: "Occupation",
                            },
                        },
                        {
                            value: "",
                            type: {
                                person_attribute_type_id: 5,
                                name: "Civil Status",
                            },
                        },
                        {
                            person_attribute_id: 274,
                            value: "",
                            type: {
                                person_attribute_type_id: 28,
                                name: "EDUCATION LEVEL",
                            },
                        },
                    ],
                },
                patient_identifiers: [
                    {
                        patient_identifier_id: 1,
                        identifier: "P170000000013",
                        type: {
                            patient_identifier_type_id: 3,
                            name: "National id",
                        },
                    },
                ],
            };
        },
        async handleSearchResults(patient: Promise<Patient | Patient[]>) {
            let results: Patient[] | Patient = [];
            try {
                results = (await patient) as Patient[] | Patient;
            } catch (e) {
                // [DDE] A person might have missing attributes such as home_village,
                // or home_ta.
                if (e instanceof IncompleteEntityError && !isEmpty(e.entity)) {
                    results = e.entity;
                } else if (e instanceof BadRequestError && Array.isArray(e.errors)) {
                    const [msg, ...entities] = e.errors;
                    if (typeof msg === "string" && msg === "Invalid parameter(s)") {
                        this.setInvalidParametersFacts(entities);
                    }
                } else {
                    toastDanger(`${e}`, 300000);
                }
            }

            // Use local patient if available if DDE never found them
            if (isEmpty(results) && !isEmpty(this.localPatient)) results = this.localPatient;

            if (Array.isArray(results) && results.length > 1) {
                this.facts.npidHasDuplicates = results.length <= 5;
                this.facts.npidHasOverFiveDuplicates = results.length > 5;
            } else {
                this.facts.patientFound = !isEmpty(results);
            }

            if (this.facts.patientFound) {
                this.patient = new PatientService(Array.isArray(results) ? results[0] : results);
                const factPromises = [];
                if (this.useDDE) {
                    factPromises.push(this.setDDEFacts());
                }
                this.facts.currentNpid = this.patient.getNationalID();
                factPromises.push(this.validateNpid());
                await Promise.all(factPromises);
            } else {
                // [DDE] a user might scan a deleted npid but might have a newer one.
                // The function below checks for newer version
                if (this.facts.scannedNpid) this.setVoidedNpidFacts(this.facts.scannedNpid);
            }
        },
        async validateNpid() {
            if (this.useDDE) {
                this.facts.hasInvalidNpid = !this.patient.getDocID() || (this.patient.getDocID() && isUnknownOrEmpty(this.patient.getNationalID()));
            } else {
                const results = await PatientService.findByNpid(this.facts.currentNpid, { page_size: 2 });
                this.facts.hasInvalidNpid = Array.isArray(results) && results.length > 1;
            }
        },
        /**
         * Set dde facts if service is enabled.
         * Please Note that DDE has to be configured per Program in the backend.
         * If a program isnt configured for DDE, it crashes by default hence
         * exception handling is required
         */ async setDDEFacts() {
            try {
                const localAndRemoteDiffs = (await this.ddeInstance.getLocalAndRemoteDiffs())?.diff;
                this.facts.dde.localDiffs = this.ddeInstance.formatDiffValuesByType(localAndRemoteDiffs, "local");
                const { comparisons, rowColors } = this.buildDDEDiffs(localAndRemoteDiffs);
                this.facts.dde.diffRows = comparisons;
                this.facts.dde.diffRowColors = rowColors;
                if (localAndRemoteDiffs.npid) {
                    const { local, remote } = localAndRemoteDiffs.npid;
                    this.facts.dde.localNpidDiff = local;
                    this.facts.dde.remoteNpidDiff = remote;
                    delete localAndRemoteDiffs.npid;
                }
                this.facts.dde.hasDemographicConflict = !isEmpty(localAndRemoteDiffs);
            } catch (e) {
                console.warn(e);
            }
            console.log("🚀 ~ */setDDEFacts ~ this.facts:", this.facts);
        },
        buildDDEDiffs(diffs: any) {
            const comparisons: Array<string[]> = [];
            const refs: any = {
                givenName: { label: "First Name", ref: "given_name" },
                familyName: { label: "Last Name", ref: "family_name" },
                birthdate: { label: "Birthdate", ref: "birthdate" },
                gender: { label: "Gender", ref: "gender" },
                phoneNumber: { label: "Phone number", ref: "phone_number" },
                ancestryDistrict: { label: "Home District", ref: "home_district" },
                ancestryTA: { label: "Home TA", ref: "home_traditional_authority" },
                ancestryVillage: { label: "Home Village", ref: "home_village" },
                currentDistrict: { label: "Current District", ref: "current_district" },
                currentTA: { label: "Current TA", ref: "current_traditional_authority" },
                currentVillage: { label: "Current Village", ref: "current_village" },
            };
            let index = 0;
            const diffIndexes: any = { indexes: [], class: "his-empty-set-color" };

            for (const k in refs) {
                let local = this.facts.demographics[k];
                let remote = local;

                if (refs[k].ref in diffs) {
                    diffIndexes.indexes.push(index);
                    local = diffs[refs[k].ref].local;
                    remote = diffs[refs[k].ref].remote;
                }

                comparisons.push([refs[k].label, local, remote]);
                ++index;
            }
            return { comparisons, rowColors: [diffIndexes] };
        },
        async setVoidedNpidFacts(npid: string) {
            const cols = ["Name", "Birthdate", "Gender", "Ancestry Home", "CurrentID", "Action"];
            let rows = [];
            const req = await this.ddeInstance.findVoidedIdentifier(npid);
            if (req) {
                rows = req.map((d: any) => {
                    const p = new PatientService(d);
                    return [
                        p.getFullName(),
                        p.getBirthdate(),
                        p.getGender(),
                        p.getHomeTA(),
                        p.getNationalID(),
                        {
                            type: "button",
                            name: "Select",
                            action: async () => {
                                if (!p.patientIsComplete()) {
                                    return this.$router.push(`/patient/registration?edit_person=${p.getID()}`);
                                } else if (p.getNationalID().match(/unknown/i) || !p.getDocID()) {
                                    try {
                                        // await p.assignNpid();
                                        // await this.findAndSetPatient(p.getID(), undefined);
                                        // return modalController.dismiss();
                                    } catch (e) {
                                        toastWarning("Failed to assign npid to patient with unknown npid.");
                                        return console.error(e);
                                    }
                                }
                                // await modalController.dismiss();
                                // await this.findAndSetPatient(undefined, p.getNationalID());
                            },
                        },
                    ];
                });
                this.facts.dde.voidedNpids.cols = cols;
                this.facts.dde.voidedNpids.rows = rows;
            }
        },
        /**
         * DDE sometimes sends 400 bad request which contains
         * a list of invalid demographic attributes
         */
        setInvalidParametersFacts(errorExceptions: any) {
            this.facts.demographics.hasInvalidDemographics = true;
            // Create a turple of attribute and error pairs
            this.facts.demographics.invalidDemographics = errorExceptions.map((e: any) => {
                const data = Object.entries(e);
                const entity = data[0][0];
                const errors = data[0][1] as string[];
                return [entity, errors.join(", ")];
            });
        },
    },
});
</script>

<style scoped>
.sticky-table {
    width: 100%;
    border-collapse: collapse;
}

.sticky-table th,
.sticky-table td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    color: black;
}
.sticky-column {
    position: sticky;
    left: 0;
    background-color: #f9f9f9;
    z-index: 1;
    color: black;
}

.sticky-table th {
    background-color: #f0f0f0;
    color: black;
}

.sticky-table tr:hover {
    background-color: #f1f1f1;
}

.search_header {
    border-bottom: 1px solid;
    border-bottom-style: dashed;
    padding-top: 10px;
    text-align: left;
    padding: 5px;
    color: #b3b3b3;
    color: black;
}

.search_result {
    text-align: left;
    padding: 5px;
    color: #b3b3b3;
    color: black;
}

.search_result:hover {
    background-color: #ebebeb;
    border-radius: 5px;
}

.search_result .selectedPatient {
    font-size: 18px;
    color: #b3b3b3;
}

.search_result .selectedPatient:hover {
    color: var(--ion-color-primary);
}

.search_result:hover ion-icon {
    background-color: #ebebeb;
    border-radius: 5px;
}

@media (max-width: 900px) {
    ion-popover {
        --width: 95vw;
    }
}

ion-popover {
    --width: 95vw;
    --max-width: 1300px;
}

#hand {
    position: absolute;
    top: 36%;
    animation-name: swipe;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 3;
    animation-duration: 3s;
}
#handinfo {
    position: absolute;
    top: 48%;
    padding-left: 10%;
    animation-name: swipe;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 3;
    animation-duration: 3s;
    height: 15px;
}
.clickable-row {
    cursor: pointer;
}
.hidden {
    display: none;
}

/*** ANIMATIONS ***/
@keyframes swipe {
    0% {
        left: 45%;
    }
    40% {
        left: 13%;
    }
    100% {
        left: 13%;
    }
}

@keyframes fall_1 {
    0% {
        top: 32.65%;
        opacity: 0.666;
    }
    20% {
        top: 32.65%;
    }
    60% {
        opacity: 0;
    }
    67% {
        top: 47%;
    }
    100% {
        top: 47%;
        opacity: 0;
    }
}

@keyframes fall_2 {
    0% {
        top: 32.65%;
        opacity: 0.666;
    }
    13% {
        top: 32.65%;
    }
    53% {
        opacity: 0;
    }
    60% {
        top: 47%;
    }
    100% {
        top: 47%;
        opacity: 0;
    }
}

@media (max-width: 1024px) {
    .medium {
        display: flex;
        justify-content: start;
    }
}
</style>
<style>
ion-popover {
    --background: #fff;
    --backdrop-opacity: 0.6;
    --box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.6);
    --color: white;
    --width: 300px;
    --padding: 10px;
}
</style>
