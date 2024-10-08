<template>
    <h6 v-if="inputHeader" :class="bold">{{ removeAsterisk(inputHeader) }} <span style="color: red" v-if="showAsterisk"> *</span></h6>
    <div class="" :style="'width:' + inputWidth">
        <ion-input
            v-if="input == 'input'"
            @ionInput="handleInput"
            @ionBlur="handleBlur"
            @click="handleClick"
            fill="outline"
            :value="inputValue"
            :placeholder="placeholder"
            :type="inputType"
            :disabled="disabled"
            class="custom"
            :style="{ minHeight: minHeight + 'px' }"
        >
            <ion-label v-if="InnerActionBtnPropeties.show" style="display: flex" slot="end">
                <ion-button slot="end" @click="handleInnerActionBtnPropetiesFn">{{ InnerActionBtnPropeties.name }}</ion-button>
            </ion-label>

            <ion-label style="display: flex" slot="start">
                <ion-icon v-if="icon" :icon="icon" aria-hidden="true"></ion-icon>
                <span v-if="leftText" class="left-text"> {{ leftText }}</span>
            </ion-label>

            <ion-label v-if="unit || iconRight" slot="end" style="border-left: 1px solid #e6e6e6; padding-left: 10px">
                <ion-icon v-if="iconRight" :icon="iconRight" aria-hidden="true"></ion-icon>
                <span v-if="unit">{{ unit }}</span>
            </ion-label>
        </ion-input>
        <ion-textarea
            v-if="input == 'textArea'"
            :disabled="disabled"
            @ionInput="handleInput"
            @ionBlur="handleBlur"
            @click="handleClick"
            class="custom"
            :placeholder="placeholder"
            :auto-grow="true"
            fill="outline"
        >
            <ion-label style="display: flex" slot="start">
                <ion-icon v-if="icon" :icon="icon" aria-hidden="true"></ion-icon>
                <span v-if="leftText" class="left-text"> {{ leftText }}</span>
            </ion-label>
            <ion-label v-if="unit || iconRight" slot="end" style="border-left: 1px solid #e6e6e6; padding-left: 10px">
                <ion-icon v-if="iconRight" :icon="iconRight" aria-hidden="true"></ion-icon>
                <span v-if="unit">{{ unit }}</span>
            </ion-label>
        </ion-textarea>
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
import { size } from "lodash";

export default defineComponent({
    name: "HisFormElement",
    components: {
        IonInput,
        IonItem,
        SelectionPopover,
        IonPopover,
        IonIcon,
    },
    data() {
        return {
            displayList: [] as any,
            popoverOpen: false,
            event: "" as any,
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
        minHeight: {
            type: [String, Number],
            default: "",
        }
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
    --custom-min-height: 56px; /* Default min-height */
    min-height: var(--custom-min-height);
}
</style>
