<template>
  <div class="ion-no-padding">
    <h3 class="ion-text-center bold">View Previous ANC contacts</h3>
    <p class="ion-text-center">*The table shows a list of all previous visits for this client.*</p>
    <hr/>
    <ion-grid class="ion-col-tbody">
      <ion-row>
        <ion-col>ANC contact No.</ion-col>
        <ion-col>ANC contact date</ion-col>
        <ion-col>Action</ion-col>
      </ion-row>
    </ion-grid>
    <ion-grid>
      <ion-row class="ion-col-theader">
        <ion-col>01</ion-col>
        <ion-col>20-10-2023</ion-col>
        <ion-col class="ion-col-theader-ion-col">Open</ion-col>
      </ion-row>
    </ion-grid>
    <ion-grid>
      <ion-row class="ion-col-theader">
        <ion-col>02</ion-col>
        <ion-col>02-01-2024</ion-col>
        <ion-col class="ion-col-theader-ion-col">Open</ion-col>
      </ion-row>
    </ion-grid>
    <ion-grid>
      <ion-row class="ion-col-theader">
        <ion-col>03</ion-col>
        <ion-col>11-02-2024</ion-col>
        <ion-col class="ion-col-theader-ion-col">Open</ion-col>
      </ion-row>
    </ion-grid>


  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {IonCheckbox, IonCol, IonLabel, IonRow} from "@ionic/vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import SideBar from "@/apps/ANC/components/SideBar.vue";
import Counselling from "@/apps/ANC/components/Treatment/Deworming.vue";

export default defineComponent({
  name: "PreviousVisits",
  components: {IonLabel, IonCheckbox, IonCol, IonRow}
})
</script>

<style scoped>
.ion-col-tbody{
  background-color: darkgreen;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
.ion-col-theader {
  background-color: #d7d8da;
  border: solid 1px #fff;
  color: black;
  text-align: center;
}
.ion-col-theader-ion-col {
 text-decoration: underline;
}


</style>