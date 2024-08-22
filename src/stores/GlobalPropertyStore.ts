import { defineStore } from "pinia";
import { Service } from "@/services/service";

export const useGlobalPropertyStore = defineStore("globalPropertyStore", {
    state: () => ({
        globalPropertyStore: {
            sitePrefix: loadSitePrefix(),
            dde_enabled: loadDDEStatus(),
        },
    }),
    persist: true,
});

async function loadSitePrefix() {
    const req = await Service.getJson("global_properties", { property: "site_prefix" });
    return req["site_prefix"];
}
async function loadDDEStatus() {
    const req = await Service.getJson("global_properties", { property: "dde_enabled" });
    return req["dde_enabled"];
}
