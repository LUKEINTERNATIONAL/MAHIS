<template>
    <div class="demographics">
        <ion-card class="enrollment_card">
          <div class="card_content" style="width: 600px;">
              <div class="card_hearder">
                Next appointment
              </div>
            <VueDatePicker 
              @date-update="handleDateUpdate"
              v-model="date" 
              inline 
              auto-apply 
              :enable-time-picker="false" 
              >
                <template #day="{ day }">
                    <template v-if="day === tomorrow">
                      <p> {{ day }}<sup style="color: rgb(3, 61, 21);">{{ bookedPatient }}</sup></p>
                    </template>
                    <template v-else>
                      {{ day }}
                    </template>
                </template>
            </VueDatePicker>
           </div>
        </ion-card>
    </div>
</template>

<script lang="ts">
import { 
      IonContent, 
      IonHeader,
      IonItem,
      IonList,
      IonTitle, 
      IonToolbar, 
      IonMenu,
      modalController,
      IonDatetime 
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { calendar, checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg';

import { createModal } from '@/utils/Alerts'
import BasicInputField from '../../../components/BasicInputField.vue';
import HisDate from "@/utils/Date";
import { useNextAppointmentStore } from '@/stores/NextAppointmentStore'
import { mapState } from 'pinia';

export default defineComponent({
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  BasicInputField,
  IonDatetime    },
  data() {
return {
  iconsContent: icons,
  calendarDate: '' as any,
  date: new Date(),
  bookedPatient: 20,
  tomorrow: new Date().getDate() + 1,
};
},
computed:{
    ...mapState(useNextAppointmentStore,["nextAppointment"])
},
watch: {
  calendarDate: {
      handler(){
          this.updateNextAppointment()  
      },
      deep: true
  }
},
methods:{
  updateNextAppointment(){
      const nextAppointmentStore = useNextAppointmentStore()
      nextAppointmentStore.setNextAppointment(this.calendarDate)
  }, 
  handleDateUpdate(value: any) {
      this.calendarDate = value;
  }
}
});
</script>

<style scoped>
.demographics{
    display: block;
    width: 40vw;
    margin: 0 auto;
    text-align: center;
    margin-top: 50px ;
}
.demographics_title{
    font-weight: 700;
    font-size: 24px;
}
.sub_title{
    font-weight: 400;
    font-size: 14px;
    color: #636363;
    margin: 10px 0px 30px;
    padding-top: 20px ;
    line-height: 25px;
}
.card_hearder{
    font-weight: 600;
    color: #00190E;
    font-size: 16px;
    padding-bottom: 20px;
}
.input_fields{
    padding: 10px 100px 70px 100px;
    text-align: left;
}
.gender{
    display: flex;
    justify-content: space-between;
    max-width: 170px;
    padding-top: 10px;
}
.gender_title{
    margin-top: 30px;
}
.marital_status{
    display: flex;
    justify-content: space-between;
}
ion-datetime::part(calendar-day) {
    padding: 25px;
    margin: 10px;
  }
  .dp__flex_display {
  display: inherit;
}
.enrollment_card{
  padding: 20px;
}
</style>



