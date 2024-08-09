import { defineStore } from "pinia";
import { getUserLocation } from "@/services/userService"

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: {} as any,
        showUserProfileEdit: false as boolean,
        userFacilityName: '',
    }),
    actions: {
        setUser(data: any): void {
            this.user = data;
        },
        getUser(): any {
            return this.user
        },
        setShowUserProfileEdit(value: boolean) {
            this.showUserProfileEdit = value;
        },
        getShowUserProfileEdit(): boolean {
            return this.showUserProfileEdit
        },
        setUserFacilityName(name: string) {
            this.userFacilityName = "Facility name: "+name
        }
    },
    persist: true,
});
