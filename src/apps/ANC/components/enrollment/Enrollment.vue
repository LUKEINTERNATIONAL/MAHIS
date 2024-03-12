<!-- <template>
    <basic-card :content="cardData" @update:inputValue="handleInputData"></basic-card>
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
      IonCheckbox
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { icons } from '@/utils/svg';

import DispositionModal from '@/components/ProfileModal/OutcomeModal.vue'
import { createModal } from '@/utils/Alerts'
import { useEnrollementStore} from "@/apps/ANC/store/EnrollmentStore";
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue';
import BasicCard from '@/components/BasicCard.vue';
import { modifyCheckboxInputField,getCheckboxSelectedValue,getRadioSelectedValue, modifyFieldValue } from '@/services/data_helpers'

export default defineComponent({
name: 'Menu',
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  BasicForm,
  BasicCard    },
  data() {
return {
  iconsContent: icons,
  test: '' as any,
  cardData: {} as any
};
},
computed:{
    ...mapState(useEnrollementStore,["enrollment"]),
},
watch: {
    personInformation: {
        handler(){
            this.updateEnrollmentStores();
            this.buidCards()
        },
        deep: true
    }
},

mounted(){
    this.updateEnrollmentStores()
    this.buidCards()
},
methods:{
    buidCards(){
        this.cardData ={
            mainTitle:"Enrollment",
            cards:[
                {
                    cardTitle:"",
                    content: this.enrollment
                },
            ]
           } 
    },
    openModal(){
        createModal(DispositionModal)
    },
    updateEnrollmentStores(){
        const enrollmentStore = useEnrollementStore()
        enrollmentStore.setSubstance(this.substance)
        enrollmentStore.setDiagnosis(this.diagnosis)
    },
    testF(data: any){
        console.log(data);
    },
    async handleInputData(event: any) {
        if(event.value.detail.checked)
            modifyCheckboxInputField(this.diagnosis,event.al.name, 'displayNone', false)
        else
            modifyCheckboxInputField(this.diagnosis, event.al.name,'displayNone', true)
    },
}
});
</script>

<style scoped>



</style>


 -->
