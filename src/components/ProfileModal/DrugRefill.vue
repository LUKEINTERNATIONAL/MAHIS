<template>
    <div class="modal_wrapper">
      <div class="modal_title diplay_space_between">
          <span>Refill medication</span>
          <span @click="dismiss()" style="cursor: pointer; font-weight: 300;">x</span>
      </div>
      <ion-row>
        <ion-item class="input_item drug_fill">
            <ion-input  v-model="drug.drug_name" fill="outline"></ion-input>
            <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
        </ion-item>
        <ion-item class="input_item drug_fill">
                <ion-input fill="outline" v-model="drug.drug_unit"></ion-input>
        </ion-item>
        <ion-item class="input_item drug_fill">
                <ion-input fill="outline" v-model="drug.freq"></ion-input>
        </ion-item>
        <ion-item class="input_item drug_fill">
                <ion-input fill="outline" v-model="drug.period"></ion-input>
        </ion-item>
        <ion-item class="input_item drug_fill">
                <ion-input fill="outline" v-model="drug.date"></ion-input>
        </ion-item>
      </ion-row>
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
            modalController 
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg.ts';

    export default defineComponent({
    name: 'Menu',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar    },
        data() {
    return {
        iconsContent: icons,
        searchText: '',
        drug:{
            drug_name: 'Metformin Forte',
            drug_unit: '75ml',
            freq: 'Twice a day',
            period: '1 month',
            date: 'Prescription'
        }
    };
  },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
      dismiss(){
        modalController.dismiss()
      }
    }
    });
</script>

<style scoped>

ion-modal#example-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  }

  ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
  }

  ion-modal#example-modal ion-icon {
    margin-right: 6px;

    width: 48px;
    height: 48px;

    padding: 4px 0;

    color: #aaaaaa;
  }

  ion-modal#example-modal .wrapper {
    margin-bottom: 10px;
  }
  .drug_fill{
    margin-bottom: 10px;
    --border-color: transparent;
  }
 
</style>
  