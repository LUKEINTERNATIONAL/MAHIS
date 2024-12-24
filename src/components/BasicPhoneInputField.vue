<template>
    <h6 v-if="inputHeader" :class="bold">{{ removeAsterisk(inputHeader) }} <span style="color: red" v-if="showAsterisk"> *</span></h6>
    <div class="" :style="'width:' + inputWidth">
        <vue-tel-input
            class="custom"
            v-if="input == 'input'"
            @input="handleInput"
            @onBlur="handleBlur"
            @click="handleClick"
            fill="outline"
            v-model="phone"
            v-on:country-changed="handleCountryChanged"
            :placeholder="placeholder"
            :type="inputType"
            :disabled="disabled"
            :preferredCountries="[country?.[0]?.iso2 || 'MW']"
            :defaultCountry="country?.[0]?.iso2 || 'MW'"
            :initialCountry="country?.[0]?.iso2 || 'MW'"
            :inputOptions="{ showDialCode: true, placeholder: 'Enter a phone number' }"
            :dropdownOptions="{
                showDialCodeInSelection: true,
                showSearchBox: true,
                showFlags: true,
                showDialCodeInList: true,
                searchBoxPlaceholder: 'Search here...',
            }"
            mode="international"
            :autoFormat="false"
        >
        </vue-tel-input>
    </div>
    <SelectionPopover
        v-if="eventType === 'input' || eventType === 'blur'"
        :content="filteredData"
        :popoverOpen="popoverOpen"
        @closePopoover="popoverOpen = $event"
        :event="event"
        @setSelection="$emit('setPopoverValue', $event)"
    />
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonIcon, IonTitle, IonToolbar, IonMenu, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, watch } from "vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import { caretDownSharp } from "ionicons/icons";
import { VueTelInput } from "vue-tel-input";
import { size } from "lodash";
import "vue-tel-input/vue-tel-input.css";
export default defineComponent({
    name: "HisFormElement",
    components: {
        IonInput,
        IonItem,
        SelectionPopover,
        IonPopover,
        IonIcon,
        VueTelInput,
    },
    data() {
        return {
            displayList: [] as any,
            popoverOpen: false,
            event: "" as any,
            phone: this.inputValue || ("" as any),
            options: {} as any,
            selectedText: "" as any,
            filteredData: [] as any,
            showAsterisk: false,
            country: [{ dialCode: "265", iso2: "MW", name: "Malawi" }] as any,
        };
    },
    watch: {
        p_country: {
            immediate: true,
            async handler(data) {
                this.country = [data];
            },
            deep: true,
        },
    },

    mounted() {
        if (this.p_country?.[0]?.iso2) {
            this.country = this.p_country;
        }
        this.phone = this.inputValue || "";
    },

    props: {
        placeholder: {
            type: String,
            default: "",
        },
        inputValue: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        unit: {
            type: String,
            default: "",
        },
        leftText: {
            type: String,
            default: "",
        },
        inputHeader: {
            type: String,
            default: "",
        },
        iconRight: {
            type: String,
            default: "",
        },
        bold: {
            type: String,
            default: "",
        },
        inputType: {
            default: "text" as any,
        },
        eventType: {
            type: String,
            default: "input",
        },
        popOverData: {
            default: [] as any,
        },
        inputWidth: {
            default: "",
        },
        input: {
            default: "input",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        InnerActionBtnPropeties: {
            default: {
                name: "provide name",
                show: false,
            },
        },
        p_country: {
            type: Array,
            default: () => [{ dialCode: "265", iso2: "MW", name: "Malawi" }],
        },
    },
    methods: {
        handleCountryChanged(country: any) {
            this.country = country;
            this.$emit("countryChanged", this.country);
        },
        handleClick(event: any) {
            // if (this.popOverData?.data) this.setEvent(event);
            this.$emit("clicked:inputValue", event);
        },
        handlePassInput() {
            this.$emit("update:passedinputValue", this.$props.inputValue);
        },
        handleInput(event: any) {
            //if (this.popOverData?.data) this.setEvent(event);
            this.$emit("update:inputValue", event);
            this.$emit("update:phone", this.phone)
        },
        handleBlur(event: any) {
            this.$emit("update:inputValue", event);
            this.$emit("ionBlur", event);
        },
        setEvent(event: Event) {
            this.event = event;
            this.searchInput(event);
        },
        async searchInput(event: any) {
            this.popoverOpen = true;
            if (this.popOverData.filterData)
                this.filteredData = this.popOverData.data.filter((item: any) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
            else this.filteredData = this.popOverData.data;
        },
        handleInnerActionBtnPropetiesFn(event: any) {
            this.$emit("update:InnerActionBtnPropetiesAction", event);
        },
        removeAsterisk(str: any) {
            if (str.includes("*")) {
                this.showAsterisk = true;
                return str.replace(/\*/g, "");
            }
            this.showAsterisk = false;
            return str;
        },
    },
    setup(props, { emit }) {
        watch(
            () => props.inputValue,
            (newValue, oldValue) => {
                emit("update:passedinputValue", props.inputValue);
            }
        );
        return { caretDownSharp };
    },
});
</script>

<style scoped>
h6 {
    margin-top: 0px;
}
.left-text {
    font-size: 15px;
    padding-left: 10px;
    color: #b4b0b0;
    width: 95px;
}
.custom {
    --background: #fff;
}
.custom >>> .vti__input {
    background-color: #f0f0f0;
}
</style>
