<template>
    <ion-footer :translucent="true" class="ion-no-border">
        <div style="float: right; margin-right: 20px">
            <DynamicButton :name="name" iconSlot="end" @click="$emit('finishBtn')" />
        </div>
    </ion-footer>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonFooter } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import DynamicButton from "@/components/DynamicButton.vue";
export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonFooter,
        DynamicButton,
    },
    data() {
        return {};
    },
    props: {
        status: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            default: "Finish and Save",
        },
    },
    methods: {},
});
</script>

<style scoped></style>
