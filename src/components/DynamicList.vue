<template>
    <div id="df"
        class="ionLbltp" v-for="(item, index) in localMedicalDrugsList" :key="index"
        @mousemove="highlightItem(index)" @mouseout="undoHighlightItem(index)">
        <ion-row>
            <ion-col  class="" :class="highLightBnd(item)">
                <ion-label :id="asignLblID(index)" class="" style="color: #00190E; font-weight: 700; font: inter; line-height: 14px; line-height: 21px;">{{ item.drugName }}</ion-label>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col size="10" class="" :class="highLightBnd(item)">
                <ion-label class="truncate-text" style="color: #636363; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ item.dose }} / {{ item.frequency }} / daily / {{ item.duration }} / until {{ item.prescription }} (<span style="color: red;">{{ item.route_name }}</span>)</ion-label>
            </ion-col>

            <ion-col :class="highLightBnd(item)" size="2" v-if="show_actions_buttons" class="action_buttons">
                <ion-label :class="asignSpanLblID(index)" style="cursor: pointer; display: none; margin-right: 20px; text-align: end; flex: auto;" @click="editItemAtIndex(index)"><ion-icon   :icon="iconsContent.edit"></ion-icon></ion-label>
                <ion-label :class="asignSpanLblID(index)" style="cursor: pointer; display: none; text-align: start;" @click="removeItemAtIndex(index, $event)"><ion-icon   :icon="iconsContent.delete"></ion-icon></ion-label>
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import { IonItem, IonCol, IonLabel } from '@ionic/vue'
import { defineComponent } from 'vue'
import { createModal,popoverConfirmation,alertConfirmation } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
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
        localMedicalDrugsList: [...this.$props._selectedMedicalDrugsList] as any,
    }},
    props: {
        _selectedMedicalDrugsList: {
            type: Array,
            default: []
        },
        show_actions_buttons: {
            type: Boolean,
            default: true
        },
        highLightBackground: {
            type: String,
            default: "item-native"
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
        async removeItemAtIndex(index: any, e: Event) {
            const deleteConfirmed = await popoverConfirmation("Do you want to delete it?",e as any)
            if (deleteConfirmed) {
                this.$emit('remove-item', index)
            }
        },
        editItemAtIndex(index: any) {
            this.$emit('edit-item', index)
        },
        highLightBnd(item: any) {
            if (item.highlightbackground !== undefined && item.highlightbackground == true) {
                return this.$props.highLightBackground
            }
        }
    }
})
</script>
<style>
ion-item.ionLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width:0;
    cursor: pointer;
}
.action_buttons{
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
}
#df {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width:0;
    cursor: pointer;
    border-bottom: 2px solid #b3b3b3;
    border-bottom-style: solid;
    border-bottom-style: dashed;
}
.action_buttons:hover {
    cursor: pointer;
}
.modify_buttons{
    padding-left: 20px;
}
.truncate-text {
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
}
.col-st1 {
    max-width: 23%;
}
.col-st2 {
    max-width: 58%;
}
.item-native {
    background-color: yellow !important;
}
</style>