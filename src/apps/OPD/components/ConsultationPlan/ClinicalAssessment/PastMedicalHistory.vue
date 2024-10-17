<template>
    <div class="modal_wrapper">
      <div class="uniform_columns">
        <basic-form
            :contentData="pastMedicalHistory"
            :initialData="initialData"
            @update:inputValue="handleInputData"
            @update:selected="handleInputData"
        ></basic-form>
      </div>

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
    modifyCheckboxValue,
} from "@/services/data_helpers";
import { checkbox } from "ionicons/icons";
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
        return {
            initialData: [] as any,
        };
    },
    computed: {
        ...mapState(usePastMedicalHistoryStore, ["pastMedicalHistory"]),
    },
    mounted() {
        const medicationHistory = usePastMedicalHistoryStore();
        this.initialData = medicationHistory.getInitial();
        this.handleChronicConditions()
    },
    watch:{
        pastMedicalHistory:{
            handler(){
                this.handleChronicConditions()
            },deep:true
        }
    },
    methods: {
        handleChronicConditions() {
    const checkBoxes = ["TB", "Chronic Obstructive Pulmonary Disease (COPD)",
                        "Asthma", "Epilepsy", "Previous stroke", "Peptic Ulcer Disease (PUD)",
                        "Mental disorder", "Bleeding disorders", "Hypertension", "HIV Positive",
                        "Diabetes Mellitus"];

    if (getCheckboxSelectedValue(this.pastMedicalHistory, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
            modifyRadioValue(this.pastMedicalHistory,'TB treatment','displayNone',true)
            modifyFieldValue(this.pastMedicalHistory,'TB drugs','displayNone',true)
            modifyFieldValue(this.pastMedicalHistory,'TB drug start date','displayNone',true)
            modifyRadioValue(this.pastMedicalHistory,'Hypertension medication','displayNone',true)
            modifyFieldValue(this.pastMedicalHistory,'Current hypertension treatment regimen','displayNone',true)
            modifyRadioValue(this.pastMedicalHistory,'HIV status','displayNone',true)
            modifyFieldValue(this.pastMedicalHistory,'ARV start date','displayNone',true)
            modifyRadioValue(this.pastMedicalHistory,'Diabetes','displayNone',true)
            modifyRadioValue(this.pastMedicalHistory,'Controlled by','displayNone',true)

            modifyCheckboxValue(this.pastMedicalHistory, checkbox, 'checked', false);
            modifyCheckboxValue(this.pastMedicalHistory, checkbox, 'disabled', true);
        });
    } else {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.pastMedicalHistory, checkbox, 'disabled', false);
        });
    }
},
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
        },
    },
});
</script>

<style scoped>
.modal_wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* Center contents */
}

@media (max-width: 768px) {
  .modal_wrapper {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .modal_wrapper {
    flex-direction: column;
  }
}


</style>
