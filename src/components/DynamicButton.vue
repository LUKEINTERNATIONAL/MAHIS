<template>
    <ion-button :style="style" :id="id" :disabled="disabledValue" :expand="expand" :fill="$props.fill" :size="size" :color="color" @click="$emit('clicked:btn')">
        <span v-if="!subName && showName" :style="'font-size: 14px; font-weight:' + fontWeight">
            {{ $props.name }}
        </span>
        <span v-if="subName && showName">
            <div style="margin-bottom: px; font-size: 14px">{{ $props.name }}</div>
            <span style="font-size: 14px; font-weight: 700">{{ $props.subName }}</span>
        </span>
        <ion-icon v-if="icon" :slot="iconSlot" :style="'font-size:' + iconFont" :icon="$props.icon"></ion-icon>
    </ion-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IonButton } from "@ionic/vue";
export default defineComponent( {
    created() {
        // this.$emit('onFooterInstance', this)
    },
    props: {
        name: {
            type: String,
            default: "",
        },
        subName: {
            type: String,
            default: "",
        },
        fill: {
            type: String as any,
        },
        icon: {
            type: String as any,
            default: "",
        },
        size: {
            type: String as any,
            default: "",
        },
        expand: {
            type: String as any,
            default: "",
        },
        iconSlot: {
            type: String as any,
            default: "start",
        },
        iconFont: {
            type: String as any,
            default: "x-large",
        },
        color: {
            type: String,
            default: "primary",
        },
        showName: {
            type: String,
            default: true,
        },
        disabledValue: {
            type: Boolean,
            default: false,
        },
        fontWeight: {
            default: "400",
        },
        id:{
            type:String,
            default: "" 
        },
        style: {
      type: [String, Object] as PropType<string | Record<string, any>>,
      default: '',
    },

    },
    components: {
        IonButton,
    },
    watch: {},
});
</script>
<style></style>
