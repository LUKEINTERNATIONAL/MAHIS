<template>
    <ion-row>
        <ion-list style="width: 100%;">
            <ion-radio-group :compareWith="compareWith" @ionChange="handleChange($event)" value="start">
                <ion-item v-for="lotnumber in lotNumbers" :key="lotnumber.id">
                    <ion-radio :value="lotnumber">{{ lotnumber.lotNumber }}</ion-radio>
                </ion-item>
            </ion-radio-group>
        </ion-list>
    </ion-row>
</template>

  
<script lang="ts">
import { IonRadio, IonRadioGroup, IonItem, IonList } from '@ionic/vue'
import { defineComponent, PropType } from 'vue'
import { toastWarning } from "@/utils/Alerts"
import { StockService } from '@/services/stock_service'
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import _ from 'lodash'

export default defineComponent({
    components: { IonRadioGroup, IonRadio, IonItem, IonList },
    props: {
        action: {
            type: Function as PropType<() => void>,
            required: true
        },
    },
    async mounted() {
        this.loadCurrentSelectedDrug()
    },
    data() {
        return {
            lotNumbers: [] as any,
            selectedOption: {} as any,
        }
    },
    methods: {
        compareWith(o1: any, o2: any) {
            return o1.id === o2.id;
        },
        handleChange(ev: any) {
            this.selectedOption = ev.detail.value
        },
        checkIfSelected() {
            if (_.has(this.selectedOption, 'lotNumber')) {
                return true;
            } else {
                toastWarning("Select a batch number!");
                return false;
            }
        },
        performAction() {
            if (this.checkIfSelected() == true) {
                this.$emit('actionTriggered', this.selectedOption);
            }   
        },
        async loadCurrentSelectedDrug() {
            const store = useAdministerVaccineStore();
            const currentDrug = store.getCurrentSelectedDrug();
            await this.formBatchList(currentDrug.drug.drug_id)
        },
        async formBatchList(drugId: number) {
            try {
                const store = useAdministerVaccineStore()
                const data = store.getLotNumberData()

                if(data.length == 0) {
                    this.$emit('emptyList', '');
                }

                data.forEach((drug: any) => {
                    const listItem = { 
                        id: drug.id,
                        lotNumber: drug.batch_number,
                    }
                    this.lotNumbers.push(listItem)
                })
            } catch (error) {
                
            }
        }
    },
});
</script>
