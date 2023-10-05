<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <div id="container">
        <strong>Search your patient profile</strong>
        <p>Use searchbar below to find your patient <br/>
          profile and start the triage
        </p>
        <div class="centered-content">
        <!-- Your component goes here -->
          <ToolbarSearch />
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
      ToolbarSearch
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
</style>
