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
import { modifyFieldValue, getFieldValue, getRadioSelectedValue, getCheckboxSelectedValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";
import AddTA from "@/components/Registration/Modal/AddTA.vue";
import AddVillage from "@/components/Registration/Modal/AddVillage.vue";
import Districts from "@/views/Mixin/SetDistricts.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useGeneralStore } from "@/stores/GeneralStore";

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
        ...mapState(useRegistrationStore, ["currentLocation", "country"]),
        ...mapState(useDemographicsStore, ["patient"]),
        selected_country() {
            return getFieldValue(this.country, "country", "value")?.name;
        },
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
        countriesList: {
            handler() {
                if (this.countriesList.length > 0) modifyFieldValue(this.country, "country", "multiSelectData", this.countriesList);
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
            this.setSelectedCountry();
            if (this.editable) {
                modifyFieldValue(this.country, "country", "value", {
                    name: "Malawi",
                    district_id: "",
                });
            }
        },
        setSelectedCountry() {
            useGeneralStore().setRegSelectedCountry(this.selected_country);
            if (this.selected_country === "Malawi") {
                const registration = useRegistrationStore();
                registration.setHomeLocation(registration.getInitialHomeLocation());
                registration.setCurrentLocation(registration.getInitialCurrentLocation());
            }
        },
        async buildCards() {
            this.cardData = {
                mainTitle: "Demographics",
                cards: [
                    {
                        cardTitle: "Country",
                        content: this.country,
                    },
                ],
            };
        },

        async handleInputData(event: any) {
            this.setSelectedCountry();
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
