<template>
    <ion-row v-if="status">
        <span class="dash_box">{{ content }}</span>
    </ion-row>

</template>
  
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'Menu',
    components: {
        IonContent,
        IonHeader,
        IonItem
    },
    data() {
        return {
        };
    },
    props: {
        status: {
            type: Boolean,
            default: true
        },
        content: {
            type: String,
            default: ''
        }
            
    },
    methods: {
       

    }
});
</script>

<style scoped>

</style>
  