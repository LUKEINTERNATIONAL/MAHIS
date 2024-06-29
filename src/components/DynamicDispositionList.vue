<template>
    <ion-item
        :displayData="displayData"
        class="ionLbltp" v-for="(item, index) in displayData" :key="index"
        @mousemove="highlightItem(index)" @mouseout="undoHighlightItem(index)">

        <ion-col class="col-st1">
            <ion-label :id="asignLblID(index)" class="truncate-text" style="color: #00190E; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ (item as any).type }}</ion-label>
        </ion-col>

        <ion-col class="col-st2">
            <ion-label class="truncate-text" style="color: #636363; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;"><span class="spaceBetween"></span> {{ (item as any).name }} <span class="spaceBetween"></span>{{ (item as any).reason }}<span class="spaceBetween"></span>{{ fomartDate((item as any).date) }}</ion-label>
        </ion-col>

        <ion-col class="action_buttons">
            <ion-label :class="asignSpanLblID(index)" style="cursor: pointer; display: none; text-align: end; flex: auto;" @click="$emit('update:editItem', index)"><ion-icon   :icon="iconsContent.edit"></ion-icon></ion-label>
            <ion-label :class="asignSpanLblID(index)" style="cursor: pointer; display: none; text-align: end;" @click="removeItemAtIndex(index, $event)"><ion-icon   :icon="iconsContent.delete"></ion-icon></ion-label>
        </ion-col>

    </ion-item>
</template>

<script lang="ts">

import { IonItem, IonCol, IonLabel } from '@ionic/vue'
import { defineComponent } from 'vue'
import { createModal,popoverConfirmation,alertConfirmation } from '@/utils/Alerts'
import { icons } from '@/utils/svg';

export default defineComponent({

    components:{
        IonItem,
        IonCol,
        IonLabel
    },

    data() {
    return {
        iconsContent: icons,
    }},
    props: {
        displayData: {
            type: Array,
            default: []
        },
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
                this.$emit('update:removeItem', index)
            }
        },
        fomartDate(date: any) {
            const year = date.year;
            const month = (date.month < 10 ? '0' : '') + date.month;
            const day = (date.day < 10 ? '0' : '') + date.day;
            return year + '-' + month + '-' + day;
        }
    }
})
</script>

<style scoped>
.spaceBetween {
    margin-left: 10px;
    margin-right: 10px;
}
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
</style>