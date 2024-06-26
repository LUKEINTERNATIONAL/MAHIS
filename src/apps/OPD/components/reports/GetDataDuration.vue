<template>
    <DateInputField
        :inputHeader="''"
        :sectionHeaderFontWeight="20"
        :unit="'hhj'"
        :input="''"
        :icon="''"
        :placeholder="'ika data'"
        :iconRight="''"
        :inputWidth="''"
        :inputValue="''"
        :eventType="''"
    />
</template>
<script lang="ts">
    import { defineComponent } from "vue";
    import DateInputField from "@/components/DateInputField.vue";

    export default defineComponent({
    components: {
        DateInputField,
    },
    data() {
        return {

        };
    },})


</script>