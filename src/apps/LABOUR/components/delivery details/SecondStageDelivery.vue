<template>
  <ion-row>
    <ion-accordion-group ref="accordionGroup" class="previousView">
      <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
        <ion-item slot="header" color="light">
          <ion-label class="previousLabel">Delivery and newborn details</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
          <DeliveryNewbornDetails/>
        </div>
      </ion-accordion>
    </ion-accordion-group>
    <ion-accordion-group ref="accordionGroup" class="previousView">
      <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
        <ion-item slot="header" color="light">
          <ion-label class="previousLabel">Other delivery details</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
          <OtherDeliveryDetails/>
        </div>
      </ion-accordion>
    </ion-accordion-group>

    <ion-accordion-group ref="accordionGroup" class="previousView">
      <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
        <ion-item slot="header" color="light">
          <ion-label class="previousLabel">Obstetric complications</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
          <ObstetricComplications/>
        </div>
      </ion-accordion>
    </ion-accordion-group>
  </ion-row>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { build, checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { OrderService } from "@/services/order_service";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { mapState } from "pinia";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import BasicForm from "@/components/BasicForm.vue";
import List from "@/components/List.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import labOrderResults from "@/components/Lab/labOrderResults.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import {
  modifyCheckboxInputField,
  getCheckboxSelectedValue,
  //getRadioSelectedValue,
  getFieldValue,
  getRadioSelectedValue,
  modifyFieldValue,
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
//import {useReferralStore} from "@/apps/LABOUR/stores/repeatable things/referral";
import {useEndLabourStore} from "@/apps/LABOUR/stores/repeatable things/labourAndDeliveryEnd";
import {useSecondStageOfLabourStore} from "@/apps/LABOUR/stores/delivery details/secondStageDelivery";
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
    IonInput,
    IonPopover,
    DashBox,
    SelectionPopover,
    BasicInputField,
    BasicForm,
    List,
    DynamicButton,
    labOrderResults,
    // DeliveryNewbornDetails,
    // OtherDeliveryDetails,
    // ObstetricComplications
  },
  data() {
    return {
      iconsContent: icons,
      no_item: false,
      search_item: false,
      display_item: false,
      addItemButton: true,
      selectedText: "" as any,
      testResult: "" as any,
      test: "" as any,
      orders: "" as any,
      filteredSpecimen: "" as any,
      labOrders: "" as any,
      testData: [] as any,
      popoverOpen: false,
      levelOfConsciousnessStatus: false,
      presentingComplaintsStatus: false,
      pregnancyBreastfeedingStatus: false,
      pastMedicalHistory: false,
      allergiesStatus: false,
      physicalExamination: false,
      event: "" as any,
      specimen: "" as any,
      radiologyOrdersStatus: false,
      otherOrdersStatus: false,
    };
  },
  computed:{
    ...mapState(useSecondStageOfLabourStore,["secondStageDetails"]),
    ...mapState(useSecondStageOfLabourStore,["newbornComplications"]),
    ...mapState(useSecondStageOfLabourStore,["secondStageDetails"]),
    ...mapState(useSecondStageOfLabourStore,["obstetricComplications"]),
  },
  mounted(){
    const secondStageDetails=useSecondStageOfLabourStore()
    const newbornComplications=useSecondStageOfLabourStore()
    const obstetricComplications=useSecondStageOfLabourStore()
    // this.initialData=secondStageDetails.getInitial()
    // this.initialData1=newbornComplications.getInitial1()
    // this.initialData2=obstetricComplications.getInitial2()
    this. handleModeOfDeliver()
  },
  watch:{
    newbornComplications:{
      handler(){
        this.handleModeOfDeliver()
      },
      deep:true
    }
  },
  setup() {
    return { checkmark, pulseOutline };
  },

  methods: {
    handleModeOfDeliver(){
      // if(getRadioSelectedValue(this.newbornComplications,'Mode of delivery')=='other'){
      //   modifyFieldValue(this.newbornComplications,'Other notes','displayNone',false)
      // }else{
      //    modifyFieldValue(this.newbornComplications,'Other notes','displayNone',true)
      // }
    },
  }
});

//   },
// });
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.action_buttons {
  color: var(--ion-color-primary);
  display: flex;
  align-items: center;
  float: right;
  max-width: 70px;
}

.modify_buttons {
  padding-left: 20px;
}

.item_no_border {
  --border-color: transparent;
}

.search_result {
  padding: 10px;
}
.action_buttons {
  opacity: 0; /* Initially hide the action buttons */
  transition: opacity 0.3s; /* Add a smooth transition effect */
}

.dashed_bottom_border:hover .action_buttons {
  opacity: 1; /* Show the action buttons when the row is hovered over */
}
.dashed_bottom_border {
  font-weight: 700;
}
.sub_item_body {
  margin-left: 45px;
}
.presentingComplaint {
  margin-top: 10px;
}
</style>
