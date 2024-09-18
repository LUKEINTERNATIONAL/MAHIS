<template>
    <div class="modal_wrapper">
        <basic-form :contentData="nonPharmacologicalIntervention" @update:inputValue="handleInputData"></basic-form>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import { useNonPharmacologicalInterventionStore } from "@/apps/OPD/stores/NonPharmacologicalInterventionStore";
import { mapState } from "pinia";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    modifyFieldValue,
    modifyRadioValue,
} from "@/services/data_helpers";
import { formatCheckBoxData } from "@/services/formatServerData";
import { Service } from "@/services/service";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/OPD/services/treatment";
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
        ...mapState(useNonPharmacologicalInterventionStore, ["nonPharmacologicalIntervention"]),
    },
    methods: {
        handleInputData(event: any) {
            console.log(event);
            // if (event?.al?.name == "TB" && event?.al?.checked) {
            //     modifyRadioValue(this.nonPharmacologicalIntervention, "TBmedication", "displayNone", false);
            // } else if (event?.al?.name == "TB" && !event?.al?.checked) {
            //     modifyRadioValue(this.nonPharmacologicalIntervention, "TBmedication", "displayNone", true);
            // }

            // if (event?.name == "TBmedication" && event?.selectedValue == "Yes") {
            //     this.nonPharmacologicalIntervention[2].displayNone = false;
            // } else if (event?.name == "TBmedication" && event?.selectedValue == "No") {
            //     this.nonPharmacologicalIntervention[2].displayNone = true;
            // }
        },
        async BuildNonPharmacologicalIntervention() {
            return [...(await formatCheckBoxData(this.nonPharmacologicalIntervention))];
        },
        async saveNonPharmacologicalIntervention() {
            const data: any = await this.BuildNonPharmacologicalIntervention();
            console.log("🚀 ~ saveNonPharmacologicalIntervention ~ data:", data);
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const treatmentInstance = new Treatment();
                //   treatmentInstance.onSubmit(this.treatment.patient_id, userID, data);
            }
        },
    },
});
</script>

<style scoped></style>
