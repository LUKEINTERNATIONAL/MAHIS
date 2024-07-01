<template>
    <div class="flex flex-col items-center justify-center mt-6">
    <!-- <pre>Result:{{ decode }}</pre> -->
    <div class="phone mt-6">

      <!-- <div class="notch-container">
        <div class="notch"></div>
      </div> -->

      <ion-label>
          {{ decode }}
      </ion-label>

      <div class="content">
        <StreamQrcodeBarcodeReader
          ref="refCamera"
          capture="shoot"
          show-on-stream
          @onloading="onLoading"
          @result="onResult"
        />
      </div>
    </div>
  </div>

  <div style="margin-top: 20px;">
    <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid" style="width: 99%">
      Cancel
    </ion-button>
  </div>


</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Result, StreamQrcodeBarcodeReader } from 'vue3-barcode-qrcode-reader'
import { IonLabel, IonCol, IonButton, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue"
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore"

onMounted(async () => {
  handleOnCanPlay()
})

const decode = ref<Result | undefined>(undefined)
const isLoading = ref<boolean>(false)
function onResult(data: Result | undefined): void {
  decode.value = data
  if (decode.value != undefined) {
    const store = useAdministerVaccineStore()
    store.setTempScannedBatchNumber(decode.value)
    scanresult(decode.value)
  }
}

function onLoading(loading: boolean) {
  isLoading.value = loading
}

// define ref for component
const refCamera = ref<InstanceType<typeof StreamQrcodeBarcodeReader> | null>(null)

function handleOnCanPlay() {
  refCamera.value?.onCanPlay()
}

function handleOnReset() {
  refCamera.value?.onReset()
}

function handleFacemode() {
  refCamera.value?.onChangeFacemode()
}

function handleOnCanStop() {
  refCamera.value?.onCanStop()
}

function  dismiss() {
  modalController.dismiss()
}

const emit = defineEmits<{
    (e: "scanresult", data: any): void
}>();

function scanresult(data: any) {
    emit("scanresult", data)
    dismiss()
}
</script>
<style>
  .scanner__container .content {
    min-height: inherit !important;
    background: darkgrey !important;
    /* padding: 1px; */
  }
</style>