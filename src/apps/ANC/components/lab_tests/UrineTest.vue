<template>
    <div class="container">
        <ion-card v-if="currentSection === 0" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="urineTest"></basic-form>
                  <basic-form :contentData="culture"></basic-form>
                   <basic-form :contentData="gram"></basic-form>
                   <basic-form :contentData="nitrites"></basic-form>
                   <basic-form :contentData="leukocytes"></basic-form>
                    <basic-form :contentData="protein"></basic-form>
                    <basic-form :contentData="glucose"></basic-form>
            </ion-card-content>
    </ion-card>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonRow,
            IonToolbar, 
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            IonRadio,
            IonRadioGroup
        } from '@ionic/vue';
import {useUrineTestStore} from '@/apps/ANC/store/UrineTestStore'
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxInputField,
    modifyCheckboxValue,
modifyCheckboxHeader} from '@/services/data_helpers'

export default defineComponent({
    name:"UrineTest",
    components:{   
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonRow,
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            BasicForm,
            IonRadio,
            IonRadioGroup,},
    data(){
        return {
            iconsContent: icons,
          urineTestInstance: {} as any,
          currentSection: 0, // Initialize currentSection to 0
        }
    },
    computed:{
        ...mapState(useUrineTestStore, ["urineTest"]),
        ...mapState(useUrineTestStore, ["protein"]),
        ...mapState(useUrineTestStore, ["nitrites"]),
        ...mapState(useUrineTestStore, ["culture"]),
        ...mapState(useUrineTestStore, ["gram"]),
        ...mapState(useUrineTestStore, ["leukocytes"]),
        ...mapState(useUrineTestStore, ["glucose"]),

    },
    mounted(){
        // this.handleTest()
        // this. handleDate()
        this.handleTestNotDone()
        this.handleOtherNotDone()
        this.handleTypeofTest()
        this.handleFirstTest()
        this.handleThirdTest()
    },
    watch:{ 
      urineTest:{
        handler(){
          // this.handleTest()
          // this. handleDate()
          this.handleTestNotDone()
          this.handleOtherNotDone()
          this.handleTypeofTest()
          this.handleFirstTest()
          this.handleThirdTest()
        },
        deep:true
      }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
      // handleTest(){
      //   if(getRadioSelectedValue(this.urineTest,'Urine test status')=='conducted'){
      //     modifyRadioValue(this.urineTest,'conductedInfo','displayNone',false)
      //   }else{
      //     modifyRadioValue(this.urineTest,'conductedInfo','displayNone',true)
      //   }

      // },
      // handleDate(){
      //   if(getRadioSelectedValue(this.urineTest,'Urine test status')=='conducted'){
      //     modifyFieldValue(this.urineTest,'UTD','displayNone',false)
      //   }else{
      //      modifyFieldValue(this.urineTest,'UTD','displayNone',true)
      //   }
      // },
      handleTestNotDone(){
        if(getRadioSelectedValue(this.urineTest,'Urine test status')== 'Test not done'){
          modifyCheckboxHeader(this.urineTest,'Reason not done','displayNone',false)
        }else{
          modifyCheckboxHeader(this.urineTest,'Reason not done','displayNone',true)
      }
      },
      handleOtherNotDone(){
        if(getCheckboxSelectedValue(this.urineTest,'Reason not done')=='Other'){
          modifyFieldValue(this.urineTest,'Other (specify)','displayNone',false)
        }else{
           modifyFieldValue(this.urineTest,'Other (specify)','displayNone',true)
        }
      },
      handleTypeofTest(){
        if(getRadioSelectedValue(this.urineTest,'Urine test status')== 'Test conducted'){
          modifyRadioValue(this.urineTest,'Urine test','displayNone',false)
        }else{
          modifyRadioValue(this.urineTest,'Urine test','displayNone',true)
      }
      },
      handleFirstTest(){
        if(getRadioSelectedValue(this.urineTest,'Urine test')== 'Midstream urine culture'){
          modifyRadioValue(this.culture,'Midstream urine culture result','displayNone',false)
        }else{
          modifyRadioValue(this.culture,'Midstream urine culture result','displayNone',true)
      }
      },
      handleSecondTest(){
        if(getRadioSelectedValue(this.urineTest,'Urine test')== 'Midstream urine gram-staining'){
          modifyRadioValue(this.gram,'Midstream urine gram-staining result','displayNone',false)
        }else{
          modifyRadioValue(this.gram,'Midstream urine gram-staining result','displayNone',true)
      }
      },
      handleThirdTest(){
        if(getRadioSelectedValue(this.urineTest,'Urine test')== 'Urine dipstick'){
          modifyRadioValue(this.nitrites,'Nitrites dipstick test result','displayNone',false);
          modifyRadioValue(this.protein, 'Protein dipstick test result', 'displayNone',false);
          modifyRadioValue(this.leukocytes, 'Leukocytes dipstick test result', 'displayNone',false);
          modifyRadioValue(this.glucose, 'Glucose dipstick test result', 'displayNone',false);
        }else{
          modifyRadioValue(this.nitrites,'Nitrites dipstick test result','displayNone',true);
          modifyRadioValue(this.protein, 'Protein dipstick test result', 'displayNone',true);
          modifyRadioValue(this.leukocytes, 'Leukocytes dipstick test result', 'displayNone',true);
          modifyRadioValue(this.glucose, 'Glucose dipstick test result', 'displayNone',true);
      }
      }
     
    }
    
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 1300px; 
  margin-bottom: 20px;
}

ion-card {
  width: 100%;
 color: black;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; 
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}



</style>


