<template>
    <basic-card
        :content="cardData"
        :editable="editable"
        @update:selected="handleInputData"
        @update:inputValue="handleInputData"
        @clicked:button="handleBtns"
    ></basic-card>
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
import { modifyFieldValue, getFieldValue, getRadioSelectedValue, getCheckboxSelectedValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";
import AddTA from "@/components/Registration/Modal/AddTA.vue";
import AddVillage from "@/components/Registration/Modal/AddVillage.vue";
import Districts from "@/views/Mixin/SetDistricts.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";

export default defineComponent({
    name: "Menu",
    mixins: [Districts],
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
            locationData: [] as any,
        };
    },
    computed: {
        ...mapState(useRegistrationStore, ["homeLocation"]),
        ...mapState(useRegistrationStore, ["currentLocation"]),
        ...mapState(useDemographicsStore, ["demographics", "patient"]),
        current_district() {
            return getFieldValue(this.currentLocation, "current_district", "value")?.name;
        },
        current_traditional_authority() {
            return getFieldValue(this.currentLocation, "current_traditional_authority", "value")?.name;
        },
        current_village() {
            return getFieldValue(this.currentLocation, "current_village", "value")?.name;
        },

        "Other (specify)"() {
            return getFieldValue(this.currentLocation, "Other (specify)", "value");
        },
    },
    watch: {
        currentLocation: {
            handler() {
                this.buildCards();
            },
            deep: true,
        },
        districtList: {
            handler() {
                if (this.districtList.length > 0) modifyFieldValue(this.currentLocation, "current_district", "multiSelectData", this.districtList);
            },
            deep: true,
        },
    },
    props: {
        editable: {
            default: false as any,
        },
    },
    async mounted() {
        this.buildCards();
        this.setData();
        this.validaterowData({});
    },
    methods: {
        setData() {
            if (this.editable) {
                modifyFieldValue(this.currentLocation, "current_village", "value", {
                    name: this.patient.person?.addresses[0]?.city_village,
                    district_id: "",
                });
                modifyFieldValue(this.currentLocation, "current_district", "value", {
                    name: this.patient.person?.addresses[0]?.state_province,
                    traditional_authority_id: "",
                });
                modifyFieldValue(this.currentLocation, "current_traditional_authority", "value", {
                    name: this.patient.person?.addresses[0]?.township_division,
                    village_id: "",
                });
                modifyFieldValue(this.currentLocation, "closestLandmark", "value", {
                    id: "",
                    name: this.getAttributes(this.patient, "Landmark Or Plot Number"),
                });
            }
        },
        getAttributes(item: any, name: any) {
            return item.person.person_attributes.find((attribute: any) => attribute.type.name === name)?.value;
        },
        async buildCards() {
            this.cardData = {
                mainTitle: "Demographics",
                cards: [
                    {
                        cardTitle: "Current Location",
                        content: this.currentLocation,
                    },
                ],
            };
        },
        openModal() {
            createModal(DispositionModal);
        },
        handleBtns(event: any) {
            if (event == "TA") createModal(AddTA, { class: "otherVitalsModal" });
            if (event == "Village") createModal(AddVillage, { class: "otherVitalsModal" });
        },
        async validations(data: any, fields: any) {
            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },
        validationRules(event: any) {
            return validateField(this.currentLocation, event.name, (this as any)[event.name]);
        },
        validaterowData(event: any) {
            this.validationRules(event);
        },
        async handleInputData(event: any) {
            localStorage.setItem("activeLocation", "current");
            const currentFields: any = ["current_district", "current_traditional_authority", "current_village", "Other (specify)"];
            await this.validations(this.currentLocation, currentFields);

            if (event.name == "current_district") {
                modifyFieldValue(this.currentLocation, "current_traditional_authority", "displayNone", true);
                modifyFieldValue(this.currentLocation, "current_traditional_authority", "value", "");
                modifyFieldValue(this.currentLocation, "current_village", "displayNone", true);
                modifyFieldValue(this.currentLocation, "current_village", "value", "");
                if (event?.value?.district_id) this.setTA(event.value);
            }

            if (event.name == "current_traditional_authority") {
                modifyFieldValue(this.currentLocation, "current_village", "displayNone", true);
                modifyFieldValue(this.currentLocation, "current_village", "value", "");
                if (event?.value?.traditional_authority_id) this.setVillage(event.value);
            }

            if (event.name == "closestLandmark") {
                const selectedLandmark = getFieldValue(this.currentLocation, "closestLandmark", "value");
                if (selectedLandmark?.name === "Other") {
                    modifyFieldValue(this.currentLocation, "Other (specify)", "displayNone", false);
                } else {
                    modifyFieldValue(this.currentLocation, "Other (specify)", "displayNone", true);
                    modifyFieldValue(this.currentLocation, "Other (specify)", "value", "");
                }
            }
            this.validaterowData(event);
        },

        async setTA(obj: any) {
            const targetData = this.getTAs(obj.district_id);
            if (targetData.length > 0) {
                modifyFieldValue(this.currentLocation, "current_traditional_authority", "multiSelectData", targetData);
                modifyFieldValue(this.currentLocation, "current_traditional_authority", "displayNone", false);
                return true;
            } else {
                return false;
            }
        },
        async setVillage(obj: any) {
            const targetData =
                (await this.getVillages(obj.traditional_authority_id)) || (await LocationService.getVillages(obj.traditional_authority_id));
            if (targetData.length > 0) {
                modifyFieldValue(this.currentLocation, "current_village", "multiSelectData", targetData);
                modifyFieldValue(this.currentLocation, "current_village", "displayNone", false);
                return true;
            } else {
                return false;
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
