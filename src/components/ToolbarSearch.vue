<template>
    <ion-searchbar @ionInput="handleInput" placeholder="Search client by MRN, name or scan barcode/QR-Code" class="searchField"></ion-searchbar>
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

            <Pagination />

            <ion-row class="sticky-column">
                <ion-col size="4" class="sticky-column">
                    <DynButton :icon="add" :name="'Add Patient'" :fill="'clear'" @click="openCheckPaitentNationalIDModal" />
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
    IonCol,
} from "@ionic/vue";
import { defineComponent, onMounted } from "vue";
import { PatientService } from "@/services/patient_service";
import { checkmark, add, search } from "ionicons/icons";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useGlobalPropertyStore } from "@/stores/GlobalPropertyStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { useVitalsStore } from "@/stores/VitalsStore";
import DynButton from "@/components/DynamicButton.vue";
import { createModal, toastWarning } from "@/utils/Alerts";
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
import { ref } from 'vue';

export default defineComponent({
    name: "Home",
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
    },
    setup() {
        const page = ref(0);

        const nextPage = ()=>{
            page.value++
        }

        const previousPage = ()=> {
            page.value--;
        }

        return { checkmark, add, nextPage, previousPage };
    },
    data() {
        return {
            popoverOpen: false,
            event: null,
            patients: [] as any,
            showPopover: true,
        };
    },
    computed: {
        ...mapState(useGlobalPropertyStore, ["globalPropertyStore"]),
        ...mapState(useGeneralStore, ["NCDUserActions"]),
    },
    methods: {
        async handleInput(ev: any) {
            const searchText = ev.target.value;
            this.patients = [];
            this.popoverOpen = false;
            if (searchText.length > 0) {
                this.openPopover(ev);
                await this.searchDemographicPayload(searchText);
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
            if (Validation.isName(splittedArray[0]) == null) {
                const payload = {
                    given_name: splittedArray[0],
                    family_name: splittedArray.length >= 2 ? splittedArray[1] : "",
                    gender: splittedArray.length >= 3 ? splittedArray[2] : "",
                    page: "",
                    per_page: "7",
                };
                this.patients = await PatientService.search(payload);

                console.log(this.patients.length)
                if (this.patients.length > 0) {
                    this.callswipeleft();
                }
            }
        },
        async searchByNpid(searchText: any) {
            if (/.+\$$/i.test(`${searchText}`)) {
                searchText = `${searchText || ""}`.replace(/\$/gi, "");
                const idData = await PatientService.findByNpid(searchText as any);
                if (idData.length > 0) this.patients.push(...idData);

                if (this.patients.length == 1) {
                    this.openNewPage("patientProfile", this.patients[0]);
                    this.popoverOpen = false;
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
                if (nationalID.length > 0) {
                    this.patients.push(...nationalID);
                }
            }
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
        async openNewPage(url: any, item: any) {
            const demographicsStore = useDemographicsStore();
            demographicsStore.setPatient(item);
            demographicsStore.setDemographics({
                name: item.person.names[0].given_name + " " + item.person.names[0].family_name,
                mrn: this.patientIdentifier(item),
                birthdate: item.person.birthdate,
                category: "",
                gender: item.person.gender,
                patient_id: item.patient_id,
                address:
                    item?.person?.addresses[0]?.state_province +
                    "," +
                    item?.person?.addresses[0]?.township_division +
                    "," +
                    item?.person?.addresses[0]?.city_village,
                phone: this.getPhone(item),
            });
            if (Service.getProgramID() == 32 || Service.getProgramID() == 33) {
                resetNCDPatientData();
            } else if (Service.getProgramID() == 14) {
                resetOPDPatientData();
            }
            resetPatientData();

            const store = useAdministerVaccineStore();
            store.setVaccineReload(!store.getVaccineReload());
            const userProgramsData: any = sessionStorage.getItem("userPrograms");
            const userPrograms: any = JSON.parse(userProgramsData);
            const roleData: any = sessionStorage.getItem("userRoles");
            const roles: any = JSON.parse(roleData);
            UserService.setProgramUserActions();

            if (roles.some((role: any) => role.role === "Pharmacist")) {
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
            resetPatientData();
            createModal(CheckPatientNationalID, { class: "nationalIDModal" });
        },
        onDismiss() {
            console.log("Popover dismissed");
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
    padding-left: 30%;
    animation-name: swipe;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 3;
    animation-duration: 3s;
}
#handinfo {
    position: absolute;
    width: 70%;
    left: 30%;
    top: 48%;
    padding-left: 35%;
    animation-name: swipe;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 3;
    animation-duration: 3s;
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
