<template>
    <ion-page>
        <ion-content class="ion-padding login-page">
            <div class="login-container">
                <ion-card style="background-color: #fff">
                    <ion-card-content>
                        <ion-img class="login_img" :src="loginIcon()" id="logo"></ion-img>
                        <ion-title class="login-title">
                            <span v-if="mode === 'development' || mode === 'test'" style="justify-content: center; display: block">
                                <div>
                                    MaHIS <small style="font-size: 15px">(v{{ version }})</small>
                                </div>
                                <div style="font-size: 12px; color: #34af4d">({{ mode }} mode)</div>
                            </span>
                            <span v-else
                                >MaHIS <small style="font-size: 15px">(v{{ version }})</small></span
                            >
                        </ion-title>
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
import { getUserFacility } from "@/services/userService";
import { useUserStore } from "@/stores/userStore";
import workerData from "@/activate_worker";

export default defineComponent({
    name: "Login",
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
            programList: "" as any,
            version: "" as any,
            program: "" as any,
            workerApi: null as any,
            togglePasswordVisibility: false,
            showPassword: false,
            mode: import.meta.env.MODE as string,
        };
    },
    watch: {
        workerApi: {
            handler() {
                if (this.workerApi.data !== null && !this.programList) {
                    this.programList = this.workerApi.data.payload;
                    this.getPrograms();
                }
            },
            deep: true,
        },
        $route: {
            async handler() {
                await this.setPrograms();
            },
            deep: true,
        },
    },
    computed: {},
    setup() {
        return { eye, person, eyeOff };
    },
    created() {
        this.auth = new AuthService();
    },

    async mounted() {
        const auth = new AuthService();
        await auth.loadConfig();
        this.setVersion();
        await this.setPrograms();
    },
    methods: {
        async setPrograms() {
            this.workerApi = workerData.workerApi;
            await workerData.postData("SET_OFFLINE_PROGRAMS");
        },
        async getPrograms() {
            if (this.programList && Object.keys(this.programList).length > 0) {
                this.programList.sort((a: any, b: any) => a.name.localeCompare(b.name));
                this.multiSelectData = this.programList;
            }
        },
        setVersion() {
            this.version = localStorage.getItem("core_version");
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

                    if (this.auth.checkUserPrograms(this.program.name)) {
                        this.facilityB();
                        this.$router.push("/home");
                    } else {
                        toastDanger("You don't have permission to access the program.");
                    }
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
            localStorage.setItem("app", JSON.stringify({ programID: event.program_id, applicationName: event.name }));
        },
        togglePasswordVisibility() {
            if (!this.togglePasswordVisibility) return true;
            else return false;
        },
        loginIcon() {
            return img("mw.png");
        },
        async facilityB() {
            const store = useUserStore();
            const data = await getUserFacility();
            store.setUserFacilityName(data.name);
            store.setFacilityLocation(data);
            store.setCurrentUserProgram(this.program);
        },
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
ion-card {
    min-width: 330px;
}
@media (max-width: 902px) {
    .login-page {
        --ion-background-color: #ffffff;
    }
    ion-card {
        box-shadow: unset;
    }
}
</style>
