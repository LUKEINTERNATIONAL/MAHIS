<template>
    <basic-card :content="cardData" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-card>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu } from "@ionic/vue";
import { defineComponent } from "vue";
import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { mapState } from "pinia";
import BasicCard from "../BasicCard.vue";
import { LocationService } from "@/services/location_service";
import Validation from "@/validations/StandardValidations";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import HisDate from "@/utils/Date";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";

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
        BasicCard,
    },
    data() {
        return {
            cardData: {} as any,
            inputField: "" as any,
            setName: "" as any,
            religionsList: [
                { id: 1, name: "Christianity" },
                { id: 2, name: "Islam" },
                { id: 3, name: "Judaism" },
                { id: 4, name: "Hinduism" },
                { id: 5, name: "Buddhism" },
                { id: 6, name: "Sikhism" },
                { id: 7, name: "Jainism" },
                { id: 8, name: "Bahá'í Faith" },
                { id: 9, name: "Zoroastrianism" },
                { id: 10, name: "Confucianism" },
                { id: 11, name: "Taoism" },
                { id: 12, name: "Shinto" },
                { id: 13, name: "Baha'i Faith" },
                { id: 14, name: "Juche" },
                { id: 15, name: "Rastafari" },
            ],
        };
    },
    watch: {
        socialHistory: {
            handler() {
                this.buildCards();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useRegistrationStore, ["socialHistory"]),
        maritalStatus() {
            return this.getRadioValue(this.socialHistory, 0);
        },
        religion() {
            return this.getInputData(this.socialHistory, 1, 0, 0, "value");
        },
        occupationStatus() {
            return this.getRadioValue(this.socialHistory, 2);
        },
    },
    async mounted() {
        this.updateRegistrationStores();
        this.buildCards();
    },
    methods: {
        buildCards() {
            this.cardData = {
                mainTitle: "Demographics",
                cards: [
                    {
                        cardTitle: "Social History",
                        content: this.socialHistory,
                    },
                ],
            };
        },
        openModal() {
            createModal(DispositionModal);
        },
        updateRegistrationStores() {
            const registrationStore = useRegistrationStore();
            registrationStore.setSocialHistory(this.socialHistory);
        },

        validationRules(event: any) {
            return validateField(this.socialHistory, event.name, (this as any)[event.name]);
        },
        validatedSocialHistory() {
            if (
                Validation.required(this.maritalStatus) == null ||
                Validation.required(this.religion) == null ||
                Validation.required(this.occupationStatus) == null
            )
                return true;
            else {
                return false;
            }
        },
        getRadioValue(data: any, section: any) {
            return data[section].radioBtnContent.header.selectedValue;
        },
        getInputData(data: any, section: any, row: any, col: any, type: any) {
            const rowData = data[section].data.rowData[row].colData[col];
            switch (type) {
                case "value":
                    return rowData.value;
                case "inputHeader":
                    return rowData.inputHeader;
                case "id":
                    return rowData.id;
                default:
                    return null;
            }
        },
        async handleInputData(event: any) {
            this.validationRules(event);
            this.handleReligion(event.name);
        },
        handleReligion(name: any) {
            if (name == "religion") {
                console.log("ffffffffff", this.religionsList);
                modifyFieldValue(this.socialHistory, name, "multiSelectData", this.religionsList);
            }
        },
    },
});
</script>

<style scoped>
.demographics_title {
    font-weight: 700;
    font-size: 24px;
}
.gender {
    display: flex;
    justify-content: space-between;
    max-width: 170px;
    padding-top: 10px;
}
.gender_title {
    margin-top: 30px;
}
</style>
