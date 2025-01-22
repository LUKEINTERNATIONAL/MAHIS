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
                                <div style="font-size: 12px; color: #34af4d">({{ mode }})</div>
                            </span>
                            <span v-else>
                                MaHIS <small style="font-size: 15px">(v{{ version }})</small>
                            </span>
                        </ion-title>
                        <span style="text-align: left">
                            <ion-input
                                :value="username"
                                @ion-input="username = ($event.target as any).value || ''"
                                type="text"
                                label="Username"
                                ref="usernameRef"
                                label-placement="floating"
                                fill="outline"
                                placeholder="Enter Username"
                                class="input-fields"
                                required
                            >
                                <ion-label slot="end">
                                    <ion-icon :icon="person"></ion-icon>
                                </ion-label>
                            </ion-input>
                            <ion-input
                                :value="password"
                                @ion-input="password = ($event.target as any).value || ''"
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                ref="passwordRef"
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
                                @update:model-value="handleInput"
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
                                :options="sortPrograms(workerData?.payload) || []"
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

<script setup lang="ts">
import { IonContent, IonPage, IonTitle, IonButton, IonCard, IonCardContent, IonLabel, IonInput, IonImg } from "@ionic/vue";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { eye, eyeOff, person } from "ionicons/icons";
import { AuthService, InvalidCredentialsError } from "@/services/auth_service";
import { toastWarning, toastDanger } from "@/utils/Alerts";
import img from "@/utils/Img";
import VueMultiselect from "vue-multiselect";
import { getUserFacility } from "@/services/userService";
import { useUserStore } from "@/stores/userStore";
import { useWorkerStore } from "@/stores/workerStore";
import { storeToRefs } from "pinia";
import { getOfflineRecords } from "@/services/offline_service";

interface Program {
    program_id: string;
    name: string;
}

// Refs with proper typing
const username = ref("");
const password = ref("");
const version = ref("");
const program = ref<Program | null>(null);
const showPassword = ref(false);
const offlinePrograms = ref<Program[]>([]) as any;
const programList = ref<Program[]>([]);
const mode = ref(import.meta.env.MODE);
const auth = ref(new AuthService());
const workerApi = ref(null);

// Router
const router = useRouter();
const route = useRoute();

const store = useWorkerStore();
const { workerData, lastUpdate }: any = storeToRefs(store);

// Methods
const setPrograms = async () => {
    store.terminate();
    await useWorkerStore().postData("SET_OFFLINE_PROGRAMS");
};

const sortPrograms = (data: any) => {
    if (data && data.length > 0) {
        data.sort((a: any, b: any) => a?.name.localeCompare(b?.name));
        return data;
    }
};

const setVersion = () => {
    version.value = localStorage.getItem("core_version") || "";
};

const doLogin = async () => {
    if (username.value && password.value && program.value) {
        auth.value.setUsername(username.value);
        try {
            await auth.value.login(password.value);

            if (auth.value.checkUserPrograms(program.value.name)) {
                await facilityB();
                router.push("/home");
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
};

const handleInput = (event: Program) => {
    if (event) {
        localStorage.setItem(
            "app",
            JSON.stringify({
                programID: event.program_id,
                applicationName: event.name,
            })
        );
    }
};

const loginIcon = () => {
    return img("mw.png");
};

const facilityB = async () => {
    const store = useUserStore();
    const data = await getUserFacility();
    if (data) {
        store.setUserFacilityName(data.name);
        store.setFacilityLocation(data);
    }
    store.setCurrentUserProgram(program.value);
};

// Watchers
watch(
    route,
    async (newRoute) => {
        if (newRoute.name == "Login") localStorage.setItem("apiKey", "");
        await setPrograms();
    },
    { deep: true }
);

// Lifecycle Hooks
onMounted(async () => {
    localStorage.setItem("apiKey", "");
    await auth.value.loadConfig();
    setVersion();
    await setPrograms();
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
