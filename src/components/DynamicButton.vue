<template>
    <ion-button
        :fill="$props.fill"
        @click="$props.Fn">
        <span>{{ $props.name }}</span>
        <ion-icon v-if="icon" slot="start" style="font-size: x-large;" :icon="$props.icon"></ion-icon>

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
            default: "change button name as via prop",
        },
        fill: {
            type: String as any,
        },
        icon: {
            type: String as any,
            default:''
        },
        Fn: {
            type: Function,
            default: ()=>{}
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