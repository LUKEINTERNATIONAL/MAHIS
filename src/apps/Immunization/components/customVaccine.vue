<template>
<div class="vaccinesList">
    <ion-row>
        <ion-col>
                <ion-button :disabled="disableVaccine(visitId)" class="administerVac" v-for="vaccine in vaccines" :key="vaccine" @click="openAdministerVaccineModal(vaccine)" fill="solid" :color="getColorForVaccine(vaccine, visitId)" style="background: #DDEEDD; border-radius: 8px; color: #636363;">
                    <ion-icon slot="start" :icon="getInjectSignForVaccine(vaccine, visitId)"></ion-icon>
                    {{ checkVaccineName(vaccine.drug_name) }}
                    <ion-icon slot="end" :icon="getCheckBoxForVaccine(vaccine, visitId)"></ion-icon>
                </ion-button>
        </ion-col>
    </ion-row>
</div>
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
    IonModal,
    IonCol,
    IonRow,
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue"
import { icons } from "@/utils/svg"
import { defineComponent } from "vue"
import administerVaccineModal from "@/apps/Immunization/components/Modals/administerVaccineModal.vue"
import { createModal } from "@/utils/Alerts"
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore"
import { PatientService } from "@/services/patient_service"
export default defineComponent({
    name: "Home",
    components: {
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
        IonModal,
        IonCol,
        IonRow,
    },
    data() {
        return {
            iconsContent: icons,
        };
    },
    computed: {},
    created() {
        
    },
    mounted() {
        
    },
    props: {
        vaccines: {
            type: [],
            default: []
        } as any,
        visitId: {
            type: String,
            default: 0
        } as any,
  },
    watch: {},
    setup() {
        return {  };
    },

    methods: {
        getColorForVaccine(vaccine: any, visit_id: number): string{
            const store = useAdministerVaccineStore()
            if (visit_id < store.getCurrentVisitId() && vaccine.status != 'administered') {
                return 'danger'
            }
            if (vaccine.status == 'administered') {
                return 'success'
            } else {
                return 'medium-green'
            }
        },
        getInjectSignForVaccine(vaccine: any, visit_id: number) {
            const store = useAdministerVaccineStore()
            if (visit_id < store.getCurrentVisitId() && vaccine.status != 'administered') {
                return this.iconsContent.redAlert
            }
            if (visit_id < store.getCurrentVisitId() && vaccine.status == 'administered') {
                return this.iconsContent.smallAlreadyAdminstered
            }
            if (vaccine.status == 'administered') {
                return this.iconsContent.greenInjection
            } if (vaccine.status != 'administered') {
                return this.iconsContent.fadedGreenIjection
            }
        },
        getCheckBoxForVaccine(vaccine: any, visit_id: number) {
            const store = useAdministerVaccineStore()
            if (visit_id < store.getCurrentVisitId() && vaccine.status != 'administered') {
                return this.iconsContent.smallEditPen
            }
            if (visit_id < store.getCurrentVisitId() && vaccine.status == 'administered') {
                return this.iconsContent.smallEditPen
            }
            if (vaccine.status == 'administered') {
                return this.iconsContent.improvedGreenTick
            } else {
                return this.iconsContent.whiteCheckbox
            }
        },
        openAdministerVaccineModal(data: any) {
            const store = useAdministerVaccineStore()
            store.setCurrentSelectedDrug(this.$props.visitId as number, data.drug_id as number, data.drug_name, data.vaccine_batch_number as string)
            createModal(administerVaccineModal, { class: "otherVitalsModal" })
        },
        disableVaccine(identifier: number) {
            const client = new PatientService()
            const client_age = client.getAge()
            const is_under_five = this.getVisitNumber(client_age) as number
            const store = useAdministerVaccineStore()
            const currentVisitId = store.getCurrentVisitId()
            const currentSchFound = store.getCurrentSchedFound()
            
            if (currentSchFound == false) {
                return true
            }
            
            if (identifier == currentVisitId) {
                return false
            } 

            if (identifier < is_under_five) {
                return true
            }
            
            if (identifier < currentVisitId) {
                return false
            }
            else {
                return true
            }
        },
        checkVaccineName(name: string) {
            return name.replace(/Pentavalent/g, "Penta");
        },
        getVisitNumber(age: number) {
            if (age < 10/52) {
                return 1; // Visit 1: 10 weeks
            } else if (age < 14/52) {
                return 2; // Visit 2: 14 weeks
            } else if (age < 5/12) {
                return 3; // Visit 3: 5 months
            } else if (age < 6/12) {
                return 4; // Visit 4: 6 months
            } else if (age < 7/12) {
                return 5; // Visit 5: 7 months
            } else if (age < 9/12) {
                return 6; // Visit 6: 9 months
            } else if (age < 15/12) {
                return 7; // Visit 7: 15 months
            } else if (age < 22/12) {
                return 8; // Visit 8: 22 months
            } else if (age < 12) {
                return 9; // Visit 9: 12 years above
            } else {
                return 10; // Visit 10: 18 years above
            }
        }
    },
});
</script>
<style scoped>
.demographics {
    box-sizing: border-box;
    width: 95vw;
    height: 92px;
    left: calc(50% - 461px / 2 + 27.5px);
    margin-top: 10px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 7px;
}
.demographicsFirstRow {
    /* _Input dropdown menu item */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 5px;
    gap: 15px;

    height: 24px;
    justify-content: space-between;
}
.name {
    /* Text */

    height: 24px;

    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #00190e;

    flex: none;
    order: 0;
    flex-grow: 0;
}
.demographicsText {
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 5px;
    color: #636363;

    flex: none;
    order: 0;
    flex-grow: 0;
}
.demographicsOtherRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1px 5px;
    gap: 10px;

    height: 18px;
    left: calc(50% - 243px / 2 + 26.5px);
    top: calc(50% - 23px / 2 - 455.5px);
}
.smallFont {
    font-size: 12px;
}
.mediumFontColor {
    color: #00190e;
}

