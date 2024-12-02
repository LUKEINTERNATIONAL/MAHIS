<template>
    <ion-modal  :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
      <ion-header>
        <ion-title class="modalTitle">Enroll client in ANC program</ion-title>
      </ion-header>
      <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <basic-form
            :contentData="ConfirmPregnancy"
        ></basic-form>
        <hr class="dashed-hr" style="margin-bottom: 0px !important" />
      </ion-content>
      <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
          <ion-col>
            <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="handleCancel"> Cancel </ion-button>
          </ion-col>
          <ion-col>
            <DynamicButton name="Submit" @click="onYes()" fill="solid" style="float: right; margin: 2%; width: 130px" />
          </ion-col>
        </ion-row>
      </ion-footer>

<!--     <ion-content>-->
<!--        <ion-title  style="color:black; font-size: 15px">{{title}}</ion-title>-->
<!--        <div style="display:flex;">-->
<!--          <DynamicButton-->
<!--              expand="block"-->
<!--              @click="onYes()"-->
<!--              name="Yes"-->
<!--              :style="`flex:1`"-->
<!--          />-->
<!--          <DynamicButton-->
<!--              expand="block"-->
<!--              @click="onNo()"-->
<!--              :style="`flex:1`"-->
<!--              name="No"-->
<!--              fill="clear"-->
<!--          />-->
<!--        </div>-->
<!--      </ion-content>-->
    </ion-modal>
  </template>

  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonIcon, IonFooter, IonLabel, IonRow, IonCol, modalController
  } from '@ionic/vue';
  import { closeOutline } from 'ionicons/icons';
  import DynamicButton from "@/components/DynamicButton.vue";
  import HomeLocation from "@/components/Registration/HomeLocation.vue";
  import CurrentLocation from "@/components/Registration/CurrentLocation.vue";
  import GuardianInformation from "@/components/Registration/GuardianInformation.vue";
  import PersonalInformation from "@/components/Registration/PersonalInformation.vue";
  import SocialHistory from "@/components/Registration/SocialHistory.vue";
  import {mapState} from "pinia";
  import {useFollowUpStoreStore} from "@/apps/Immunization/stores/FollowUpStore";
  import {useANCEnrollmentStore} from "@/apps/ANC/store/enrollment/ANCEnrollment";
  import BasicForm from "@/components/BasicForm.vue";

  export default defineComponent({
    name: 'AncEnrollmentModal',
    components: {
      BasicForm,
      IonCol,
      IonRow,
      IonLabel,
      IonFooter,
      SocialHistory,
      PersonalInformation,
      GuardianInformation,
      CurrentLocation,
      HomeLocation,
      DynamicButton,
      IonModal,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons,
      IonButton,
      IonContent,
      IonIcon
    },
    props: {
      isOpen: {
        type: Boolean as PropType<boolean>,
        required: true,
        default: false
      },
      closeModalFunc : {
          type: Function as PropType<()=>void>,
          required: true

      },
      onYes : {
          type: Function as PropType<()=>void>,
          required: true

      },
      onNo : {
          type: Function as PropType<()=>void>,
          required: true

      },
      title:{
          type: String as PropType<string>,
          required: true
      }
    },
    computed:{
      ...mapState(useANCEnrollmentStore, ["ConfirmPregnancy"]),

    },
    methods: {
      handleCancel() {
        modalController.dismiss();
      },
      closeOutline() {
        return closeOutline;
      },
      closeModal() {
        // this.$emit('update:isOpen', false);
        this.closeModalFunc();
      },
      confirm(test:string) {
        this.closeModal();
      }
    }
  });
  </script>

  <style scoped>

  ion-header {
    --background: var(--ion-color-primary);
  }

  .custom-dropdown .vs__selected-options,
  .custom-dropdown .vs__dropdown-option {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .custom-dropdown .vs__dropdown-menu {
    max-height: 150px;
    overflow-y: auto;
    background-color: red;
  }
  .PI-cls-1 {
    cursor: pointer;
  }
  .lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
  }
  .form-row {
    display: flex;
    align-items: center;
  }
  .lbl-ct {
    white-space: nowrap;
    color: #636363;
    flex: 1;
  }
  pim-cls-1 {
    --background: #ffff;
  }
  .custom-toolbar-cls {
    --background: #ffff;
  }
  ion-footer {
    --ion-toolbar-background: #fff;
  }
  ion-modal {
    --height: 50%;
    --border-radius: 20px;

  }
  .dashed-hr {
    border: none;
    border-top: 1px dashed #b3b3b3;
    margin: 20px 0;
  }
  .modal_wrapper {
    padding: 0px 1px;
    background: #fff;
  }
  .PI-cls-1 {
    color: #1f2221d4;
  }
  .OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
  }
  .OtherVitalsHeading {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
  ion-accordion {
    margin-bottom: 15px;
  }
  </style>