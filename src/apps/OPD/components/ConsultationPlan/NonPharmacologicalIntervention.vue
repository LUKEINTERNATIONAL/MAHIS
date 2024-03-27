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
    },
});
</script>

<style scoped></style>
