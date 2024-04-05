<template>
  <div class="modal_wrapper">
    <basic-form :contentData="levelOfConsciousness"></basic-form>
    <h5>{{ gcs }}</h5>
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
  modalController,
} from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import {
  ConsciousnessConcepts,
  eyeOpeningWeights,
  motorResponseWeights,
  useLevelOfConsciousnessStore,
  verbalResponseWeights,
} from "@/apps/OPD/stores/LevelOfConsciousnessStore";
import { mapState } from "pinia";
import { getRadioSelectedValue } from "@/services/data_helpers";

export default defineComponent({
  name: "Menu",
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    BasicForm,
  },
  setup() {
    const { levelOfConsciousness } = useLevelOfConsciousnessStore();
    const gcs = ref("");
    const setGcs = (value: any) => {
      gcs.value = value;
    };

    watch(levelOfConsciousness, (newValue) => {
      const eyeOpening = getRadioSelectedValue(
        newValue,
        ConsciousnessConcepts.EYE_OPENING_RESPONSE
      );
      const bestMotorResponse = getRadioSelectedValue(
        newValue,
        ConsciousnessConcepts.BEST_MOTOR_RESPONSE
      );
      const bestVerbalResponse = getRadioSelectedValue(
        newValue,
        ConsciousnessConcepts.BEST_VERBAL_RESPONSE
      );

      const eyeWeight = eyeOpeningWeights[eyeOpening] ?? 0;
      const motorWeight = motorResponseWeights[bestMotorResponse] ?? 0;
      const verbalWeight = verbalResponseWeights[bestVerbalResponse] ?? 0;

      gcs.value = `(M ${motorWeight} V ${verbalWeight} E ${eyeWeight}) ${
        eyeWeight + motorWeight + verbalWeight
      }/15`;
    });

    return {
      gcs,
      setGcs,
    };
  },

  data() {
    return {};
  },
  computed: {
    ...mapState(useLevelOfConsciousnessStore, ["levelOfConsciousness"]),
  },
  methods: {},
});
</script>

<style scoped></style>
