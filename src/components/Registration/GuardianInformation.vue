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
import { RelationshipService } from "@/services/relationship_service";
import { RelationsService } from "@/services/relations_service";

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
    watch: {
        guardianInformation: {
            handler() {
                this.buildCards();
            },
            deep: true,
        },
    },
    data() {
        return {
            cardData: {} as any,
            inputField: "" as any,
            setName: "" as any,
            relationships: [] as any,
        };
    },
    computed: {
        ...mapState(useRegistrationStore, ["guardianInformation"]),
        guardianFirstname() {
            return getFieldValue(this.guardianInformation, "guardianFirstname", "value");
        },
        guardianLastname() {
            return getFieldValue(this.guardianInformation, "guardianLastname", "value");
        },
        guardianMiddleName() {
            return getFieldValue(this.guardianInformation, "guardianMiddleName", "value");
        },
        guardianPhoneNumber() {
            return getFieldValue(this.guardianInformation, "guardianPhoneNumber", "value");
        },
        relationship() {
            return getFieldValue(this.guardianInformation, "relationship", "value");
        },
    },
    async mounted() {
        this.relationships = await RelationsService.getRelations();
        const data = this.relationships
            .map((r: any) => {
                if (r.b_is_to_a == r.b_is_to_a) {
                    return [{ name: r.b_is_to_a, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.b_is_to_a }];
                } else if (r.b_is_to_a != r.b_is_to_a) {
                    return [
                        { name: r.b_is_to_a, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.b_is_to_a },
                        { name: r.a_is_to_b, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.a_is_to_b },
                    ];
                }
            })
            .reduce((acc: any, val: any) => acc.concat(val), []);
        console.log(data);
        modifyFieldValue(this.guardianInformation, "relationship", "multiSelectData", data);
        this.updateRegistrationStores();
        this.buildCards();
    },
    methods: {
        buildCards() {
            this.cardData = {
                mainTitle: "Demographics",
                cards: [
                    {
                        cardTitle: "Guardian information",
                        content: this.guardianInformation,
                    },
                ],
            };
        },
        openModal() {
            createModal(DispositionModal);
        },
        updateRegistrationStores() {
            const registrationStore = useRegistrationStore();
            registrationStore.setGuardianInformation(this.guardianInformation);
        },
        buildGuardianInformation() {
            this.guardianInformation[0].selectedData = {
                given_name: this.guardianFirstname,
                middle_name: this.guardianMiddleName,
                family_name: this.guardianLastname,
                gender: "",
                birthdate: "",
                birthdate_estimated: "false",

                home_region: "",
                home_district: "",
                home_traditional_authority: "",
                home_village: "",

                current_region: "",
                current_district: "",
                current_traditional_authority: "",
                current_village: "",
                landmark: "",
                cell_phone_number: this.guardianPhoneNumber,
                national_id: getFieldValue(this.guardianInformation, "guardianNationalID", "value"),
            };
        },

        validationRules(event: any) {
            return validateField(this.guardianInformation, event.name, (this as any)[event.name]);
        },
        async handleInputData(event: any) {
            this.validationRules(event);
            this.buildGuardianInformation();
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
