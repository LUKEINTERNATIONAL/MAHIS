<template>
  <div class="modal_wrapper">
    <basic-form
      v-if="patientAge < 18"
      :contentData="levelOfConsciousnessMinor"
    ></basic-form>
    <basic-form
      v-if="patientAge >= 18"
      :contentData="levelOfConsciousness"
    ></basic-form>
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
} from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import {
  ConsciousnessConcepts,
  eyeOpeningMinorWeights,
  eyeOpeningWeights,
  motorResponseMinorWeights,
  motorResponseWeights,
  useLevelOfConsciousnessStore,
  verbalResponseMinorWeights,
  verbalResponseWeights,
} from "@/apps/OPD/stores/LevelOfConsciousnessStore";
import { getRadioSelectedValue } from "@/services/data_helpers";
import { useDemographicsStore } from "@/stores/DemographicStore";
import HisDate from "@/utils/Date";

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
    const { levelOfConsciousness, levelOfConsciousnessMinor } =
      useLevelOfConsciousnessStore();
    const { demographics } = useDemographicsStore();

    const gcs = ref("");
    const patientAge = ref(HisDate.getAgeInYears(demographics.birthdate));
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

    watch(levelOfConsciousnessMinor, (newValue) => {
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

      const eyeWeight = eyeOpeningMinorWeights[eyeOpening] ?? 0;
      const motorWeight = motorResponseMinorWeights[bestMotorResponse] ?? 0;
      const verbalWeight = verbalResponseMinorWeights[bestVerbalResponse] ?? 0;

      gcs.value = `(M ${motorWeight} V ${verbalWeight} E ${eyeWeight}) ${
        eyeWeight + motorWeight + verbalWeight
      }/5`;
    });

    return {
      gcs,
      setGcs,
      levelOfConsciousnessMinor,
      levelOfConsciousness,
      patientAge,
    };
  },

  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped></style>
