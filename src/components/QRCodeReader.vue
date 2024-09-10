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
        <div class="overlay">
          <StreamQrcodeBarcodeReader
            ref="refCamera"
            capture="shoot"
            show-on-stream
            @onloading="onLoading"
            @result="onResult"
          />
          <div class="focus-frame"></div>
          <div class="dark-overlay top"></div>
          <div class="dark-overlay bottom"></div>
          <div class="dark-overlay left"></div>
          <div class="dark-overlay right"></div>
        </div>
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
  }

  .overlay {
    position: relative;
  }

  .focus-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
  }

  .dark-overlay {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
    z-index: 1;
  }

  .dark-overlay.top {
    top: 0;
    left: 0;
    right: 0;
    height: 20%;
  }

  .dark-overlay.bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 20%;
  }

  .dark-overlay.left {
    top: 20%;
    bottom: 20%;
    left: 0;
    width: 20%;
  }

  .dark-overlay.right {
    top: 20%;
    bottom: 20%;
    right: 0;
    width: 20%;
  }
</style>
