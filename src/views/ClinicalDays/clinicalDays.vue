<template>
    <div class="ion-padding" style="max-width: 90%; margin-left: 5%">
      <ion-card style="margin-bottom: 10px;">
        <ion-card-header>
          <ion-card-title>Clinical Days Settings</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="12" size-md="6">
                <ion-checkbox class="ilbl" label-placement="end" v-model="isMondayChecked" @ionChange="onCheckboxChange($event, 'monday')">Monday</ion-checkbox>
                <ion-checkbox class="ilbl" label-placement="end" v-model="isTuesdayChecked" @ionChange="onCheckboxChange($event, 'tuesday')">Tuesday</ion-checkbox>
                <ion-checkbox class="ilbl" label-placement="end" v-model="isWednesdayChecked" @ionChange="onCheckboxChange($event, 'wednesday')">Wednesday</ion-checkbox>
                <ion-checkbox class="ilbl" label-placement="end" v-model="isThursdayChecked" @ionChange="onCheckboxChange($event, 'thursday')">Thursday</ion-checkbox>
                <ion-checkbox class="ilbl" label-placement="end" v-model="isFridayChecked" @ionChange="onCheckboxChange($event, 'friday')">Friday</ion-checkbox>
              </ion-col>
              <ion-col size="12" size-md="6">
                <ion-row>
                  <ion-col>
                    <div>
                      <ion-label class="ilbl2">Enable or Disable weekends</ion-label>
                      <Toggle
                        class="toggle-green"
                        :classes="{
                          container: 'inline-block rounded-full outline-none focus:ring focus:ring-green-500 focus:ring-opacity-30',
                        }" 
                        v-model="toggle_local"
                        :offLabel="'disabled'"
                        :onLabel="'enabled'"
                        @change="onWeekendToggleChange"
                      />
                    </div>
                  </ion-col>
                  <ion-col size="8">
                    <div class="mt-30">
                      <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end" v-model="isSaturdayChecked" @ionChange="onCheckboxChange($event, 'saturday')">Saturday</ion-checkbox>
                      <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end" v-model="isSundayChecked" @ionChange="onCheckboxChange($event, 'sunday')">Sunday</ion-checkbox>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
  
      <ion-card style="margin-bottom: 10px;">
        <ion-card-header>
          <ion-card-title>Appointment Settings</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-label class="ilbl2">Set Maximum Next Appointments Visits Per Day</ion-label>
            <ion-input placeholder="Enter a number" v-model="maximumNumberOfDaysForEachDay" fill="outline"></ion-input>
        </ion-card-content>
      </ion-card>
  
      <ion-card>
        <ion-card-header>
          <ion-card-title>Set Clinical Holiday(s)</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="12" size-md="7">
                <VueDatePicker
                  v-model="date"
                  :enable-time-picker="false"
                  inline
                  auto-apply
                  multi-dates
                  :disabled-dates="disabledDates"
                />
              </ion-col>
              <ion-col size="12" size-md="3">
                <div>
                  <ion-row>
                    <ion-label class="ilbl2">Total Holidays Set</ion-label>
                  </ion-row>
                  <ion-row>
                    <ion-label class="text-22 m-10">
                        <span style="font-weight: 500; font-size: 20px">{{ totalHolidaysSelected }}</span></ion-label>
                  </ion-row>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCheckbox, IonCol, IonGrid, IonInput, IonItem,
    IonLabel, IonRow
  } from "@ionic/vue";
  import { ref, computed, onMounted, watch } from "vue";
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import Toggle from '@vueform/toggle';
  import { useClinicalDaysStore } from "@/stores/clinicalDaysStore";
  import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
  import router from '@/router';
  import HisDate from "@/utils/Date";
  import { combineArrays } from "@/utils/GeneralUti";
  
  const toggle_local = ref(false);
  const disable_weekends = ref(true);
  const totalHolidaysSelected = ref(0);
  const date = ref([]);
  const maximumNumberOfDaysForEachDay = ref(0);
  const disabledDates = ref([]);
  const isMondayChecked = ref(false);
  const isTuesdayChecked = ref(false);
  const isWednesdayChecked = ref(false);
  const isThursdayChecked = ref(false);
  const isFridayChecked = ref(false);
  const isSaturdayChecked = ref(false);
  const isSundayChecked = ref(false);
  
  const navigationPayload = computed(() => {
    const store = EIRreportsStore();
    return store.navigationPayload;
  });
  
  const onCheckboxChange = (event: CustomEvent, id: string) => {
    const target = event.target as HTMLIonCheckboxElement;
    if (id == "monday") {
      isMondayChecked.value = target.checked;
    }
    if (id == "tuesday") {
      isTuesdayChecked.value = target.checked;
    }
    if (id == "wednesday") {
      isWednesdayChecked.value = target.checked;
    }
    if (id == "thursday") {
      isThursdayChecked.value = target.checked;
    }
    if (id == "friday") {
      isFridayChecked.value = target.checked;
    }
    if (id == "saturday") {
      isSaturdayChecked.value = target.checked;
    }
    if (id == "sunday") {
      isSundayChecked.value = target.checked;
    }
    saveAndReload();
  };
  
  const onWeekendToggleChange = () => {
    // toggle_local.value = !toggle_local.value;
    disable_weekends.value = !toggle_local.value;
    if (disable_weekends.value) {
      isSaturdayChecked.value = false;
      isSundayChecked.value = false;
    }
    saveAndReload();
  };
  
  watch(() => toggle_local.value, onWeekendToggleChange);
  
  watch(() => maximumNumberOfDaysForEachDay.value, saveAndReload);
  
  watch(() => date.value, saveAndReload);
  
  watch(
    () => router.currentRoute.value.name,
    async (newValue) => {
      if (newValue == 'clinicaldays') {
        setNavigation();
        loadDataFromStore();
      }
    }
  );
  
  onMounted(() => {
    setNavigation();
    loadDataFromStore();
  });
  
  function setNavigation() {
    const store = EIRreportsStore();
    store.setNavigationPayload('Clinical Days', true, false, '/', 'home');
  }
  
  function loadDataFromStore() {
    const store = useClinicalDaysStore();
    totalHolidaysSelected.value = store.getHolidaydatesDataSize();
    date.value = store.getHolidaydates();
    maximumNumberOfDaysForEachDay.value = store.getMaximumNumberOfDaysForEachDay();
    disabledDates.value = store.getDisabledDates2() as any;
    isMondayChecked.value = store.getAreMondaysDisabled();
    isTuesdayChecked.value = store.getAreTuesdaysDisabled();
    isWednesdayChecked.value = store.getAreWednesdaysDisabled();
    isThursdayChecked.value = store.getAreThursdaysDisabled();
    isFridayChecked.value = store.getAreFridaysDisabled();
    isSaturdayChecked.value = store.getAreSaturdaysDisabled();
    isSundayChecked.value = store.getAreSundaysDisabled();  
  
    if (isSaturdayChecked.value == true || isSundayChecked.value == true) {
      toggle_local.value = true;
    }
    if (isSaturdayChecked.value == false && isSundayChecked.value == false) {
    //   toggle_local.value = false;
    }

    
  }
  
  function saveAndReload() {
    saveStateValues();
    loadDataFromStore();
  }
  
  function saveStateValues() {
    const storeClinicalDaysStore = useClinicalDaysStore();
    storeClinicalDaysStore.setSelectedMedicalDrugsList(date.value);
    storeClinicalDaysStore.setMaximumNumberOfDaysForEachDay(maximumNumberOfDaysForEachDay.value);
    storeClinicalDaysStore.setAreMondaysDisabled(isMondayChecked.value);
    storeClinicalDaysStore.setAreTuesdaysDisabled(isTuesdayChecked.value);
    storeClinicalDaysStore.setAreWednesdaysDisabled(isWednesdayChecked.value);
    storeClinicalDaysStore.setAreThursdaysDisabled(isThursdayChecked.value);
    storeClinicalDaysStore.setAreFridaysDisabled(isFridayChecked.value);
    storeClinicalDaysStore.setAreSaturdaysDisabled(isSaturdayChecked.value);
    storeClinicalDaysStore.setAreSundaysDisabled(isSundayChecked.value);
  }
  </script>
  
  <style scoped>
  .ilbl {
    font-size: 23px;
    margin-right: 7px;
  }
  .ilbl2 {
    font-size: 17px;
  }
  .calender {
    --dp-cell-padding: 30px;
    --dp-menu-padding: 20px 5px;
    --dp-font-size: 18px;
  }
  .card_content {
    width: 100%;
  }
  .dp__flex_display {
    display: inherit;
  }
  .toggle-green {
    --toggle-bg-on: #006401;
    --toggle-border-on: #006401;
    --toggle-width: 6.3rem;
    --toggle-height: 1.9rem;
    --toggle-border: 0.525rem;
    --toggle-font-size: 1rem;
    margin-bottom: 30px;
  }
  </style>