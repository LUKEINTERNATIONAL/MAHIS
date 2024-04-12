<template>
    <ion-grid>
        <ion-row>
            <ion-col>
                <ListPicker
                    :multiSelection="list_picker_prperties[0].multi_Selection"
                    :show_label="list_picker_prperties[0].show_list_label"
                    :uniqueId="list_picker_prperties[0].unqueId"
                    :name_of_list="main_program"
                    :choose_place_holder="list_picker_prperties[0].placeHolder"
                    :items_-list="activities"
                    :use_internal_filter="list_picker_prperties[0].use_internal_filter"
                    :disabled="list_picker_prperties[0].disabled.value"
                    @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
                    @item-list-filtered="list_picker_prperties[0].listFilteredFN"
                    @item-search-text="list_picker_prperties[0].searchTextFN"
                />
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { text } from "ionicons/icons"
import { it } from "date-fns/locale"
import { property } from "lodash"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonLabel,
    IonRow,
    IonGrid
} from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import ListPicker from "../../components/ListPicker.vue"
import { Service } from "@/services/service"

const main_program = ref('Manin Framework') as any
const activities = ref([] as any)

const knownLitsOfPrograms = ref([
    'HIV PROGRAM',
    'TB PROGRAM',
    'VHW PROGRAM',
    'EARLY INFANT DIAGNOSIS PROGRAM',
    'MDR-TB PROGRAM',
    'KAPOSIS SARCOMA PROGRAM',
    'CHRONIC CARE PROGRAM',
    'MATERNITY PROGRAM',
    'ANC PROGRAM',
    'DIABETES PROGRAM',
    'OPD Program',
    'IPD Program',
    'UNDER 5 PROGRAM',
    'CIVIL REGISTRATION PROGRAM',
    'HTC PROGRAM',
    'ANC CONNECT PROGRAM',
    'HYPERTENSION PROGRAM',
    'VMMC PROGRAM',
    'IPT Program',
    'Laboratory program',
    'CxCa program',
    'Triage Program',
    'RADIOLOGY PROGRAM',
    'PATIENT REGISTRATION PROGRAM',
    'AETC PROGRAM',
    'SPINE PROGRAM',
    'NCD PROGRAM'
])

const props = defineProps<{
    user_property: string,
    user_programs: any
}>()

onMounted(async () => {
    await getActivities(props.user_property)
    generatedSelected()

})

async function generatedSelected() {
    console.log("hhhhh")
    props.user_programs.forEach((selected: any) => {
        //console.log(generateKeyAPIRef(selected.name) )
        const is_P = generateKeyAPIRef(selected.name)
        let is_P2: any
        knownLitsOfPrograms.value.forEach(async (program: any) => {
            is_P2 = generateKeyAPIRef(program)
            if (is_P.exists == true && is_P2.exists == true) {
                console.log(is_P.ref_name)

                const activites = await getActivities(is_P.ref_name)
                
            }
        })


    })
}


function generateKeyAPIRef(program: string) {
    let keyRefAPIRefObj: any
    if (checkTextInString('opd', program) == true) {
        keyRefAPIRefObj = {
            ref_name: 'OPD_activities',
            exists: true
        } 
    }
    else {
        keyRefAPIRefObj = {
            ref_name: '',
            exists: false
        }
    }
    return keyRefAPIRefObj
} 

function checkTextInString(text: string, string: string | any[]) {
    text = text.toLowerCase();
    if (typeof string === 'string') {
        string = string.toLowerCase();
    } else if (Array.isArray(string)) {
        string = string.map(item => item.toLowerCase());
    }
    return string.includes(text);
}

async function getActivities(property: any) {
    const data = await Service.getJson('user_properties', {
        property: property,
    })
    const _activities_ = (stringToArray(data.property_value))
    const _temp_activities_ = [] as any
    _activities_.forEach((item: any) => {
        _temp_activities_.push({
            name: item
        })
    })
    activities.value = _temp_activities_
    return activities.value
}

function stringToArray(str: string) {
    return str.split(",");
}

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: 'qwerty_8_78' as any,
        name_of_list: 'Roles' as any,
        placeHolder: 'Search for an activity' as any,
        items: [],
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: ()=>{},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'select an actvity',
        disabled: ref(false) as any,
    },
]

function listUpdated1(data: any) {
    activities.value = data
}
</script>
<style scoped>
.ion-cls-lbl {
    font-size: 17px;
    font-weight: 600;
    line-height: 3;
}
</style>