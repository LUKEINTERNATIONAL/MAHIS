<template>
    <BasicPhoneInputField
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
        :eventType="'input'"
        :p_country="currentCountryObj"
        @update:phone="valueChange($event)"
        @countryChanged="countryChanged($event)"
        :popOverData="phone_properties.popOverData"
        @handleInnerActionBtnPropetiesFn="$emit('click:innerBtn', phone_properties)"
        :InnerActionBtnPropeties="phone_properties.InnerBtn"
    />
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent, ref, onMounted, watch } from "vue";
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
    props: {
        userPhone: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const currentCountry = ref(null) as any;
        const currentCountryObj = ref([{ dialCode: "265", iso2: "MW", name: "Malawi" }]) as any;
        const dialCode = ref('')
        const phoneNumber = ref('')
        const phone_properties = ref({
            inputHeader: "Phone number *",
            icon: icons.phone,
            value: "",
            name: "phoneNumber",
            InnerBtn: "" as any,
            popOverData: {
                filterData: false,
                data: [],
            },
        });

        watch(() => props.userPhone, (newValue) => {
            if (newValue !== undefined) {
                setUserPhone();
            }
        });

        const emit_validation = (valid = false, phone_value = null as any) => {
            emit("validateInput", {
                is_valid: valid,
                er_message: "Phone number must be exactly 9 or 10 digits",
                phone: phone_value,
            })
        };

        const valueChange = (event: string | any) => {
            let phone_value_string = event
            phone_value_string = phone_value_string.replace(/^0+/, '');
            
            if (phone_value_string.length > 10) {
                phone_value_string = phone_value_string.slice(0, 10);
                phone_properties.value.value = phone_value_string;
                emit_validation();
                return;
            }
            
            if (!/^\d+$/.test(phone_value_string)) {
                phone_properties.value.value = '';
                emit_validation();
                return;
            }
            
            if (phone_value_string.length !== 9 && phone_value_string.length !== 10) {
                phone_properties.value.value = phone_value_string;
                emit_validation();
                return;
            }
            
            phone_properties.value.value = phone_value_string;
            emit_validation(true, getPhone());
        }

        const getPhone = () => {
            if (currentCountry.value != null) {
                const dialCode = currentCountry.value.dialCode
                return '+'+dialCode+'-'+phone_properties.value.value
            } else {
                return ''
            }
        }

        const countryChanged = async (c: any) => {
            currentCountry.value = c;
            const message = await Validation.validateMobilePhone('', c);
            if (message.includes("Country not found")) {
                toastWarning(message);
            }
            valueChange(phone_properties.value.value)
            emit("countryChanged", {c});
        }

        const setUserPhone = () => {
            if (props.userPhone) {
                try {
                    const [dCode, pNumber] = props.userPhone.split('-')
                    
                    dialCode.value = dCode
                    phoneNumber.value = pNumber
                    
                    console.log("Dial Code:", dialCode.value)
                    console.log("Phone Number:", phoneNumber.value)

                    setCountryCode()
                } catch (error) {
                    console.error("Error parsing phone number:", error)
                }
            }
        }

        const setCountryCode = async () => {
            const country = await Validation.validateDialCode(dialCode.value)
            if (country != null) {
                currentCountryObj.value = country
                console.log(country)
            }
        }


        onMounted(async () => {
            setUserPhone()
        });

        return {
            phone_properties,
            countryChanged,
            valueChange,
            currentCountryObj,
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
    async mounted() {},
    methods: {

    },
});
</script>
