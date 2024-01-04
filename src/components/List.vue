<template>
    <ion-row class="dashed_bottom_border" v-for="(item, index) in listData" :key="index">
        <ion-col :size="10/item.display.length" v-for="(value, index2) in item.display" :key="index2">
            <ion-item class="item_no_border">
                <span>{{ value}}</span>
            </ion-item>
        </ion-col>
        <ion-col size="2" class="action_buttons">
            <DynamicButton
                fill="clear"
                :icon="iconsContent.edit"
                iconSlot="icon-only"
                @click="$emit('clicked:edit',item.display)"
            />
            <DynamicButton
                fill="clear"
                iconSlot="icon-only"
                :icon="iconsContent.delete"
                @click="$emit('clicked:delete',[$event, item.display[0]])"
            />
        </ion-col>
    </ion-row>
</template>
  
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { icons } from '@/utils/svg';
import DynamicButton from '@/components/DynamicButton.vue';
export default defineComponent({
    name: 'Menu',
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
            default: true
        },
        listData: {
            type: String,
            default: [] as any
        }
            
    },
    methods: {
       
      
    }
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
</style>
  