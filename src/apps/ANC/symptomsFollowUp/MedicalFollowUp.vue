<template>
    <ion-list>
            <div class="sub_item_body">
                <BasicForm :contentData="otherSite" />
            </div>
        <ion-item class="sub_item_body_close"/>
    </ion-list>
</template>



<script lang="ts">
        import{IonList,IonItem} from "@ionic/vue"
        import { mapState } from 'pinia';
        import {defineComponent} from 'vue';
        import {useMedicalFollowUpStore} from "@/apps/ANC/store/medicalFollowUpStore";
        import BasicForm from '@/components/BasicForm.vue';
         import {useMedicalHistoryStore} from "@/apps/ANC/store/medicalHistoryStore";

        export default defineComponent({
            name: "SymptomsFollowUp",
            comments:{
                IonList,
                IonItem,
                BasicForm,
            },
            mounted(){
                const trial = useMedicalFollowUpStore();
                const otherSite = useMedicalHistoryStore()
            },
            computed:{
                ...mapState(useMedicalFollowUpStore,["trial"]),
                ...mapState(useMedicalHistoryStore,["otherSite"])
            },
        })
</script>



<style></style>