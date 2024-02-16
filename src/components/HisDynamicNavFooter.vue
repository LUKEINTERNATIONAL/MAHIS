<template>
    <ion-toolbar :color="color" class="_buttons">
      <ion-button
        v-for="(btn, index) in footerBtns" :key="index"
        :slot="btn.slot"
        v-show="btn.visible" 
        @click="btn.onClick(btn)"
        :color="btn.color"
        :fill="btn.fill"
        :class="btn.styleClass"
        :size="btn.size">
        <ion-icon   :icon="btn.icon"></ion-icon>
        {{btn.name}}
      </ion-button>
    </ion-toolbar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {IonButton, IonFooter, IonToolbar} from "@ionic/vue";
import { NavBtnInterface } from './HisDynamicNavFooterInterface'
export default defineComponent({
  name: "HisNavFooter",
  data: () => ({
    footerBtns: [] as any
  }),
  created() {
    this.$emit('onFooterInstance', this)
  },
  props: {
    color: {
      type: String,
      default: 'dark'
    },
    state: {
      type: Object as PropType<Record<string, any>>,
    },
    btns: {
      type: Object as PropType<Array<NavBtnInterface>>,
      required: true
    }
  },
  components: {
    IonButton,
    IonFooter,
    IonToolbar
  },
  watch: {
    state: {
      handler(state: Record<string, any>) {
        if (!state) return

        this.footerBtns = this.footerBtns.map((btn: any) => {
          if (btn.visibleOnStateChange) {
            btn.visible = btn.visibleOnStateChange(state)
          }
          return btn
        })
      },
      deep: true,
      immediate: true
    },
    btns: {
      handler(btns: Array<NavBtnInterface>) {
        if (btns) this.footerBtns = [...btns]
      },
      deep: true,
      immediate: true
    }
  }
})
</script>
<style>
._buttons{
  padding: 0px 25px;
  text-transform: none;
}
</style>