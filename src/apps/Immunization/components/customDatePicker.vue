<template>
    <div style="margin-top: 40px;">
     <ion-row>
        <ion-col size="5">
            <span style="color: grey;  font-size: 16px; margin-left: 0px;">
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
  import { Service } from "@/services/service";
  import { PatientService } from "@/services/patient_service"
  const uniqId = ref("0")
  let pickerInstance = null as any
  const patient = new PatientService()
  

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
    const init_date = new Date(Service.getSessionDate())
    pickerInstance.setDate(init_date)
  }

  const emit = defineEmits<{
      (e: "dateChange", ObjectsArray: any): void
  }>()

  function dateChange() {
    const clientBODYear = getYearFromDateString(patient.getBirthdate() as any)
    const clientBODMonth = removeLeadingZero(getMonthFromDateString(patient.getBirthdate() as any))
    const clientBODDay = removeLeadingZero(getDayFromDateString(patient.getBirthdate() as any))
    const sessionYear = getYearFromDateString(Service.getSessionDate())
    const pickerYear = pickerInstance.getDate().getFullYear()
    const pickerMonth = pickerInstance.getDate().getMonth() + 1
    const pickerDay = pickerInstance.getDate().getDate()
    if (pickerYear <= sessionYear) {
      if (parseInt(pickerYear) == parseInt(clientBODYear)) {
        if (parseInt(pickerMonth) < parseInt(clientBODMonth)) {
          const corrected_date = pickerInstance.getDate()
          corrected_date.setMonth(parseInt(clientBODMonth) - 1)
          pickerInstance.setDate(corrected_date)
        }
        if (parseInt(pickerMonth) === parseInt(clientBODMonth) && 
            parseInt(pickerDay) < parseInt(clientBODDay)) {
            const corrected_date = pickerInstance.getDate()
            corrected_date.setDate(parseInt(clientBODDay))
            pickerInstance.setDate(corrected_date)
        }
      }
      if ( parseInt(pickerYear) < parseInt(clientBODYear)) {
        const corrected_date = pickerInstance.getDate()
        corrected_date.setFullYear(sessionYear)
        pickerInstance.setDate(corrected_date)
      }
      const sessionDate = new Date(Service.getSessionDate());
      if (pickerInstance.getDate() > sessionDate) {
        pickerInstance.setDate(sessionDate)
      }
    }
     else {
      const corrected_date = pickerInstance.getDate()
      corrected_date.setFullYear(sessionYear)
      pickerInstance.setDate(corrected_date)
    }
    emit("dateChange", pickerInstance.getDate())
  }

  function datePickerEventListener(event: any) {
      // console.log('Event occurred:', pickerInstance.getDate());
      dateChange()
  }

  function getYearFromDateString(dateString: string) {
    // Split the date string by the hyphen and return the first part (the year)
    return dateString.split('-')[0];
  }

  function getMonthFromDateString(dateString: string) {
    return dateString.split('-')[1]
  }

  function getDayFromDateString(dateString: string) {
    return dateString.split('-')[2]
  }

  function removeLeadingZero(str: string) {
    return String(Number(str))
  }

  function generateUniqueString() {
    const timestamp = Date.now().toString(20)
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

.picker-picked {
  color: #006401;
}
</style>
  