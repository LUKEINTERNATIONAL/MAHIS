<template>
    <ion-grid>
        <ion-row>
            <ion-col>
                <ListPicker
                    :multiSelection="list_picker_prperties[0].multi_Selection"
                    :show_label="list_picker_prperties[0].show_list_label"
                    :uniqueId="uniqID"
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
import { defineComponent } from "vue";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import { IonContent, IonHeader, IonCol, IonItem, IonList, IonLabel, IonRow, IonGrid, IonButton } from "@ionic/vue";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import ListPicker from "../../components/ListPicker.vue";
import { Service } from "@/services/service";
import { NCD_PRIMARY_ACTIVITIES } from "@/apps/NCD/config/programActivities";
import { OPD_PRIMARY_ACTIVITIES } from "@/apps/OPD/config/programActivities";
import { UserService } from "@/services/user_service";

const main_program = ref("") as any;
const activities = ref([] as any);
const uniqID = ref() as any;
const REF_NAME = ref("") as any;

const props = defineProps<{
    user_programs: any;
    userId: any;
    action: any;
}>();

onMounted(async () => {
    activities.value = [];
    uniqID.value = generateUniqueId();
    await generatedSelected();
});

function generateUniqueId() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 16; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }
    return id;
}

watch(
    () => activities.value,
    async (newValue) => {
        if (newValue) {
            activities.value;
        }
    }
);

watch(
    () => props.action,
    async (newValue) => {
        saveK();
    }
);

async function generatedSelected() {
    const selected = props.user_programs;
    const is_P = await generateKeyAPIRef(selected.name);
    try {
        if (is_P.exists == true) {
            console.log(is_P.ref_name);
            const data_ = [] as any;
            const data = await getActivities(is_P.ref_name);
            activities.value.forEach((item: any) => {
                data.forEach((datum: any) => {
                    if (item.name == datum.name) {
                        item.selected = true;
                    }
                });
            });
        }
    } catch (error) {
        //console.error(error)
    }
}

async function saveK() {
    let activites_tr = "";
    activities.value.forEach((item: any, index: number) => {
        if (item.selected == true) {
            if (index == 0) {
                activites_tr += item.name;
            } else if (index > 0) {
                activites_tr += "," + item.name;
            }
        }
    });
    await postActivities(REF_NAME.value, removeLeadingComma(activites_tr));
}

function removeLeadingComma(str: string) {
    if (str.startsWith(",")) {
        return str.substring(1);
    }
    return str;
}

async function postActivities(_property_: string, selected: string) {
    const userActivities = {
        property: _property_,
        property_value: selected,
        user_id: props.userId,
    };
    try {
        const res = await Service.postJson("user_properties", userActivities);
    } catch (error) {}
}

async function postDumbActivities(_property_: string) {
    const userActivities = {
        property: _property_,
        property_value: "",
        user_id: props.userId,
    };
    try {
        const res = await Service.postJson("user_properties", userActivities);
    } catch (error) {}
}

async function generateKeyAPIRef(program: string) {
    main_program.value = program;
    let keyRefAPIRefObj: any;
    if (checkTextInString("opd", program) == true) {
        keyRefAPIRefObj = {
            ref_name: "OPD_activities",
            exists: true,
            activities: OPD_PRIMARY_ACTIVITIES,
        };
        activities.value = OPD_PRIMARY_ACTIVITIES;
        REF_NAME.value = keyRefAPIRefObj.ref_name;
        await initiateUserAcytcivities(keyRefAPIRefObj.ref_name);
    }

    if (checkTextInString("ncd", program) == true) {
        keyRefAPIRefObj = {
            ref_name: "NCD_activities",
            exists: true,
            activities: NCD_PRIMARY_ACTIVITIES,
        };
        activities.value = NCD_PRIMARY_ACTIVITIES;
        REF_NAME.value = keyRefAPIRefObj.ref_name;
        await initiateUserAcytcivities(keyRefAPIRefObj.ref_name);
    }
    // else {
    //     keyRefAPIRefObj = {
    //         ref_name: '',
    //         exists: false,
    //         activities: []
    //     }
    // }
    return keyRefAPIRefObj;
}

async function initiateUserAcytcivities(ref_name: string) {
    try {
        await getActivities(ref_name);
    } catch (error) {
        await postDumbActivities(ref_name);
    }
}

function checkTextInString(text: string, string: string | any[]) {
    text = text.toLowerCase();
    if (typeof string === "string") {
        string = string.toLowerCase();
    } else if (Array.isArray(string)) {
        string = string.map((item) => item.toLowerCase());
    }
    return string.includes(text);
}

async function getActivities(property: any) {
    const data = await Service.getJson("user_properties", {
        user_id: props.userId,
        property: property,
    });
    const _activities_ = stringToArray(data.property_value);
    const _temp_activities_ = [] as any;
    _activities_.forEach((item: any) => {
        _temp_activities_.push({
            name: item,
            selected: true,
        });
    });
    // activities.value = _temp_activities_
    return _temp_activities_;
}

function stringToArray(str: string) {
    return str.split(",");
}

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: "qwerty_8_78" as any,
        name_of_list: "Roles" as any,
        placeHolder: "Search for an activity" as any,
        items: [],
        listUpdatedFN: listUpdated1,
        listFilteredFN: () => {},
        searchTextFN: () => {},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: "select an actvity",
        disabled: ref(false) as any,
    },
];

function listUpdated1(data: any) {
    activities.value = data;
}
</script>
<style scoped>
.ion-cls-lbl {
    font-size: 17px;
    font-weight: 600;
    line-height: 3;
}
</style>
