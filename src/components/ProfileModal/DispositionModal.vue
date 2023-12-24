<template>
  <div class="modal_wrapper">
    <div class="modal_title diplay_space_between">
      <span>Disposition</span>
      <span @click="dismiss()" style="cursor: pointer; font-weight: 300;">x</span>
    </div>

    <DashBox v-if="dispositions.length == 0" :content="'No dispositions added yet.'"></DashBox>

    <div class="dashed_bottom_border" style="padding-bottom:5px"
      v-for="(disposition, index) in dispositions" :key="index">
      <div class="text_header_14">
        <h4 style="margin-bottom: 0px; font-weight: bold;">{{ disposition.name }}</h4>
      </div>
      <div class="diplay_space_between">
        <div>
          <div class="typeDate" style="width: 54dvw;">
            <span>{{ disposition.type }}</span><span class="date">{{ disposition.date }}</span>
          </div>
          <div>
            {{ disposition.reason }}
          </div>
        </div>
        <div>
          <span v-html="iconsContent.tree_dot"></span>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
  modalController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '@/utils/svg';
import { mapState } from 'pinia'
import { useDispositionStore } from "@/stores/DispositionStore"
import DispositionModal from '@/components/ProfileModal/DispositionModal.vue'
import { createModal } from '@/utils/Alerts'

export default defineComponent({
  name: 'Menu',
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar
  },
  computed: {
        ...mapState(useDispositionStore, ["dispositions"]),
    },
  data() {
    return {
      iconsContent: icons,
    };
  },
  setup() {
    return { checkmark, pulseOutline };
  },
  methods: {
    dismiss() {
      modalController.dismiss()
    },
    openModal(){
        createModal(DispositionModal)
    }
  }
});
</script>

<style scoped>
.date {
  margin-left: auto;
  margin-right: 0px;
}
.typeDate {
  display: flex;
}
</style>
  