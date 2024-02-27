<!-- <template>
  <ion-page>
    <ion-content class="ion-padding login-page">
      <div class="login-container">
        <ion-card style="background-color: #fff;">
          <ion-card-content>
          <ion-img class="login_img" :src="loginIcon" id="logo"></ion-img>
          <ion-title class="login-title">MAHIS</ion-title>
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
            For help click <a href="#">Here</a>
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
      IonCardSubtitle, IonCardTitle, IonAccordion, IonAccordionGroup, IonItem, IonLabel,IonInput,IonImg } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import { eye } from 'ionicons/icons';
  import { AuthService, InvalidCredentialsError } from "@/services/auth_service"
  import { toastWarning, toastDanger } from "@/utils/Alerts";
  import img from "@/utils/Img"

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
      IonInput,
      IonImg
    },
    data: function () {
      return {
        auth: {} as any,
        password: '' as any,
        username: '' as any,
        togglePasswordVisibility: false,
      }
    },
    computed:{
      loginIcon(){
        return img('mw.png')
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
          // if (!(await this.auth.checkTimeIntegrity())) {
          //   throw "Local date does not match API date. Please Update your device's date"
          // }
          await this.auth.login(this.password)
          this.auth.startSession()
          this.$router.push("/home");
        } catch (e) {
          if (e instanceof InvalidCredentialsError ) {
            toastDanger("Invalid username or password");
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
  margin-bottom: 30px;
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
.login_img{
  width: 90px;
  margin: auto;
}
</style> -->

<template>
  <ion-page>
    <ion-content class="ion-padding login-page">
      <div class="login-container">
        <ion-card style="background-color: #fff;">
          <ion-card-content>
            <ion-img class="login_img" src="/public/logo.png" alt="logo" width="100" height="100"></ion-img>
            <ion-title class="login-title">Mahis</ion-title>
            <div>
              <ion-item>
                <ion-label position="floating">Username</ion-label>
                <ion-input :value="form.username" @input="form.username = $event.target.value" type="text" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input :value="form.password" @input="form.password = $event.target.value" type="password" required></ion-input>
              </ion-item>
              <ion-button type="submit" :disabled="isPending" style="--background: var(--ion-color-primary); font-size: var(--ion-button-font);" @click="submitForm">
                {{ isPending ? 'Logging In...' : 'Login' }}
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { authenticate } from "@/services/ANC/login";
import { useRouter } from 'vue-router';
import { emrApiClient } from '@/services/ANC/emr_api_client';


export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      isPending: false,
      data: null
    };
  },
  methods: {
    async submitForm() {
      this.isPending = true;
      console.log('Username:', this.form.username);
      console.log('Password:', this.form.password);
      try {
        const credentials = { username: this.form.username, password: this.form.password };
        console.log(credentials)
        const response = await authenticate(credentials, emrApiClient());
        this.data = response;
        this.$router.push('/home');
      } catch (error) {
        console.error(error);
      } finally {
        this.isPending = false;
      }
    }
  }
};
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
  margin-bottom: 30px;
  font-weight: 700;
  margin-top: 20px;
}

.login_img {
  width: 90px;
  margin: auto;
}
</style>



