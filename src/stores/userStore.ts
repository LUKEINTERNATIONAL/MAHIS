import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: {} as any,
        showUserProfileEdit: false as boolean
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
        }
    },
    persist: true,
});
