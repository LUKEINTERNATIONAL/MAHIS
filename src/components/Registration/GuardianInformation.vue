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
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";
import Relationship from "@/views/Mixin/SetRelationship.vue";
import { RelationshipService } from "@/services/relationship_service";

export default defineComponent({
    name: "Menu",
    mixins: [Relationship],
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
        relationships: {
            async handler() {
                // await this.setRelationShip();
            },
            deep: true,
        },
        personInformation: {
            async handler() {
                await this.setRelationShip();
            },
            deep: true,
        },
    },
    data() {
        return {
            cardData: {} as any,
            inputField: "" as any,
            setName: "" as any,
        };
    },
    computed: {
        ...mapState(useRegistrationStore, ["guardianInformation", "personInformation"]),
        gender() {
            return getRadioSelectedValue(this.personInformation, "gender");
        },
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
    props: {
        editable: {
            default: false as any,
        },
    },
    async mounted() {
        await this.setRelationShip();
        this.buildCards();
        this.setData();
    },
    methods: {
        async setData() {
            if (this.editable) {
                const guardianData = await RelationshipService.getRelationships(this.demographics.patient_id);

                modifyFieldValue(
                    this.guardianInformation,
                    "guardianNationalID",
                    "value",
                    this.setAttribute("Regiment ID", guardianData[0]?.relation)
                );
                modifyFieldValue(this.guardianInformation, "guardianFirstname", "value", guardianData[0]?.relation.names[0]?.given_name);
                modifyFieldValue(this.guardianInformation, "guardianLastname", "value", guardianData[0]?.relation.names[0]?.family_name);
                modifyFieldValue(this.guardianInformation, "guardianMiddleName", "value", guardianData[0]?.relation.names[0]?.middle_name);
                modifyFieldValue(
                    this.guardianInformation,
                    "guardianPhoneNumber",
                    "value",
                    this.setAttribute("Cell Phone Number", guardianData[0]?.relation)
                );
                modifyFieldValue(this.guardianInformation, "relationship", "value", {
                    id: guardianData[0]?.type.relationship_type_id,
                    name: guardianData[0]?.type.b_is_to_a,
                });
                await this.setRelationShip();
            }
        },
        setAttribute(name: string | undefined, data: any) {
            if (!data || Object.keys(data).length === 0) return;
            let str = data.person_attributes.find((x: any) => x.type.name == name);
            if (str == undefined) return;
            else return str.value;
        },
        async setRelationShip() {
            if (this.gender) {
                await this.getRelationships();
                modifyFieldValue(this.guardianInformation, "relationship", "displayNone", false);
                modifyFieldValue(this.guardianInformation, "relationship", "multiSelectData", this.relationships);
            } else {
                modifyFieldValue(this.guardianInformation, "relationship", "displayNone", true);
            }
        },
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
