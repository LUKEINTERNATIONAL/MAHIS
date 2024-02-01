
<template>
  <!-- Daily Caffeine -->
  <ion-list>
    <ion-item :lines="DailyCaffeine" class="dashed_bottom_border">
      <ion-toggle :checked ="caffeineChecked" @ionChange="caffeineMethod">Daily caffeine  intake</ion-toggle>
    </ion-item>
    <div class="sub_item_body" v-if="caffeineChecked">
      <BasicForm :contentData="Caffeine" />
    </div>
    <ion-item class="sub_item_body_close" v-if="caffeineChecked"/>
  </ion-list>

  <!-- Tobbaco use -->
  <ion-list>
    <ion-item :lines="tobbacoUses" class="dashed_bottom_border">
      <ion-toggle :checked ="tobbacoChecked" @ionChange="tobbacoMethod">Use of tobbaco</ion-toggle>
    </ion-item>

    <div class="sub_item_body" v-if="tobbacoChecked">
      <BasicForm :contentData="Tobbaco" />
    </div>
    <ion-item class="sub_item_body_close" v-if="tobbacoChecked"/>
  </ion-list>

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
  menuController,
  IonToggle,
  IonSelectOption,
  IonInput,
  IonSelect,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg.ts';
import BasicInputField from '@/components/BasicInputField.vue';
import BasicForm from "@/components/BasicForm.vue";
import {useMedicalHistoryStore} from "@/apps/ANC/store/medicalHistoryStore/medicalHistoryStore";
import {mapState} from "pinia";
import {useWomanBehaviourStore} from "@/apps/ANC/store/womanBehaviourStore";

export default defineComponent({
  name: 'Menu',
  components:{
    BasicForm,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonInput,
    BasicInputField,
  },
  data() {
    return {
      iconsContent: icons,
      caffeineChecked : false,
      tobbacoChecked : false,
      DailyCaffeine: '',
      tobbacoUses: '',
    };
  },
  // mounted(){
  //   const caffeine =useWomanBehaviourStore()
  //   const tobbaco =useWomanBehaviourStore()
  // },
  computed:{
    ...mapState(useWomanBehaviourStore,["Caffeine"]),
    ...mapState(useWomanBehaviourStore,["Tobbaco"]),
  },

  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    caffeineMethod(){
      this.caffeineChecked = !this.caffeineChecked
      if(this.caffeineChecked){
        this.DailyCaffeine = 'none'
      }else{this.DailyCaffeine=""}
    },
    tobbacoMethod(){
      this.tobbacoChecked = !this.tobbacoChecked
      if(this.tobbacoChecked){
        this.tobbacoUses = 'none'
      }else{this.tobbacoUses ="" }
    },
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },

  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
.foot_title{
  color: #636363;
  text-align: center;
}
.foot_content{
  color:#00190E;
  text-align: center;
  padding: 4px 0px;
  font-weight: 500;
  font-size: 14px;
  margin-left: 25px;
}
.first_col{
  text-align: left;
  font-weight: 400;
  font-size: 14px;
}
.sub_item_body{
  margin-left: 45px;
}
.foot_input{
  width: 100%;
  color: #636363;
  text-align: left;

}
.item-content {
  background-color:#ffffff;
}
ion-select._item_eye {
  --background: #fff;

}
ion-item.item_eye_ {
  --inner-border-width:0;
  --background-hover: none;
}
/* ion-toggle {
    --track-background-checked: #006401
} */
ion-item.sub_item_body_close {
  border-bottom: 2px dotted var(--ion-color-medium);
  --inner-border-width:0;
}

</style>
@/apps/ANC/store/medicalHistoryStore/medicalHistoryStore@/apps/ANC/store/symptomsFollowUpStore/womanBehaviourStore@/apps/ANC/store/medicalHistory/medicalHistoryStore