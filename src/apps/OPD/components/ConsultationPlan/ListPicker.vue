<template>
    <ion-list>
        <ion-label>{{ name_of_list }}</ion-label>
        <ion-row>
            <ion-item lines="none" class="ItemAl">
            <ion-row>
                <div v-for="(item, index) in items_List as any" :key="index">
                    <ion-button v-if="item.selected" @click="selectAl(item)" class="itemAlBtn">
                        {{ item.name }}
                    <ion-icon slot="end" style="font-size: x-large" :icon="closeOutline"></ion-icon>
                    </ion-button>
                </div>

                <div>
                    <ion-button id="click-trigger-dup" fill="clear" class="itemAlAddBtn" @click="setFocus">
                        <ion-icon :icon="addOutline"></ion-icon>
                    </ion-button>
                    <ion-popover
                        class="popover-al"
                        :show-backdrop="false"
                        trigger="click-trigger-dup"
                        trigger-action="click"
                    >
                    <ion-content color="light" class="ion-padding content-al">
                        <ion-label>{{ choose_place_holder }}</ion-label>
                        <ion-input ref="input" v-model="itemName" @ionInput="FindItemName" fill="outline"></ion-input>
                        <ion-list class="list-al">
                            <div class="item-al" v-for="(item, index) in items_List" @click="selectAl(item)" :key="index">
                                <ion-label style="display: flex; justify-content: space-between">
                                    {{ item.name }}
                                    <ion-icon v-if="item.selected" class="icon-al" :icon="checkmarkOutline"></ion-icon>
                                </ion-label>
                            </div>
                        </ion-list>
                    </ion-content>
                </ion-popover>
                </div>
            </ion-row>
            </ion-item>
        </ion-row>
    </ion-list>
</template>
<script setup lang="ts">
import { IonList, IonLabel, IonRow, IonItem, IonButton, IonIcon, IonInput, IonPopover, IonContent } from "@ionic/vue"
import { closeOutline, addOutline, checkmarkOutline } from "ionicons/icons"
import { ref, watch } from "vue"

const input = ref()
const itemName = ref("")

const props = defineProps<{
    name_of_list: 'name of list',
    choose_place_holder: 'Choose placeholder',
    items_List: []
}>()


function selectAl(sel_item: any) {
    props.items_List.forEach((item: any) => {
        if (item.name === sel_item.name) {
            item.selected = !item.selected;
        }
    })
    itemListUpDated()
}


async function FindItemName(text: any) {
    const searchText = text.target.value
}

function setFocus() {
    input.value.$el.setFocus();
}

const emit = defineEmits<{
  (e: "itemListUpDated", timeObject: any): void;
}>();

function itemListUpDated() {
  emit("itemListUpDated", props.items_List)
}

</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
ion-item.ItemAl {
    --background: #fff;
    --border-radius: 5px;
}
ion-button.itemAlBtn {
    --background: #fecdca;
    --color: #b42318;
    text-transform: none;
}
.error-label {
    background: #fecdca;
    color: #b42318;
    text-transform: none;
    padding: 6%;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
}
ion-button.itemAlAddBtn {
    font-size: large;
}
ion-icon.icon-al {
    /* margin-left: 40%; */
    font-size: x-large;
    margin-bottom: -5px;
}
.item-al {
    cursor: pointer;
    padding: 5px;
    background-color: #ebebeb;
    margin-top: 8px;
}
.item-al:hover {
    background-color: #55515148;
    padding: 5px;
    border-radius: 3px;
}
ion-popover.popover-al {
    --background: #fff;
}
ion-content.content-al {
    --background: #fff;
}
ion-list.list-al {
    --background: #fff;
    -ion-item-background: #fff;
}

.checkLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
}
.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
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
.spcls {
    display: flex;
    align-items: center;
}
.previousView {
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
}
.previousLabel {
    font-weight: 600;
    color: #000;
}
.previousLabelDate {
    font-weight: 600;
    color: #000;
    margin: 2%;
}
.previousSecDrgs {
    margin: 2%;
}
.notes_p {
    margin: 4%;
}
</style>