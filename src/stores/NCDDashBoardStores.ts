import { defineStore } from "pinia";

export const useNCDDashBoardStore = defineStore("NCDDashBoardStore", {
    state: () => ({
        selectedItem: null as string | null,
    }),
    actions: {
        setSelectedItem(itemName: string) {
            this.selectedItem = itemName;
        },
        getSelectedItem(): string | null {
            return this.selectedItem;
        },
    },
    persist: true,
});
