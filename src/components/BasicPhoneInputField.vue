<template>
    <h6 v-if="inputHeader" :class="bold">{{ removeAsterisk(inputHeader) }} <span style="color: red" v-if="showAsterisk"> *</span></h6>
    <div class="" :style="'width:' + inputWidth">
        <vue-tel-input
            class="custom"
            v-if="input == 'input'"
            @onInput="handleInput"
            @onBlur="handleBlur"
            @click="handleClick"
            fill="outline"
            v-model="phone"
            :placeholder="placeholder"
            :type="inputType"
            :disabled="disabled"
            :preferredCountries="['mw']"
            :defaultCountry="'mw'"
            :inputOptions="{ showDialCode: true }"
            mode="international"
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
            phone: "" as any,
            options: {} as any,
            selectedText: "" as any,
            filteredData: [] as any,
            showAsterisk: false,
        };
    },

    props: {
        placeholder: {
            type: String,
            default: "",
        },
        inputValue: {
            type: String,
            default: "mmmm",
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
    },
    methods: {
        handleClick(event: any) {
            // if (this.popOverData?.data) this.setEvent(event);
            this.$emit("clicked:inputValue", event);
        },
        handlePassInput() {
            this.$emit("update:passedinputValue", this.$props.inputValue);
        },
        handleInput(event: any) {
            if (this.popOverData?.data) this.setEvent(event);
            this.$emit("update:inputValue", event);
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
</style>
