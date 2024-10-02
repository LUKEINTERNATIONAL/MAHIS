<template>
    <ion-row>
        <ion-card class="shadowless-card" style="width: 100%; padding: 0;">
            <ion-list>
                <ion-radio-group :compareWith="compareWith" @ionChange="handleChange($event)" value="start">
                    <ion-item v-for="lotnumber in lotNumbers" :key="lotnumber.id">
                        <ion-radio :value="lotnumber">{{ lotnumber.lotNumber }}</ion-radio>
                    </ion-item>
                </ion-radio-group>
            </ion-list>
        </ion-card>
    </ion-row>
</template>

<script lang="ts">
import { IonRadio, IonRadioGroup, IonItem, IonList } from '@ionic/vue'
import { defineComponent, PropType } from 'vue'
import { toastWarning } from "@/utils/Alerts"
import { StockService } from '@/services/stock_service'
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { checkDrugName } from "@/apps/Immunization/services/vaccines_service";
import _ from 'lodash'

export default defineComponent({
    components: { IonRadioGroup, IonRadio, IonItem, IonList },
    props: {
        action: {
            type: Function as PropType<() => void>,
            required: true
        },
        retro: {
            type: Boolean,
            required: true
        }
    },
    async mounted() {
        this.loadCurrentSelectedDrug()
    },
    watch: {
    retro: {
      handler() {
        this.checkToShow()
      },
      deep: true, // `deep` is not needed for primitive types like Boolean
    },
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
                if (this.checkDrugNameInt() == true) {
                    return true;
                } else {
                    toastWarning("Select a batch number!");
                    return false;
                }
            }
        },
        performAction() {
            if (this.checkIfSelected() == true) {
                this.$emit('actionTriggered', this.selectedOption);
            }   
        },
        async loadCurrentSelectedDrug() {
            try {
                const store = useAdministerVaccineStore();
                const currentDrug = store.getCurrentSelectedDrug();
                await this.formBatchList(currentDrug.drug.drug_id)   
            } catch (error) {
                
            }
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
                this.checkToShow()
            } catch (error) {
                
            }
        },
        addUnkownLotNumberOption() {
            const store = useAdministerVaccineStore();
            const currentDrug = store.getCurrentSelectedDrug();
            console.log(currentDrug.drug)
            this.lotNumbers.push({
                id: currentDrug.drug.drug_id,
                lotNumber: 'Unknown',
            })
        },
        checkToShow() {
            if (this.$props.retro == true) {
                    this.addUnkownLotNumberOption()
            }
            this.checkDrugNameInt()
        },
        checkDrugNameInt() {
            const store = useAdministerVaccineStore();
            const currentDrug = store.getCurrentSelectedDrug();
            if (checkDrugName(currentDrug.drug) == true) {
                this.lotNumbers = []
                this.lotNumbers.push({
                    id: currentDrug.drug.drug_id,
                    lotNumber: 'Unknown',
                })
                return true
            } else {
                return false
            }
        },
    },
});
</script>
<style scoped>
.shadowless-card {
    box-shadow: none;
    border: none;
    background: none;
}
</style>
