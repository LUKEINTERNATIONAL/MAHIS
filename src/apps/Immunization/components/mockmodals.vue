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
import personalInformationModal from "./Modals/personalInformationModal.vue"
import DynamicButton from "@/components/DynamicButton.vue"
import { ref } from "vue"
import {
    personAddOutline
    
} from "ionicons/icons"

const showPIM = ref(false)
const pId = ref(1)

function openPIM() {
    console.log("hhhhh")
    showPIM.value = true
}

</script>
<style scoped>
</style>