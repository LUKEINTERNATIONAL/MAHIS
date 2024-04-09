<template>
    <div class="modal_wrapper">
        <basic-form :contentData="pastMedicalHistory" @update:inputValue="handleInputData" @update:selected="handleInputData"></basic-form>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import { usePastMedicalHistoryStore } from "@/apps/OPD/stores/PastMedicalHistoryStore";
import { mapState } from "pinia";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    modifyFieldValue,
    modifyRadioValue,
} from "@/services/data_helpers";
export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        BasicForm,
    },

    data() {
        return {};
    },
    computed: {
        ...mapState(usePastMedicalHistoryStore, ["pastMedicalHistory"]),
    },
    methods: {
        handleInputData(event: any) {
            modifyFieldValue(this.pastMedicalHistory, "TB drugs", "popOverData", {
                filterData: true,
                data: [
                    { name: "Auramine ‘O’ (C.I. 41000) 50g" },
                    { name: "Bedaquilline 100mg" },
                    { name: "Clofazimine 100mg" },
                    { name: "Clofazimine 50mg" },
                    { name: "Cycloserine 125mg" },
                    { name: "Cycloserine 250mg" },
                    { name: "Delamanid 50mg" },
                    { name: "Ethambutol 100mg" },
                    { name: "Ethambutol 400mg" },
                    { name: "Ethionamide 250mg" },
                    { name: "Isoniazid 100mg " },
                    { name: "Isoniazid 300mg" },
                    { name: "Isoniazid / Rifapentine 300mg / 300mg" },
                    { name: "Levofloxacin 100mg" },
                    { name: "Levofloxacin 250mg" },
                    { name: "Linezolid 600mg" },
                    { name: "Moxifloxacin 400mg" },
                    { name: "Pyrazinamide 400mg" },
                    { name: "Rifabutin 150mg Capsules" },
                    { name: "Rifampicin 150mg/isoniazid 75mg" },
                    { name: "Rifampicin 75mg+INH 50mg dispersible" },
                    { name: "Rifampicin 75mg+INH 50mg+Pyrazinamide 150mg dispersible" },
                    { name: "Rifampicin150mg/Isoniazid75mg/Pyrazinamide 400mg/Ethambutol" },
                ],
            });

            modifyFieldValue(this.pastMedicalHistory, "Current hypertension treatment regimen", "popOverData", {
                filterData: true,
                data: [
                    { name: "Captopril 12.5mg" },
                    { name: "Aspirin 75mg" },
                    { name: "Hydrochlorothiazide 25mg" },
                    { name: "Enalapril Meleate 5mg" },
                    { name: "Enalapril Maleate 10mg" },
                ],
            });

            if (event?.al?.name == "TB" && event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "TB treatment", "displayNone", false);
            } else if (event?.al?.name == "TB" && !event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "TB treatment", "displayNone", true);
                modifyRadioValue(this.pastMedicalHistory, "TB treatment", "selectedValue", "");
                modifyFieldValue(this.pastMedicalHistory, "TB drugs", "displayNone", true);
            }
            if (event?.name == "TB treatment" && event?.selectedValue == "Yes") {
                modifyFieldValue(this.pastMedicalHistory, "TB drugs", "displayNone", false);
            } else if (event?.name == "TB treatment" && event?.selectedValue == "No") {
                modifyFieldValue(this.pastMedicalHistory, "TB drugs", "displayNone", true);
            }

            if (event?.al?.name == "Hypertension" && event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "Hypertension medication", "displayNone", false);
            } else if (event?.al?.name == "Hypertension" && !event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "Hypertension medication", "displayNone", true);
            }
            if (event?.name === "Hypertension medication" && event?.selectedValue == "Yes") {
                modifyFieldValue(this.pastMedicalHistory, "Current hypertension treatment regimen", "displayNone", false);
            } else if (event?.name === "Hypertension medication" && event?.selectedValue == "No") {
                modifyFieldValue(this.pastMedicalHistory, "Current hypertension treatment regimen", "displayNone", true);
            }

            if (event?.al?.name == "HIV Positive" && event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "HIV status", "displayNone", false);
            } else if (event?.al?.name == "HIV Positive" && !event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "HIV status", "displayNone", true);
            }
            if (event?.name === "HIV status" && event?.selectedValue == "Yes") {
                modifyFieldValue(this.pastMedicalHistory, "ARV start date", "displayNone", false);
            } else if (event?.name === "HIV status" && event?.selectedValue == "No") {
                modifyFieldValue(this.pastMedicalHistory, "ARV start date", "displayNone", true);
            }

            if (event?.al?.name == "Diabetes Mellitus" && event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "Diabetes", "displayNone", false);
                modifyRadioValue(this.pastMedicalHistory, "Controlled by", "displayNone", false);
            } else if (event?.al?.name == "Diabetes Mellitus" && !event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "Diabetes", "displayNone", true);
                modifyRadioValue(this.pastMedicalHistory, "Controlled by", "displayNone", true);
            }
        },
    },
});
</script>

<style scoped></style>
