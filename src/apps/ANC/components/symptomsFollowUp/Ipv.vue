<template>
    <ion-list>
        <ion-item  class="dashed_bottom_border" style="font-weight: bold;">
             Presenting signs and symptoms that trigger suspicion of IPV and clinical inquiry
        </ion-item>     
        <div class="sub_item_body">
            <BasicForm :contentData="ipv" />
        </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useIpvStore} from "@/apps/ANC/store/symptomsFollowUp/ipvStore";
 import BasicForm from '@/components/BasicForm.vue';
import { getCheckboxSelectedValue, modifyCheckboxValue } from "@/services/data_helpers";


export default defineComponent({
    name:"Persistent Behaviour",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },

    mounted(){
        const  ipv =useIpvStore()
        this.handleNone()
    },
    watch:{
        ipv:{
            handler(){
                this.handleNone()
            },
            deep:true
        }
    },
      computed:{
        ...mapState(useIpvStore,["ipv"]),
    },
    methods:{
        handleNone(){
        const checkBoxes=["Ongoing stress","Injury to abdomen","Partner's intrusive during consultations","Misuse of alcohol","Unspecified harmful behaviours","Thoughts of self-harm","Unwanted Pregnancies","Misuse of drugs",]

      if (getCheckboxSelectedValue(this.ipv, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.ipv, checkbox, 'checked', false);
            modifyCheckboxValue(this.ipv, checkbox, 'disabled', true);
        });
        } else {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.ipv, checkbox, 'disabled', false);
        });
    }
        },
    }
})
</script>
<style scoped>
.sub_item_body{
    margin-left: 45px;
}

ion-item.sub_item_body_close {
        border-bottom: 2px dotted var(--ion-color-medium);
        --inner-border-width:0;
    }
</style>
@/apps/ANC/store/symptomsFollowUpStore/ipvStore