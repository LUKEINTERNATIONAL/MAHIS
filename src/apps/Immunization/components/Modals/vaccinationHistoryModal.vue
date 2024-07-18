<template>
    <ion-header>
        <ion-title style="margin-bottom: 20px;" class="modalTitle OtherVitalsTitle">Vaccination History</ion-title>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
        <div class="mod-ls" v-for="(item, index) in vaccineHistory" :key="index">
            <row>
                <ion-icon size="medium" style="margin-bottom: -6px;" :icon="iconsContent.calendar"></ion-icon>
                <span> at <span style="color: #016302;">{{ item.age }}</span></span>
                <span style="color: #316CBA; margin-left: 10%;">{{ vaccinesGivenCount(item) }}/{{ item.antigens.length }} vaccine(s) given</span>
            </row>

            <row>
                <customVaccine :vaccines="item.antigens" :milestone_status="item.milestone_status" />
            </row>

            <!-- <row>
                <div>
                    <span style="color: #316CBA">
                        Show more
                    </span>
                </div>
            </row> -->
        </div>
    </ion-content>


    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="dismiss()"> Cancel </ion-button>
            </ion-col>
        </ion-row>
    </ion-footer>
</template>
<script lang="ts">
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
    IonIcon,
    IonRow,
    modalController,
} from "@ionic/vue"
import { createOutline } from "ionicons/icons"
import {
    closeOutline,
    checkmarkOutline
} from "ionicons/icons"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { defineComponent } from "vue";
import { icons } from "@/utils/svg"
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore"
import customVaccine from "@/apps/Immunization/components/customVaccine.vue"

export default defineComponent({
    name: "Home",
    components: {
        IonIcon,
        IonButton,
        customVaccine,
        IonHeader,
        IonTitle,
        IonFooter,
        IonCol,
        IonRow,
        IonContent
    },
    data() {
        return {
            iconsContent: icons,
            vaccineHistory: [] as any,
        };
    },
    setup() {
        return { closeOutline, checkmarkOutline }
    },
    async mounted() {
        this.populateHistory()
    },
    methods: {
        populateHistory() {
            const vaccineScheduleStore = useAdministerVaccineStore();
            const vaccinSchedules = vaccineScheduleStore.getVaccineSchedule().vaccine_schedule
            this.vaccineHistory = vaccinSchedules
        },
        vaccinesGivenCount(vaccinSchedule: any) {
            const administeredVaccines = []
            vaccinSchedule.antigens.forEach((vaccine: any) => {
                if (vaccine.status == 'administered') {
                    administeredVaccines.push(vaccine)
                }
            })
            return administeredVaccines.length
        },
        dismiss() {
            modalController.dismiss();
        },
    }
})


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
    color: #1F2221D4 !important;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    border-bottom: 1px solid #ccc;
    line-height: 60px;
}
.mod-ls {
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
.otherVitalsModal {
  --height: 530px;
}
</style>
