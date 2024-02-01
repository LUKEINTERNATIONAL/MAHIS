<template>
    <div class="demographics">
        <div class="demographics_title">Next appointment</div>
        <ion-card class="registration_ion_card">
            <ion-datetime 
                :is-date-enabled="isWeekday" 
                min="2022-03-01T00:00:00" 
                max="2025-05-31T23:59:59" 
                style="max-width: 100%;" 
                :highlighted-dates="highlightedDates"
                :value="nextAppointment"
                @ionChange="value => calendarDate = value.target.value"
                presentation="date">
            </ion-datetime>
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
  calendarDate: '' as any
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
setup() {
      const isWeekday = (dateString: string) => {
        const date = new Date(dateString);
        const utcDay = date.getUTCDay();

        const formattedDate =HisDate.toStandardHisShortFormat(date)
        return utcDay !== 0 &&  !["01 Jan", "25 Dec","15 Jan","3 March","1 May","6 Jul","15 Oct","25 Dec","26 Dec"].includes(formattedDate);
      };
      const highlightedDates = [
        {
          date: '2023-01-05',
          textColor: '#800080',
          backgroundColor: '#ffc0cb',
        },
        {    
          date: '2023-01-10',
          textColor: '#09721b',
          backgroundColor: '#c8e5d0',
        },
        {
          date: '2023-01-20',
          textColor: 'var(--ion-color-secondary-contrast)',
          backgroundColor: 'var(--ion-color-secondary)',
        },
      ];
      return { isWeekday ,highlightedDates};
    },
methods:{
  updateNextAppointment(){
      const nextAppointmentStore = useNextAppointmentStore()
      nextAppointmentStore.setNextAppointment(this.calendarDate)
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
    padding-bottom: 20px;
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
    padding-top: 50px ;
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
</style>



