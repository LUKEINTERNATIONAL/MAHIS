<template>
    <BasicPhoneInputField
        v-if="phone_properties.isPhoneInput"
        :inputHeader="phone_properties.inputHeader"
        :sectionHeaderFontWeight="'20'"
        :bold="''"
        :unit="''"
        :input="'input'"
        :disabled="false"
        :icon="phone_properties.icon"
        :placeholder="'Enter phone'"
        :iconRight="''"
        :leftText="''"
        :inputWidth="'100%'"
        :inputValue="phone_properties.value"
        :eventType="phone_properties.eventType"
        @update:inputValue="valueChange($event)"
        @countryChanged="countryChanged($event)"
        :popOverData="phone_properties.popOverData"
        @handleInnerActionBtnPropetiesFn="$emit('click:innerBtn', phone_properties)"
        :InnerActionBtnPropeties="phone_properties.InnerBtn"
    />
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import BasicPhoneInputField from "@/components/BasicPhoneInputField.vue";
import { icons } from "@/utils/svg";
import Validation from "@/validations/StandardValidations";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";

import SetUser from "@/views/Mixin/SetUser.vue";
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonToolbar,
        IonRow,
        BasicPhoneInputField
    },
    setup(props, { emit }) {
        const currentCountry = ref()
        const  phone_properties = ref({
            inputHeader: "Phone number",
            icon: icons.phone,
            value: "",
            name: "phoneNumber",
            isPhoneInput: true,
            eventType: "input",
            alertsErrorMassage: "",
            required: true,
            iconRight: "",
            InnerBtn: "" as any,
            popOverData: {
                filterData: false,
                data: [],
            },
        })

        const valueChange = (event: any) => {
            console.log("phone_properties: ",phone_properties.value)
            // Remove all non-numeric characters
            let phone_value_string = event.target.value.replace(/\D/g, '');
            
            // Remove leading zeros
            phone_value_string = phone_value_string.replace(/^0+/, '');
            
            // Strictly limit to 9 or 10 digits
            if (phone_value_string.length > 10) {
                // Truncate to 10 digits if longer
                phone_value_string = phone_value_string.slice(0, 10);
                console.error('Phone number must be exactly 9 or 10 digits');
            }
            
            // Validate length (exactly 9 or 10 digits)
            if (phone_value_string.length !== 9 && phone_value_string.length !== 10) {
                console.error('Phone number must be exactly 9 or 10 digits');
                // Optional: Set an error state or handle invalid input
                return;
            }
            
            console.log('Validated phone number:', phone_value_string);
            
            // Optional: Update the input value with cleaned number
            phone_properties.value.value = phone_value_string;
            
            // Additional actions like further validation or storage can be added here
        }

        const countryChanged = async (c: any) => {
            currentCountry.value = c;
            const message = await Validation.validateMobilePhone('', c);
            if (message.includes("Country not found")) {
                toastWarning(message);
            }
            emit("countryChanged", {c});
        }
        

        return {
            phone_properties,
            countryChanged,
            valueChange,
    };
  },
    data() {

        return {
            icons,
        };
    },
    computed: {

    },
    $route: {
        async handler() {},
        deep: true,
    },
    watch: {

    },
    async mounted() {
        
    },
    methods: {

    },
});
</script>
