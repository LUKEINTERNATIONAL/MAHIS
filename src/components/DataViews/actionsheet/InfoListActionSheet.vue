<template>
    <action-header :title="title" :subtitle="subtitle" :color="color"> </action-header>
    <ion-content>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <ion-icon slot="start" aria-hidden="true" class="his-md-text" icon="item"> </ion-icon>
            </li>
        </ul>
    </ion-content>
    <action-footer :buttons="actionButtons"> </action-footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ActionSheetMixin from "@/components/DataViews/actionsheet/ActionSheetMixin.vue";

export default defineComponent({
    mixins: [ActionSheetMixin],
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
});
</script>
<style scoped>
ul li {
    margin: 5%;
    font-size: 1.4em;
}
</style>
