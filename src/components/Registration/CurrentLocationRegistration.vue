<template>
    <div class="demographics">
        <ion-card>
            <div class="card_hearder">
                Curent Location
            </div>
            <div class="input_fields">
                <BasicInputField
                    :icon="iconsContent.search"
                    inputHeader="Current district"
                />
                <BasicInputField
                    :icon="iconsContent.search"
                    inputHeader="Current traditional authority"
                />
                <BasicInputField
                    inputHeader="Current village"
                    :icon="iconsContent.search"
                />
                <BasicInputField
                    inputHeader="Closest landmark/Plotnumber"
                    :icon="iconsContent.search"
                />
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
      modalController 
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg';

import DispositionModal from '@/components/ProfileModal/DispositionModal.vue'
import { createModal } from '@/utils/Alerts'
import BasicInputField from '../BasicInputField.vue';

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
  BasicInputField    },
  data() {
return {
  iconsContent: icons,
};
},
methods:{
    openModal(){
        createModal(DispositionModal)
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
    padding-top: 50px ;
}
.input_fields{
    padding: 10px 100px 70px 100px;
    text-align: left;
}
</style>



