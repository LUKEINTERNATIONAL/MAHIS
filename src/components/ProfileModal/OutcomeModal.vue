<template>
  <div class="modal_wrapper">
    <div class="modal_title diplay_space_between">
      <span>Outcome</span>
      <span @click="dismiss()" style="cursor: pointer; font-weight: 300;">x</span>
    </div>

    <DashBox v-if="outcomes.length == 0" :content="'No outcomes added yet.'"></DashBox>

    <div class="dashed_bottom_border" style="padding-bottom:5px"
      v-for="(outcome, index) in outcomes" :key="index">
      <div class="text_header_14">
        <h4 style="margin-bottom: 0px; font-weight: bold;">{{ outcome.name }}</h4>
      </div>
      <div class="diplay_space_between">
        <div>
          <div class="typeDate" style="width: 54dvw;">
            <span>{{ outcome.type }}</span><span class="date">{{ outcome.date }}</span>
          </div>
          <div>
            {{ outcome.reason }}
          </div>
        </div>
        <div>
          <ion-icon style="font-size: 20px;"  :icon="iconsContent.tree_dot"></ion-icon>
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
import { useOutcomeStore } from "@/stores/OutcomeStore"
import DispositionModal from '@/components/ProfileModal/NotesModal.vue'
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
      ...mapState(useOutcomeStore, ["outcomes"]),
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
  @/stores/OutcomeStore