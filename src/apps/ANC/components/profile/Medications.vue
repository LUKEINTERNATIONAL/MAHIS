<template>
  <ion-list>
    <ion-item :lines="medication" class="dashed_bottom_border">
      <ion-toggle :checked="medicationChecked" @ionChange="medications">Current Medications</ion-toggle>
    </ion-item>
    <div class="sub_item_body" v-if="medicationChecked">
      <ion-row class="foot_content">
        <ion-col class="first_col">Oral PreP for HIV</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Analgesic</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Anti-consulsive</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Anti-TB</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Antihelmintic</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Anti-malarials</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Antitussive</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Aspirin</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Calcium</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Doxylamine</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Hematinic</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Iron</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Metoclopramide</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Prep</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Thyroid medication</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Antiacids</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Anti-psychotics</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Anti-diabetic</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Anti-hypertensive</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">ARVs</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Antivirals</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Asthamatic</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Co-trimoxazole</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Folic acid</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Hemorrhoidal medication</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Magnesium</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Multivitamin</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col">Other</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Vitamin A</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
        <ion-col class="first_col"></ion-col>
        <ion-col>
        </ion-col>
      </ion-row>
    </div>
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
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonInput,
    BasicInputField,
  },
  data() {
    return {
      iconsContent: icons,
      medicationChecked : false,
      medication: '',
    };
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },
    medications(){
      this.medicationChecked = !this.medicationChecked
      if (this.medicationChecked) {
        this.medication = 'none'
      } else {this.medication = ''}
    }
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
  border-bottom: solid 1px #ccc;
  border-bottom-style: dashed;
  padding: 10px 0px;
  font-weight: 500;
  font-size: 14px;
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
