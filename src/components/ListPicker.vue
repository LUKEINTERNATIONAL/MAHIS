<template>
    <ion-list style="background: none;">
        <ion-row>
            <ion-label v-if="show_label" :class="disableCls">{{ name_of_list }}: </ion-label>
            <ion-col style="width: 100%;">
            <ion-item lines="none" class="ItemAl modal_wrapper" style="display: flex; flex-wrap: wrap; margin-left: -30px; margin-top: 0%; background-color: inherit; background: inherit;">
                <div class="item-container">
                    <div v-for="(item, index) in local_itmes_List" :key="index">
                        <ion-button v-if="item.selected" @click="selectAl(item)" class="itemAlBtn">
                        {{ item.name }}
                        <ion-icon slot="end" style="font-size: x-large" :icon="closeOutline"></ion-icon>
                        </ion-button>
                    </div>
          
                    <ion-button
                        :id="uniqueId"
                        fill="clear" class="itemAlAddBtn"
                        @click="setFocus"
                        :disabled="local_disabled"
                        >
                            <ion-icon :icon="addOutline"></ion-icon>
                    </ion-button>
                    <ion-popover
                        class="popover-al"
                        :show-backdrop="false"
                        :trigger="uniqueId"
                        trigger-action="click"
                        @didPresent="dissmissDrugAddField"
                    >
                    <ion-content color="light" class="ion-padding content-al popover-content">
                        <ion-label>{{ choose_place_holder }}:</ion-label>
                        <div class="modern-input-container">
                            <input type="text" id="itemNameInput" class="modern-input" v-model="itemName" @input="FindItemName" placeholder="Enter name">
                        </div>
                        <ion-list class="custom-list">
                            <div v-for="(item, index) in items_List_copy" 
                                @click="selectAl(item)" 
                                :key="index"
                                class="list-item">
                                <div class="item-content">
                                    <span class="item-name">{{ item.name }}</span>
                                    <ion-icon v-if="item.selected" 
                                            class="icon-al" 
                                            :icon="checkmarkOutline">
                                    </ion-icon>
                                </div>
                            </div>
                        </ion-list>
                    </ion-content>
                </ion-popover>
                </div>
        

            </ion-item>
        </ion-col>
        </ion-row>
    </ion-list>
</template>
<script setup lang="ts">
import { IonList, IonLabel, IonRow, IonCol, IonItem, IonButton, IonIcon, IonInput, IonContent } from "@ionic/vue"
import { closeOutline, addOutline, checkmarkOutline } from "ionicons/icons"
import { ref, watch, onMounted } from "vue"
import BasicInputField from "@/components/BasicInputField.vue"

const input = ref()
const itemName = ref("")
const local_itmes_List = ref([] as any)
const local_disabled = ref(false)
const disableCls = ref('')

const props = defineProps<{
    uniqueId: "99"
    name_of_list: 'name of list',
    choose_place_holder: 'Choose placeholder',
    items_List: [{
        selected: false,
        name: '',
    }],
    multiSelection: false,
    show_label: true,
    use_internal_filter: true,
    disabled: false,
}>()

watch(
    () => props.items_List,
    async (newValue) => {

        if (newValue) {
            local_itmes_List.value = newValue
        } else {
            local_itmes_List.value = newValue
        }
        
    }
)
watch(
    () => props.disabled,
    async (newValue) => {
        isDisabled()
    }
)

onMounted(async () => {
    local_itmes_List.value = props.items_List
    isDisabled()
})

function isDisabled() {
    local_disabled.value = props.disabled
    if (props.disabled == true as boolean) {
        disableCls.value = "ion-lblCls-disabled"
    } else if (props.disabled == false as boolean) {
        disableCls.value = "ion-lblCls"
    }
}


function selectAl(sel_item: any) {
    if (props.multiSelection == false) {
        props.items_List.forEach((item: any) =>{
            item.selected = false
        })
    }
    props.items_List.forEach((item: any) => {
        if (item.name === sel_item.name) {
            item.selected = !item.selected;
        }
    })
    itemListUpDated()
}

const items_List_copy =  ref(props.items_List)

async function FindItemName(text: any) {
    const searchText = text.target.value
    itemSearchText(searchText)
    itemListFiltered(searchText)
}

function setFocus() {
    // input.value.$el.setFocus()
}

const emit = defineEmits<{
    (e: "itemListUpDated", ObjectsArray: any): void;
    (e: "itemListFiltered", ObjectsArray: any): void;
    (e: "itemSearchText", ObjectsArray: any): void;
}>();

function itemListUpDated() {
  emit("itemListUpDated", props.items_List)
}

function itemSearchText(searchString: string) {
    emit("itemSearchText", searchString)
}

function itemListFiltered(searchString: string) {
    if (props.use_internal_filter == true) {
        const items =  [...props.items_List]
        const filtered_items = [] as any
        searchString = searchString ? searchString.toString() : "";
        items.forEach((item: any) => {
            if (item.name.toLowerCase().includes(searchString.toLowerCase())) {
                filtered_items.push(item)
            }
        })
        items_List_copy.value = filtered_items
        emit("itemListFiltered", filtered_items)
    }
}

function dissmissDrugAddField(): void {
    // search_item.value = false;
    // display_item.value = true;
    // addItemButton.value = true;
}

</script>

<style scoped>
#container {
    text-align: center;
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
    --background: none !important;
    --border-radius: 5px;
    display: grid;
}
ion-button.itemAlBtn {
    flex: 0 1 auto;
    --background: #5cc55e;
    --color: #006401;
    font-size: 15px;
    font-weight: bold;
    text-transform: none;
}
.item-container {
  display: flex;
  flex-wrap: wrap;
}

.error-label {
    background: #5cc55e;
    color: #006401;
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
    font-weight: 530;
    font-size: 28px
}
.item-al {
    cursor: pointer;
    padding: 5px;
    background-color: #ebebeb;
    margin-top: 8px;
    font-weight: 530;
    font-size: 15px;
}
.item-al:hover {
    background-color: #55515148;
    padding: 5px;
    border-radius: 3px;
}
.popover-al {
    --width: 300px;
    --max-width: 90%;
    --background: #ffffff;
    --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    --backdrop-opacity: 0.3;
}
.popover-content {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
ion-content.content-al {
    --background: #fff;
}
.popover-al::part(content) {
    border-radius: 8px;
    padding: 0px;
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
.ion-lblCls {
    font-weight: bold;
    font-size: 15px;
    line-height: 3;
    border-radius: 10%;
    padding: 4px;
}
.ion-lblCls-disabled {
    font-weight: bold;
    font-size: 15px;
    color:#8c8c8c;
    line-height: 3;
    border-radius: 10%;
    padding: 4px;
}
.modern-input-container {
    margin: 2px;
    margin-bottom: 10px;
}

.modern-input {
    padding: 12px 20px;
    font-size: 18px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
}

.modern-input:focus {
    border-color: #34db6c;
    box-shadow: 0 0 0 3px rgba(71, 219, 52, 0.2);
}

.modern-input::placeholder {
    color: #696b6c;
}

.custom-list {
    background-color: #f4f4f4;
    border-radius: 8px;
    overflow: hidden;
    
}
.list-item {
    padding: 11px;
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.3s;
}
.list-item:last-child {
    border-bottom: none;
}
.list-item:hover {
    background-color: #e8e8e8;
    cursor: pointer;
}
.item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item-name {
    font-size: 18px;
    color: #333;
}
.icon-al {
    color: #4caf50;
    font-size: 20px;
}


</style>