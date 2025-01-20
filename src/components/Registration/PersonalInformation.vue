<template>
    <basic-card
        :content="cardData"
        :editable="editable"
        @update:selected="handleInputData"
        @update:inputValue="handleInputData"
        @countryChanged="handleCountryChange"
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
import HisDate from "@/utils/Date";
import { getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";
import dayjs from "dayjs";
import { Service } from "@/services/service";
import Validation from "@/validations/StandardValidations";
import { validateInputFiledData } from "@/services/group_validation";
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
            initialPersonalData: [] as any,
            selectedCountry: [] as any,
        };
    },
    watch: {
        personInformation: {
            handler() {
                this.buildCards();
            },
            deep: true,
        },
        patient: {
            handler() {
                this.setData();
            },
            deep: true,
        },
    },
    props: {
        editable: {
            default: false as any,
        },
    },
    computed: {
        ...mapState(useRegistrationStore, ["personInformation"]),
        ...mapState(useRegistrationStore, ["guardianInformation"]),
        ...mapState(useDemographicsStore, ["patient"]),
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
        this.buildCards();
        this.setData();
    },

    methods: {
        setData() {
            if (this.editable) {
                modifyFieldValue(this.personInformation, "firstname", "value", this.patient?.personInformation?.given_name);
                modifyFieldValue(this.personInformation, "middleName", "value", this.patient.personInformation.middle_name);
                modifyFieldValue(this.personInformation, "lastname", "value", this.patient.personInformation.family_name);
                modifyFieldValue(this.personInformation, "birthdate", "value", this.patient.personInformation.birthdate);
                modifyRadioValue(this.personInformation, "gender", "selectedValue", this.patient.personInformation.gender);
                modifyFieldValue(this.personInformation, "phoneNumber", "value", this.getPhoneNumber());
            }
        },
        getPhoneNumber() {
            let attribute = this.patient.personInformation.cell_phone_number;
            if (attribute) {
                if (attribute.value.includes("+")) {
                    if (this.selectedCountry.dialCode) {
                        return attribute.value.split(this.selectedCountry.dialCode)[1];
                    } else {
                        return attribute.value.split("265")[1];
                    }
                } else if (attribute.value.startsWith("08") || attribute.value.startsWith("09")) {
                    return attribute.value.substring(1);
                } else {
                    return attribute.value;
                }
            }
        },
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

        validationRules(event: any) {
            return validateField(this.personInformation, event.name, (this as any)[event.name]);
        },

        async handleInputData(event: any) {
            if (event?.col?.name == "Estimate Age" && event?.col?.checked) {
                modifyFieldValue(this.personInformation, "birthdate", "displayNone", true);
            } else if (event?.col?.name == "Estimate Age" && !event?.col?.checked) {
                modifyFieldValue(this.personInformation, "birthdate", "displayNone", false);
                modifyFieldValue(this.personInformation, "estimation", "displayNone", true);
            } else if (event.name == "phoneNumber") {
                const phone = `+${this.selectedCountry.dialCode}${event.value}`;
                const message = await Validation.validateMobilePhone(phone, this.selectedCountry);
                modifyFieldValue(this.personInformation, "phoneNumber", "alertsErrorMassage", "");
                if (!message.includes("+")) {
                    modifyFieldValue(this.personInformation, "phoneNumber", "alertsErrorMassage", message);
                } else {
                    modifyFieldValue(this.personInformation, "phoneNumber", "value", phone);
                }

                return true;
            }
            // Estimated age
            this.validationRules(event);
            this.calculateDoB(event);
            this.setGuardingInfo(event);
        },
        async handleCountryChange(country: any) {
            this.selectedCountry = country.event;
            this.personInformation[8].data.rowData[0].colData[0].alertsErrorMassage = "";
        },
        setGuardingFormRules(age: any) {
            if (age < 14) {
                modifyFieldValue(this.guardianInformation, "guardianFirstname", "inputHeader", "First name *");
                modifyFieldValue(this.guardianInformation, "guardianLastname", "inputHeader", "Last name *");
                modifyFieldValue(this.guardianInformation, "guardianFirstname", "validationFunctionName", "isName");
                modifyFieldValue(this.guardianInformation, "guardianLastname", "validationFunctionName", "isName");
                modifyFieldValue(this.guardianInformation, "relationship", "inputHeader", "Relationship to patient *");
                modifyFieldValue(this.guardianInformation, "relationship", "validationFunctionName", "isNameWithSlush");
            } else {
                modifyFieldValue(this.guardianInformation, "guardianFirstname", "inputHeader", "First name");
                modifyFieldValue(this.guardianInformation, "guardianLastname", "inputHeader", "Last name");
                modifyFieldValue(this.guardianInformation, "guardianFirstname", "validationFunctionName", "isNameEmpty");
                modifyFieldValue(this.guardianInformation, "guardianLastname", "validationFunctionName", "isNameEmpty");
                modifyFieldValue(this.guardianInformation, "relationship", "inputHeader", "Relationship to patient");
                modifyFieldValue(this.guardianInformation, "relationship", "validationFunctionName", "");
                modifyFieldValue(this.guardianInformation, "relationship", "alertsErrorMassage", "");
            }
            // validateInputFiledData(this.guardianInformation);
        },
        setGuardingInfo(event: any) {
            const updateGuardianInfo = (value: boolean) => modifyFieldValue(this.guardianInformation, "guardianNationalID", "displayNone", value);
            if (event.name == "birthdate" || event.inputHeader == "Estimated age") {
                HisDate.getAgeInYears(this.birthdate) < 14 ? updateGuardianInfo(false) : updateGuardianInfo(true);
                this.setGuardingFormRules(HisDate.getAgeInYears(this.birthdate));
                if (event.name == "birthdate") {
                    modifyFieldValue(this.personInformation, "estimation", "value", HisDate.getAgeInYears(event.value));
                    this.validationRules({ name: "estimation" });
                }
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
            if (this.personInformation[7].data.rowData[0].colData[0].value > 110) {
                this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = true;
                this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = "Estimated age is more than 110";
                return false;
            }
            if (!this.personInformation[7].data.rowData[0].colData[0].unitsData.value) {
                this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = true;
                this.personInformation[7].data.rowData[0].colData[0].alertsErrorMassage = "Estimation Units Required";
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