.weightHeightGraphBtns {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
}
.btnTextWeight {
    color: #000;
    --border-width: 1px;
    margin-right: 15px;
}
.dot {
    font-size: 25px;
}
.initialsBox {
    width: 80px;
    height: 80px;
    left: 31px;
    top: 122px;
    align-items: center;
    background: #5983ba;
    border-radius: 10px;
    align-items: center;
    display: flex;
}
.initialsText {
    width: 100%;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    align-content: center;
    color: #ffffff;
}
.outcomeStatus {
    align-items: center;
    padding: 2px 7px;
    width: 50px;
    height: 18px;
    background: #ddeedd;
    border-radius: 22px;
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    align-items: center;
    text-align: center;
}
.graphSection {
    box-sizing: border-box;
    background: #f7f7f7;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    margin-top: 7px;
}
.graphBtn {
    display: flex;
    justify-content: center;
}
.dueAlert {
    display: flex;
    justify-content: space-between;
    border: solid 1px #ccc;
    border-style: dashed;
    margin-top: 10px;
    padding: 5px;
}
.dueAlertText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #b42318;
    padding: 10px;
}
/* ion-button {
    --padding-top: 0;
    --padding-bottom: 0;
} */
.vaccinesTitle {
    display: flex;
    justify-content: space-around;
    padding: 15px;
}
.vaccinesTitleText {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    color: #00190e;
}
.vaccinesTitleDate {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #636363;
}
.milestone {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
}

.arrowBtns {
    position: absolute;
    top: 30px;
}
.vaccinesList {
    margin-top: 8px;
}
.seeFullList {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #316cba;
    float: right;
}
.warningText {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px;
    gap: 1px;
    background: #fedf89;
    border-radius: 4px;
    font-size: 13px;
    margin-right: 10px;
    color: #636363;
}
.successText {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px;
    gap: 1px;
    background: #ddeedd;
    border-radius: 4px;
    font-size: 13px;
    color: #636363;
}
.centerBtns {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.otherVaccine {
    padding: 10px;
    margin-bottom: 10px;
}
.dotsWizard {
    display: flex;
    justify-content: space-between;
    width: 150px;
    margin: 0 auto;
    align-items: center;
}
.dotBig {
    font-size: 0.7rem !important;
}
.dotStatus {
    font-size: 0.4rem !important;
}
.lastVaccineTitle {
    display: flex;
    justify-content: space-between;
}
.lastVaccine {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
}
.lastVaccineText {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    color: #00190e;
}
.lastVaccineList {
    display: flex;
    justify-content: space-between;
    width: 210px;
    margin-bottom: 20px;
}
.lastVaccineDate {
    display: flex;
    justify-content: space-between;
    width: 210px;
    margin-bottom: 10px;
    align-items: center;
}
.administerVac {
    height: 58px;
    width: 160px;
    margin: 7px;
}
</style>