import { defineStore } from "pinia";
import { getUserLocation } from "@/services/userService";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: {} as any,
        user_ID: "",
        showUserProfileEdit: false as boolean,
        userFacilityName: "",
        currentUserProgram: {} as any,
        currentProgramId: 0 as number,
        facilityLocation: {} as any,
        userRoles: [] as any,
    }),
    actions: {
        setUser(data: any): void {
            this.user = data;
            this.user_ID = data.user_id;
        },
        getUser(): any {
            return this.user;
        },
        setShowUserProfileEdit(value: boolean) {
            this.showUserProfileEdit = value;
        },
        getShowUserProfileEdit(): boolean {
            return this.showUserProfileEdit;
        },
        setUserFacilityName(name: string) {
            this.userFacilityName = name;
        },
        setFacilityLocation(data: any) {
            this.facilityLocation = data;
        },
        getfacilityLocation() {
            return this.facilityLocation;
        },
        getUserId() {
            return this.user_ID;
        },
        setCurrentUserProgram(programData: any) {
            this.currentUserProgram = programData;
            this.currentProgramId = programData.program_id;
        },
        setUserRoles(data: any) {
            this.userRoles = data;
        },
        getUserRoles() {
            return this.userRoles;
        },
        getGivenNameInitial() {
            return this.user.person.names[0].given_name[0];
        },
        getSurname() {
            return this.user.person.names[0].family_name;
        },
    },
    persist: true,
});
