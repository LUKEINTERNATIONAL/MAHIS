<template>
    <div class="vaccinesList">
        <ion-row>
            <ion-col>
                <ion-button
                    :disabled="disableVaccine(vaccine)"
                    class="administerVac"
                    v-for="vaccine in vaccines"
                    :key="vaccine"
                    @click="openAdministerVaccineModal(vaccine)"
                    fill="solid"
                    :color="getColorForVaccine(vaccine)"
                    style="background: #ddeedd; border-radius: 8px; color: #636363"
                >
                    <ion-icon slot="start" :icon="getInjectSignForVaccine(vaccine)"></ion-icon>
                    {{ checkVaccineName(vaccine.drug_name) }}
                    <ion-icon slot="end" :icon="getCheckBoxForVaccine(vaccine)"></ion-icon>
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
} from "@ionic/vue";
import { icons } from "@/utils/svg";
import { defineComponent } from "vue";
import administerVaccineModal from "@/apps/Immunization/components/Modals/administerVaccineModal.vue";
import { createModal } from "@/utils/Alerts";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { PatientService } from "@/services/patient_service";
import voidAdminstredVaccine from "@/apps/Immunization/components/Modals/voidAdminstredVaccine.vue";
import { StockService } from '@/services/stock_service';
import alert from "@/apps/Immunization/components/Modals/alert.vue";
import { checkDrugName } from "@/apps/Immunization/services/vaccines_service";
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
        alert,
    },
    data() {
        return {
            iconsContent: icons,
            fowardData: {} as any,
        };
    },
    computed: {},
    created() {},
    mounted() {},
    props: {
        vaccines: {
            type: {},
            default: {},
        } as any,
        milestone_status: {
            type: String,
            default: 0,
        } as any,
    },
    watch: {},
    setup() {
        return {}
    },
    methods: {
        getColorForVaccine(vaccine: any) {
            if (vaccine.status == "administered") {
                return "success";
            }

            if (vaccine.status != "administered") {
                if (this.milestone_status == "upcoming") {
                    return "medium";
                }
                if (this.milestone_status == "current") {
                    return "success";
                } else {
                    return "danger";
                }
            }
        },
        getInjectSignForVaccine(vaccine: any) {
            if (vaccine.status == "administered") {
                return this.iconsContent.greenInjection;
            }
            if (vaccine.status != "administered") {
                if (this.milestone_status == "upcoming") {
                    return "";
                } else {
                    return this.iconsContent.fadedGreenIjection;
                }
            }
        },
        getCheckBoxForVaccine(vaccine: any) {
            if (vaccine.status == "administered") {
                return this.iconsContent.improvedGreenTick;
            }

            if (vaccine.status != "administered") {
                if (this.milestone_status == "upcoming") {
                    return "";
                } else {
                    return this.iconsContent.whiteCheckbox;
                }
            }
        },
        async openAdministerVaccineModal(data: any) {
            const store = useAdministerVaccineStore();
            store.setCurrentSelectedDrug(data)
            const stockService = new StockService();
            const data_ = await stockService.getDrugBatches(data.drug_id)
            store.setLotNumberData(data_)

            if(data_.length == 0) {
                if (this.checkIfAdminstredAndAskToVoid() == false) {
                    if(checkDrugName(data) == false) {
                        createModal(alert, { class: "otherVitalsModal" })
                    }

                    if (checkDrugName(data) == true) {
                        createModal(administerVaccineModal, { class: "otherVitalsModal" });
                    } 
                }
            }

            if(data_.length > 0) {
                if (this.checkIfAdminstredAndAskToVoid() == false) {
                    createModal(administerVaccineModal, { class: "otherVitalsModal" });
                }
            }
        },
        disableVaccine(vaccine: any) {
            if (vaccine.status != null && vaccine.status == "administered") {
                return false;
            }

            if (vaccine.can_administer != null && vaccine.can_administer == false) {
                return true;
            }

            if (vaccine.can_administer != null && vaccine.can_administer == true) {
                return false;
            }
            // return true;
        },
        checkVaccineName(name: string) {
            return name.replace(/Pentavalent/g, "Penta");
        },
        checkIfAdminstredAndAskToVoid() {
            const store = useAdministerVaccineStore();
            const vaccine_to_void = store.getCurrentSelectedDrug()
            if(vaccine_to_void.drug.status == 'administered') {
                store.setVaccineToBeVoided(vaccine_to_void)
                createModal(voidAdminstredVaccine, { class: "otherVitalsModal" }, false)
                // const data = await createModal(voidAdminstredVaccine, { class: "otherVitalsModal" }, false)
                // if(data?.voided == true) {
                //     // this.dismiss()
                // }
                return true
            }
            return false
        },
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
    font-size: 14px;
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
    font-size: 14px;
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
    font-size: 14px;
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
    font-size: 14px;
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
    font-size: 14px;
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
  min-width: 160px;
  max-width: 100%; 
  width: auto; 
  margin: 7px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>
