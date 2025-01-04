<template>
  <ion-footer :translucent="true" class="ion-no-border">
    <div class="button-container">
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
            default: "Save and end visit",
        },
    },
    methods: {},
});
</script>

<style scoped>
.button-container {
  float: left;
  margin-left: 38%;
}

@media (max-width: 1024px) {
  .button-container {
    margin-left: 9%;
  }
}
</style>
