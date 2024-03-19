<template>
    <h6 v-if="inputHeader">{{ inputHeader }}</h6>
    <ion-item class="input_item" :style="'width:' + inputWidth">
        <ion-label style="display: flex">
            <span v-if="icon" v-html="icon" class="selectedPatient"></span>
            <span v-if="leftText" class="left-text"> {{ leftText }}</span>
        </ion-label>
        <ion-input
            @ionInput="handleInput"
            @ionBlur="handleBlur"
            @click="$emit('clicked:inputValue', $event)"
            fill="outline"
            :value="inputValue"
            :placeholder="placeholder"
            :type="inputType"
            :disabled="disabled"
        />
        <ion-label
            v-if="unit || iconRight"
            style="border-left: 1px solid #e6e6e6; padding-left: 10px"
        >
            <span v-if="iconRight" v-html="iconRight"></span>
            <span v-if="unit">{{ unit }}</span>
        </ion-label>
    </ion-item>
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
import { IonInput, IonItem } from "@ionic/vue";
import { defineComponent } from "vue";
import SelectionPopover from "@/components/SelectionPopover.vue";

export default defineComponent({
    name: "HisFormElement",
    components: {
        IonInput,
        IonItem,
        SelectionPopover,
    },
    data() {
        return {
            displayList: [] as any,
            popoverOpen: false,
            event: "" as any,
            selectedText: "" as any,
            filteredData: [] as any,
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
        disabled: {
            type: Boolean,
            default: false,
        }
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
                this.filteredData = this.popOverData.data.filter((item: any) =>
                    item.name.toLowerCase().includes(event.target.value.toLowerCase())
                );
            else this.filteredData = this.popOverData.data;
        },
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
</style>
