<template>
    <personalInformationModal
        :person_id="pId"
        :is_open="showPIM"
        @close-popoover="showPIM = false"
    />

    <dynamic-button
        :name="'personal Information'"
        :fill="'fill'"
        :icon="personAddOutline"
        @click="openPIM()"
        :color="''"
    />

    
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
})
</script>
<script setup lang="ts">

import DynamicButton from "@/components/DynamicButton.vue"
import { ref } from "vue"
import {
    personAddOutline
    
} from "ionicons/icons"

const showPIM = ref(false)
const showWH = ref(false)
const pId = ref(1)

function openPIM() {
    showPIM.value = true
}

function openWH() {
    showWH.value = true
}

</script>
<style scoped>
</style>