<template>
    <ion-searchbar @ionInput="handleInput" placeholder="Search client by MRN, name or scan barcode/QR-Code" class="searchField"></ion-searchbar>
    <ion-popover
        :is-open="popoverOpen"
        :event="event"
        @didDismiss="popoverOpen = false"
        :keyboard-close="false"
        :show-backdrop="false"
        :dismiss-on-select="true"
    >
        <ion-content class="search_card">
            <ion-row class="search_header">
                <ion-col>Patient No. </ion-col>
                <ion-col>Fullname</ion-col>
                <ion-col>Birthdate</ion-col>
                <ion-col style="max-width: 70px">Gender</ion-col>
                <ion-col style="max-width: 30px"></ion-col>
            </ion-row>
            <ion-row class="search_result" v-for="(item, index) in patients" :key="index" @click="openNewPage('patientProfile', item)">
                <ion-col>{{ patientIdentifier(item) }} </ion-col>
                <ion-col>{{ item.person.names[0].given_name + " " + item.person.names[0].family_name }}</ion-col>
                <ion-col>{{ item.person.birthdate }}</ion-col>
                <ion-col style="max-width: 70px">{{ item.person.gender }}</ion-col>
                <ion-col style="max-width: 30px"><ion-icon :icon="checkmark" class="selectedPatient"></ion-icon> </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="5">
                    <DynButton :icon="add" :name="'Add Patient'" :fill="'clear'" @click="openCheckPaitentNationalIDModal" />
                </ion-col>
            </ion-row>
        </ion-content>
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
import { defineComponent } from "vue";
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
import { mapState } from "pinia";
import Validation from "@/validations/StandardValidations";
import { UserService } from "@/services/user_service";

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
    },
    setup() {
        return { checkmark, add };
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
        ...mapState(useGeneralStore, ["activities", "userActions"]),
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
                    page: "1",
                    per_page: "7",
                };
                this.patients = await PatientService.search(payload);
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
                const artData = await PatientService.findByOtherID(4, IDs["ARVNumber"]);
                const ncdData = await PatientService.findByOtherID(31, IDs["NCDNumber"]);

                if (artData.length > 0) {
                    this.patients.push(...artData);
                }

                if (ncdData.length > 0) {
                    this.patients.push(...ncdData);
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
        patientIdentifier(identifiers: any) {
            return identifiers.patient_identifiers
                .filter((identifier: any) => identifier.identifier_type === 3)
                .map((identifier: any) => identifier.identifier)
                .join(", ");
        },
        openNewPage(url: any, item: any) {
            const demographicsStore = useDemographicsStore();
            demographicsStore.setPatient(item);
            demographicsStore.setDemographics({
                name: item.person.names[0].given_name + " " + item.person.names[0].family_name,
                mrn: this.patientIdentifier(item),
                birthdate: item.person.birthdate,
                category: "",
                gender: item.person.gender,
                patient_id: item.patient_id,
                address: item?.person?.addresses[0]?.state_province + "," + item?.person?.addresses[0]?.city_village,
                phone: item.person.person_attributes.find((attribute: any) => attribute.type.name === "Cell Phone Number")?.value,
            });
            resetPatientData();
            const roleData: any = sessionStorage.getItem("userRoles");
            const userProgramsData: any = sessionStorage.getItem("userPrograms");
            const userPrograms: any = JSON.parse(userProgramsData);
            const roles: any = JSON.parse(roleData);
            UserService.setProgramUserActions();
            if (userPrograms.length == 1) {
                let NCDUserAction: any = "";
                if (this.userActions.length > 0) [{ NCDUserAction: NCDUserAction }] = this.userActions;
                if (NCDUserAction && userPrograms.length == 1 && userPrograms.some((userProgram: any) => userProgram.name === "NCD PROGRAM")) {
                    this.$router.push(NCDUserAction.url);
                } else if (userPrograms.length == 1 && userPrograms.some((userProgram: any) => userProgram.name === "OPD PROGRAM")) {
                    this.$router.push("OPDvitals");
                } else if (userPrograms.length == 1 && userPrograms.some((userProgram: any) => userProgram.name === "IMMUNIZATION PROGRAM")) {
                    this.$router.push("birthRegistration");
                } else if (roles.some((role: any) => role.role === "Pharmacist")) {
                    this.$router.push("dispensation");
                } else {
                    this.$router.push(url);
                }
            } else {
                this.$router.push(url);
            }
        },

        openPopover(e: any) {
            this.event = e;
            this.popoverOpen = true;
        },
        openCheckPaitentNationalIDModal() {
            createModal(CheckPatientNationalID, { class: "nationalIDModal" });
        },
        onDismiss() {
            console.log("Popover dismissed");
        },
    },
});
</script>

<style scoped>
.second_bar_list {
    list-style: none;
    justify-content: space-between;
    display: flex;
    font-size: 16px;
    margin: unset;
    padding: unset;
}
.search_result {
    text-align: left;
    padding: 5px;
    color: #b3b3b3;
}
li {
    margin-right: 40px;
}
.search_header {
    border-bottom: 1px solid;
    border-bottom-style: dashed;
    padding-top: 10px;
    text-align: left;
    padding: 5px;
    color: #b3b3b3;
}
.searchbar-input.sc-ion-searchbar-md {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
}
ion-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search_result .selectedPatient:hover {
    color: var(--ion-color-primary) !important;
    font-size: 18px;
}
.search_result .selectedPatient {
    --ion-hover: #fff;
    font-size: 18px;
    color: var(--ion-hover);
}
.search_result:hover ion-icon {
    --ion-hover: var(--ion-color-primary);
    background-color: #ebebeb;
    border-radius: 5px;
    color: var(--ion-hover) !important;
}
.search_result:hover {
    --ion-hover: var(--ion-color-primary);
    background-color: #ebebeb;
    border-radius: 5px;
    color: var(--ion-hover) !important;
}
ion-popover {
    --width: 60vw;
}
@media (max-width: 900px) {
    ion-popover {
        --width: 97vw;
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
