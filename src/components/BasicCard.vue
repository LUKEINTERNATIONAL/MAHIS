<template>
    <div class="demographics">
        <div class="demographics_title">{{ content.mainTitle }}</div>
        <ion-card class="registration_ion_card" v-for="(card, cardIndex) in content.cards" :key="cardIndex">
            <div class="card_content">
                <div class="card_hearder">
                    {{ card.cardTitle }}            
                </div>
                <basic-form :contentData="card.content" ></basic-form>
            </div>
        </ion-card>
    </div>
</template>
  
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import BasicForm from '@/components/BasicForm.vue';
export default defineComponent({
    name: 'Menu',
    components: {
        IonContent,
        IonHeader,
        IonItem,
        BasicForm
    },
    data() {
        return {
        };
    },
    props: {
        content: {
            default: '' as any
        }
            
    },
    methods: {
       

    }
});
</script>

<style scoped>
.demographics_title{
    font-weight: 700;
    font-size: 24px;
    padding-bottom: 20px;
}
</style>
  