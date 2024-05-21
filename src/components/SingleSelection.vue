<template>
    <h6 v-if="inputHeader" :class="bold">{{ removeAsterisk(inputHeader) }} <span style="color: red" v-if="showAsterisk"> *</span></h6>
    <div class="" :style="'width:' + inputWidth">
        <VueMultiselect
            :multiple="true"
            :taggable="true"
            :hide-selected="true"
            :close-on-select="false"
            :openDirection="'bottom'"
            tag-placeholder=""
            placeholder=""
            selectLabel=""
            label="name"
            :searchable="true"
            @search-change="$emit('search-change', $event)"
            :options="multiSelectData"
        />
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
import { defineComponent } from "vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import { caretDownSharp } from "ionicons/icons";
import { size } from "lodash";
import VueMultiselect from "vue-multiselect";

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

    setup() {
        return { caretDownSharp };
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
            default: "" as any,
        },
        multiSelectData: {
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
