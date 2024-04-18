<template>
    <ion-row :class="classNames" v-for="(item, index) in listData" :key="index">
        <ion-col :size="item.containSize || 8 / item.display.length" v-for="(value, index2) in item.display" :key="index2" :class="item.class">
            <ion-item class="item_no_border list_header" :style="item.minHeight" v-if="item.header">
                <span>{{ value }}</span>
            </ion-item>
            <ion-item class="item_no_border" :style="item.minHeight" v-else>
                <span v-if="isArray(value)"
                    ><DynamicButton
                        fill="clear"
                        :icon="iconsContent.view"
                        iconSlot="icon-only"
                        @click="$emit('clicked:view', { item: item, results: value })"
                    />
                </span>
                <span v-else>{{ value }}</span>
            </ion-item>
        </ion-col>
        <ion-col :size="item.btnSize || 4" class="action_buttons" :class="item.class">
            <DynamicButton v-if="item?.btn?.includes('enter_results')" name="Enter Result" @click="$emit('clicked:results', item)" />
            <DynamicButton
                v-if="item?.btn?.includes('attach')"
                fill="clear"
                :icon="iconsContent.attach"
                iconSlot="icon-only"
                @click="$emit('clicked:attach', { event: $event, name: item.name, id: item.id })"
            />
            <DynamicButton
                v-if="item?.btn?.includes('print')"
                fill="clear"
                :icon="iconsContent.print"
                iconSlot="icon-only"
                @click="$emit('clicked:print', { event: $event, name: item.name, id: item.id })"
            />

            <DynamicButton
                v-if="item?.btn?.includes('view')"
                fill="clear"
                :icon="iconsContent.view"
                iconSlot="icon-only"
                @click="$emit('clicked:view', { event: $event, name: item.name, id: item.id })"
            />
            <DynamicButton
                v-if="item?.btn?.includes('edit')"
                fill="clear"
                :icon="iconsContent.edit"
                iconSlot="icon-only"
                @click="$emit('clicked:edit', { event: $event, name: item.name, id: item.id })"
            />
            <DynamicButton
                v-if="item?.btn?.includes('delete')"
                fill="clear"
                iconSlot="icon-only"
                :icon="iconsContent.delete"
                @click="openDeletePopover({ event: $event, name: item.name, id: item.id })"
            />
        </ion-col>
    </ion-row>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { icons } from "@/utils/svg";
import DynamicButton from "@/components/DynamicButton.vue";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        DynamicButton,
    },
    data() {
        return {
            iconsContent: icons,
        };
    },
    props: {
        status: {
            type: Boolean,
            default: true,
        },
        listData: {
            default: [] as any,
        },
        classNames: {
            default: "dashed_bottom_border white" as any,
        },
    },
    methods: {
        isArray(value: any) {
            return Array.isArray(value);
        },
        async openDeletePopover(e: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${e.name} ?`, e.event);
            if (deleteConfirmed) {
                this.$emit("clicked:delete", e);
            }
        },
    },
});
</script>

<style scoped>
.item_no_border {
    --border-color: transparent;
}

.action_buttons {
    opacity: 0; /* Initially hide the action buttons */
    transition: opacity 0.3s; /* Add a smooth transition effect */
}

.dashed_bottom_border:hover .action_buttons {
    opacity: 1; /* Show the action buttons when the row is hovered over */
}
.col_background {
    --ion-background-color: #fff;
}
.list_header {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    /* identical to box height, or 18px */
    text-align: center;

    /* Secondary */
    color: #636363;
}
.white ion-item::part(native) {
    background: #fff;
}
</style>
