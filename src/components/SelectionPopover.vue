<template>
    <ion-popover :is-open="popoverOpen" :event="event" @didDismiss="$emit('closePopoover', false)"
        :keyboard-close="keyboardClose" :show-backdrop="false" :dismiss-on-select="true"
        :keep-contents-mounted="keepContentsMounted">
        <div class="popoverTitle">
            {{ title }}
        </div>
        <ion-content class="search_card">
            <ion-row class="search_result" v-for="(item, index) in content" :key="index">
                <ion-col style="cursor: pointer;" @click="$emit('setSelection', item.name)">{{ item.name }} </ion-col>
                <ion-col style="max-width: 30px;"><ion-icon :icon="checkmark" class="checkmark"></ion-icon> </ion-col>
            </ion-row>
        </ion-content>
    </ion-popover>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonPopover } from "@ionic/vue";
import { checkmark, pulseOutline } from 'ionicons/icons';

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
        keyboardClose: {
            type: Boolean,
            default: false
        },
        keepContentsMounted: {
            type: Boolean,
            default: false
        },
        content: {
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
        },
        title: {
            type: String,
            default: ''
        }
    },
    setup() {
        return { checkmark, pulseOutline };
    },
})
</script>
<style scoped>
.popoverTitle {
    font-size: 14px;
    font-weight: 400;
    color: #636363;
    padding: 20px;
}

.search_card {
    --background: #fff;
}

.search_result {
    padding: 5px 20px;
}

.search_result:hover {
    background: #EBEBEB;
    border-radius: 4px;
    margin: 0px 10px;
    color: var(--ion-color-primary) !important;
}

.search_result .checkmark:hover {
    color: var(--ion-color-primary) !important;
    font-size: 18px;
}

.search_result .checkmark {
    --ion-hover: #fff;
    font-size: 18px;
    color: var(--ion-hover)
}

.search_result:hover ion-icon {
    --ion-hover: var(--ion-color-primary);
    background-color: #EBEBEB;
    border-radius: 5px;
    color: var(--ion-hover) !important;
}

.search_result:hover {
    --ion-hover: var(--ion-color-primary);
    background-color: #EBEBEB;
    border-radius: 5px;
    color: var(--ion-hover) !important;
}</style>