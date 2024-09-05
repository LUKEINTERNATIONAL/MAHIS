<template>
    <ion-page :class="{ loading: isLoading }">
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content>
            <div class="container">
                <h1 style="width: 100%; text-align: center; font-weight: 700">Schedule Immunization Sessions</h1>
                <div style="display: flex; justify-content: space-between">
                    <div
                        style="display: inline-block; vertical-align: top; max-width: 400px; top: -10px; position: relative; margin-right: 10px">
                        <basic-form :contentData="startEndDate" @update:inputValue="handleInputData"></basic-form>
                    </div>
                    <div style="display: inline-block; vertical-align: top; margin-top: 10px; float: right">
                        <ion-button @click="openModal()">
                            <ion-icon slot="start" :icon="add"></ion-icon>
                            Create Session
                        </ion-button>
                    </div>
                </div>

                <div class="content-container">
                    <ion-card-title class="content-title" style="padding-bottom: 10px;">Session Schedules</ion-card-title>
                    <div class="flex-between">
                        <div>
                            <VCalendar :attributes="attributes" :expanded="true" />
                        </div>
                        <ion-card class="w-full" style="margin-top: 0px;">
                            <ion-card-header>
                                <div style="display: flex; justify-content: space-between; align-items: center;"> 
                                    <ion-card-title style="text-transform: uppercase; font-size: 22px;">
                                        (1) Immunization Session A for Example Y
                                    </ion-card-title>

                                        <ion-button id="popover-trigger" slot="end" fill="clear">
                                            <ion-icon slot="icon-only" :icon="ellipsisVertical"></ion-icon>
                                        </ion-button>

                                        <ion-popover trigger="popover-trigger" dismiss-on-select="true">
                                            <ion-content>
                                                <ion-list>
                                                    <ion-item button>
                                                        <ion-label>Edit</ion-label>
                                                    </ion-item>
                                                    <ion-item button>
                                                        <ion-label>Delete</ion-label>
                                                    </ion-item>
                                                </ion-list>
                                            </ion-content>
                                        </ion-popover>
                                    </div>
                            </ion-card-header>

                            <ion-card-content class="-mt-40 ion-hide-sm-down">
                                <ion-list :inset="true">
                                    <ion-item>
                                        <div slot="start" class="icon-color">
                                            <svg xmlns="http://www.w3.org/2000/svg" :width="svgIconWidth"
                                                :height="svgIconHeight" viewBox="0 0 20 20">
                                                <g fill="currentColor">
                                                    <g opacity="0.2">
                                                        <path d="M9.75 7.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                                                        <path fill-rule="evenodd"
                                                            d="M6.75 8.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                                                            clip-rule="evenodd" />
                                                        <path fill-rule="evenodd"
                                                            d="M6.8 11.5A1.5 1.5 0 0 0 5.3 13v1.5a1 1 0 0 1-2 0V13a3.5 3.5 0 0 1 7 0v.5a1 1 0 1 1-2 0V13a1.5 1.5 0 0 0-1.5-1.5"
                                                            clip-rule="evenodd" />
                                                        <path d="M12.75 7.75a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
                                                        <path fill-rule="evenodd"
                                                            d="M15.75 8.75a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0 2a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
                                                            clip-rule="evenodd" />
                                                        <path fill-rule="evenodd"
                                                            d="M15.7 11.5a1.5 1.5 0 0 1 1.5 1.5v1.5a1 1 0 1 0 2 0V13a3.5 3.5 0 0 0-7 0v.5a1 1 0 1 0 2 0V13a1.5 1.5 0 0 1 1.5-1.5"
                                                            clip-rule="evenodd" />
                                                        <path fill-rule="evenodd"
                                                            d="M11.3 14.25a1.5 1.5 0 0 0-1.5 1.5v1.5a1 1 0 0 1-2 0v-1.5a3.5 3.5 0 0 1 7 0v1.5a1 1 0 1 1-2 0v-1.5a1.5 1.5 0 0 0-1.5-1.5"
                                                            clip-rule="evenodd" />
                                                        <path d="M14.25 10.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                                                        <path fill-rule="evenodd"
                                                            d="M11.25 11.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                                                            clip-rule="evenodd" />
                                                        <path d="M4.25 11.5h5v4h-5zm9 0h5v4h-5z" />
                                                        <path d="M9.25 13.5h4l.5 4.75h-5z" />
                                                    </g>
                                                    <path fill-rule="evenodd"
                                                        d="M5 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                                                        clip-rule="evenodd" />
                                                    <path fill-rule="evenodd"
                                                        d="M3.854 8.896a.5.5 0 0 1 0 .708l-.338.337A3.47 3.47 0 0 0 2.5 12.394v1.856a.5.5 0 1 1-1 0v-1.856a4.47 4.47 0 0 1 1.309-3.16l.337-.338a.5.5 0 0 1 .708 0m11.792-.3a.5.5 0 0 0 0 .708l.338.337A3.47 3.47 0 0 1 17 12.094v2.156a.5.5 0 0 0 1 0v-2.156a4.47 4.47 0 0 0-1.309-3.16l-.337-.338a.5.5 0 0 0-.708 0"
                                                        clip-rule="evenodd" />
                                                    <path fill-rule="evenodd"
                                                        d="M14 9a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 1a3 3 0 1 1 0-6a3 3 0 0 1 0 6m-4.5 3.25a2.5 2.5 0 0 0-2.5 2.5v1.3a.5.5 0 0 1-1 0v-1.3a3.5 3.5 0 0 1 7 0v1.3a.5.5 0 1 1-1 0v-1.3a2.5 2.5 0 0 0-2.5-2.5"
                                                        clip-rule="evenodd" />
                                                    <path fill-rule="evenodd"
                                                        d="M9.5 11.75a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                                                        clip-rule="evenodd" />
                                                </g>
                                            </svg>
                                        </div>

                                        <ion-label>
                                            <h3 class="ion-label-h3">Target</h3>
                                            <p>50 people (Under 5)</p>
                                        </ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <div slot="start" class="icon-color">
                                            <svg xmlns="http://www.w3.org/2000/svg" :width="svgIconWidth"
                                                :height="svgIconHeight" viewBox="0 0 48 48">
                                                <g fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M6.818 14.5a1.157 1.157 0 0 1 0-1.636l6.546-6.546A1.157 1.157 0 1 1 15 7.955l-.818.817l4.09 4.09l3.273-3.272a1.157 1.157 0 1 1 1.637 1.636l-1.637 1.637l13.91 13.91a5.79 5.79 0 0 1 1.295 6.205l1.159 1.159c.605.605.805 1.463.6 2.235l2.673 2.673a1.157 1.157 0 1 1-1.637 1.637l-2.673-2.673a2.31 2.31 0 0 1-2.236-.6l-1.158-1.158a5.79 5.79 0 0 1-6.205-1.296l-2.14-2.14l6.767-6.768l-11.77-11.77l-5.353 5.354L17.147 22h-2.829l-.955-.955l-1.636 1.636a1.157 1.157 0 1 1-1.636-1.636l3.273-3.273l-4.09-4.09l-.82.818a1.157 1.157 0 0 1-1.636 0m5.95-4.313l-2.08 2.08l4.09 4.09l2.08-2.08zM28.687 33.54a3.79 3.79 0 0 0 4.061.847l2.14-2.14a3.79 3.79 0 0 0-.848-4.06l-.504-.505l-5.353 5.354zm6.768 1.414q-.112.113-.229.216l.824.824a.314.314 0 1 0 .445-.444l-.824-.824a6 6 0 0 1-.216.228"
                                                        clip-rule="evenodd" />
                                                    <path
                                                        d="M16 28a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 1-1" />
                                                    <path fill-rule="evenodd"
                                                        d="M8.66 37.689A12.12 12.12 0 0 0 15.5 42a12.12 12.12 0 0 0 6.84-4.31A12.35 12.35 0 0 0 25 29.997V26.4c0-.637-.25-1.247-.695-1.697a2.36 2.36 0 0 0-1.68-.703H8.376c-.63 0-1.234.253-1.68.703A2.4 2.4 0 0 0 6 26.4v3.598a12.35 12.35 0 0 0 2.66 7.69M23 29.999v.004a10.35 10.35 0 0 1-2.228 6.445a10.13 10.13 0 0 1-5.273 3.492a10.13 10.13 0 0 1-5.271-3.492A10.35 10.35 0 0 1 8 30.002V26.4c0-.113.045-.217.117-.29a.36.36 0 0 1 .257-.11h14.252c.092 0 .185.037.257.11a.4.4 0 0 1 .117.29z"
                                                        clip-rule="evenodd" />
                                                </g>
                                            </svg>
                                        </div>
                                        <ion-label>
                                            <h3 class="ion-label-h3">Administered Vaccines</h3>
                                            <p>Astrazeneca A, Covid B, Influenza C</p>
                                        </ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <div slot="start" class="icon-color">
                                            <svg xmlns="http://www.w3.org/2000/svg" :width="svgIconWidth"
                                                :height="svgIconHeight" viewBox="0 0 32 32">
                                                <path fill="currentColor" d="m27 25.586l-2-2V21h-2v3.414L25.586 27z" />
                                                <path fill="currentColor"
                                                    d="M24 31c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7m0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5s5-2.243 5-5s-2.243-5-5-5m4-4h2V5c0-1.103-.897-2-2-2h-3v2h3z" />
                                                <circle cx="9" cy="13" r="2" fill="currentColor" />
                                                <circle cx="16" cy="13" r="2" fill="currentColor" />
                                                <circle cx="23" cy="13" r="2" fill="currentColor" />
                                                <path fill="currentColor"
                                                    d="M7 23H4c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h3v2H4v16h3z" />
                                            </svg>
                                        </div>

                                        <ion-label>
                                            <h3 class="ion-label-h3">Session type</h3>
                                            <p>Routine (repeat daily)</p>
                                        </ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <div slot="start" class="icon-color">
                                            <svg xmlns="http://www.w3.org/2000/svg" :width="svgIconWidth"
                                                :height="svgIconHeight" viewBox="0 0 256 256">
                                                <g fill="currentColor">
                                                    <path
                                                        d="M112 168a32 32 0 1 1-32-32a32 32 0 0 1 32 32M80 32a32 32 0 1 0 32 32a32 32 0 0 0-32-32m96 104a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0-40a32 32 0 1 0-32-32a32 32 0 0 0 32 32"
                                                        opacity="0.2" />
                                                    <path
                                                        d="M27.2 126.4a8 8 0 0 0 11.2-1.6a52 52 0 0 1 83.2 0a8 8 0 0 0 11.2 1.59a7.7 7.7 0 0 0 1.59-1.59a52 52 0 0 1 83.2 0a8 8 0 0 0 12.8-9.61A67.85 67.85 0 0 0 203 93.51a40 40 0 1 0-53.94 0a67.3 67.3 0 0 0-21 14.31a67.3 67.3 0 0 0-21-14.31a40 40 0 1 0-53.94 0A67.9 67.9 0 0 0 25.6 115.2a8 8 0 0 0 1.6 11.2M176 40a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-96 0a24 24 0 1 1-24 24a24 24 0 0 1 24-24m123 157.51a40 40 0 1 0-53.94 0a67.3 67.3 0 0 0-21 14.31a67.3 67.3 0 0 0-21-14.31a40 40 0 1 0-53.94 0A67.9 67.9 0 0 0 25.6 219.2a8 8 0 1 0 12.8 9.6a52 52 0 0 1 83.2 0a8 8 0 0 0 11.2 1.59a7.7 7.7 0 0 0 1.59-1.59a52 52 0 0 1 83.2 0a8 8 0 0 0 12.8-9.61A67.85 67.85 0 0 0 203 197.51M80 144a24 24 0 1 1-24 24a24 24 0 0 1 24-24m96 0a24 24 0 1 1-24 24a24 24 0 0 1 24-24" />
                                                </g>
                                            </svg>
                                        </div>
                                        <ion-label>
                                            <h3 class="ion-label-h3">Assignees</h3>
                                            <p>Jonathan Doe, Janet Doe, John Doe, Father Doe</p>
                                        </ion-label>
                                    </ion-item>
                                </ion-list>
                            </ion-card-content>

                            <ion-card-content
                                style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                                <img height="70" style="width: auto; object-fit: cover;"
                                    src="../../public/assets/icon/not-selected.png" alt="schedule-not-selected-icon" />
                                <ion-card-subtitle>Please select immunization session schedules date(s) to view
                                    details</ion-card-subtitle>
                            </ion-card-content>
                        </ion-card>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonCardHeader, IonCardTitle, IonButton, IonPage, IonPopover, IonItem, IonIcon, IonTitle, IonToolbar, IonRow, IonCol, IonCard, IonCardContent, IonMenu, IonList } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import ImmunizationTrendsGraph from "@/apps/Immunization/components/Graphs/ImmunizationTrendsGraph.vue";
