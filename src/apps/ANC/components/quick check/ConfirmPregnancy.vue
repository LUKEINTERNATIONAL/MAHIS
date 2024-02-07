<template>
  <ion-list>
    <ion-item :lines="confirmPregnancy" class="dashed_bottom_border" style="font-weight: bold">
      Has pregnancy been confirmed?
    </ion-item>
    <div class="sub_item_body"  style="padding-right: 400px">
      <basic-form
          :contentData="ConfirmPregnancy" >
      </basic-form>
    </div>
    <ion-item class="sub_item_body_close"/>
  </ion-list>
  <ion-list>
    <ion-item :lines="plannedPregnancy" class="dashed_bottom_border" style="font-weight: bold">
      Was pregnancy planned?
    </ion-item>
    <div class="sub_item_body"  style="padding-right: 400px">
      <basic-form
          :contentData="PlannedPregnancy" >
      </basic-form>
    </div>
    <ion-item class="sub_item_body_close"/>
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
import { icons } from '@/utils/svg';
import BasicInputField from '@/components/BasicInputField.vue';
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue'
import {useConfirmPregnancyStore} from "@/apps/ANC/store/quickCheck/confirmPregnancy";

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
    BasicForm
  },
  data() {
    return {
      iconsContent: icons,
      confirmPregnancy: '',
      plannedPregnancy: '',

    };
  },
  computed: {
    ...mapState(useConfirmPregnancyStore, ["ConfirmPregnancy"]),
    ...mapState(useConfirmPregnancyStore, ["PlannedPregnancy"])
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
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
