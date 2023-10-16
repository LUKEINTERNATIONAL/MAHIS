<template>
  <ion-page>
    <ion-content class="ion-padding login-page">
      <div class="login-container">
        <ion-card style="background-color: #fff;">
          <ion-card-content>
          <ion-title class="login-title">NCD</ion-title>
              <ion-input 
              v-model="username"
              type="text"
              label="Username" 
              ref="username"
              label-placement="floating" 
              fill="outline" 
              placeholder="Enter Username"
              class="input-fields"
              required
              ></ion-input>
              <ion-input 
              v-model="password"
              type="password"
              label="Password" 
              ref="Password"
              label-placement="floating" 
              fill="outline" 
              placeholder="Enter Password"
              class="input-fields"
              required
              ></ion-input>
              <ion-icon
              :icon="eye"
                @click="togglePasswordVisibility"
                class="password-toggle"
              ></ion-icon>
            <ion-button style="--background: var(--ion-color-primary); font-size: var(--ion-button-font);" @click="doLogin" class="login-button">
              
              Login
            </ion-button>
          <p class="signup-link">
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle,
     IonToolbar,IonButton, IonCard, IonCardContent, IonCardHeader,
      IonCardSubtitle, IonCardTitle, IonAccordion, IonAccordionGroup, IonItem, IonLabel,IonInput } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import { eye } from 'ionicons/icons';
  import { AuthService, InvalidCredentialsError } from "@/services/auth_service"
  import { toastWarning, toastDanger } from "@/utils/Alerts";

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
      IonButton, 
      IonCard, 
      IonCardContent, 
      IonCardHeader, 
      IonCardSubtitle, 
      IonCardTitle,
      IonAccordion,
      IonAccordionGroup,
      IonItem,
      IonLabel,
      IonInput
    },
    data: function () {
      return {
        auth: {} as any,
        password: '' as any,
        username: '' as any,
        togglePasswordVisibility: false,
      }
    },
    setup() {
      return { eye };
    },
    created() {
    this.auth = new AuthService()
  },
  methods: {
    doLogin: async function () {
      if (this.username && this.password) {
        this.auth.setUsername(this.username)
        try {
          if (this.auth.versionLockingIsEnabled()) {
            await this.auth.validateIfCorrectAPIVersion()
          }
          if (!(await this.auth.checkTimeIntegrity())) {
            throw "Local date does not match API date. Please Update your device's date"
          }
          await this.auth.login(this.password)
          this.auth.startSession()
          this.$router.push("/home");
        } catch (e) {
          if (e instanceof InvalidCredentialsError ) {
            toastWarning("Invalid username or password");
          } else {
            toastDanger(`${e}`, 50000)
          }
        }
      } else {
        toastWarning("Complete form to log in");
      }
      
    }
  },
  togglePasswordVisibility(){
    if (!this.togglePasswordVisibility)  return true 
    else return false
  }
  
});
</script>

<style scoped>
.login-page {
  background-color: #ffffff;
}

.login-container {
  max-width: 300px;
  text-align: center;
  margin: 0 auto;
}

.login-title {
  font-size: 24px;
  margin-bottom: 60px;
  font-weight: 700;
  margin-top: 20px;
}

.input-fields {
  margin-bottom: 35px;
}

.password-toggle {
  cursor: pointer;
  position: absolute;
  margin-top: -73px;
  margin-left: 130px;
  z-index: 1000;
}

.login-button {
  color: #ffffff;
}

.signup-link {
  margin-top: 50px;
}

.signup-link a {
  text-decoration: underline;
}
.password-toggle{
  font-size: 20px;
}
</style>
