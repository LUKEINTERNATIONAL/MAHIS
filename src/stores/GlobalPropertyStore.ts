import { defineStore } from "pinia";
import { Service } from "@/services/service";

export const useGlobalPropertyStore = defineStore("globalPropertyStore", {
    state: () => ({
        globalPropertyStore: {
            sitePrefix: false,
            dde_enabled: false,
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
        async loadGlobalProperty() {
            await this.loadSitePrefix();
            await this.loadDDEStatus();
        },
        async setGlobalProperty(prop: any, val: any) {
            await Service.postJson("global_properties", {
                property: prop,
                property_value: val.toString(),
            });
            await this.loadGlobalProperty();
        },
    },
    persist: true,
});
