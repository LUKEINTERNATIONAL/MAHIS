<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div class="relative">
          <ion-input
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @ionInput="updateValue($event)"
            class="custom-input"
          ></ion-input>
          <span v-if="icon" class="icon-wrapper">
            <component :is="icon" class="input-icon"></component>
          </span>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonContent, IonPage, IonInput } from '@ionic/vue';
  
  export default defineComponent({
    name: 'BasicInputField',
    components: { IonContent, IonPage, IonInput, },
    props: {
      modelValue: String,
      placeholder: String,
      icon: [Object, Function],
      type: {
        type: String,
        default: 'text'
      }
    },
    emits: ['update:modelValue'],
    methods: {
      updateValue(event: CustomEvent) {
        this.$emit('update:modelValue', event.detail.value);
      }
    }
  });
  </script>
  
  <style scoped>
  ::v-deep(ion-content) {
    --background: white;
  }
  
  .custom-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
  }
  
  .custom-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
  
  .icon-wrapper {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
  
  .input-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #9ca3af;
  }
  </style>