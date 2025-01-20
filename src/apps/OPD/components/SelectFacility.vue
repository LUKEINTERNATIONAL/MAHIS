<template>
        <ion-row>
            <ion-col>
                <VueMultiselect
                    v-model="selected_Districts"
                    @update:model-value="selectedDistrictF($event, true)"
                    :multiple="false"
                    :taggable="false"
                    :hide-selected="true"
                    :close-on-select="true"
                    openDirection="bottom"
                    tag-placeholder="Find and select District"
                    placeholder="Find and select District"
                    selectLabel=""
                    label="name"
                    :searchable="true"
                    @search-change=""
                    track-by="id"
                    :options="districtList"
                    :disabled="disableFacilitySelection"
                />

                <div>
                    <ion-label v-if="district_show_error" class="error-label">
                        {{ 'Select district' }}
                    </ion-label>
                </div>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                    <VueMultiselect
                        v-model="selected_location"
                        @update:model-value="selectedLocation($event)"
                        :multiple="false"
                        :taggable="false"
                        :hide-selected="true"
                        :close-on-select="true"
                        openDirection="bottom"
                        tag-placeholder="Find and select facility"
                        placeholder="Find and select facility"
                        selectLabel=""
                        label="name"
                        :searchable="true"
                        :disabled="disableFacilitySelection"
                        @search-change="($event)=>{}"
                        track-by="code"
                        :options="locationData"
                    />

                    <div>
                        <ion-label v-if="location_show_error" class="error-label">
                            {{ 'Select location' }}
                        </ion-label>
                    </div>

            </ion-col>
        </ion-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "xxxComponent",
});
</script>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import { LocationService } from "@/services/location_service";
import VueMultiselect from "vue-multiselect";

// Refs
const location_show_error = ref(false)
const locationData = ref<any[]>([])
const selected_location = ref<Location | null>(null)
const selected_Districts = ref<any[]>([])
const district_show_error = ref(false)
const selectedDistrictIds = ref<any[]>([])
const disableFacilitySelection = ref(false)
const OLDDistrictsList = ref<any[]>([])
const districtList = ref<any[]>([])

interface Props {
  show_error: boolean;
  selected_district_ids: any[];
  selected_location: Location | null;
}

const props = withDefaults(defineProps<Props>(), {
  show_error: false,
  selected_district_ids: () => [],
  selected_location: null
})

watch(
  () => props.selected_district_ids,
    async (newValue: any) => {
        const [oldDistricts, facilityDistricts] = await Promise.all([
            getdistrictList(),
            getFacilityDistricts()
        ])

        OLDDistrictsList.value = oldDistricts
        districtList.value = facilityDistricts

        selectedDistrictIds.value = []
        if (Array.isArray(newValue)) {
            selectedDistrictIds.value = [...newValue]

            districtList.value.forEach((district: any) => {
                selectedDistrictIds.value.forEach((districtId: any) => {
                    if (district.id === districtId) {
                        selected_Districts.value =district
                    }
                })
            });
        }
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.selected_location,
    async (newValue: any) => {
        const [oldDistricts, facilityDistricts] = await Promise.all([
            getdistrictList(),
            getFacilityDistricts()
        ])

        OLDDistrictsList.value = oldDistricts
        districtList.value = facilityDistricts
    
        if (newValue) {
            selected_location.value = newValue
        }
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(async () => {
    OLDDistrictsList.value = await getdistrictList();
    districtList.value = await getFacilityDistricts();
});

watch(
    () => props.show_error,
    async (newValue) => {
        changeErrValues();
    }
);

const changeErrValues = () => {
    location_show_error.value = props.show_error;
    district_show_error.value = props.show_error;
};      


function selectedDistrictF(selectedDistrict: any, clearFL = false) {
    if (clearFL == true) {
        selected_location.value = null;
        selected_Districts.value = selectedDistrict;
    }
    selectedDistrict = [selectedDistrict];
    selectedDistrictIds.value.length = 0;

    const filteredDistricts = OLDDistrictsList.value.filter((district: any) => {
        return selectedDistrict.some((selected: any) => selected.name.toLowerCase() === district.name.toLowerCase());
    });

    filteredDistricts.forEach((district: any) => {
        selectedDistrictIds.value.push(district.district_id);
    });

    getDistrictFacilities(selectedDistrict);
}

async function getDistrictFacilities(selectedDistrict: any) {
    locationData.value = [];

    for (const district of selectedDistrict) {
        try {
            const temp_data1 = await LocationService.getDistrictFacilities(district.name.toLowerCase());
            locationData.value.push(...temp_data1.facilities);
        } catch (error) {
            console.error(`Error fetching facilities for district ${district.name}:`, error);
        }
    }

    facilitySelected({
        selected_district_ids: selectedDistrictIds.value,
        selected_location: null,
    });
}

async function getdistrictList() {
    const districtList = [];
    for (let i of [1, 2, 3]) {
        const districts: any = await LocationService.getDistricts(i);
        districtList.push(...districts);
    }

    districtList.forEach((district: any) => {
        selectedDistrictIds.value.push(district.district_id);
    });

    return districtList;
}

async function getFacilityDistricts() {
    const data = await LocationService.getFacilityDistricts();
    return data.districts;
}

function selectedLocation(data: any) {
    selected_location.value = data;
    facilitySelected({
        selected_district_ids: selectedDistrictIds.value,
        selected_location: selected_location.value,
    });
}

const emit = defineEmits<{
    (e: "facilitySelected", data_obj: any): void;
}>();

function facilitySelected(value: any) {
    emit("facilitySelected", value);
}

</script>

<style scoped>
    .error-label {
        background: #fecdca;
        color: #b42318;
        text-transform: none;
        padding: 5%;
        padding-top: 2%;
        padding-bottom: 2%;
        border-radius: 10px;
        margin-top: 4px;
        display: flex;
        text-align: center;
    }
</style>