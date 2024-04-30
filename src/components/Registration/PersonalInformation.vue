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
import { getFieldValue, getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";
import dayjs from "dayjs";
import { Service } from "@/services/service";
import { calculator } from "ionicons/icons";

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
    mounted() {
        this.updateRegistrationStores();
        this.buidCards();
    },

    methods: {
        buidCards() {
            const personalInformation = useRegistrationStore();
            console.log("🚀 ~ buidCards ~ personInformation tttttt:", this.personInformation);
            console.log("🚀 ~ buidCards ~ personalInformation:", personalInformation.getInitialPersonalInformation());
            personalInformation.$reset();
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
        updateRegistrationStores() {
            const registrationStore = useRegistrationStore();
            registrationStore.setPersonalInformation(this.personInformation);
        },

        validationRules(event: any) {
            return validateField(this.personInformation, event.name, (this as any)[event.name]);
        },

        async handleInputData(event: any) {
            // console.log("🚀 ~ handleInputData ~ event:", event);
            if (event.name == "Estimate Age") {
            }

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
        },
        calculateDoB(event: any) {
            if (event.name == "estimation") {
                const year = dayjs(Service.getSessionDate())
                    .subtract(event.value as number, "years")
                    .year();
                modifyFieldValue(this.personInformation, "birthdate", "value", HisDate.toStandardHisDisplayFormat(`${year}-06-15`));
                return `${year}-06-15`;
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
