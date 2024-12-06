<template>
  <div class="ion-padding" style="max-width: 90%; margin-left: 5%">
    <ion-card style="margin-bottom: 10px;">
      <ion-card-header>
        <ion-card-title>
          <ion-icon :icon="calendarOutline" style="vertical-align: middle; margin-right: 5px;"></ion-icon>
          Clinical Days Settings
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6">
              <ion-checkbox class="ilbl" label-placement="end" v-model="isMondayChecked" @ionChange="onCheckboxChange($event, 'monday')">
                <ion-icon :icon="todayOutline" style="margin-right: 5px;"></ion-icon>Monday
              </ion-checkbox>
              <ion-checkbox class="ilbl" label-placement="end" v-model="isTuesdayChecked" @ionChange="onCheckboxChange($event, 'tuesday')">
                <ion-icon :icon="todayOutline" style="margin-right: 5px;"></ion-icon>Tuesday
              </ion-checkbox>
              <ion-checkbox class="ilbl" label-placement="end" v-model="isWednesdayChecked" @ionChange="onCheckboxChange($event, 'wednesday')">
                <ion-icon :icon="todayOutline" style="margin-right: 5px;"></ion-icon>Wednesday
              </ion-checkbox>
              <ion-checkbox class="ilbl" label-placement="end" v-model="isThursdayChecked" @ionChange="onCheckboxChange($event, 'thursday')">
                <ion-icon :icon="todayOutline" style="margin-right: 5px;"></ion-icon>Thursday
              </ion-checkbox>
              <ion-checkbox class="ilbl" label-placement="end" v-model="isFridayChecked" @ionChange="onCheckboxChange($event, 'friday')">
                <ion-icon :icon="todayOutline" style="margin-right: 5px;"></ion-icon>Friday
              </ion-checkbox>
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-row>
                <ion-col>
                  <div>
                    <ion-label class="ilbl2">
                      <ion-icon :icon="toggleOutline" style="vertical-align: middle; margin-right: 5px;"></ion-icon>
                      Enable or Disable weekends
                    </ion-label>
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
                    <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end" v-model="isSaturdayChecked" @ionChange="onCheckboxChange($event, 'saturday')">
                      <ion-icon :icon="todayOutline" style="margin-right: 5px;"></ion-icon>Saturday
                    </ion-checkbox>
                    <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end" v-model="isSundayChecked" @ionChange="onCheckboxChange($event, 'sunday')">
                      <ion-icon :icon="todayOutline" style="margin-right: 5px;"></ion-icon>Sunday
                    </ion-checkbox>
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
        <ion-card-title>
          <ion-icon :icon="settingsOutline" style="vertical-align: middle; margin-right: 5px;"></ion-icon>
          Appointment Settings
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-row>
          <ion-col>
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey">
              {{input_properties[0].placeHolder}}<span style="color: #b42318">*</span>
            </ion-label>
            <BasicInputField
              :placeholder="input_properties[0].placeHolder"
              :icon="pencilOutline"
              :inputValue="maximumNumberOfDaysForEachDay"
              @update:inputValue="input_properties[0].dataHandler"
            />
            <div>
              <ion-label v-if="input_properties[0].show_error.value" class="error-label">
                {{ input_properties[0].error_message }}
              </ion-label>
            </div>
          </ion-col>
        </ion-row>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ion-icon :icon="calendarClearOutline" style="vertical-align: middle; margin-right: 5px;"></ion-icon>
          Set Clinical Holiday(s)
        </ion-card-title>
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
                :key="datePickerKey"
              />
            </ion-col>

            <ion-col size="12" size-md="3">
              <div>
                <ion-row>
                  <ion-col>
                    <ion-label class="ilbl2">
                      <ion-icon :icon="statsChartOutline" style="vertical-align: middle; margin-right: 5px;"></ion-icon>
                      Total Holidays Set
                    </ion-label>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-label class="text-22 m-10">
                    <span style="font-weight: 500; font-size: 20px">{{ totalHolidaysSelected }}</span>
                  </ion-label>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-row>
                      <ion-col>
                        <ion-label class="ilbl2">
                          <ion-icon :icon="listOutline" style="vertical-align: middle; margin-right: 5px;"></ion-icon>
                          Holiday Date(s)
                        </ion-label>
                      </ion-col>
                      <ion-col>
                        <ion-button
                          fill="solid"
                          @click="autoGen"
                          class="btn-cls-2"
                          style="float: right"
                        >
                          <ion-icon :icon="refreshCircleOutline" slot="start" style="margin-right: 5px;"></ion-icon>
                          {{ 'Auto Gen.' }}
                        </ion-button>
                      </ion-col>
                    </ion-row>
                    <ion-list class="holiday-list">
                      <ion-item v-for="(holiday, index) in clinical_Days_Store.holidayDates()" :key="index">
                        <ion-label>
                          <h2>
                            <ion-icon :icon="calendarOutline" style="vertical-align: middle; margin-right: 5px;"></ion-icon>
                            {{ HisDate.toStandardHisDisplayFormat(holiday) }}
                          </h2>
                        </ion-label>
                      </ion-item>
                    </ion-list>
                  </ion-col>
                </ion-row>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>

    <ion-row v-if="false">
      <ion-col>
        <ion-button
          fill="solid"
          @click="saveAction"
          class="btn-cls-2"
          style="float: right"
        >
          <ion-icon :icon="saveOutline" slot="start" style="margin-right: 5px;"></ion-icon>
          {{ 'Save Current Settings' }}
        </ion-button>
      </ion-col>
    </ion-row>
  </div>
</template>

