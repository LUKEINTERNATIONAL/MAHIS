<template>
  <ion-list>
    <div class="sub_item_body">
      <ion-list-header style="font-size: 18px; border-bottom: solid 1px #ccc;border-bottom-style: dashed;">Daily cafeine intake</ion-list-header>
      <ion-row class="foot_content">
        <ion-col class="first_col">More than 2 cups of coffee</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">More than 4 cups of tea</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">More than 12 bars of chocolate</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">More than one bottle/cane of soda, energy, soft drink</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">None of the above</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-list-header style="font-size: 18px; border-bottom: solid 1px #ccc;border-bottom-style: dashed;">Tobacco use</ion-list-header>
      <ion-row class="foot_content">
        <ion-col class="first_col">Recently quit tobbacco products</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-row class="foot_content">
        <ion-col class="first_col">Exposure to second hand smoke</ion-col>
        <ion-col>
          <ion-checkbox label-placement="end">
            <span class="checkbox_header"></span>
          </ion-checkbox>
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
      footChecked : false,
      showVisualAcuityTest: false,
      visualAT: '',
      footSC: '',
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
    footScreening(){
      this.footChecked = !this.footChecked
      if (this.footChecked) {
        this.footSC = 'none'
      } else {this.footSC = ''}
    },
    toggleShowVisualAcuityTest() {
      this.showVisualAcuityTest = !this.showVisualAcuityTest
      if (this.showVisualAcuityTest) {
        this.visualAT = 'none'
      } else {this.visualAT = ''}
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
