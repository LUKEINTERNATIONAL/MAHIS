<template>
    <div class="demographics">
        <ion-card class="registration_ion_card" v-for="(card, cardIndex) in content.cards" :key="cardIndex">
            <div class="card_content">
                <div class="card_hearder">
                    {{ card.cardTitle }}
                </div>
                <basic-form
                    :contentData="card.content"
                    :initialData="card.initialData"
                    @update:selected="$emit('update:selected', $event)"
                    @update:inputValue="$emit('update:inputValue', $event)"
                    @clicked:button="$emit('clicked:button', $event)"
                ></basic-form>
            </div>
        </ion-card>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import { grid, list } from "ionicons/icons";
import { useConfigurationStore } from "@/stores/ConfigurationStore";
import { mapState } from "pinia";

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        BasicForm,
    },
    data() {
        return {
            iconListStatus: "active_icon",
            iconGridStatus: "inactive_icon",
        };
    },
    computed: {
        ...mapState(useConfigurationStore, ["registrationDisplayType"]),
    },
    props: {
        content: {
            default: "" as any,
        },
        size: {
            default: "" as any,
        },
    },
});
</script>

<style scoped>
.card_row {
    justify-content: center;
}
.registration_header {
    display: flex;
}
.icon_col {
    justify-content: right;
    display: flex;
    align-items: center;
}
</style>
