<template>

  <ion-row >
    <!--   height and weight-->
    <ion-col  class="left_row_col_separator">
      <ion-list>
        <ion-item :lines="heightAndWeight" class="dashed_bottom_border" style="font-weight: bold">
          Is Pallor present?
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="pallor">
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>
    </ion-col>
  </ion-row>

  <!--  Breast exam-->
  <ion-row>
    <ion-col class="left_row_col_separator">
      <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
          Breast exam result
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="breastExam" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>
    </ion-col>
  </ion-row>
  <!--  Vulva inspection-->
  <ion-row>
    <ion-col class="left_row_col_separator">
      <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
          Vaginal inspection
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="vaginalInspection" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>
    </ion-col>
  </ion-row>
  <!--  Cervical exam-->
  <ion-row>
    <ion-col class="left_row_col_separator">
      <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
          Cervical exam conducted?
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="cervicalExam" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>
    </ion-col>
  </ion-row>
  <!--  oedema exam-->
  <ion-row>
    <ion-col class="left_row_col_separator">
      <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
          Oedema present?
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="oedemaPresence" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>
    </ion-col>
  </ion-row>

  <!--    <basic-form :contentData="vitals" @update:inputValue="validaterowData($event)"></basic-form>-->
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
  menuController,
  IonInput, IonToggle
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { icons } from '@/utils/svg';
import { useMaternalExamStore} from "@/apps/ANC/store/physical exam/MaternalExamStore";
import { mapState } from 'pinia';
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue"
import { VitalsService } from "@/services/vitals_service";
import BasicForm from '@/components/BasicForm.vue';
import { Service } from "@/services/service";

export default defineComponent({
  components:{
    IonToggle,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    BasicInputField,
    BasicForm
  },
  data() {
    return {
      iconsContent: icons,
      vValidations: '' as any,
      hasValidationErrors: [] as any,
    };
  },
  computed:{

    ...mapState(useMaternalExamStore,["pallor"]),
    ...mapState(useMaternalExamStore,["breastExam"]),
    ...mapState(useMaternalExamStore,["vaginalInspection"]),
    ...mapState(useMaternalExamStore,["cervicalExam"]),
    ...mapState(useMaternalExamStore,["oedemaPresence"]),
  },
  mounted(){
    const userID: any  = Service.getUserID()
    this.vitalsInstance = new VitalsService(this.demographics.patient_id,userID);
    this.updateVitalsStores()
    this.validaterowData({})
  },
  watch: {
    vitals: {
      handler(){
        this.updateVitalsStores();
      },
      deep: true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },

  }
});

</script>

<style scoped>
.content_container{
  padding-left: 10px;
}
.left_row_col_separator{
  padding-right: 50px
}
.right_row_col_separator{
  padding-left: 50px
}
.content_container_for_radio{
  padding-left: 30px;
  margin-right: 400px;
}
.separator {
  border-top: none; /* or border: none; */
  margin: 0;
  padding: 0;
  height: 0;
  display: none;
}
</style>
