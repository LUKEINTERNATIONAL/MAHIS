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
            >
        </ion-input>
        <ion-label v-if="unit">{{ unit }}</ion-label>
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

    },
     methods: {
        handleInput(event) {
            this.$emit("update:inputValue", event.target.value);
         },
    },
}
</script>

<style scoped></style>