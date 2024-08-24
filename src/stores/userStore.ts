import { defineStore } from "pinia";
import { getUserLocation } from "@/services/userService"

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: {} as any,
        user_ID: '',
        showUserProfileEdit: false as boolean,
        userFacilityName: '',
        currentUserProgram: {} as any,
        currentProgramId: 0 as number,
    }),
    actions: {
        setUser(data: any): void {
            this.user = data;
            this.user_ID = data.user_id;
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
        },
        getUserId() {
            return this.user_ID
        },
        setCurrentUserProgram(programData: any) {
            this.currentUserProgram = programData
            this.currentProgramId = programData.program_id
        }
    },
    persist: true,
});
