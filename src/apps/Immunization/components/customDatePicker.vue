<template>
    <div>
     <ion-row>
        <ion-col size="4">
            <span style="color: #636363; font-weight: 400; font-size: 14px; margin-left: 20px;">
                Pick visit date:
            </span>
        </ion-col>
        <ion-col class="picker-group" :key="loaded">
            <VueScrollPicker id="TId" @click="(args) => BVN('click', args)" :options="days" v-model="currentDay" :key="pickerKey('day')"/>
            <VueScrollPicker :options="months" v-model="currentMonth" :key="pickerKey('month')" />
            <VueScrollPicker :options="years" v-model="currentYear" :key="pickerKey('year')" />
        </ion-col>
     </ion-row>

    </div>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
      watch: {},
      name: "xxxComponent",
  });
  </script>
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { VueScrollPicker } from 'vue-scroll-picker'
  import {IonRow, IonCol} from "@ionic/vue";
  
  const currentYear = ref(new Date().getFullYear());
  const currentMonth = ref(1);
  const currentDay = ref(1);
  const loaded = ref(0)
  
  onMounted(() => {
    loaded.value++
    currentDay.value = 1
    currentYear.value = 2024
    currentMonth.value = 1
    triggerClickEvent()
  });
  
  const years = computed(() => {
    const currYear = new Date().getFullYear()
    const lastYear = 1980
    return Array.from({ length: currYear - lastYear + 1 }, (_, index) => lastYear + index).reverse()
  })
  
  const months = computed(() => {
    return [
      { name: 'Jan', value: 1 },
      { name: 'Feb', value: 2 },
      { name: 'Mar', value: 3 },
      { name: 'Apr', value: 4 },
      { name: 'May', value: 5 },
      { name: 'Jun', value: 6 },
      { name: 'Jul', value: 7 },
      { name: 'Aug', value: 8 },
      { name: 'Sep', value: 9 },
      { name: 'Oct', value: 10 },
      { name: 'Nov', value: 11 },
      { name: 'Dec', value: 12 }
    ];
  })
  
  const days = computed(() => {
    const lastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
    return Array.from({ length: lastDay }, (_, index) => index + 1)
  })
  
  function pickerKey(name: string) {
    return `${name}-${generateUniqueString()}`;
  }
  
  function generateUniqueString() {
    const timestamp = Date.now().toString(20);
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueString = '';
    for (let i = 0; i < timestamp.length; i++) {
      uniqueString += timestamp[i];
      const randomIndex = Math.floor(Math.random() * randomChars.length);
      uniqueString += randomChars[randomIndex];
    }
    return uniqueString;
  }
  
  function BVN(value: any, oldValue: any) {
    console.log(oldValue)
  }
  
  const triggerClickEvent = () => {
    const button = document.getElementById('TId');
    if (button) {
      button.click();
    }
  }
  </script>
  
  <style>
  .picker-group {
    display: flex;
    font-size: 25px;
  }
  .vue-scroll-picker {
    height: 6em !important;
  }

  .vue-scroll-picker .vue-scroll-picker-layer .vue-scroll-picker-layer-top {
    border-bottom: 1px solid #c8c7cc;
    background: transparent;
  }
  .vue-scroll-picker .vue-scroll-picker-layer .vue-scroll-picker-layer-bottom {
    border-bottom: 0px solid #c8c7cc;
    background: transparent;
  }
  </style>
  