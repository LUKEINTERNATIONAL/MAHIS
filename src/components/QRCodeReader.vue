<template>

  <div class="flex flex-col items-center justify-center mt-6">
    <!-- <pre>Result:{{ decode }}</pre> -->
    <div class="phone mt-6">
      <div class="notch-container">
        <div class="notch"></div>
      </div>
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
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Result, StreamQrcodeBarcodeReader } from 'vue3-barcode-qrcode-reader'
import { IonRow, IonCol, IonButton, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue"

onMounted(async () => {
  handleOnCanPlay()
})

const decode = ref<Result | undefined>(undefined)
const isLoading = ref<boolean>(false)
function onResult(data: Result | undefined): void {
  decode.value = data
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
</script>
<style>
  .scanner__container .content {
    min-height: inherit !important;
    background: darkgrey !important;
    /* padding: 1px; */
  }
</style>