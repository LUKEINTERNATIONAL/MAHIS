<template>
    <ion-page :class="{ loading: isLoading }">
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content>
            <div class="container">
                <h4 style="width: 100%; text-align: center; font-weight: 700">Printer Management</h4>
                <ion-list>
                    <ion-item v-for="printer of printers">
                        <ion-label>
                            {{ printer.name }}
                        </ion-label>
                        <ion-button
                            size="small"
                            :color="isDefaultPrinter(printer) ? 'success' : 'primary'"
                            @click="setDefaultPrinter(printer)"
                            :disabled="isDefaultPrinter(printer)"
                        >
                            Set as Default
                        </ion-button>
                        <ion-button @click="printerService.printTestLbl(printer)" size="small"> Test Print </ion-button>
                    </ion-item>
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonButton } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import { PrinterDevice } from "cap-label-printer-plugin";
import { PrintoutService } from "@/services/printout_service";

const route = useRoute();
const isLoading = ref(false);
const refreshKey = ref(Math.random());
const printers = ref<Array<PrinterDevice>>([]);
const defaultPrinter = ref<PrinterDevice>({} as PrinterDevice);
const printerService = new PrintoutService();

async function loadPrinters() {
    if (isLoading.value) return;
    isLoading.value = true;
    const unsortedPinters = await printerService.getAllPrinters();
    console.log("Discovered printers", JSON.stringify(unsortedPinters));
    printers.value = sortPrinters(unsortedPinters);
    isLoading.value = false;
    refreshKey.value = Math.random();
}

function diffPrinters(a: PrinterDevice, b: PrinterDevice) {
    return (a.name || a.address).localeCompare(b.name || b.address);
}

function setDefaultPrinter(printer: PrinterDevice) {
    printerService.setDefaultPrinter(printer);
    defaultPrinter.value = printer;
    refreshKey.value = Math.random();
    loadPrinters();
}

function isDefaultPrinter(printer: PrinterDevice) {
    return diffPrinters(printer, defaultPrinter.value) === 0;
}

function sortPrinters(printers: PrinterDevice[]) {
    return printers.sort((a, b) => {
        if (isDefaultPrinter(a) && !isDefaultPrinter(b)) {
            return -1;
        } else if (!isDefaultPrinter(a) && isDefaultPrinter(b)) {
            return 1;
        } else {
            return diffPrinters(a, b);
        }
    });
}

onMounted(async () => {
    defaultPrinter.value = (await printerService.getDefaultPrinter()) || ({} as PrinterDevice);
    printers.value.push(defaultPrinter.value);
    loadPrinters();
});
</script>

<style scoped>
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
</style>