import ImmunizationGroupGraph from "@/apps/Immunization/components/Graphs/ImmunizationGroupGraph.vue";
import { mapState } from "pinia";
import SetUser from "@/views/Mixin/SetUser.vue";
import HisDate from "@/utils/Date";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import DynamicButton from "@/components/DynamicButton.vue";
import AddImmunizationSessionModal from "@/components/Modal/AddImmunizationSessionModal.vue";
import { createModal } from "@/utils/Alerts";
import { StockService } from "@/services/stock_service";
import { useStockStore } from "@/stores/StockStore";
import { useStartEndDate } from "@/stores/StartEndDate";
import BasicForm from "@/components/BasicForm.vue";
import { toastWarning } from "@/utils/Alerts";
import { ellipsisVertical, add } from 'ionicons/icons';
import "datatables.net-select";
import { SessionScheduleService } from "@/services/session_schedule_service";
import { SessionSchedule } from "@/types";

export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonCardTitle,
        IonMenu,
        IonItem,
        IonPopover,
        IonList,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        IonRow,
        IonCol,
        IonCardHeader,
        IonIcon,
        IonCardContent,
        ImmunizationTrendsGraph,
        ImmunizationGroupGraph,
        DataTable,
        IonCard,
        DynamicButton,
        BasicForm,
    },
    data() {
        return {
            reportData: [] as any,
            currentStock: [] as any,
            schedules: <SessionSchedule[]>[],
            allStock: [] as any,
            outStock: [] as any,
            startDate: HisDate.currentDate(),
            endDate: HisDate.currentDate(),
            options: {
                responsive: true,
                select: false,
            } as any,
            selectedButton: "all",
            isLoading: false,
            svgIconHeight: 50,
            svgIconWidth: 50,
            attributes: [
                {
                    key: "today",
                    content: 'green',
                    highlight: {
                        color: 'green',
                        fillMode: 'light',
                    },
                    dot: 'green',
                    dates: new Date(),
                    order: 0
                },
                {

                    description: 'Immunization Session A for Example Y',
                    isComplete: false,
                    highlight: {
                        start: {
                            fillMode: 'light',
                            contentStyle: { color: '#016302' },
                        },
                        base: {
                            fillMode: 'light',
                            contentStyle: { color: '#fff' },
                            style: { background: '#016302' },
                        },
                        end: {
                            fillMode: 'light',
                            contentStyle: { color: '#016302' },
                        },
                    },
                    color: "green",
                    content: {
                        color: "green"
                    },
                    dates: {
                        start: new Date(2024, 8, 8),
                        end: new Date(2024, 8, 12),
                    },
                    popover: {
                        label: 'Immunization Session A for Example Y',
                    },
                },
            ]
        };
    },
    setup() {
        return { add, ellipsisVertical }
    },
    computed: {
        ...mapState(useStockStore, ["stock"]),
        ...mapState(useStartEndDate, ["startEndDate"]),
    },
    $route: {
        async handler() { },
        deep: true,
    },
    watch: {
        stock: {
            async handler() {
            },
            deep: true,
        },
    },
    async mounted() {
        await this.getSessionSchedules();
    },
    methods: {
        handleEdit(id: any) {
            console.log(`Editing item with id: ${id}`);
        },

        handleDelete(id: any) {
            console.log(`Deleting item with id: ${id}`);
        },
        async handleInputData(event: any) {
            if (event.inputHeader == "Start date") {
                this.startDate = HisDate.toStandardHisFormat(event.value);
            }
            if (event.inputHeader == "End date") {
                this.endDate = HisDate.toStandardHisFormat(event.value);
            }
            await this.buildTableData();
        },
        async getSessionSchedules() : Promise<void>{
            const sessionService = new SessionScheduleService();
            const data: any = await sessionService.getSessions();
            this.schedules = data;
            console.log(data);
        },
        async buildTableData() {
            this.isLoading = true;
            try {
                const stockService = new StockService();
                const data = await stockService.getItems(this.startDate, this.endDate);

                let filteredData = data;
                this.allStock = data;
                this.currentStock = data.filter((item: any) => item.current_quantity !== 0);
                this.outStock = data.filter((item: any) => item.current_quantity === 0);

                if (this.selectedButton === "current") {
                    filteredData = this.currentStock;
                } else if (this.selectedButton === "out") {
                    filteredData = this.outStock;
                }

                this.reportData = filteredData.map((item: any) => {
                    return [
                        HisDate.toStandardHisDisplayFormat(item.delivery_date),
                        HisDate.toStandardHisDisplayFormat(item.expiry_date),
                        item.batch_number,
                        item.delivered_quantity,
                        item.dispensed_quantity,
                        item.current_quantity,
                        item.drug_legacy_name,
                        item.current_quantity,
                        `<button class="btn btn-sm btn-primary edit-btn" data-id="${item.id}">Edit</button>
                 <button class="btn btn-sm btn-danger delete-btn" data-id="${item.id}">Delete</button>`,
                    ];
                });

                DataTable.use(DataTablesCore);
            } catch (error) {
                toastWarning("An error occurred while loading data.");
            } finally {
                this.isLoading = false;
            }
        },
        async selectButton(button: any) {
            this.selectedButton = button;
            await this.buildTableData();
        },
        async openModal() {
            const data: any = await createModal(AddImmunizationSessionModal, { class: "otherVitalsModal largeModal" });
            if (data == "dismiss") {
                await this.buildTableData();
            }
        },
    },
});
</script>

