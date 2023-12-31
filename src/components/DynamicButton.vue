<template>
    <ion-button
        :fill="$props.fill"
        :color="color"
        @click="$emit('clicked:btn')">
        <span>{{ $props.name }}</span>
        <ion-icon v-if="icon" :slot="iconSlot" style="font-size: x-large;" :icon="$props.icon"></ion-icon>

    </ion-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IonButton  } from "@ionic/vue"
export default defineComponent({
    created() {
       // this.$emit('onFooterInstance', this)
    },
    props: {
        name: {
            type: String,
            default: "",
        },
        fill: {
            type: String as any,
        },
        icon: {
            type: String as any,
            default:''
        },
        iconSlot: {
            type: String as any,
            default:'start'
        },
        color: {
            type: String,
            default:'primary'
        }

    },
    components: {
        IonButton,
    },
    watch: {

    }
})
</script>
<style>

</style>