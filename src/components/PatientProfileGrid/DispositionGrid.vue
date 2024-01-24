<template>
    <div class="text_header_16">
        <div>Dispositions</div>
    </div>

    <div v-if="dispositions.length == 0" class="no_content">
        <div>
            <div class="no_content_title">
                No disposition added today. 
            </div> 
            <div class="start_consultation">
                Start new consultation
            </div>
        </div>
    </div>
    <div class="dashed_bottom_border" style="cursor: pointer;padding-bottom:5px" @click="openModal()"
        v-for="(disposition, index) in dispositions" :key="index">
        <div class="text_header_14">
            <h5>{{ disposition.name }}</h5>
        </div>
        <div class="diplay_space_between">
            <div>
                <div>
                    {{ disposition.type }} / {{ disposition.date }}
                </div>
                <div>
                    {{ disposition.reason }}
                </div>
            </div>
            <div>
                <ion-icon style="font-size: 20px;"  :icon="iconsContent.tree_dot"></ion-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { icons } from '@/utils/svg';
import { mapState } from 'pinia'
import { useDispositionStore } from "@/stores/DispositionStore"
import DashBox from '../DashBox.vue';
import { createModal } from '@/utils/Alerts'
import DispositionModal from '@/components/ProfileModal/DispositionModal.vue'

export default defineComponent({
    name: 'Menu',
    computed: {
        ...mapState(useDispositionStore, ["dispositions"]),
    },
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        DashBox
    },
    data() {
        return {
            iconsContent: icons,
        };
    },
    methods: {
        openModal() {
            createModal(DispositionModal)
        }
    }
});
</script>

<style scoped></style>