<style scoped>
.content-container {
    margin-top: 20px;
    margin-bottom: 20px;
}

.w-full {
    width: 100%;
}

.-mt-40 {
    margin-top: -40px;
}

#svg {
    height: 50px;
    width: 50px;
}

.flex-between {
    display: flex;
    justify-content: space-between;
}

.flex-between>.center {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content-title {
    font-size: 22px;
    font-weight: 600;
}

.icon-color {
    color: #969696;
}

.vc-highlight {
    background-color: green !important;
}

.bigGroupButton {
    margin-top: 10px;
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

@media (max-width: 600px) {
    .icon-container svg {
        height: 30px;
        width: 30px;
    }
}

@media (min-width: 601px) {
    .icon-container svg {
        height: 50px;
        width: 50px;
    }
}

.ion-label-h3 {
    font-size: 18px;
    font-weight: 500;
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

.graphBackground {
    position: absolute;
    width: 100vw;
    height: 62vh;
    left: 0px;
    top: 23vh;
    background: linear-gradient(158.66deg, #d6d5d6 0.36%, #f8f8f8 40.1%);
    border-radius: 22px;
}

.total {
    position: absolute;
    width: 251px;
    height: 128px;
    top: 25px;
    left: 50%;
    transform: translate(-50%, 10%);
    text-align: center;
    background: rgba(237, 235, 238, 0.95);
    opacity: 0.8;
    border-radius: 6px;
}

.totalNumber {
    /* 3,764 */

    height: 77px;

    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 77px;

    /* text_color */
    color: #5d5d5d;
}

.totalText {
    width: 229px;
    height: 48px;

    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
    /* or 22px */
    display: flex;
    align-items: center;
    text-align: center;

    color: #08475e;
}

.dueMiss {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}

.missed {
    width: 187px;
    height: 90px;
    left: 14px;
    background: #ffffff;
    border-radius: 6px;
    text-align: center;
}

.due {
    width: 187px;
    height: 90px;
    left: 14px;
    background: #ffffff;
    border-radius: 6px;
    text-align: center;
}

.dueMissText {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 7px;
    color: #004d4d;
}

.dueNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 30px;
    margin-top: 10px;

    /* blue/800 */
    color: #016302;
}

.missedNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 30px;
    margin-top: 10px;

    color: #b42318;
}

.clientSeen {
    height: 120px;
    margin-top: 15px;
    background: #ffffff;
}

.clientSeenTitle {
    padding-top: 10px;
    margin-left: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #2d3648;
}

.clientSeenBoxChild {
    background: #2d3648 !important;
}

.clientSeenBoxMen {
    background: #004d4d !important;
}

.clientSeenBoxWomen {
    background: #556080 !important;
}

.clientSeenBox {
    width: 68px;
    height: 68px;
    background: #006401;
    border-radius: 7px;
    padding-top: 8px;
}

.clientSeenBoxes {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}

.clientSeenBoxText {
    /* text-md */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    align-items: center;
    text-align: center;

    /* White */
    color: #ffffff;
}

.clientSeenBoxNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-align: center;

    color: #ffffff;
}

.graphCard {
    width: 98vw;
    margin: 0 auto;
    margin-top: 10px;
}

.modal_wrapper {
    border-radius: 8px;
}

.bigButton {
    font-weight: 500;
    height: 180px;
}

.centerBigBtnContain {
    align-items: center;
    align-content: center;
}

.bigBtnHeader {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
}

ion-button {
    height: 60px;
    margin: 20px;
    margin-left: 0px;
    margin-right: 8px;
}

.addBtn {
    height: 50px;
    align-items: center;
}
</style>
<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>
