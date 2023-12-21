<template>
    <h5 v-if="inputHeader">{{ inputHeader }}</h5>
    <ion-item :class="{ 'inputCSS': applyStyling }" class="input_item">
        <ion-input 
            :class="{ 'inputCSS': applyStyling }"
            :id="id" 
            :value="inputValue"
            @click="$emit('clicked:inputValue', $event)"
            @ionInput="$emit('update:inputValue', $event)" 
            fill="outline" 
            :placeholder="placeholder"
            >
            <slot></slot>
        </ion-input>
        <ion-label>
            <span v-if="icon" v-html="icon" class="selectedPatient"></span>
        </ion-label>
        <ion-input 
            @ionInput="handleInput" 
            fill="outline" 
            :value="inputValue"
            :placeholder="placeholder"
            :type = "inputType"
            >
        </ion-input>
        <ion-label v-if="unit">{{ unit }}</ion-label>
        <ion-label style="border-left: 1px solid #E6E6E6; padding-left: 10px;">
            <span v-if="iconRight" v-html="iconRight" class=""></span>
        </ion-label>
    </ion-item>
</template>

<script lang="ts">
import { IonInput, IonItem } from "@ionic/vue";

export default {
    name: "HisFormElement",
    components: {
        IonInput,
        IonItem,
    },
    props: {
        id: {
            type: String,
            default: "",
        },
        applyStyling: {
            type: Boolean,
            default: false
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
            default: ""
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
            type: String,
            default: "text",
        },

    },
     methods: {
        handleInput(event: any) {
            this.$emit("update:inputValue", event);
         },
    },
}
</script>

<style scoped>
</style>