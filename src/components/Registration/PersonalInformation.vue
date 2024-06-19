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
import HisDate from "@/utils/Date";
import { getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";
import dayjs from "dayjs";
import { Service } from "@/services/service";
import { calculator } from "ionicons/icons";
import Validation from "@/validations/StandardValidations";

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
            initialPersonalData: [] as any,
        };
    },
    watch: {
        personInformation: {
            handler() {
                this.buildCards();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useRegistrationStore, ["personInformation"]),
        ...mapState(useRegistrationStore, ["guardianInformation"]),
        nationalID() {
            return getFieldValue(this.personInformation, "nationalID", "value");
        },
        firstname() {
            return getFieldValue(this.personInformation, "firstname", "value");
        },
        estimation() {
            return getFieldValue(this.personInformation, "estimation", "value");
        },
        lastname() {
            return getFieldValue(this.personInformation, "lastname", "value");
        },
        middleName() {
            return getFieldValue(this.personInformation, "middleName", "value");
        },
        gender() {
            return getRadioSelectedValue(this.personInformation, "gender");
        },
        birthdate() {
            return HisDate.toStandardHisFormat(getFieldValue(this.personInformation, "birthdate", "value"));
        },
        birthdateEstimated() {
            return "false";
        },
        phoneNumber() {
            return getFieldValue(this.personInformation, "phoneNumber", "value");
        },
    },
    async mounted() {
        this.updateRegistrationStores();
        this.buildCards();
    },

    methods: {
        buildCards() {
            const personalInformation = useRegistrationStore();
            this.cardData = {
                mainTitle: "Demographics",
                cards: [
                    {
                        cardTitle: "Personal information",
                        content: this.personInformation,
                        initialData: personalInformation.getInitialPersonalInformation(),
                    },
                ],
            };
        },
        openModal() {
            createModal(DispositionModal);
        },
        async updateRegistrationStores() {
            const registrationStore = useRegistrationStore();
            registrationStore.setPersonalInformation(this.personInformation);
        },

        validationRules(event: any) {
            return validateField(this.personInformation, event.name, (this as any)[event.name]);
        },

        async handleInputData(event: any) {
            if (event?.col?.name == "Estimate Age" && !event?.col?.checked) {
                modifyFieldValue(this.personInformation, "estimation", "displayNone", true);
            } else {
                // modifyFieldValue(this.personInformation,'birthdate','disabled',true)
            }
            // Estimated age
            this.validationRules(event);
            this.calculateDoB(event);
            this.calculateAge(event);
        },
        calculateAge(event: any) {
            const updateGuardianInfo = (value: boolean) => modifyFieldValue(this.guardianInformation, "guardianNationalID", "displayNone", value);
            if (event.name == "birthdate") {
                HisDate.getAgeInYears(event.value) < 17 ? updateGuardianInfo(false) : updateGuardianInfo(true);

                modifyFieldValue(this.personInformation, "estimation", "value", HisDate.getAgeInYears(event.value));
                this.validationRules({ name: "estimation" });
            }
            if (event.inputHeader == "Estimated age") {
                event.value < 17 ? updateGuardianInfo(false) : updateGuardianInfo(true);
            }
        },
        calculateDoB(event: any) {
            if (event?.name == "estimation") {
                this.validateDuration();
                const unit = event?.unitsData?.value?.name || event?.unitsData?.value;
                const value = event?.value as number;
                // Check for age calculation (negative years)
                const isCalculatingAge = unit === "Years" && value < 0;

                let sessionDate = dayjs(Service.getSessionDate());

                if (isCalculatingAge) {
                    // Calculate age in positive years and handle potential overflow
                    try {
                        sessionDate = sessionDate.add(Math.abs(value), "years");
                    } catch (error) {
                        console.error("Error adding years:", error);
                        return null;
                    }
                } else {
                    // Existing logic for subtracting units
                    switch (unit) {
                        case "Days":
                            sessionDate = sessionDate.subtract(value, "days");
                            break;
                        case "Months":
                            sessionDate = sessionDate.subtract(value, "months");
                            break;
                        case "Years":
                            sessionDate = sessionDate.subtract(value, "years");
                            break;
                        default:
                            return null; // Invalid unit
                    }
                }

                const formattedDate = HisDate.toStandardHisDisplayFormat(sessionDate.format("YYYY-MM-DD"));
                modifyFieldValue(this.personInformation, "birthdate", "value", formattedDate);
                return formattedDate;
            } else {
                return null;
            }
        },
        validateDuration() {
            this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = false;
            this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = "";
            if (!this.personInformation[7].data.rowData[0].colData[0].unitsData.value) {
                this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = true;
                this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = "Duration Units Required";
                return false;
            }

            if (
                Validation.isNumber(this.personInformation[7].data.rowData[0].colData[0].value) == null &&
                this.personInformation[7].data.rowData[0].colData[0].value != ""
            ) {
                return true;
            } else {
                this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = true;
                this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = " Value must be a number";
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
