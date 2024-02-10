<template>
  <!--  confirm pregnancy-->
  <div class="container">
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Has the pregnancy been confirmed?</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="ConfirmPregnancy"></basic-form>
        <basic-form :contentData="PlannedPregnancy"></basic-form>
      </ion-card-content>
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.section {
  width: 100%;
  max-width: 1300px; /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; /* Adjust max-width as needed */
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}
</style>
