<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true" >
        <div class="position_content start_triage_content">
            <div v-html="iconsContent.startTriage"></div>
            <div class="triage_text">It’s the new patient. <br /> You need to conduct first triage</div>
            <div>
                <ion-button  style="--background: var(--ion-color-primary); font-size: var(--ion-button-font);" @click="openTriage('triage')">
                    <b>Start triage</b>
                </ion-button>
            </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import Vitals from '@/components/ConsultationPlan/Vitals.vue'
  import History from '@/components/HealthEducation.vue'
  import { icons } from '@/utils/svg.ts';
  export default defineComponent({
    name: "Home",
    components:{
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        Vitals,
        History
      },
      data() {
    return {
        iconsContent: icons,
    };},
    methods: {
      openTriage(url: any){
            this.$router.push(url);
        }
    }
    })
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
  .start_triage_content{
    display: block;
    text-align: center;
  }
  .triage_text{
    font-weight: 700;
    font-size: 24px;
  }
  </style>
  