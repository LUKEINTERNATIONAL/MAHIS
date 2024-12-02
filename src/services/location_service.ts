import { Service } from "@/services/service";
import { ConceptService } from "@/services/concept_service";

export class LocationService extends Service {
    constructor() {
        super();
    }

    static getLocation(locationID: number) {
        return this.getJson(`locations/${locationID}`);
    }

    static getFacilityDistricts() {
        return this.getJson(`facilities/districts`);
    }

    static getDistrictFacilities(districtName: string) {
        return super.getJson(`/facilities?district_name=${districtName}`);
    }

    static getCityVillages(cityVillage: string) {
        const params = {
            city_village: cityVillage,
        };
        return this.getJson('locations', params);
    }

    static createAddress(type: string, name: string, parentLocation: number) {
        console.log({
            address_type: type,
            addresses_name: name,
            parent_location: parentLocation,
        });
        return this.postJson("addresses", {
            address_type: type,
            addresses_name: name,
            parent_location: parentLocation,
        });
    }

    static getLabs(params = {} as Record<string, string | number>) {
        return super.getJson(`/programs/${Service.getProgramID()}/lab_tests/labs`, params);
    }

    static getFacilities(params = {} as Record<string, string | number>) {
        return super.getJson("/locations", params);
    }

    static async getSpecialistClinics() {
        const conceptId = await ConceptService.getConceptID("Specialist clinic");
        return super.getJson("/concept_set", { id: conceptId });
    }

    static getRegions() {
        return super.getJson("/regions");
    }

    static async getDistricts(regionID: number) {
        return await super.getJson("/districts", { region_id: regionID, page_size: 1000 });
    }

    static async getVillages(traditionalAuthorityID: number, name = "") {
        return await super.getJson("/villages", { traditional_authority_id: traditionalAuthorityID, name, page_size: 1000 });
    }

    static async getVillage(villageID: number) {
        return await super.getJson(`/villages/${villageID}`);
    }

    static async getTraditionalAuthorities(villageID: number, name = "") {
        return await super.getJson("/traditional_authorities", { district_id: villageID, name, page_size: 1000 });
    }

    static async getAllDistricts() {
        return await super.getJson("/districts", { paginate: false });
    }

    static async getAllVillages(page = 1, page_size = 10) {
        return await super.getJson("/villages", { page: page, page_size: page_size });
    }

    static async getAllTraditionalAuthorities() {
        return await super.getJson("/traditional_authorities", { paginate: false });
    }
}
