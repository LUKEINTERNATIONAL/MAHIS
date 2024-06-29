<template>
    <ion-page>
        <ion-content class="ion-padding login-page">
            <div class="login-container">
                <ion-card style="background-color: #fff">
                    <ion-card-content>
                        <ion-img class="login_img" :src="loginIcon" id="logo"></ion-img>
                        <ion-title class="login-title">MaHIS</ion-title>
                        <span style="text-align: left">
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
                                ><ion-label slot="end"> <ion-icon :icon="person" @click="togglePasswordVisibility"></ion-icon> </ion-label
                            ></ion-input>
                            <ion-input
                                v-model="password"
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                ref="Password"
                                label-placement="floating"
                                fill="outline"
                                placeholder="Enter Password"
                                class="input-fields"
                                required
                            >
                                <ion-label slot="end">
                                    <ion-icon :icon="showPassword ? eye : eyeOff" @click="showPassword = !showPassword"></ion-icon>
                                </ion-label>
                            </ion-input>

                            <VueMultiselect
                                v-model="program"
                                @update:model-value="handleInput($event)"
                                :multiple="false"
                                :taggable="false"
                                :hide-selected="true"
                                :close-on-select="true"
                                openDirection="bottom"
                                tag-placeholder="Select Program"
                                placeholder="Select Program"
                                selectLabel=""
                                label="name"
                                :searchable="true"
                                @search-change="$emit('search-change', $event)"
                                track-by="program_id"
                                :options="multiSelectData"
                            />
                        </span>

                        <ion-button
                            expand="block"
                            style="--background: var(--ion-color-primary); font-size: var(--ion-button-font)"
                            @click="doLogin"
                            class="login-button"
                        >
                            Login
                        </ion-button>
                        <p class="signup-link">For help click <a href="#">Here</a></p>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
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
    IonImg,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { eye, eyeOff, person } from "ionicons/icons";
import { AuthService, InvalidCredentialsError } from "@/services/auth_service";
import { toastWarning, toastDanger } from "@/utils/Alerts";
import img from "@/utils/Img";
import VueMultiselect from "vue-multiselect";
import { ProgramService } from "@/services/program_service";
import ProgramData from "@/Data/ProgramData";

export default defineComponent({
    name: "Home",
    components: {
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
        IonImg,
        VueMultiselect,
    },
    data: function () {
        return {
            multiSelectData: [] as any,
            auth: {} as any,
            password: "" as any,
            username: "" as any,
            program: "" as any,
            togglePasswordVisibility: false,
            showPassword: false,
        };
    },
    computed: {
        loginIcon() {
            return img("mw.png");
        },
    },
    setup() {
        return { eye, person, eyeOff };
    },
    created() {
        this.auth = new AuthService();
    },
    async mounted() {
        await this.getPrograms();
    },
    methods: {
        async getPrograms() {
            this.multiSelectData = ProgramData;
        },
        doLogin: async function () {
            if (this.username && this.password && this.program) {
                this.auth.setUsername(this.username);
                try {
                    if (this.auth.versionLockingIsEnabled()) {
                        await this.auth.validateIfCorrectAPIVersion();
                    }
                    // if (!(await this.auth.checkTimeIntegrity())) {
                    //     throw "Local date does not match API date. Please Update your device's date";
                    // }
                    await this.auth.login(this.password);
                    this.auth.startSession();
                    this.$router.push("/home");
                } catch (e) {
                    if (e instanceof InvalidCredentialsError) {
                        toastDanger("Invalid username or password");
                    } else {
                        toastDanger(`${e}`, 50000);
                    }
                }
            } else {
                toastWarning("Complete form to log in");
            }
        },
        handleInput(event: any) {
            sessionStorage.setItem("app", JSON.stringify({ programID: event.program_id, applicationName: event.name }));
        },
    },
    togglePasswordVisibility() {
        if (!this.togglePasswordVisibility) return true;
        else return false;
    },
});
</script>

<style scoped>
.login-page {
    background-color: #ffffff;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 90vh;
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
    margin-top: 30px;
}

.signup-link {
    margin-top: 50px;
}

.signup-link a {
    text-decoration: underline;
}
.password-toggle {
    font-size: 20px;
}
.login_img {
    width: 90px;
    margin: auto;
}
.multiselect__content-wrapper {
    position: unset !important;
    width: inherit !important;
}
.multiselect::before {
    top: -7px;
}
</style>
