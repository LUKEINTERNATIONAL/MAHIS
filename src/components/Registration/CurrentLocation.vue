<template>
  <basic-card :content="cardData" @update:selected="handleInputData" @update:inputValue="handleInputData" @clicked:button="handleBtns"></basic-card>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu } from "@ionic/vue";
import { defineComponent } from "vue";
import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { mapState } from "pinia";
import BasicCard from "../BasicCard.vue";
import { LocationService } from "@/services/location_service";
import Validation from "@/validations/StandardValidations";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import HisDate from "@/utils/Date";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue, getCheckboxSelectedValue } from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";
import AddTA from "@/components/Registration/Modal/AddTA.vue";
import AddVillage from "@/components/Registration/Modal/AddVillage.vue";

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
    BasicCard,
  },
  data() {
    return {
      cardData: {} as any,
      inputField: "" as any,
      setName: "" as any,
      locationData: [] as any,
      districtList: [] as any,
    };
  },
  computed: {
    ...mapState(useRegistrationStore, ["homeLocation"]),
    ...mapState(useRegistrationStore, ["currentLocation", "closestLandmark"]),
    current_district() {
      return getFieldValue(this.currentLocation, "current_district", "value")?.name;
    },
    current_traditional_authority() {
      return getFieldValue(this.currentLocation, "current_traditional_authority", "value")?.name;
    },
    current_village() {
      return getFieldValue(this.currentLocation, "current_village", "value")?.name;
    },
    "Other (specify)"() {
      return getFieldValue(this.closestLandmark, "Other (specify)", "value")?.name;
    },
  },
  watch: {
    currentLocation: {
      handler() {
        this.buildCards();
      },
      deep: true,
    },
    closestLandmark: {
      handler() {
        // this.handleClosestLandmark();
      },
      deep: true,
    },
  },
  async mounted() {
    this.updateRegistrationStores();
    this.buildCards();
    this.buildDistricts();
    // this.handleClosestLandmark();
  },
  methods: {
    async buildCards() {
      this.cardData = {
        mainTitle: "Demographics",
        cards: [
          {
            cardTitle: "Current Location",
            content: this.currentLocation,
            contentTwo: this.closestLandmark,
          },
        ],
      };
    },
    openModal() {
      createModal(DispositionModal);
    },
    updateRegistrationStores() {
      const registrationStore = useRegistrationStore();
      // registrationStore.setHomeLocation(this.homeLocation);
      // registrationStore.setCurrentLocation(this.currentLocation);
    },
    async buildDistricts() {
      this.districtList = [];
      for (let i of [1, 2, 3]) {
        const districts: any = await LocationService.getDistricts(i);
        this.districtList.push(...districts);
      }
      modifyFieldValue(this.currentLocation, "current_district", "multiSelectData", this.districtList);
    },
    handleBtns(event: any) {
      if (event == "TA") createModal(AddTA, { class: "otherVitalsModal" });
      if (event == "Village") createModal(AddVillage, { class: "otherVitalsModal" });
    },
    async validations(data: any, fields: any) {
      return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
    },
    async handleInputData(event: any) {
      sessionStorage.setItem("activeLocation", "current");
      const currentFields: any = ["current_district", "current_traditional_authority", "current_village","Other (specify)"];
      await this.validations(this.currentLocation, currentFields);
      if (event.name == "current_district") {
        modifyFieldValue(this.currentLocation, "current_traditional_authority", "displayNone", true);
        modifyFieldValue(this.currentLocation, "current_traditional_authority", "value", "");
        modifyFieldValue(this.currentLocation, "current_village", "displayNone", true);
        modifyFieldValue(this.currentLocation, "current_village", "value", "");
        if (event?.value?.district_id) this.setTA(event.value);
      }
      if (event.name == "current_traditional_authority") {
        modifyFieldValue(this.currentLocation, "current_village", "displayNone", true);
        modifyFieldValue(this.currentLocation, "current_village", "value", "");
        if (event?.value?.traditional_authority_id) this.setVillage(event.value);
      }
      await this.validations(this.closestLandmark, currentFields);
      if (event.name == "closestLandmark") {
        const selectedLandmark = getFieldValue(this.closestLandmark, "closestLandmark", "value");
        if (selectedLandmark?.name === "Other") {
          modifyFieldValue(this.closestLandmark, "Other (specify)", "displayNone", false);
        } else {
          modifyFieldValue(this.closestLandmark, "Other (specify)", "displayNone", true);
          modifyFieldValue(this.closestLandmark, "Other (specify)", "value", "");
        }
      }
    },
    async setTA(obj: any) {
      const targetData = await LocationService.getTraditionalAuthorities(obj.district_id, "");
      modifyFieldValue(this.currentLocation, "current_traditional_authority", "multiSelectData", targetData);
      modifyFieldValue(this.currentLocation, "current_traditional_authority", "displayNone", false);
    },
    async setVillage(obj: any) {
      const targetData = await LocationService.getVillages(obj.traditional_authority_id, "");
      modifyFieldValue(this.currentLocation, "current_village", "multiSelectData", targetData);
      modifyFieldValue(this.currentLocation, "current_village", "displayNone", false);
    },
    // handleClosestLandmark() {
    //   const selectedLandmark = getFieldValue(this.closestLandmark, "closestLandmark", "value");
    //   if (selectedLandmark?.name === "Other") {
    //     modifyFieldValue(this.closestLandmark, "Other (specify)", "displayNone", false);
    //   } else {
    //     modifyFieldValue(this.closestLandmark, "Other (specify)", "displayNone", true);
    //   }
    // }

  },
});
</script>

<style scoped>
.demographics_title {
  font-weight: 700;
  font-size: 24px;
}
.gender {
  display: flex;
  justify-content: space-between;
  max-width: 170px;
  padding-top: 10px;
}
.gender_title {
  margin-top: 30px;
}
</style>
