<template>
    <ion-list>
        <ion-row>
            <ion-col>
                <ListPicker
                    :multiSelection="list_picker_prperties[0].multi_Selection"
                    :show_label="list_picker_prperties[0].show_list_label"
                    :uniqueId="list_picker_prperties[0].unqueId"
                    :name_of_list="list_picker_prperties[0].name_of_list"
                    :choose_place_holder="list_picker_prperties[0].placeHolder"
                    :items_-list="list_picker_prperties[0].items"
                    :use_internal_filter="list_picker_prperties[0].use_internal_filter"
                    @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
                    @item-list-filtered="list_picker_prperties[0].listFilteredFN"
                    @item-search-text="list_picker_prperties[0].searchTextFN"
                />

                <div>
                    <ion-label v-if="list_picker_prperties[0].show_error" class="error-label">{{ list_picker_prperties[0].error_message }}</ion-label>
                </div>
            </ion-col>
            <ion-col>
                <div style="margin-top: 7%;">
                    <DatePicker
                        :place_holder="date_properties[0].placeHolder"
                        @time-up-dated="date_properties[0].dataHandler"
                    />

                    <div>
                        <ion-label v-if="date_properties[0].show_error" class="error-label">{{ date_properties[0].error_message }}</ion-label>
                    </div>
                </div>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="pencilOutline"
                    :inputValue="note_properties[0].dataValue.value"
                />

                <div>
                    <ion-label v-if="note_properties[0].show_error" class="error-label">{{ note_properties[0].error_message }}</ion-label>
                </div>
            </ion-col>
        </ion-row>
    </ion-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "xxxComponent",
});
</script>

<script setup lang="ts">
import { IonRow, IonCol, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonLabel } from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import {
    checkmark,
    pulseOutline,
    addOutline,
    closeOutline,
    checkmarkOutline,
    filter,
    chevronDownOutline,
    chevronUpOutline,
    codeSlashOutline,
    phoneLandscape,
    phonePortraitOutline,
    locationOutline,
    personCircleOutline,
    medicalOutline,
    pencilOutline
} from "ionicons/icons";
import ListPicker from "@/apps/OPD/components/ConsultationPlan/ListPicker.vue"
import DatePicker from "@/apps/OPD/components/ConsultationPlan/DatePicker.vue"
import BasicInputField from "@/components/BasicInputField.vue"
import { LocationService } from "@/services/location_service"
import { isEmpty } from "lodash"

const FacilityData = ref([] as any)

onMounted(async () => {
    findWardName('')
})

const note_properties = [
    {
        placeHolder: 'Reason',
        dataHandler: notesUpDated_fn1,
        dataValue: ref(),
        show_error: false,
        error_message: 'please provide a reason'
    },
]

const date_properties = [
    {
        placeHolder: {default: 'Enter date'} as any,
        dataHandler: dateUpdate_fn1,
        dataValue: ref(),
        show_error: false,
        error_message: 'please provide date'
    }
]

function dateUpdate_fn1(data: any) {
    date_properties[0].dataValue.value = data
}

function notesUpDated_fn1(data: any) {
    note_properties[0].dataValue.value = data
}

const list_picker_prperties = [
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: 'qwerty4' as any,
        name_of_list: 'Choose Facility' as any,
        placeHolder: 'Choose one' as any,
        items: FacilityData.value,
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: findWardName,
        use_internal_filter: true as any,
        show_error: false,
        error_message: 'please select a Facility',
    }
]

const uniqueLocations = new Set()
async function findWardName(data: any) {
    const srch_text = data
    const temp_data1 = await LocationService.getFacilities({ name: srch_text })
    temp_data1.forEach((item: any) => {
        if (!uniqueLocations.has(item.location_id)) {
            uniqueLocations.add(item.location_id)
            if (isEmpty(item.name) == false) {
                FacilityData.value.push({name: item.name,selected: false})
            }
        }
    })
}


function listUpdated1(data: any) {
    FacilityData.value = data
}

function validateForm() {
    console.log("QWERTYUIOIUYGTFGHJK")
    const temp_data_v = []
    FacilityData.value.forEach((item: any) => {
        if (item.selected == true) {
            temp_data_v.push(item)
        }
    })

    if (temp_data_v.length > 0) {
        list_picker_prperties[0].show_error = false 
    } else {
        list_picker_prperties[0].show_error = true
    }

    if (isEmpty(note_properties[0].dataValue.value) == true) {
        note_properties[0].show_error = true
    } else {
        note_properties[0].show_error = false  
    }

    if (isEmpty(date_properties[0].dataValue.value) == true) {
        date_properties[0].show_error = true 
    } else {
        date_properties[0].show_error = false
    }
}

</script>

<style scoped>
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
</style>