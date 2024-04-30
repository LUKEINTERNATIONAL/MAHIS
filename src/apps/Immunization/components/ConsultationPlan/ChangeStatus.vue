<template>
    <div class="modal_wrapper">
        <basic-form :contentData="changeStatus" @update:inputValue="handleInputData" @update:selected="handleInputData"></basic-form>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import { useChangeStatusStore } from "@/apps/Immunization/stores/ChangeStatusStore";
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
        return {
            initialData: [] as any,
        };
    },
    computed: {
        ...mapState(useChangeStatusStore, ["changeStatus"]),
    },
    mounted() {
        const medicationHistory = useChangeStatusStore();
        // this.initialData = medicationHistory.getInitial();
    },
    methods: {
        handleInputData(event: any) {},
    },
});
</script>

<style scoped></style>
