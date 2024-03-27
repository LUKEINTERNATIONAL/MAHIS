<template>
    <div class="modal_wrapper">
        <basic-form :contentData="pastMedicalHistory" @update:inputValue="handleInputData"></basic-form>
    </div>
</template>

<script lang="ts">
import {IonContent, IonHeader, IonItem, IonList, IonMenu, IonTitle, IonToolbar} from "@ionic/vue";
import {defineComponent} from "vue";
import BasicForm from "@/components/BasicForm.vue";
import {usePastMedicalHistoryStore} from "@/apps/OPD/stores/PastMedicalHistoryStore";
import {mapState} from "pinia";
import {modifyRadioValue,} from "@/services/data_helpers";

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
            console.log(event);
            if (event?.al?.name == "TB" && event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "TBmedication", "displayNone", false);
            } else if (event?.al?.name == "TB" && !event?.al?.checked) {
                modifyRadioValue(this.pastMedicalHistory, "TBmedication", "displayNone", true);
            }

            if (event?.name == "TBmedication" && event?.selectedValue == "Yes") {
                this.pastMedicalHistory[2].displayNone = false;
            } else if (event?.name == "TBmedication" && event?.selectedValue == "No") {
                this.pastMedicalHistory[2].displayNone = true;
            }
        },
    },
});
</script>

<style scoped></style>
