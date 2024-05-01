<template>
    <v-select label="label" :options="options.options" v-model="selectedOption"></v-select>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    name: "sselectionlist",
})
</script>
<script setup lang="ts">
import "vue-select/dist/vue-select.css";
import { ref, watch, computed, onMounted, onUpdated } from "vue"

const selectedOption = ref(null)
const placeholder = ref('iwe')
const options = ref({
    'label': placeholder,    
    options:[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
                
            ]})

</script>
<style scoped>
    .dropdown-custom {
    --vs-controls-color: #664cc3;
    --vs-border-color: #664cc3;

    --vs-dropdown-bg: #282c34;
    --vs-dropdown-color: #cc99cd;
    --vs-dropdown-option-color: #cc99cd;

    --vs-selected-bg: #664cc3;
    --vs-selected-color: #eeeeee;

    --vs-search-input-color: #eeeeee;

    --vs-dropdown-option--active-bg: #664cc3;
    --vs-dropdown-option--active-color: #eeeeee;
    }
</style>
