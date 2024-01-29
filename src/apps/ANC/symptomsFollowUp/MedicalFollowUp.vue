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
        import {useSymptomsFollowUpStore} from "@/apps/ANC/store/symptomsFollowUpStore";
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
                const trial = useSymptomsFollowUpStore();
                const otherSite = useMedicalHistoryStore()
            },
            computed:{
                ...mapState(useSymptomsFollowUpStore,["trial"]),
                ...mapState(useMedicalHistoryStore,["otherSite"])
            },
        })
</script>



<style></style>@/apps/ANC/store/medicalFollowUpStore