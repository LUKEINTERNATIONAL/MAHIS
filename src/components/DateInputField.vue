<template>
    <h6 v-if="inputHeader">{{ inputHeader }}</h6>
    <VueDatePicker  
        @date-update="event => {$emit('update:dateValue', formatDate(event)); }"
        auto-apply 
        :flow="flow"  
        vertical
        :enable-time-picker="false" 
        :auto-position="true"
       >
          <template #trigger >
              <ion-item class="input_item" :style="'width:'+inputWidth">
                  <ion-label>
                      <span v-if="icon" v-html="icon" class="selectedPatient"></span>
                  </ion-label>
                  <ion-input 
                      @ionInput="handleInput" 
                      @ionBlur="handleBlur" 
                      @click="$emit('clicked:inputValue', $event)"
                      fill="outline" 
                      :value="inputValue"
                      :placeholder="placeholder"
                      :type="inputType"
                  />
                  <ion-label v-if="unit || iconRight" style="border-left: 1px solid #E6E6E6; padding-left: 10px;">
                      <span v-if="iconRight" v-html="iconRight"></span>
                      <span v-if="unit">{{ unit }}</span>
                  </ion-label>
              </ion-item>
          </template>
  </VueDatePicker>
</template>

<script lang="ts">
import { IonInput, IonItem } from "@ionic/vue";
import { defineComponent } from 'vue';
import HisDate from "@/utils/Date";

export default defineComponent({
  name: "HisFormElement",
  components: {
      IonInput,
      IonItem,
  },
  data() {
      return {
          displayList: [] as any,
          popoverOpen: false,
          event: '' as any,
          selectedText: '' as any,
          filteredData: [] as any,
          flow: ['month', 'year', 'calendar'],
      };
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
          default: "" as any,
      },
      eventType: {
          type: String,
          default: "input",
      },
      popOverData:{
          default: [] as any
      },
      inputWidth:{
          default: ''
      }

  },
   methods: {
      handleInput(event: any) {
          if(this.popOverData?.data) this.setEvent(event)
          this.$emit("update:inputValue", event);
       },
       handleBlur(event: any) {
          this.$emit("update:inputValue", event);
       },
      setEvent(event: Event){
          this.event = event
          this.searchInput(event)
      },
      async searchInput(event: any) {
          this.popoverOpen = true;
          if(this.popOverData.filterData)
              this.filteredData = this.popOverData.data.filter((item: any) => item.name.toLowerCase().includes(event.target.value.toLowerCase()))
          else
              this.filteredData = this.popOverData.data
      },
      formatDate(date: any){
           return HisDate.toStandardHisDisplayFormat(date)
        },
     
  }
})
</script>

<style scoped>
h6{
  margin-top: 0px;
}
</style>