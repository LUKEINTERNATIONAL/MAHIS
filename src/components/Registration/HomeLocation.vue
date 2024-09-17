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
    mixins: [Districts],
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
            locationData: [] as any,
            districtList: [] as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics", "patient"]),
        ...mapState(useRegistrationStore, ["homeLocation", "currentLocation"]),
        home_district() {
            return getFieldValue(this.homeLocation, "home_district", "value")?.name;
        },
        home_traditional_authority() {
            return getFieldValue(this.homeLocation, "home_traditional_authority", "value")?.name;
        },
        home_village() {
            return getFieldValue(this.homeLocation, "home_village", "value")?.name;
        },
    },
    watch: {
        homeLocation: {
            handler() {
                this.buildCards();
            },
            deep: true,
        },
        districtList: {
            handler() {
                modifyFieldValue(this.homeLocation, "home_district", "multiSelectData", this.districtList);
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
    },
    methods: {
        setData() {
            if (this.editable) {
                modifyFieldValue(this.homeLocation, "home_district", "value", { name: this.patient.person?.addresses[0]?.address2, concept_id: "" });
                modifyFieldValue(this.homeLocation, "home_traditional_authority", "value", {
                    name: this.patient.person?.addresses[0]?.county_district,
                    concept_id: "",
                });
                modifyFieldValue(this.homeLocation, "home_village", "value", {
                    name: this.patient.person?.addresses[0]?.neighborhood_cell,
                    concept_id: "",
                });
            }
        },
        setSameAsCurrent() {
            if (getCheckboxSelectedValue(this.homeLocation, "Same as current")?.checked) {
                const currentDistrict = getFieldValue(this.currentLocation, "current_district", "value");
                const currentTraditionalAuthority = getFieldValue(this.currentLocation, "current_traditional_authority", "value");
                const currentVillage = getFieldValue(this.currentLocation, "current_village", "value");
                modifyFieldValue(this.homeLocation, "home_district", "value", currentDistrict);
                modifyFieldValue(this.homeLocation, "home_traditional_authority", "value", currentTraditionalAuthority);
                modifyFieldValue(this.homeLocation, "home_village", "value", currentVillage);

                modifyFieldValue(this.homeLocation, "home_traditional_authority", "displayNone", false);
                modifyFieldValue(this.homeLocation, "home_village", "displayNone", false);
            } else {
                modifyFieldValue(this.homeLocation, "home_district", "value", "");
                modifyFieldValue(this.homeLocation, "home_traditional_authority", "value", "");
                modifyFieldValue(this.homeLocation, "home_village", "value", "");

                modifyFieldValue(this.homeLocation, "home_traditional_authority", "displayNone", true);
                modifyFieldValue(this.homeLocation, "home_village", "displayNone", true);
            }
        },
        async buildCards() {
            this.cardData = {
                mainTitle: "Demographics",
                cards: [
                    {
                        cardTitle: "Home Location",
                        content: this.homeLocation,
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
        async handleInputData(event: any) {
            if (event?.col?.name == "Same as current") this.setSameAsCurrent();
            localStorage.setItem("activeLocation", "home");
            const currentFields: any = ["home_district", "home_traditional_authority", "home_village"];
            await this.validations(this.homeLocation, currentFields);
            if (event.name == "home_district") {
                modifyFieldValue(this.homeLocation, "home_traditional_authority", "displayNone", true);
                modifyFieldValue(this.homeLocation, "home_traditional_authority", "value", "");
                modifyFieldValue(this.homeLocation, "home_village", "displayNone", true);
                modifyFieldValue(this.homeLocation, "home_village", "value", "");
                if (event?.value?.district_id) this.setTA(event.value);
            }
            if (event.name == "home_traditional_authority") {
                modifyFieldValue(this.homeLocation, "home_village", "displayNone", true);
                modifyFieldValue(this.homeLocation, "home_village", "value", "");
                if (event?.value?.traditional_authority_id) this.setVillage(event.value);
            }
        },
        async setTA(obj: any) {
            const targetData = this.getTAs(obj.district_id);
            modifyFieldValue(this.homeLocation, "home_traditional_authority", "multiSelectData", targetData);
            modifyFieldValue(this.homeLocation, "home_traditional_authority", "displayNone", false);
        },
        async setVillage(obj: any) {
            const targetData = await this.getVillages(obj.traditional_authority_id);
            modifyFieldValue(this.homeLocation, "home_village", "multiSelectData", targetData);
            modifyFieldValue(this.homeLocation, "home_village", "displayNone", false);
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
