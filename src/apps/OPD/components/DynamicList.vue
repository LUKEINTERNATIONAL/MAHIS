<template>

    <ion-item v-for="(item, index) in localMedicalDrugsList" class="ionLbltp" :key="index"
        @mousemove="highlightItem(index)" @mouseout="undoHighlightItem(index)">
        <ion-row>
            <ion-col class="col-st1">
                <ion-checkbox :id="index" @ionChange="$emit('clickt', $event)" justify="start" labelPlacement="end"
                    :checked=true>
                    <div style="display: flex; padding: 0.3em; ">
                        <ion-label :id="asignLblID(index)"
                            style="width: 260px; color: #00190E; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ item.drugName }}</ion-label>
                        <ion-label class="padding"></ion-label>
                        <ion-label
                            style="color: #636363; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">
                            {{ item.frequency }} /{{ " for" }} {{ item.duration }} days
                        </ion-label>
                    </div>
                </ion-checkbox>
            </ion-col>
            <ion-col>
                <ion-item class="input_item">
                    <ion-input placeholder="Quantity"></ion-input>
                </ion-item>
            </ion-col>
        </ion-row>
    </ion-item>

</template>

<script lang="ts">
import { IonItem, IonCol, IonLabel } from '@ionic/vue'
import { defineComponent } from 'vue'
import { createModal, popoverConfirmation, alertConfirmation } from '../../../utils/Alerts'
import { icons } from '../../../utils/svg';
export default defineComponent({
    created() {
        // this.$emit('onFooterInstance', this)
    },
    components: {
        // IonContent,
        IonItem,
        IonCol,
        IonLabel
    },
    data() {
        return {
            iconsContent: icons,
            localMedicalDrugsList: [...this.$props._selectedMedicalDrugsList] as any,
        }
    },
    props: {
        _selectedMedicalDrugsList: {
            type: Array,
            default: []
        },
        show_actions_buttons: {
            type: Boolean,
            default: true
        }
    },
    watch: {

    },
    methods: {
        highlightItem(item: any) {
            const el = document.getElementById(item + '_lbl')
            if (el) {
                el.style.color = '#006401'
            }
            this.highlightActionBtns(item)
        },
        undoHighlightItem(item: any) {
            const el = document.getElementById(item + '_lbl')
            if (el) {
                el.style.color = 'rgb(0,0,0)'
            }
            this.undohighlightActionBtns(item)
        },
        highlightActionBtns(item: any) {
            const elements = document.getElementsByClassName(item + '_spanlbl') as any
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'block'
            }
        },
        undohighlightActionBtns(item: any) {
            const elements = document.getElementsByClassName(item + '_spanlbl') as any
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
            const deleteConfirmed = await popoverConfirmation("Do you want to delete it?", e as any)
            if (deleteConfirmed) {
                this.$emit('remove-item', index)
            }
        },
        editItemAtIndex(index: any) {
            this.$emit('edit-item', index)
        }
    }
})
</script>
<style>
.input_item {
    width: 150px;
    height: 50px;
    margin-top: 5px;
}

.spacing {
    width: 100px;
}

.padding {
    padding: 0px 10px;
}

ion-item.ionLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
    cursor: pointer;
}

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
}

.action_buttons:hover {
    cursor: pointer;
}

.modify_buttons {
    padding-left: 20px;
}

.col-st1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 180rem;

}
</style>