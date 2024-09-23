<template>
    <div>
      <component :is="dynamicComponent" />
    </div>
  </template>
  
  <script setup>
  defineProps({
    dynamicComponent: {
      type: Object,
      required: true
    }
  });
  </script>