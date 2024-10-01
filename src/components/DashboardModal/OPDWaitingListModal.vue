<template>
    <!-- Spinner -->
<!--    <div v-if="isLoading" class="spinner-overlay">-->
<!--        <ion-spinner name="bubbles"></ion-spinner>-->
<!--        <div class="loading-text">Please wait...</div>-->
<!--    </div>-->
    <ion-header>
        <div class="header position_content">
            <div style="display: flex; align-items: center" @click="dismiss">
                <ion-icon slot="separator" size="large" :icon="iconsContent.arrowLeftWhite"></ion-icon>
            </div>
            <div style="font-size: 1.2em; font-weight: 700">{{ title }}</div>
            <div style="display: flex; align-items: center" @click="openPopover($event)">
                <ion-icon slot="separator" size="large" :icon="iconsContent.fillerWhite"></ion-icon>
            </div>
        </div>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div>
            <ion-card class="section" style="margin-bottom: 25px; margin-inline: 0px">
                <ion-card-header> <ion-card-title class="sectionTitle"> </ion-card-title></ion-card-header>
                <ion-card-content>
                    <div class="dueCardContent">
                        <DataTable :options="options" :columns="tableColumns" :data="patients" class="display nowrap" width="100%" />
                      
                    </div>
                </ion-card-content>
            </ion-card>
        </div>
        <ion-popover
            style="--offset-x: -10px"
            :is-open="popoverOpen"
            :show-backdrop="false"
            :dismiss-on-select="true"
            :event="event"
            @didDismiss="popoverOpen = false"
        >
            <div>
                <ion-list style="--ion-background-color: #fff; --offset-x: -30px">
                    <ion-item :button="true" :detail="false" style="cursor: pointer"></ion-item>
                </ion-list>
            </div>
        </ion-popover>
    </ion-content>
</template>
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonInput,
    IonCol,
    IonLabel,
    IonRow,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { icons } from "@/utils/svg";
import {
    medkit,
    chevronBackOutline,
    pulseOutline,
    clipboardOutline,
    grid,
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document,
    globe,
    add,
    person,
} from "ionicons/icons";
import { useAdministerOtherVaccineStore } from "@/apps/Immunization/stores/AdministerOtherVaccinesStore";
import { mapState } from "pinia";

import BasicInputField from "@/components/BasicInputField.vue";

import BasicForm from "@/components/BasicForm.vue";
import HisDate from "@/utils/Date";
import { Service } from "@/services/service";

import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { PatientService } from "@/services/patient_service";
import { saveVaccineAdministeredDrugs, getVaccinesSchedule } from "@/apps/Immunization/services/vaccines_service";
import QRCodeReadersrc from "@/components/QRCodeReader.vue";
import { createModal } from "@/utils/Alerts";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import VueMultiselect from "vue-multiselect";
import { isEmpty } from "lodash";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import { getVaccinesData } from "@/apps/Immunization/services/dashboard_service";
import {getPatientsList} from "@/apps/OPD/services/opd_dashboard";

export default defineComponent({
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
        IonCol,
        IonRow,
        VueMultiselect,
        IonLabel,
        DataTable,
    },
    data() {
        return {
            isLoading: false,
            popoverOpen: false,
            event: null as any,
            iconsContent: icons,
            showPD: false as boolean,
            batchNumber: "" as any,
            clientDetails: [] as any,
            dueData: [] as any,
            options: {
                responsive: true,
                select: false,
                searching: false,
                ordering: false,
                pageLength: 25,
                lengthChange: false,
            } as any,
            sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
            showDateBtns: true as boolean,
            tableColumns:[
                {title:"Patient Name", data: 'fullName', },
                {title:"Action", data: null,  render: (data:any,type:any,row:any)=>{
                    return `<ion-button class="btn-edit" @click="openProfile(${row})">Open Profile</ion-button>`
                }},
            ]
        };
    },
    props: {
        title: {
            default: [] as any,
        },
        patients: {
            default: [] as any
        }
    },
    computed: {

    },
    async mounted() {
        this.isLoading = true;
        const data = await getPatientsList();

    },
    watch: {
       

    },
    setup() {
        return { person, pulseOutline, clipboardOutline };
    },
    methods: {
      openPopover(e: Event) {
        this.event = e;
        this.popoverOpen = true;
      },
      dismiss() {
        modalController.dismiss();
      },
      openProfile(id:any){
        console.log({id})
      }
    }

});
</script>

<style scoped>
.position_content {
    max-width: 100vw;
}
.sectionTitle {
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 1.1em;
    border-bottom: #ccc 1px solid;
    line-height: 30px;
}
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
    margin: 20px;
    line-height: 60px;
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

.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.lbl-ct {
    white-space: nowrap;
    color: #08475e;
    font-size: 14px;
}
.error-label {
    background: #fecdca;
    color: #b42318;
    text-transform: none;
    padding: 6%;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
}
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
}
.header {
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
}
ion-header {
    background: #006401;
}
</style>
<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>
