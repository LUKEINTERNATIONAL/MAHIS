<template>
    <ion-popover :is-open="popoverOpen" :event="event" @didDismiss="popoverDismiss" :keyboard-close="false"
        :show-backdrop="false" :dismiss-on-select="true" >
        <ion-content class="search_card">
            <ion-row class="search_result" v-for="(item, index) in testData" :key="index">
                <ion-col style="cursor: pointer;" >{{ item.name }} </ion-col>
            </ion-row>
        </ion-content>
    </ion-popover>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonPopover } from "@ionic/vue";

export default defineComponent({
    components: {
        IonPopover
    },
     data() {
        return {
            popoverStatus: '' as any,
        };
    },
    props: {
        testData: {
            type: Object,
            default: {}
        },
        popoverOpen: {
            type: Boolean,
            default: false
        },
        event: {
            type: Event,
            default: ''
        }
    },
    methods: {
        popoverDismiss() {
            this.$emit("changePopoverStatus", false);
            return false
        }
    }

})
</script>
<style>
/* .popoverBody {
    text-align: center;
    padding: 20px;
    font-weight: 600;
    font-size: 16px;
    color: #636363;
} */
</style>