<template>
  <ion-popover :is-open="isOpen"  trigger="patient-profile-opd" :dismiss-on-select="true" :v-show="true" :show-backdrop="false" side="bottom" alignment="start">
    <ion-content>
      <ion-list>
        <ion-item :button="true" @click="navigate('/OPDVitals')" :detail="false">Vitals</ion-item>
        <ion-item :button="true" @click="navigate('/OPDConsultationPlan')" :detail="false">Consultation Plan</ion-item>
        <ion-item :button="true"  @click="navigate('/dispensation')">Dispensation</ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script lang="ts">
  import { IonItem, IonList, IonPopover } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {  IonItem, IonList, IonPopover },
    props: {
        isOpen: {
            type: Boolean,
            default:false
        }
    },
    methods:{
        navigate(link:string){
             this.$router.push(link);
        }
    }
  });
</script>