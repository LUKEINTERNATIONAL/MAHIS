<template>
    <h6 v-if="inputHeader">{{ removeAsterisk(inputHeader) }} <span style="color: red" v-if="showAsterisk"> *</span></h6>
    <VueDatePicker
        @date-update="$emit('update:dateValue', formatDate($event))"
        auto-apply
        :flow="flow"
        vertical
        :enable-time-picker="false"
        :auto-position="true"
        :min-date="minDate"
        :max-date="maxDate"
        prevent-min-max-navigation
        :teleport="true"
    >
        <template #trigger>
            <div class="" :style="'width:' + inputWidth">
                <ion-input
                    @ionInput="handleInput"
                    @ionBlur="handleBlur"
                    @click="$emit('clicked:inputValue', $event)"
                    fill="outline"
                    :value="inputValue"
                    :placeholder="placeholder"
                    :type="inputType"
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
            </div>
        </template>
    </VueDatePicker>
</template>

<script lang="ts">
import { IonInput, IonItem } from "@ionic/vue";
import { defineComponent } from "vue";
import HisDate from "@/utils/Date";

export default defineComponent({
    name: "HisFormElement",
    components: {
        IonInput,
        IonItem,
    },
    data() {
        return {
            bold: "text-bold",
            displayList: [] as any,
            popoverOpen: false,
            event: "" as any,
            selectedText: "" as any,
            filteredData: [] as any,
            flow: ["year", "month", "calendar"],
            showAsterisk: false,
        };
    },
    props: {
        minDate: {
            type: String,
            default: "",
        },
        maxDate: {
            type: String,
            default: HisDate.currentDate(),
        },
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
        inputHeader: {
            type: String,
            default: "",
        },
        iconRight: {
            type: String,
            default: "",
        },
        inputType: {
            default: "" as any,
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
        InnerActionBtnPropeties: {
            default: {
                name: "provide name",
                show: false,
            },
        },
        leftText: {
            type: String,
            default: "",
        },
        bold: {
            type: String,
            default: "",
        },
    },
    methods: {
        handleInput(event: any) {
            if (this.popOverData?.data) this.setEvent(event);
            this.$emit("update:inputValue", event);
        },
        handleBlur(event: any) {
            this.$emit("update:inputValue", event);
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
        formatDate(date: any) {
            return HisDate.toStandardHisDisplayFormat(date);
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
});
</script>

<style scoped>
h6 {
    margin-top: 0px;
}
.text-bold {
    font-weight: bold;
}
</style>
