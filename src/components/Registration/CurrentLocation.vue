<template>
  <basic-card
    :content="cardData"
    @update:selected="handleInputData"
    @update:inputValue="handleInputData"
  ></basic-card>
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
import {
  modifyFieldValue,
  getFieldValue,
  getRadioSelectedValue,
} from "@/services/data_helpers";
import { validateField } from "@/services/validation_service";

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
    ...mapState(useRegistrationStore, ["currentLocation"]),
    homeRegion() {
      return this.getRegion(
        this.getInputData(this.homeLocation, 0, 0, 0, "value")
      );
    },
    homeDistrict() {
      return this.getInputData(this.homeLocation, 0, 0, 0, "value");
    },
    homeTraditionalAuthority() {
      return this.getInputData(this.homeLocation, 2, 0, 0, "value");
    },
    homeVillage() {
      return this.getInputData(this.homeLocation, 1, 0, 0, "value");
    },
    currentRegion() {
      return this.getRegion(
        this.getInputData(this.currentLocation, 0, 0, 0, "value")
      );
    },
    currentDistrict() {
      return this.getInputData(this.currentLocation, 0, 0, 0, "value");
    },
    currentTraditionalAuthority() {
      return this.getInputData(this.currentLocation, 2, 0, 0, "value");
    },
    currentVillage() {
      return this.getInputData(this.currentLocation, 1, 0, 0, "value");
    },
    landmark() {
      return this.getInputData(this.currentLocation, 3, 0, 0, "value");
    },
  },
  async mounted() {
    this.updateRegistrationStores();
    this.buidCards();
  },
  methods: {
    buidCards() {
      this.cardData = {
        mainTitle: "Demographics",
        cards: [
          {
            cardTitle: "Current Location",
            content: this.currentLocation,
          },
        ],
      };
    },
    openModal() {
      createModal(DispositionModal);
    },
    updateRegistrationStores() {
      const registrationStore = useRegistrationStore();
      registrationStore.setHomeLocation(this.homeLocation);
      registrationStore.setCurrentLocation(this.currentLocation);
    },
    validationRules(event: any) {
      return validateField(
        this.homeLocation,
        event.name,
        (this as any)[event.name]
      );
    },
    getRadioValue(data: any, section: any) {
      return data[section].radioBtnContent.header.selectedValue;
    },
    getRegion(district: any) {
      return district;
    },
    getInputData(data: any, section: any, row: any, col: any, type: any) {
      const rowData = data[section].data.rowData[row].colData[col];
      switch (type) {
        case "value":
          return rowData.value;
        case "inputHeader":
          return rowData.inputHeader;
        case "id":
          return rowData.id;
        default:
          return null;
      }
    },

    async buildDistricts() {
      this.locationData =
        this.setName === "homeLocation"
          ? this.homeLocation
          : this.currentLocation;
      if (
        this.locationData[0].data.rowData[0].colData[0].popOverData?.data
          .length === 0
      ) {
        for (let i of [1, 2, 3]) {
          const districts: any = await LocationService.getDistricts(i);
          this.districtList.push(...districts);
        }
      }
      this.setName === "homeLocation"
        ? (this.homeLocation[0].data.rowData[0].colData[0].popOverData.data =
            this.districtList)
        : (this.currentLocation[0].data.rowData[0].colData[0].popOverData.data =
            this.districtList);
    },

    async buildTAs() {
      const targetData = await LocationService.getTraditionalAuthorities(
        this.getInputData(this.locationData, 0, 0, 0, "id"),
        this.getInputData(this.locationData, 1, 0, 0, "value")
      );
      this.setName === "homeLocation"
        ? (this.homeLocation[1].data.rowData[0].colData[0].popOverData.data =
            targetData)
        : (this.currentLocation[1].data.rowData[0].colData[0].popOverData.data =
            targetData);
    },

    async buildVillages() {
      const targetData = await LocationService.getVillages(
        this.getInputData(this.locationData, 1, 0, 0, "id"),
        this.getInputData(this.locationData, 2, 0, 0, "value")
      );
      this.setName === "homeLocation"
        ? (this.homeLocation[2].data.rowData[0].colData[0].popOverData.data =
            targetData)
        : (this.currentLocation[2].data.rowData[0].colData[0].popOverData.data =
            targetData);
    },

    async handleInputData(event: any) {
      this.validationRules(event);
      this.handleLocation(event);
    },
    async handleLocation(event: any) {
      this.setName = event.setName;
      if (this.setName == "homeLocation" || this.setName == "currentLocation") {
        await this.buildDistricts();

        await this.buildTAs();
        const taDisplayNone = this.locationData[1].data.rowData[0].colData[0];
        this.handleDisplayNone(taDisplayNone, 0);

        await this.buildVillages();
        const villageDisplayNone =
          this.locationData[2].data.rowData[0].colData[0];
        this.handleDisplayNone(villageDisplayNone, 1);
      }
    },
    async handleDisplayNone(targetData: any, inputField: any) {
      if (
        (await this.checkSelected(inputField)) &&
        this.locationData[inputField].data.rowData[0].colData[0].value != ""
      ) {
        this.setName === "homeLocation"
          ? (this.homeLocation[
              1 + inputField
            ].data.rowData[0].colData[0].displayNone = false)
          : (this.currentLocation[
              1 + inputField
            ].data.rowData[0].colData[0].displayNone = false);
      } else {
        if (this.setName === "homeLocation") {
          this.homeLocation[1 + inputField].data.rowData[0].colData[0].value =
            "";
          this.homeLocation[
            1 + inputField
          ].data.rowData[0].colData[0].displayNone = true;
        } else {
          this.currentLocation[
            1 + inputField
          ].data.rowData[0].colData[0].value = "";
          this.currentLocation[
            1 + inputField
          ].data.rowData[0].colData[0].displayNone = true;
        }
      }
    },

    async checkSelected(inputField: any) {
      return new Promise(async (resolve) => {
        const inputData = this.getInputData(
          this.locationData,
          inputField,
          0,
          0,
          "value"
        );
        const obj = this.locationData[
          inputField
        ].data.rowData[0].colData[0].popOverData.data.find(
          (obj: any) => obj.name === inputData
        );
        resolve(obj);
      });
    },
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
