<template>
    <ion-row class="dashed_bottom_border" v-for="(item, index) in listData" :key="index">
        <ion-col  :size="10/item.display.length" v-for="(value, index2) in item.display" :key="index2" :class="item.class">
            <ion-item class="item_no_border list_header" :style="item.minHeight" v-if="item.header">
                <span>{{ value}}</span>
            </ion-item>
            <ion-item class="item_no_border" :style="item.minHeight" v-else>
                <span>{{ value}}</span>
            </ion-item>
        </ion-col>
        <ion-col size="2" class="action_buttons" v-if="item.actionBtn" :class="item.class">
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
.col_background{
  --ion-background-color: #fff;
}
.list_header{
 
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
/* identical to box height, or 18px */
text-align: center;

/* Secondary */
color: #636363;


}
</style>
  