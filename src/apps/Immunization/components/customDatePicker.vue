<template>
    <div>
     <ion-row>
        <ion-col size="4">
            <span style="color: #636363; font-weight: 400; font-size: 14px; margin-left: 6px;">
                Pick visit date:
            </span>
        </ion-col>
        <ion-col>
          <input type="text" :id="uniqId" style="display: none;">
          <div id="picker-container"></div>
        </ion-col>
     </ion-row>

    </div>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
      watch: {},
      name: "xxxComponent",
  });
  </script>
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import {IonRow, IonCol, IonButton} from "@ionic/vue";
  import Picker from 'pickerjs'
  import "pickerjs/dist/picker.css";
  const uniqId = ref("0")
  let pickerInstance = null as any

  onMounted(() => {
    const _input_ = document.getElementById('0') as any
    _input_.id = generateUniqueString()
    initPicker(_input_)
  })

  function initPicker(input: any) {
    var picker = new Picker(input, {
          headers: false,
          container: document.getElementById('picker-container') as any,
          inline: true,
          rows: 3,
          format: 'DD-MMM-YYYY',
          pick: datePickerEventListener
        })
    pickerInstance = picker
  }

  function datePickerEventListener(event: any) {
      console.log('Event occurred:', pickerInstance.getDate());
  }

  function generateUniqueString() {
    const timestamp = Date.now().toString(20);
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let uniqueString = ''
    for (let i = 0; i < timestamp.length; i++) {
      uniqueString += timestamp[i]
      const randomIndex = Math.floor(Math.random() * randomChars.length)
      uniqueString += randomChars[randomIndex]
    }
    return uniqueString
  }

  </script>
  
<style>
.picker-cell::before {
  background-image: none !important;
  bottom: 50%;
  margin-bottom: 1rem;
  top: 0;
}

.picker-cell::after {
  background-image: none !important;
  bottom: 0;
  margin-top: 1rem;
  top: 50%;
}

.picker-dialog {
  border: 0px solid !important;
}
</style>
  