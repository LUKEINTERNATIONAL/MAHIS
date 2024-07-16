<template>
    <div class="demographics" v-if="!editable">
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
                <basic-form
                    :contentData="card.contentTwo"
                    @update:selected="$emit('update:selected', $event)"
                    @update:inputValue="$emit('update:inputValue', $event)"
                    @clicked:button="$emit('clicked:button', $event)"
                ></basic-form>
            </div>
        </ion-card>
    </div>
    <div v-else v-for="(card, cardIndex) in content.cards" :key="cardIndex">
        <basic-form
            :contentData="card.content"
            :initialData="card.initialData"
            @update:selected="$emit('update:selected', $event)"
            @update:inputValue="$emit('update:inputValue', $event)"
            @clicked:button="$emit('clicked:button', $event)"
        ></basic-form>
        <basic-form
            :contentData="card.contentTwo"
            @update:selected="$emit('update:selected', $event)"
            @update:inputValue="$emit('update:inputValue', $event)"
            @clicked:button="$emit('clicked:button', $event)"
        ></basic-form>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import { grid, list } from "ionicons/icons";
import { useConfigurationStore } from "@/stores/ConfigurationStore";
import { mapState } from "pinia";
import ScreenSizeMixin from "@/views/Mixin/ScreenSizeMixin.vue";

export default defineComponent({
    name: "Menu",
    mixins: [ScreenSizeMixin],
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
        contentTwo: {
            default: "" as any,
        },
        size: {
            default: "" as any,
        },
        editable: {
            default: false as any,
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
