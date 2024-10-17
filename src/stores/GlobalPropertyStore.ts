import { defineStore } from "pinia";
import { Service } from "@/services/service";
import { useUserStore } from "@/stores/userStore";

export const useGlobalPropertyStore = defineStore("globalPropertyStore", {
    state: () => ({
        globalPropertyStore: {
            sitePrefix: false as any,
            dde_enabled: false as any,
            weekDaysPropertiesObj: {} as any,
            maximumNumberOfCForEachDayObj: {} as any,
            holidayDatesObj: {} as any,
        },
    }),
    actions: {
        async loadSitePrefix() {
            const req = await Service.getJson("global_properties", { property: "site_prefix" });
            this.globalPropertyStore.sitePrefix = req["site_prefix"];
        },
        async loadDDEStatus() {
            const req = await Service.getJson("global_properties", { property: "dde_enabled" });
            this.globalPropertyStore.dde_enabled = req["dde_enabled"];
        },
        async loadHolidayDateProperty() {
            const user_store = useUserStore();
            const facility_id = user_store.getfacilityLocation().location_id;
            const req = await Service.getJson("global_properties", { property: "holiday_date_"+facility_id });
            this.globalPropertyStore.holidayDatesObj = req["holiday_date_"+facility_id];
        },
        async loadWeekDaysProperty() {
            const user_store = useUserStore();
            const facility_id = user_store.getfacilityLocation().location_id;
            const req = await Service.getJson("global_properties", { property: "week_days_properties_"+facility_id });
            this.globalPropertyStore.holidayDatesObj = req["week_days_properties_"+facility_id];
        },
        async loadMaximumNumberOfCForEachDayProperty() {
            const user_store = useUserStore();
            const facility_id = user_store.getfacilityLocation().location_id;
            const req = await Service.getJson("global_properties", { property: "maximum_number_Of_c_for_each_day_"+facility_id });
            this.globalPropertyStore.maximumNumberOfCForEachDayObj = req["maximum_number_Of_c_for_each_day_"+facility_id]; 
        },
        async loadGlobalProperty() {
            await this.loadDDEStatus();
            await this.loadSitePrefix();
            await this.loadHolidayDateProperty()
            await this.loadWeekDaysProperty()
            await this.loadMaximumNumberOfCForEachDayProperty()
        },
        async setGlobalProperty(prop: any, val: any) {
            await Service.postJson("global_properties", {
                property: prop,
                property_value: val,
            });
            await this.loadGlobalProperty();
        },
    },
    persist: true,
});
