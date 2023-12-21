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

        <ion-label v-if="unit">{{ unit }}</ion-label>
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
    },
}
</script>

<style scoped>
.inputCSS {
    margin: 0px 5px;
}
</style>