<script setup lang="ts">
import {
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonCheckbox, IonCol, IonGrid, IonList, IonItem,
  IonLabel, IonRow, IonButton, IonIcon, 
} from "@ionic/vue";
import { 
  pencilOutline, saveOutline, calendarOutline, todayOutline, 
  toggleOutline, settingsOutline, calendarClearOutline,
  statsChartOutline, listOutline, refreshCircleOutline
} from "ionicons/icons"
import { ref, computed, onMounted, watch } from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Toggle from '@vueform/toggle';
import { useClinicalDaysStore, setValueProps } from "@/stores/clinicalDaysStore";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import router from '@/router';
import BasicInputField from "@/components/BasicInputField.vue"
import HisDate from "@/utils/Date";
import { combineArrays } from "@/utils/GeneralUti";
import { mapState } from 'pinia';
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { useUserStore } from "@/stores/userStore";
  
  const toggle_local = ref(false);
  const disable_weekends = ref(true);
  const totalHolidaysSelected = ref(0);
  const date = ref([]);
  const maximumNumberOfDaysForEachDay = ref(0) as any;

  const isMondayChecked = ref(false);
  const isTuesdayChecked = ref(false);
  const isWednesdayChecked = ref(false);
  const isThursdayChecked = ref(false);
  const isFridayChecked = ref(false);
  const isSaturdayChecked = ref(false);
  const isSundayChecked = ref(false);
  const datePickerKey = ref(0);
  
  const navigationPayload = computed(() => {
    const store = EIRreportsStore();
    return store.navigationPayload;
  });

  const disabledDates = computed(() => {
    const store = useClinicalDaysStore();
    return store.getDisabledDates2() as any;
  })

  const facilityId = computed(() => {
    const user_store = useUserStore();
    return user_store.getfacilityLocation().location_id;
  })
  
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

  const input_properties = [
    {
      placeHolder: 'Set Maximum Next Appointments Visits Per Day',
      property_name: 'visitsPerDay',
      dataHandler: inputUpDated_fn1,
      dataValue: ref(),
      show_error: ref(false),
      error_message: 'Input required, Only letters are allowed',
    }
  ]

  function inputUpDated_fn1(event: any) {
    const input = event.target.value
    maximumNumberOfDaysForEachDay.value = input
  }
  
  const onWeekendToggleChange = () => {
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
        clearClinicalaysStores()
      }
    }
  );

  watch(
    () => facilityId,
    async (newValue) => {
      clearClinicalaysStores()
    }
  )

  const clinical_Days_Store = computed(() => {
    return mapState(useClinicalDaysStore, ["holidayDates"]) 
  })

  onMounted(() => {
    clearClinicalaysStores()
  });

  function clearClinicalaysStores() {
    setNavigation();
    const store = useClinicalDaysStore();
    store.$reset();
    if (setValueProps() == true) {
      loadDataFromStore();
    };
  }
  
  function setNavigation() {
    const store = EIRreportsStore();
    store.setNavigationPayload('Clinical Days', true, false, '/', 'home');
  }
  
  function loadDataFromStore() {
    const store = useClinicalDaysStore();
    totalHolidaysSelected.value = store.getHolidaydatesDataSize();
    date.value = store.getHolidaydates();
    maximumNumberOfDaysForEachDay.value = store.getMaximumNumberOfDaysForEachDay();
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
  }
  
  function saveAndReload() {
    saveStateValues();
    const storeClinicalDaysStore = useClinicalDaysStore();
    storeClinicalDaysStore.setMaximumNumberOfDaysForEachDayObj()
    storeClinicalDaysStore.setHolidayDatesObj()
    storeClinicalDaysStore.setWeekDaysPropertiesObj()
    // setValueProps()
    loadDataFromStore();
    toastSuccess("Updated successfully");
  }
  
  function saveStateValues() {
    const storeClinicalDaysStore = useClinicalDaysStore();
    storeClinicalDaysStore.setHolidayDates(date.value);
    storeClinicalDaysStore.setMaximumNumberOfDaysForEachDay(maximumNumberOfDaysForEachDay.value);
    storeClinicalDaysStore.setAreMondaysDisabled(isMondayChecked.value);
    storeClinicalDaysStore.setAreTuesdaysDisabled(isTuesdayChecked.value);
    storeClinicalDaysStore.setAreWednesdaysDisabled(isWednesdayChecked.value);
    storeClinicalDaysStore.setAreThursdaysDisabled(isThursdayChecked.value);
    storeClinicalDaysStore.setAreFridaysDisabled(isFridayChecked.value);
    storeClinicalDaysStore.setAreSaturdaysDisabled(isSaturdayChecked.value);
    storeClinicalDaysStore.setAreSundaysDisabled(isSundayChecked.value);
  }

  function saveAction() {
    const storeClinicalDaysStore = useClinicalDaysStore();
    storeClinicalDaysStore.setMaximumNumberOfDaysForEachDayObj()
    storeClinicalDaysStore.setHolidayDatesObj()
    storeClinicalDaysStore.setWeekDaysPropertiesObj()
    setValueProps()
    loadDataFromStore();
  }

  function autoGen() {
    const storeClinicalDaysStore = useClinicalDaysStore();
    const r = storeClinicalDaysStore.autoGeneratedDates()
    if (r) {
      storeClinicalDaysStore.setHolidayDates(r);
      saveAction();
      datePickerKey.value++;
      // window.location.reload();
    }
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
    --toggle-height: 1.5rem;
    --toggle-border: 0.525rem;
    --toggle-font-size: 1rem;
    margin-bottom: 30px;
  }
  .holiday-list {
    max-height: 200px;
    overflow-y: auto;
  }
  </style>