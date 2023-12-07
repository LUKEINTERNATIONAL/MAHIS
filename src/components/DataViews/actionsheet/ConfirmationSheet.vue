<template>
    <div class="popover">
        <action-header v-show="title || subtitle" :title="title" :subtitle="subtitle" :color="color"> </action-header>
        <div class="popoverBody">{{ body }}</div>
        <action-footer :buttons="actionButtons"> </action-footer>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ActionSheetMixin from "@/components/DataViews/actionsheet/ActionSheetMixin.vue"

export default defineComponent({
    mixins: [ActionSheetMixin],
    props: {
        body: {
            type: String,
            require: true
        }
    }

})
</script>
<style>
.popoverBody{
    text-align: center; 
    padding: 20px;
    font-weight: 600;
    font-size: 16px;
    color: #636363;
}
</style>