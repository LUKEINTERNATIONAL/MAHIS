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
import { ref, watch, computed, onMounted, onUpdated } from "vue"

const selectedOption = ref(null)
const placeholder = ref('MF')

const props = defineProps<{
    labels: any,
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
})

watch(
    () => props.labels,
    async (newValue) => {
        populateOptions()
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
    --vs-dropdown-color: #cc99cd;
    --vs-dropdown-option-color: #cc99cd;

    --vs-selected-bg: #664cc3;
    --vs-selected-color: #eeeeee;

    --vs-search-input-color: #eeeeee;

    --vs-dropdown-option--active-bg: #664cc3;
    --vs-dropdown-option--active-color: #eeeeee;
    }

    .vs__clear {
        margin-top: -12px;
    }

    .v-select, .v-select * {
        font-size: 25px;
    }
</style>
