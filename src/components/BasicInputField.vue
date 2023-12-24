<template>
    <h5 v-if="inputHeader">{{ inputHeader }}</h5>
    <ion-item class="input_item">
        <ion-label>
            <span v-if="icon" v-html="icon" class="selectedPatient"></span>
        </ion-label>
        <ion-input 
            @ionInput="handleInput" 
            fill="outline" 
            :value="inputValue"
            :placeholder="placeholder"
            :type = "inputType"
            @click="$emit('clicked:inputValue', $event)"
            v-if="eventType=='input'"
            >
        </ion-input>
        <ion-input 
            @ionBlur="handleBlur" 
            @click="$emit('clicked:inputValue', $event)"
            fill="outline" 
            :value="inputValue"
            :placeholder="placeholder"
            :type = "inputType"
            v-if="eventType=='blur'"
            >
        </ion-input>
        <ion-label v-if="unit">{{ unit }}</ion-label>
        <ion-label style="border-left: 1px solid #E6E6E6; padding-left: 10px;">
            <span v-if="iconRight" v-html="iconRight" class=""></span>
        </ion-label>
    </ion-item>
</template>

<script>
import { IonInput, IonItem } from "@ionic/vue";

export default {
    name: "HisFormElement",
    components: {
        IonInput,
        IonItem,
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
            default: "",
        },
        eventType: {
            type: String,
            default: "input",
        },

    },
     methods: {
        handleInput(event) {
            this.$emit("update:inputValue", event);
         },
         handleBlur(event) {
            this.$emit("update:inputValue", event);
         },
    },
}
</script>

<style scoped>
</style>