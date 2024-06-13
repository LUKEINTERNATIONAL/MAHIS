<template>
    <div class="" style="cursor: pointer; padding-bottom: 5px" @click="openModal()">
        <div class="text_header_16">Investigations</div>
        <span v-if="inputFields.length > 0">
            <div class="laboratory" v-for="(item, index) in inputFields" :key="index">
                <!-- <div>{{ item?.display[0] }}</div>
                <div>{{ item?.display[1] }}</div> -->
            </div>
        </span>
    </div>
    <div class="no_content" v-if="inputFields.length == 0">
        <div>
            <div class="no_content_title">No investigations added today.</div>
            <div class="start_consultation">Start new consultation</div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";

import InvestigationsModal from "@/components/ProfileModal/InvestigationsModal.vue";
import { createModal } from "@/utils/Alerts";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { mapState } from "pinia";

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
    },
    data() {
        return {
            iconsContent: icons,
        };
    },
    mounted() {},
    computed: {
        ...mapState(useInvestigationStore, ["investigations"]),
        inputFields() {
            return this.investigations[0].selectedData;
        },
    },
    methods: {
        openModal() {
            createModal(InvestigationsModal);
        },
    },
});
</script>

<style scoped></style>
