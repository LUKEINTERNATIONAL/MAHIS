<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <div class="positionCenter">
                <ion-card class="registration_ion_card">
                    <div class="card_content">
                        <div class="card_hearder">SMS CONFIGURATION</div>
                        <ion-row class="form-row">
                          <ion-col>
                              <BasicInputField
                                  v-model="configData.url"
                                  :inputValue="configData.url"
                                  :placeholder="'Gateway url'"
                                  @update:inputValue ="handleInputData($event,'url')"
                                  :icon="createOutline"
                              />
                          </ion-col>
                      </ion-row>
                      <ion-row class="form-row">
                          <ion-col>
                              <BasicInputField
                                  v-model="configData.apiKey"
                                  :inputValue="configData.apiKey"
                                  :placeholder="'Gateway API Key'"
                                  @update:inputValue ="handleInputData($event,'apiKey')"
                                  :icon="createOutline"
                              />
                          </ion-col>
                      </ion-row>
                      <ion-row class="form-row">
                          <ion-col>
                              <div class="switch-container">
                                  <label class="switch">
                                      <input
                                          type="checkbox"
                                          v-model="configData.smsReminder"
                                          @change="toggleSwitch('smsReminder')"
                                      />
                                      <span class="slider round"></span>
                                  </label>
                                  <span class="label-text">
                                      {{ configData.smsReminder ? 'SMS Reminder turned ON' : 'SMS Reminder turned OFF' }}
                                  </span>
                              </div>
                          </ion-col>
                      </ion-row>
                      <ion-row class="form-row" v-if="configData.smsReminder">
                          <ion-col>
                              <ion-textarea
                                  class="custom"
                                  v-model="configData.reminderMessage"
                                  :value="configData.reminderMessage"
                                  @ionInput="handleInputData($event,'reminderMessage')"
                                  :placeholder="'Add Reminder message'"
                                  :auto-grow="true"
                                  fill="outline"
                              ></ion-textarea>
                          </ion-col>
                      </ion-row>
                      <ion-row class="form-row" v-if="configData.smsReminder">
                          <ion-col>
                              <vue-multiselect
                                  v-model="selectedPeriod"
                                  :options="periodOptions"
                                  @update:model-value="handleSelectedData"
                                  :multiple="false"
                                  :max-height="150"
                                  :hide-selected="false"
                                  :close-on-select="true"
                                  :searchable="true"
                                  :track-by="'name'"
                                  :label="'name'"
                                  :open-direction="'bottom'"
                                  placeholder="Select reminder period"
                              ></vue-multiselect>
                          </ion-col>
                      </ion-row>
                      <ion-row class="form-row">
                          <ion-col>
                              <div class="switch-container">
                                  <label class="switch">
                                      <input
                                          type="checkbox"
                                          v-model="configData.smsActivation"
                                          @change="toggleSwitch('smsActivation')"
                                      />
                                      <span class="slider round"></span>
                                  </label>
                                  <span class="label-text">
                                      {{ configData.smsActivation ? 'SMS notification turned ON' : 'SMS notification turned OFF' }}
                                  </span>
                              </div>
                          </ion-col>
                      </ion-row>
                      <ion-row class="form-row">
                          <ion-col>
                              <div class="switch-container">
                                  <label class="switch">
                                      <input
                                          type="checkbox"
                                          v-model="configData.smsPopup"
                                          @change="toggleSwitch('smsPopup')"
                                      />
                                      <span class="slider round"></span>
                                  </label>
                                  <span class="label-text">
                                      {{ configData.smsPopup ? 'Reminder popup turned ON' : 'Reminder popup turned OFF' }}
                                  </span>
                              </div>
                          </ion-col>
                      </ion-row>
                      <div>
                          <DynamicButton
                              @click="onSubmit"
                              name="Save"
                              fill="solid"
                              iconSlot="icon-only"
                              style="float: right"
                          />
                      </div>
                    </div>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    reactive,
} from "vue";
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonFooter,
    IonPage,
} from "@ionic/vue";
import {   createOutline} from "ionicons/icons";
import { SmsService } from "@/apps/Immunization/services/sms_service";
import BasicForm from "@/components/BasicForm.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import Toolbar from "@/components/Toolbar.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import VueMultiselect from "vue-multiselect";
import FacilityInformationBar from "@/components/FacilityInformationBar.vue";
import { toastWarning, toastSuccess } from "@/utils/Alerts";

interface ConfigData {
    url: string;
    apiKey: string;
    reminderMessage: string;
    reminderPeriod: string;
    smsReminder: boolean;
    smsActivation: boolean;
    smsPopup: boolean;
}

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        BasicForm,
        Toolbar,
        DynamicButton,
        IonFooter,
        IonPage,
        FacilityInformationBar,
        BasicInputField,
        VueMultiselect,
    },
    data() {
        return {
                 configData : {
                    url: "",
                  apiKey: "",
         reminderMessage: "",
            reminderPeriod: "",
            smsReminder: false,
            smsActivation: false,
            smsPopup: false,
            } as any, 
             selectedPeriod: [] as any,
            periodOptions: [
            { name: "Instant reminder", value: "Instant reminder" },
            { name: "1 day before", value: "1 day before" },
            { name: "2 days before", value: "2 days before" },
            { name: "3 days before", value: "3 days before" },
            { name: "4 days before", value: "4 days before" },
            { name: "5 days before", value: "5 days before" },
            { name: "6 days before", value: "6 days before" },
            { name: "7 days before", value: "7 days before" }]          
        };
    },
    setup() {
    
        return { createOutline }
    },
    async mounted() {
        const configs = await SmsService.getConfigurations();
        this.updateConfigData(configs);
    },
    methods: {

         updateConfigData (data: any){
            this.configData.url = data.sms_gateway_url;
            this.configData.apiKey = data.sms_api_key;
            this.configData.smsReminder = data.sms_reminder;
            this.configData.reminderMessage = data.next_appointment_message;
            this.configData.reminderPeriod = data.next_appointment_reminder_period;
            this.configData.smsActivation = data.sms_activation;
            this.configData.smsPopup = data.show_sms_popup;
            this.selectedPeriod = this.periodOptions.find(
                   (option: any) => option.value === data.next_appointment_reminder_period
          );

        },
         toggleSwitch (field: keyof ConfigData) {              
            this.configData[field] = this.configData[field];
        },
        handleSelectedData(selected: any) {
            this.configData.reminderPeriod = selected.value;
        },
        handleInputData(event:any, field: keyof ConfigData) {
            this.configData[field] = event.target.value
        },
        async onSubmit(){
            try {
                const configs = await SmsService.setConfigurations(this.configData);
                this.updateConfigData(configs);

                toastSuccess("Successfully updated configuration file");
            } catch (e) {
                toastWarning(`${e}`);
            }
        }

        
    },
});
</script>


<style scoped>
.demographics_title {
    font-weight: 700;
    font-size: 24px;
}
.gender {
    display: flex;
    justify-content: space-between;
    max-width: 170px;
    padding-top: 10px;
}
.gender_title {
    margin-top: 30px;
}
.positionCenter {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.switch-container {
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
}

.label-text {
  margin-left: 10px;
  font-size: 16px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
