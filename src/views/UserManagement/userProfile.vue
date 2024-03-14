<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <div id="container">
            <ion-card style="margin-bottom: 20px; background-color: #fff">
                <div class="m-cointainer">
                    <ion-row>
                        <ion-col>
                            <div>
                                <ion-label class="n-lbl">John Doe</ion-label>
                                <hr class="m-line"/>  
                            </div> 
                        </ion-col>
                    </ion-row>
                </div>

                <div class="m-cointainer">
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <div class="">
                                    <ion-label class="n-lbl-1">Full name</ion-label>
                                </div> 
                            </ion-col>
                            <ion-col>
                                <ion-label style="display: flex">
                                    <span  class="left-text"> First Name</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                    >
                                </ion-input>
                                
                            </ion-col>
                            <ion-col style="padding-right: 0px;">
                                <ion-label style="display: flex">
                                    <span  class="left-text"> Last Name</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                    >
                                </ion-input>
                            </ion-col>
                        
                        </ion-row>
                        <hr class="m-line-ds"/>
                    </ion-grid>
                </div>
                
            </ion-card>
        </div>  
      </ion-content>
    </ion-page>
  </template>
<script lang="ts">
import { defineComponent } from "vue";
import { text } from "ionicons/icons";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonButton,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonLabel,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import Toolbar from '@/components/Toolbar.vue'
import ToolbarSearch from '@/components/ToolbarSearch.vue'
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
.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-lbl {
    text-align: left;
    display: flex;
    align-items: left;
    padding-left: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 29.05px;
    color: #b4b0b0;
}
.n-lbl-1 {
    text-align: left;
    display: flex;
    align-items: left;
    font-size: 18px;
    font-weight: 600;
    line-height: 29.05px;
    color:#b4b0b0
}
.m-cointainer {
    width: 95%;
    margin-left: 2%;
}
.m-line {
    margin: 0;
    margin-top: 12px;
    border: 0;
    border-top: 3px solid #b4b0b0;
}
.m-line-ds {
    margin: 0;
    margin-top: 50px;
    border: 0;
    border-top: 3px dashed #b4b0b0;
}
.left-text {
    font-size: 15px;
    color: #b4b0b0;
}
.m-input {
    margin-top: 10px;
}
</style>