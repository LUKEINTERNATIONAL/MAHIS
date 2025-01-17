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

const location_show_error = ref(false);
const locationData = ref([]) as any;
const selected_location = ref();
const selected_Districts = ref([]) as any;
const district_show_error = ref(false);
const selectedDistrictIds: any[] = [];
const disableFacilitySelection = ref(false);
const OLDDistrictsList = ref([] as any);
const TAList = ref([] as any);
const districtList = ref([] as any);

function selectedDistrictF(selectedDistrict: any, clearFL = false) {
    if (clearFL == true) {
        selected_location.value = null;
        selected_Districts.value = selectedDistrict;
    }
    selectedDistrict = [selectedDistrict];
    selectedDistrictIds.length = 0;

    const filteredDistricts = OLDDistrictsList.value.filter((district: any) => {
        return selectedDistrict.some((selected: any) => selected.name.toLowerCase() === district.name.toLowerCase());
    });

    filteredDistricts.forEach((district: any) => {
        selectedDistrictIds.push(district.district_id);
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
}

onMounted(async () => {
    OLDDistrictsList.value = await getdistrictList();
    districtList.value = await getFacilityDistricts();
});

async function getdistrictList() {
    const districtList = [];
    for (let i of [1, 2, 3]) {
        const districts: any = await LocationService.getDistricts(i);
        districtList.push(...districts);
    }

    districtList.forEach((district: any) => {
        selectedDistrictIds.push(district.district_id);
    });
    
    return districtList;
}

async function getFacilityDistricts() {
    const data = await LocationService.getFacilityDistricts();
    return data.districts;
}

function selectedLocation(data: any) {
    selected_location.value = data;
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