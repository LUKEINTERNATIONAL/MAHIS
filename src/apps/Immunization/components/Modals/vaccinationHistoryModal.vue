<template>
    <div class="OtherVitalsHeading">
        <div class="OtherVitalsTitle">Vaccination History</div>
        <!-- <div>Todays Date: <span></span> 06 Jul 2024</div> -->
    </div>

    <div class="mod-ls">
        <!-- <basic-form :contentData="vitals" @update:inputValue="validaterowData($event)"></basic-form> -->
        <row>
            <ion-icon size="medium" style="margin-bottom: -6px;" :icon="icons.calendar"></ion-icon>
            <span>at <span style="color: #016302;">Birth</span> <ion-icon class="dotStatus" slot="start" :icon="icons.grayDot"></ion-icon> 19 Apr 2024</span>
            <span style="color: #316CBA; margin-left: 10%;">2/2 vaccines given</span>
        </row>

        <row>
            <ion-button v-if="true" class="medicalAlBtn-2">
                <ion-icon slot="start" style="font-size: x-large" :icon="checkmarkOutline"></ion-icon>
                {{ 'OPV 0' }}
            </ion-button>

            <ion-button v-if="true" class="medicalAlBtn-2">
                <ion-icon slot="start" style="font-size: x-large" :icon="checkmarkOutline"></ion-icon>
                {{ 'BCG' }}
            </ion-button>
        </row>
    </div>

    <div class="mod-ls">
        <!-- <basic-form :contentData="vitals" @update:inputValue="validaterowData($event)"></basic-form> -->
        <row>
            <ion-icon size="medium" style="margin-bottom: -6px;" :icon="icons.calendar"></ion-icon>
            <span style="color: #b42318;">at <span style="color: #b42318;">Birth</span> <ion-icon class="dotStatus" slot="start" :icon="icons.grayDot"></ion-icon> 19 Apr 2024</span>
            <span style="color: #b42318; margin-left: 10%;">4 vaccines missed!</span>
        </row>

        <row>
            <ion-button v-if="true" class="medicalAlBtn">
                <ion-icon slot="start" style="font-size: x-large" :icon="closeOutline"></ion-icon>
                {{ 'OPV 1' }}
            </ion-button>

            <ion-button v-if="true" class="medicalAlBtn">
                <ion-icon slot="start" style="font-size: x-large" :icon="closeOutline"></ion-icon>
                {{ 'Penta 1' }}
            </ion-button>

            
            <ion-button v-if="true" class="medicalAlBtn">
                <ion-icon slot="start" style="font-size: x-large" :icon="closeOutline"></ion-icon>
                {{ 'PCV 1' }}
            </ion-button>
        </row>

        <row>
            <div>
                <span style="color: #316CBA">
                    Show more
                </span>
            </div>
        </row>
    </div>

    <div class="mod-ls">
        <!-- <basic-form :contentData="vitals" @update:inputValue="validaterowData($event)"></basic-form> -->
        <row>
            <ion-icon size="medium" style="margin-bottom: -6px;" :icon="icons.calendar"></ion-icon>
            <span>at <span style="color: #016302;">Birth</span> <ion-icon class="dotStatus" slot="start" :icon="icons.grayDot"></ion-icon> 19 Apr 2024</span>
            <span style="color: #316CBA; margin-left: 10%;">2/2 vaccines given</span>
        </row>

        <row>
            <ion-button v-if="true" class="medicalAlBtn-2">
                <ion-icon slot="start" style="font-size: x-large" :icon="checkmarkOutline"></ion-icon>
                {{ 'OPV 0' }}
            </ion-button>

            <ion-button v-if="true" class="medicalAlBtn-2">
                <ion-icon slot="start" style="font-size: x-large" :icon="checkmarkOutline"></ion-icon>
                {{ 'BCG' }}
            </ion-button>

            <ion-button v-if="true" class="medicalAlBtn-2">
                <ion-icon slot="start" style="font-size: x-large" :icon="checkmarkOutline"></ion-icon>
                {{ 'PCV 1' }}
            </ion-button>

            <ion-button v-if="true" class="medicalAlBtn">
                <ion-icon slot="start" style="font-size: x-large" :icon="closeOutline"></ion-icon>
                {{ 'Penta 1' }}
            </ion-button>
        </row>

        <row>
            <div>
                <span style="color: #316CBA">
                    Show less
                </span>
            </div>
        </row>
    </div>
    


</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import {
    IonContent,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCol,
    IonAvatar,
    IonImg,
    IonLabel,
    IonPage,
    IonFooter,
} from "@ionic/vue"
import { createOutline } from "ionicons/icons"
import {
    closeOutline,
    checkmarkOutline
} from "ionicons/icons"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { icons } from "@/utils/svg"


const props = defineProps<{
    is_open: any;
    person_id: any;
}>();


</script>
<style scoped>
.vitals_title {
    border-bottom: 1px solid #b3b3b3;
    margin-bottom: 50px;
}
.input-with-icon {
    position: relative;
}
.input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: gray; /* Adjust the color as needed */
}
ion-col {
    padding-bottom: 15px;
}
h5 {
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    border-bottom: 1px solid #ccc;
    line-height: 60px;
}
.mod-ls {
    margin: 10px;
    border-bottom: 1px solid #ccc;
    line-height: 60px;
}
.saveBtn {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 330px;
    align-items: center;
}
.btnContent {
    display: flex;
    justify-content: center;
    border-top: 1px solid #ccc;
    line-height: 60px;
}
.dotStatus {
    font-size: .5rem !important;
}
ion-button.medicalAlBtn {
    --background: #fecdca;
    --color: #b42318;
    text-transform: none;
    font-size: large;
}
ion-button.medicalAlBtn-2 {
    --background: #DDEEDD;
    --color: #016302;
    text-transform: none;
    font-size: large;
}
</style>
