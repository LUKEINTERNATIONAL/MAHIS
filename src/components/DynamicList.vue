<template>
    <ion-item
        class="ionLbltp" v-for="(item, index) in localMedicalDrugsList" :key="index"
        @mousemove="highlightItem(index)" @mouseout="undoHighlightItem(index)"
    >
        <ion-col style="display: contents;">
            <ion-label :id="asignLblID(index)" class="drgNmTrpln" style="display: contents; color: #00190E; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ item.drugName }}</ion-label>
        </ion-col>

        <ion-col>
            <ion-label style="color: #636363; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ item.dose }} / {{ item.frequency }} / daily / {{ item.duration }} / until {{ item.prescription }}</ion-label>
        </ion-col>

        <ion-col class="action_buttons">
            <ion-label :class="asignSpanLblID(index)" style="cursor: pointer; display: none; text-align: end; flex: auto;" @click="editItemAtIndex(index)"><span v-html="iconsContent.edit" class="modify_buttons"></span></ion-label>
            <ion-label :class="asignSpanLblID(index)" style="cursor: pointer; display: none; text-align: end;" @click="removeItemAtIndex(index, $event)"><span v-html="iconsContent.delete" class="modify_buttons"></span></ion-label>
        </ion-col>

    </ion-item>
</template>

<script lang="ts">
import { IonItem, IonCol, IonLabel } from '@ionic/vue'
import { defineComponent } from 'vue'
import { createModal,popoverConfirmation,alertConfirmation } from '@/utils/Alerts'
import { icons } from '@/utils/svg.ts';
export default defineComponent({
    created() {
       // this.$emit('onFooterInstance', this)
    },
    components:{
        // IonContent,
        IonItem,
        IonCol,
        IonLabel
    },
    data() {
    return {
        iconsContent: icons,
        localMedicalDrugsList: [...this.$props._selectedMedicalDrugsList],
    }},
    props: {
        _selectedMedicalDrugsList: {
            type: Array,
            default: []
        },
    },
    watch: {

    },
    methods: {
        highlightItem(item: any) {
            const el = document.getElementById(item+'_lbl')
            if (el) {
                el.style.color = '#006401' 
            }
            this.highlightActionBtns(item)
        },
        undoHighlightItem(item: any) {
            const el = document.getElementById(item+'_lbl')
            if (el) {
                el.style.color = 'rgb(0,0,0)' 
            }
            this.undohighlightActionBtns(item)
        },
        highlightActionBtns(item: any) {
            const elements = document.getElementsByClassName(item+'_spanlbl') as any
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'block'
            }
        },
        undohighlightActionBtns(item: any) {
            const elements = document.getElementsByClassName(item+'_spanlbl') as any
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none'
            }
        },
        asignLblID(num: any) {
            return num + '_lbl' as string;
        },
        asignSpanLblID(num: any) {
            return num + '_spanlbl' as string;
        },
        removeItemAtIndex(index: any, e: Event) {
            popoverConfirmation("Do you want to delete it?",e as any)
            // this.localMedicalDrugsList.splice(index, 1)
        },
        editItemAtIndex(index: any) {
            this.$emit('edit-item', index)
        }
    }
})
</script>
<style>
ion-item.ionLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width:0;
}
.action_buttons{
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
}
.action_buttons:hover {
    cursor: pointer;
}
.modify_buttons{
    padding-left: 20px;
}
</style>