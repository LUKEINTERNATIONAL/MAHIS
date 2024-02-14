<template>
  <div v-if="isLoading" class="spinner-container">
    <img :src="spinnerImagePath" class="spinner-image" alt="Loading Spinner">
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    spinnerImagePath: {
      type: String,
      default: 'apps/ANC/public/1494.gif', // path to spinner
    },
  },
});
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner-image {
  width: 50px; /* Adjust the width and height as needed */
  height: 50px;
}
</style>
