<template>
    <ion-row class="centered-content">
      <div class="text-container">
        <div>                
          Do you want to send SMS reminder?
        </div>            
      </div>
    </ion-row>
  
    <div class="saveBtn">
      <ion-row>
        <ion-col>
          <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px">
            No
          </ion-button>
        </ion-col>
  
        <ion-col>
          <ion-button @click="sendSMS" class="btnText" fill="solid" style="width: 130px; text-align: right;">
            Yes
          </ion-button>
        </ion-col>
      </ion-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { modalController } from "@ionic/vue";
  import { Service } from '@/services/service';
  import { SmsService } from "@/apps/Immunization/services/sms_service";
  
  export default defineComponent({
    props: {
      date: {
        type: Date,
        required: true
      },
      patient: {
        type: Number,
        required: true
      }
    },
    methods: {
      dismiss() {
        modalController.dismiss();
      },
      async sendSMS() {
        try {
          await SmsService.appointment(this.patient,this.date);
          this.dismiss();
        } catch (error) {
          console.error("Failed to send SMS:", error);
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .saveBtn {
        display: flex;
        justify-content: space-between;
        margin: 20px;
        align-items: center;
    }
    ion-row.centered-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text-container {
        text-align: center;
        padding: 20px;
        border-radius: 10px; /* Rounded corners */
    }

    .text-container div {
        margin-bottom: 10px; /* Spacing between the two divs */
        font-family: 'Arial', sans-serif; /* Modern, clean font */
        color: #333; /* Dark text color for contrast */
    }

    .text-container div:last-child {
        margin-bottom: 0; /* Remove bottom margin from last div */
    }
  </style>
  