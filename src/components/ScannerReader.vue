<template>
    <div class="flex flex-col gap-2 items-center justify-center mt-6 w-full">
        <input v-if="platform === 'web'" ref="barcodeInput" autocomplete="off" type='text'
            class="w-full ml-4 p-2 rounded-lg bg-white" style="width: 80vw; margin-left: 8px;" placeholder="Enter barcode here" v-model="barcode">
        <div v-else>
            <ion-button @click="scannerService.scan()" expand="full" size="large">Scan National ID</ion-button>
        </div>
        <ion-row class="w-fit">
            <ion-col>
                <div class="scan_instraction">
                    To have the successful Scanning
                    <ul class="checklist">
                        <li>Find the lighter place</li>
                        <li>Put the National ID in the center of the screen</li>
                        <li>Focus the camera on National ID</li>
                    </ul>
                </div>
            </ion-col>
        </ion-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Barcode } from '@capacitor-mlkit/barcode-scanning';
import { ScannerService } from '@/services/scanner_service';
import { IonButton } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

const emit = defineEmits<{
    (event: 'scannerData', payload: string): void;
}>();

const barcode = ref<string>('');
const barcodes = ref(Array<Barcode>())
const platform = ref<string>('')
const scannerService = new ScannerService(barcodes.value);
const barcodeInput = ref<HTMLInputElement | null>(null);

onMounted(async () => {
    // detect device whether phone or laptop or desktop
    if (Capacitor.isNativePlatform()) {
        platform.value = 'phone';
    } else {
        platform.value = 'web';
    }
});

//watch for barcode changes and emit the latest barcode
watch(barcodes, (newBarcodes) => {
    if (newBarcodes.length > 0) {
        emit('scannerData', newBarcodes[newBarcodes.length - 1].rawValue)
    }
});

//watch for barcode changes only emit after a $ character is detected
watch(barcode, (newBarcode) => {
    if (newBarcode.includes('$')) {
        // remove the $ character
        const data = newBarcode.split('$')[0]
        emit('scannerData', data)
        barcode.value = ''
    }
});

</script>

<style scoped>
.scan_instraction {
    display: flex;
    width: 392px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;

    color: var(--Secondary, #636363);
    /* text-md */
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    /* 21px */
}

.checklist {
    list-style-type: none;
    padding-left: 0;
}

.checklist li:before {
    content: "\2713";
    /* Unicode character for a check mark */
    color: green;
    /* Change the color of the check mark if needed */
    margin-right: 5px;
    /* Add some spacing between the check mark and the text */
}
</style>