<template>
    <v-select label="label" :options="options.options" calculate-position="'top'" v-model="selectedOption"/>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    name: "sselectionlist",
})
</script>
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUpdated } from "vue"

const selectedOption = ref(null)
const placeholder = ref('MF')

const props = defineProps<{
    labels: any,
    selectedOpt: any,
}>()

const emit = defineEmits<{
    (e: "selectionEvent", ObjectsArray: any): void
}>()

function selectionEvent() {
    emit("selectionEvent", selectedOption.value)
}

const options = ref({
    'label': placeholder,    
    options:[] as any
})

onMounted(async () => {
    populateOptions()
    selectedOption.value = props.selectedOpt
})

watch(
    () => props.labels,
    async (newValue) => {
        populateOptions()
    }
)

watch(
    () => props.selectedOpt,
    async (newValue) => {
        console.log(newValue)
        selectedOption.value = newValue
    }
)

watch(
    () => selectedOption.value,
    async (newValue) => {
        selectionEvent()
    }
)

function populateOptions() {
    props.labels.forEach((label: any, index: number) => {
        const option_value = 'option_'+(index++)
        const option = { value: option_value, label: label }
        options.value.options.push(option)
    })
}

</script>
<style scoped>
    .dropdown-custom {
    --vs-controls-color: #664cc3;
    --vs-border-color: #664cc3;

    --vs-dropdown-bg: #282c34;
    --vs-dropdown-color:  #282c34;
    --vs-dropdown-option-color:  #282c34;

    --vs-selected-bg: #664cc3;
    --vs-selected-color: #eeeeee;

    --vs-search-input-color:  #282c34;

    --vs-dropdown-option--active-bg: #664cc3;
    --vs-dropdown-option--active-color:#282c34;
    }

    .vs__clear {
        margin-top: -12px;
    }

    .v-select, .v-select * {
        font-size: 24px;
        background-color: #ffffff;
        color:  #282c34;
    }
    
</style>
