<template>
    <basic-card :content="cardData" :editable="editable" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-card>
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
import { validateField } from "@/services/validation_service";
import { getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
import { useDemographicsStore } from "@/stores/DemographicStore";

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
        ...mapState(useDemographicsStore, ["demographics", "patient"]),
    },
    props: {
        editable: {
            default: false as any,
        },
    },
    async mounted() {
        this.updateRegistrationStores();
        this.buildCards();
        this.setData();
    },
    methods: {
        setData() {
            console.log(this.patient);
            modifyFieldValue(this.socialHistory, "religion", "selectedValue", { id: "", name: this.getAttributes(this.patient, "Religion") });
            modifyRadioValue(this.socialHistory, "occupation", "selectedValue", this.getAttributes(this.patient, "Occupation"));
            modifyRadioValue(this.socialHistory, "maritalStatus", "selectedValue", this.getAttributes(this.patient, "Civil Status"));
            modifyRadioValue(this.socialHistory, "highestLevelOfEducation", "selectedValue", this.getAttributes(this.patient, "EDUCATION LEVEL"));
        },
        getAttributes(item: any, name: any) {
            return item.person.person_attributes.find((attribute: any) => attribute.type.name === name)?.value;
        },
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
        updateRegistrationStores() {
            const registrationStore = useRegistrationStore();
            registrationStore.setSocialHistory(this.socialHistory);
        },
        async handleInputData(event: any) {
            this.handleReligion(event.name);
        },
        handleReligion(name: any) {
            if (name == "religion") {
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
