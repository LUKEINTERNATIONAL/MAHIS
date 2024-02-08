<template>
    <basic-card :content="cardData"></basic-card>
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
      IonCheckbox
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { icons } from '@/utils/svg';

import DispositionModal from '@/components/ProfileModal/OutcomeModal.vue'
import { createModal } from '@/utils/Alerts'
import { useEnrollementStore } from '@/stores/EnrollmentStore'
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue';
import BasicCard from '@/components/BasicCard.vue';

export default defineComponent({
name: 'Menu',
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  BasicForm,
  BasicCard    },
  data() {
return {
  iconsContent: icons,
  test: '' as any,
  cardData: {} as any
};
},
computed:{
    ...mapState(useEnrollementStore,["patientHistory"]),
    ...mapState(useEnrollementStore,["patientHistoryHIV"])
},
watch: {
    personInformation: {
        handler(){
            this.updateEnrollmentStores();
            this.buidCards()
        },
        deep: true
    }
},
mounted(){
    this.updateEnrollmentStores()
    this.buidCards()
},
methods:{
    buidCards(){
        this.cardData ={
            mainTitle:"Enrollment",
            cards:[
                {
                    cardTitle:"Patient history & Complications ",
                    content: this.patientHistory
                },
                {
                    cardTitle:"Patient history & Complications ",
                    content: this.patientHistoryHIV
                }
            ]
           } 
    },
    openModal(){
        createModal(DispositionModal)
    },
    updateEnrollmentStores(){
        console.log(this.patientHistoryHIV)
        const enrollmentStore = useEnrollementStore()
        enrollmentStore.setPatientHistory(this.patientHistory)
        enrollmentStore.setPatientHistoryHIV(this.patientHistoryHIV)
    },
    testF(data: any){
        console.log(data);
    }
}
});
</script>

<style scoped>

.sub_title{
    font-weight: 400;
    font-size: 14px;
    color: #636363;
    padding-top: 20px ;
    line-height: 25px;
}

.sub_title{
    line-height: 40px;
}
.diagnosis_col{
    display: flex;
    justify-content: center;
    align-items: center;
}
.diplay_space_between{
    color: var(--text_color, #00190E);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; 
    
}
ion-radio {
   margin-right: 35px;
}
.dashed_bottom_border{
    margin-top: 15px;
    margin-bottom: 15px;
}
.diagnosis_checkbox{
    display: flex;
    justify-content: space-between;
}
.diagnosis_input{
    width: 220px;
    margin-bottom: 20px;
}
.tb_content{
    text-align: left;
    line-height: 3;
}
.small_font{
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
color: #636363;

}
.checkbox_header{
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #00190E;

}
</style>



