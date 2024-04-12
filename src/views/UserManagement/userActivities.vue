<template>
    <ion-grid>
        <ion-row>

            <ion-col size="3">
                <ion-label class="ion-cls-lbl">
                    {{ main_program }}
                </ion-label>
                
            </ion-col>

            <ion-col>
                
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { text } from "ionicons/icons"
import { it } from "date-fns/locale"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonLabel,
    IonRow,
    IonGrid
} from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"

const main_program = ref('Manin Framework')
</script>
<style scoped>
.ion-cls-lbl {
    font-size: 17px;
    font-weight: 600;
}
</style>