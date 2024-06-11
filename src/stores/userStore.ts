import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: {} as any,
    }),
    actions: {
        setUser(data: any): void {
            this.user = data;
        },
        getUser(): any {
            return this.user
        },
    },
    persist: true,
});
